const app = getApp();
import config from '../../config.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: {
      list: [{
        id: 1,
        title: '补货'
      }, {
        id: 2,
        title: '退货'
      }],
      selectedId: 1
    }, // 
    showType: { // 下单组件所需要参数
      from: 'cart',
      orderType: 'backOrder'
    },
    address: "", // 收货地址
    addressID: "", // 收货地址 ID
    sumCount: 0, // 总计量
    sumMoney: 0.00, // 总价
    checkStyleObj: {}, // 记录选中数据
    isCheckAll: false, // 全选标记
    productsList: [], // 列表显示的商品数据源 
    backData: {}, // 补货数据源
    returnData: {}, // 退货数据源
    loadDone: false, // 控制分页加载
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.reloadData(this.data.showType.orderType);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 初始化数据
    this.setData({
      backData: {}, // 补货数据
      returnData: {}, // 退货数据
      loadDone: false,
    });
    this.reloadData(this.data.showType.orderType);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.loadDone) {
      this.prepareData(this.data.showType.orderType);
    }
  },

  /**
   * Tab 切换
   */
  tabchange: function(e) {
    if (e.detail == 1) { // 补货
      this.setData({
        [`showType.orderType`]: 'backOrder'
      });
    } else { // 退货
      this.setData({
        [`showType.orderType`]: 'returnOrder'
      });
    }
    // 设置数据源
    var sData = this.getNowSData();
    if (sData.list) {
      this.setData({
        productsList: sData.list
      });
    } else {
      this.reloadData();
    }
    // 清空选中状态
    this.setData({
      checkStyleObj: {}
    });
    this.refreshCheckStatus();
  },

  // =================组件事件======================

  /**
   * 商品组件 勾选按钮
   */
  checkAction: function(e) {
    // console.warn("购物车修改：" + JSON.stringify(e.detail));
    var prodObj = e.detail;
    var _tempCheckStyle = this.data.checkStyleObj
    if (_tempCheckStyle[prodObj.styleName]) {
      delete _tempCheckStyle[prodObj.styleName];
    } else {
      _tempCheckStyle[prodObj.styleName] = true;
    }
    this.setData({
      checkStyleObj: _tempCheckStyle
    });
    this.refreshCheckStatus();
  },

  /**
   * 全选/取消全选
   */
  checkAllAction: function() {

    if (!this.data.isCheckAll) {
      var _tempCheckStyle = {};
      var productsList = this.data.productsList;
      for (var i = 0; i < productsList.length; i++) {
        _tempCheckStyle[productsList[i].styleName] = true;
      }
      this.setData({
        checkStyleObj: _tempCheckStyle,
        isCheckAll: true
      });
      this.calculateHTTP();
    } else {
      this.setData({
        sumCount: 0, // 总计量
        sumMoney: 0, // 总价
        checkStyleObj: {},
        isCheckAll: false
      });
    }
  },

  /**
   * 商品组件 状态发生变化回调 (数量变化)
   */
  changeAction: function(e) {
    var prodObj = e.detail;
    // 重新计算价格
    var _tempCheckStyle = this.data.checkStyleObj
    if (_tempCheckStyle[prodObj.styleName]) {
      this.refreshCheckStatus();
    }
  },

  /**
   * 商品组件 删除购物车
   */
  deleteAction: function(e) {
    var prodObj = e.detail;
    this.delHTTP(prodObj);
    // console.warn("购物车删除：" + JSON.stringify(e));
    // var prodObj = e.detail;
    // var arrayList = this.data.productsList;
    // arrayList.splice(prodObj.index, 1);
    // this.setData({
    //   productsList: arrayList
    // });
    //
  },

  /**
   * 底部下单弹出框消失事件回调
   */
  dismissPop: function() {},

  // =======================================

  /** 确认订单按钮 */
  calculationAction: function() {
    // 在此判断是否勾选产品
    if (this.data.sumCount == 0) {
      app.showMsg("未选择商品");
      return;
    }
    this.selectComponent("#popup").showModal();
  },

  /** 选择收货地址 */
  chooseAddressAction: function() {
    wx.navigateTo({
      url: '/pages/contactsChoose/contactsChoose',
    });
  },

  // =================网络请求======================

  /** 提交下单按钮 */
  submitOrderAction: function() {
    if (this.data.address.length <= 0) {
      app.showMsg("请选择收货地址");
    }
    // orderCreate
    wx.showLoading({
      title: '正在提交...',
      mask: true,
    });
    var _tempList = Object.getOwnPropertyNames(this.data.checkStyleObj);
    var _that = this;
    var paramData = {
      url: config.orderCreate,
      params: {
        orderType: this.data.showType.orderType,
        styleNameList: JSON.stringify(_tempList),
        addressId: this.data.addressID
      }
    }
    app.nPost(paramData).then(ret => {
      wx.hideLoading();
      _that.orderSuccess();
    }, res => {
      // wx.hideLoading();
    });
  },

  /**
   * 下单成功，清空选中状态，跳转页面
   */
  orderSuccess: function() {
    if (this.data.showType.orderType == "backOrder") {
      wx.navigateTo({
        url: `/pages/returnOrderList/index`,
      })
    } else {
      wx.navigateTo({
        url: `/pages/backOrderList/index`,
      })
    }
    // 下单成功，重置选中数据
    this.setData({
      sumCount: 0, // 总计量
      sumMoney: 0, // 总价
      checkStyleObj: {},
      isCheckAll: false
    });
    this.selectComponent("#popup").hideModal();
  },

  /**
   * 请求数据
   */
  prepareData: function(orderType) {

    // 分页加载
    var page = 1;
    var sData = this.getNowSData();
    if (sData.page && sData.page < sData.pages) {
      page = sData.page + 1;
    } else {
      this.data.productsList = [];
      page = 1;
    }
    // 
    var data = {
      url: config.cartListQuery,
      params: {
        orderType: orderType,
        page: page,
        size: 20,
      }
    }
    app.nGet(data).then(ret => {
      if (ret.data) {
        this.setData({
          loadDone: ret.data.page >= ret.data.pages,
        });
        ret.data.list = [...this.data.productsList, ...ret.data.list];
        if (this.data.showType.orderType == "backOrder") { // 补货数据
          this.setData({
            productsList: ret.data.list,
            backData: ret.data
          });
        } else { // 退货数据
          this.setData({
            productsList: ret.data.list,
            returnData: ret.data
          });
        }
      }
    }, res => {});
  },

  /**
   * 删除购物车商品
   */
  delHTTP: function (prodObj) {
    var _that = this;
    wx.showLoading({
      title: '正在删除...',
      mask: true,
    });
    var paramData = {
      url: config.cartDelete,
      params: {
        orderType: this.data.showType.orderType,
        styleName: prodObj.styleName,
      }
    }
    app.nPost(paramData).then(ret => { // 删除成功，重新计算价格
      wx.hideLoading();
      // 重新计算价格
      var _tempCheckStyle = _that.data.checkStyleObj
      if (_tempCheckStyle[prodObj.styleName]) {
        delete _tempCheckStyle[prodObj.styleName];
        _that.setData({
          checkStyleObj: _tempCheckStyle
        });
        _that.refreshCheckStatus();
      }

      _that.reloadData(); // 重新加载数据
    }, res => {
      // wx.hideLoading();
    });
  },

  /**
   * 获取计算价格
   */
  calculateHTTP: function() {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    });
    var _tempList = Object.getOwnPropertyNames(this.data.checkStyleObj);
    var data = {
      url: config.cartCalculate,
      params: {
        orderType: this.data.showType.orderType,
        styleNameList: JSON.stringify(_tempList),
      }
    }
    var _that = this;
    app.nGet(data).then(ret => {
      wx.hideLoading();
      if (ret.data) {
        _that.setData({
          sumCount: ret.data.totalQty, // 总计量
          sumMoney: ret.data.totalAmount, // 总价
        });
      }
    }, res => {
      // wx.hideLoading();
    });
  },

  // ============功能代码================

  /*
   * 获取当前的服务器数据
   */
  getNowSData: function() {
    if (this.data.showType.orderType == "backOrder") {
      return this.data.backData;
    } else {
      return this.data.returnData;
    }
  },

  /**
   * 刷新 选中状态 和 获取最新价格状态
   */
  refreshCheckStatus: function() {
    var _count = Object.getOwnPropertyNames(this.data.checkStyleObj).length;
    if (_count > 0) {
      if (_count == this.data.productsList.length) { // 全选
        this.setData({
          isCheckAll: true
        });
      } else {
        this.setData({
          isCheckAll: false
        });
      }
      // 刷新价格
      this.calculateHTTP();
    } else {
      this.setData({
        sumCount: 0, // 总计量
        sumMoney: 0, // 总价
        isCheckAll: false
      });
    }
  },

  /**
   * 重新加载数据
   */
  reloadData: function() {
    // 重新加载数据
    if (this.data.showType.orderType == "backOrder") { // 补货数据
      this.data.productsList = [];
      this.data.backData = {};
    } else { // 退货数据
      this.data.productsList = [];
      this.data.returnData = {};
    }
    this.prepareData(this.data.showType.orderType);
  },

})
const app = getApp();
import config from '../../config.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "", // 收货地址
    addressID: "", // 收货地址 ID
    sumCount: 0, // 总计量
    sumMoney: 0.00, // 总价
    checkStyleObj: {}, // 记录选中数据
    isCheckAll: false, // 全选标记
    orderTypeTabs: [
      {
        label: '补货',
        value: 'backOrder',
        type: 0
      },
      {
        label: '正常退货',
        value: 'returnOrder',
        type: 2
      },
      {
        label: '残次退货',
        value: 'defectReturnOrder',
        type: 1
      }
    ],
    seasonTabs: [],
    orderType: 'backOrder',
    defaultOrderTypeIndex: 0, // 默认ordertypeTabs选中下标 从我的页面跳转获取
    defaultSeasonIndex: 0,  // 默认seasonTabs选中下标 从我的页面跳转获取
    orderObj: {
      backOrder: {
        season: 0,
        pageNum: 1,
        loadDone: false,
        scrollTop: 0, // 滚动位置 tab切换前保存
        resultList: []
      },
      returnOrder: {
        season: 0,
        pageNum: 1,
        loadDone: false,
        scrollTop: 0,
        resultList: []
      },
      defectReturnOrder: {
        season: 0,
        pageNum: 1,
        loadDone: false,
        scrollTop: 0,
        resultList: []
      }
    },
    showType: {
      from: 'cart',
      orderType: 'backOrder'
    },
    expressNumber: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    const tabList = app.getValue('orderListHeader')
    this.setData({seasonTabs: tabList})
    /* tab默认选中 */
    const { car_defaultOrderTypeIndex: orderTypeIndex, car_defaultSeasonIndex: seasonIndex } = app.globalData
    if (orderTypeIndex !== null && seasonIndex !== null) {
      const orderType = this.data.orderTypeTabs[orderTypeIndex].value
      let key = `orderObj.${orderType}.season`
      this.setData({
        defaultOrderTypeIndex: orderTypeIndex,
        defaultSeasonIndex: seasonIndex,
        orderType,
        [key]: seasonIndex
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    /* 列表更新 */
    for (const key in this.data.orderObj) {
      if (this.data.orderObj.hasOwnProperty(key)) {
        const pageNum = `orderObj.${key}.pageNum`,
          loadDone = `orderObj.${key}.loadDone`
        this.setData({
          [pageNum]: 1,
          [loadDone]: false
        })
      }
    }
    this.getList()

    /* if (app.isLogin() || typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        tabList: app.getValue('tabList'),
        selected: 2
      })
    } */
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let triggerObj = this.data.orderObj[this.data.orderType]
    if (triggerObj.loadDone) return
    const keyPageNum = `orderObj.${this.data.orderType}.pageNum`
    this.setData({
      [keyPageNum]: triggerObj.pageNum++
    })
    this.getList()
  },
  /* 订单状态tab切换 */
  orderTypeTabsChange (e) {
    // console.log(e)
    const query = wx.createSelectorQuery(),
      beforeType = this.data.orderType  // 获取未切换前的orderType
    query.selectViewport().scrollOffset(res => {
      const key = `orderObj.${beforeType}.scrollTop`
      this.setData({ [key]: res.scrollTop })  // 保存当前页面滚动高度
    }).exec()
    let triggerObj = this.data.orderObj[e.detail.value]
    // 保存orderType 触发更新季度tab下标
    this.setData({
      orderType: e.detail.value,
      defaultSeasonIndex: triggerObj.season,
      'showType.orderType': e.detail.value
    })
    wx.pageScrollTo({ // 跳转到之前保留的滚动位置
      scrollTop: triggerObj.scrollTop,
      duration: 0
    })
    // 判断所切换的页面是否已经请求过数据
    if (triggerObj.loadDone || triggerObj.resultList.length) return
    this.getList()
  },
  /* 季度tab切换 */
  seasonTabsChange (e) {
    // console.log(e)
    const orderType = this.data.orderType
    let triggerObj = this.data.orderObj[orderType]
    if (triggerObj.season === e.detail.value) return
    const keyPageNum = `orderObj.${orderType}.pageNum`,
      keySeason = `orderObj.${orderType}.season`,
      keyLoadNone = `orderObj.${orderType}.loadNone`
    this.setData({
      [keyPageNum]: 1,
      [keySeason]: e.detail.value,
      [keyLoadNone]: false,
      checkStyleObj: {} // 清空选中状态
    })
    wx.pageScrollTo({ // 页面滚动到顶部
      scrollTop: 0
    })
    this.refreshCheckStatus();
    this.getList()
  },
  /* 获取数据 */
  getList () {
    wx.showLoading()
    let triggerObj = this.data.orderObj[this.data.orderType]  // 当前订单类型对象
    const data = {
      url: config.cartListQuery,
      params: {
        orderType: this.data.orderType,
        page: triggerObj.pageNum,
        size: 20,
        season: triggerObj.season
      }
    }
    app.nGet(data).then(res => {
      wx.hideLoading()
      if (res.data) {
        triggerObj.pageNum === 1 ? triggerObj.resultList = res.data.list : triggerObj.resultList.push(...res.data.list)
        const keyList = `orderObj.${this.data.orderType}.resultList`,
          keyLoadNone = `orderObj.${this.data.orderType}.loadDone`
        this.setData({
          [keyLoadNone]: res.data.page >= res.data.pages,
          [keyList]: triggerObj.resultList
        });
      }
    }, res => {
      wx.hideLoading()
    });
  },
  /* 删除单个商品 */
  deletePdt: function (e) {
    // console.log(e)
    const selectStyleName = e.detail.styleName, // 当前选中的商品 styleName
    currentDataType = this.data.orderType
    wx.showLoading({
      title: '正在删除...',
      mask: true,
    });
    var paramData = {
      url: config.cartDelete,
      params: {
        orderType: currentDataType,
        styleName: selectStyleName,
      }
    }
    app.nPost(paramData).then(ret => { // 删除成功，重新计算价格
      wx.hideLoading();
      /* 删除对应商品 */
      let currentList = this.data.orderObj[currentDataType].resultList
      const someIndex = currentList.findIndex(item => item.styleName === selectStyleName) // 找到选中的下标
      if (someIndex !== -1) {
        currentList.splice(someIndex, 1)  // 删除
        const keyList = `orderObj.${currentDataType}.resultList`
        this.setData({
          [keyList]: currentList
        })
      }
      /* 重新计算价格 如果选中该商品 => 取消该商品的选中状态 */
      let _tempCheckStyle = this.data.checkStyleObj
      if (_tempCheckStyle[selectStyleName]) {
        delete _tempCheckStyle[selectStyleName]
        this.setData({
          checkStyleObj: _tempCheckStyle
        });
        this.refreshCheckStatus();
      }
    }, res => {
      // wx.hideLoading();
    });
  },
  /**
   * 商品组件 勾选按钮
   */
  checkAction: function(e) {
    // console.warn("购物车修改：" + JSON.stringify(e.detail));
    const prodObj = e.detail;
    let _tempCheckStyle = this.data.checkStyleObj
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
      let _tempCheckStyle = {};
      const productsList = this.data.orderObj[this.data.orderType].resultList;
      for (var i = 0; i < productsList.length; i++) {
        _tempCheckStyle[productsList[i].styleName] = true;
      }
      this.setData({
        checkStyleObj: _tempCheckStyle,
        isCheckAll: true
      });
      this.calculateHTTP()
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
      this.refreshCheckStatus()
    }
  },
  /**
   * 底部下单弹出框消失事件回调
   */
  dismissPop: function() {},
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
    // 当前orderType tab选中项
    const currentSelectOrderType = this.data.orderTypeTabs.find(item => item.value === this.data.orderType)
    wx.navigateTo({
      url: `/pages/contactsChoose/index?type=${currentSelectOrderType.type}`,
    });
  },
  /**
   * TODO 快递单号
   * @param {*} e 
   */
  onChangeExpress(e) {
    this.setData({
      expressNumber: e.detail
    })
  },
  /** 提交下单按钮 */
  submitOrderAction: function() {
    if (this.data.address.length <= 0) {
      app.showMsg("请选择收货地址");
      return
    }
    if (!this.data.expressNumber && this.data.orderType !== 'backOrder') {
      app.showMsg("请填写快递单号");
      return
    }
    // orderCreate
    wx.showLoading({
      title: '正在提交...',
      mask: true,
    });
    var _tempList = Object.getOwnPropertyNames(this.data.checkStyleObj);
    var paramData = {
      url: config.orderCreate,
      params: {
        orderType: this.data.orderType,
        styleNameList: JSON.stringify(_tempList),
        addressId: this.data.addressID,
        expressNumber: this.data.expressNumber
      }
    }
    app.nPost(paramData).then(ret => {
      wx.hideLoading();
      this.orderSuccess();
    }, res => {
      // wx.hideLoading();
    });
  },

  /**
   * 下单成功，清空选中状态，跳转页面
   */
  orderSuccess: function() {
    const orderType = this.data.orderType,
      season = this.data.orderObj[this.data.orderType].season
    wx.navigateTo({
      url: `/pages/order/index?orderType=${orderType}&season=${season}`
    })
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
   * 获取计算价格
   */
  calculateHTTP: function() {
    wx.showLoading({
      title: '计算金额...',
      mask: true,
    });
    const _tempList = Object.getOwnPropertyNames(this.data.checkStyleObj);
    const data = {
      url: config.cartCalculate,
      params: {
        orderType: this.data.orderType,
        styleNameList: JSON.stringify(_tempList),
      }
    }
    app.nGet(data).then(res => {
      wx.hideLoading();
      if (res.data) {
        this.setData({
          sumCount: res.data.totalQty, // 总计量
          sumMoney: res.data.totalAmount, // 总价
        });
      }
    }, res => {
      // wx.hideLoading();
    });
  },
  /**
   * 刷新 选中状态 和 获取最新价格状态
   */
  refreshCheckStatus: function() {
    var _count = Object.getOwnPropertyNames(this.data.checkStyleObj).length;
    if (_count) {
      this.setData({
        isCheckAll: _count == this.data.orderObj[this.data.orderType].resultList.length
      });
      // 刷新价格
      this.calculateHTTP();
    } else {
      this.setData({
        sumCount: 0, // 总计量
        sumMoney: 0, // 总价
        isCheckAll: false
      });
    }
  }
})
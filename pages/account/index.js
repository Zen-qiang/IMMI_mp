// pages/account/index.js 我的界面
const app = getApp();
import config from '../../config.js';
var WxParse = require('../../common/lib/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    accountInfo: "",
    userbg:"",
    allOrder: '',//订单总计
    normalOrder: '',//原始订单
    backOrder: '',// 补货订单
    returnOrder: '',// 退货订单
    tabList: [],
    activeIndex: 0, // tab当前选中下标
    orderInfo: [], // 所有订单类型
    season: null,  // 季度
    role: null
  },

  onLoad: function() {
    this.getLayout();
    const tabList = app.getValue('orderListHeader')
    if (!tabList) return
    /* 根据表头格式化数据 */
    for (let index = 0; index < tabList.length; index++) {
      const element = tabList[index]
      const {value: orderType} = element
      this.data.orderInfo.push({orderType, info: {}})
    }
    this.setData({tabList, orderInfo: this.data.orderInfo, season: this.data.orderInfo[0].orderType})
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    /* if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        tabList: app.getValue('tabList'),
        selected: 3
      })
    } */
    let userName = app.getValue('username');
    if (userName && userName.length > 0) {
      this.setData({
        userName: userName
      });
      this.prepareData();
    }
    // 获取金额 和 数量
    this.getPriceNum()
    this.setData({
      role: app.getValue('role')
    })
  },
  checkLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  prepareData() {
    let that = this;
    var data = {
      url: config.getAccountInfo,
      params: {}
    }
    app.nGet(data).then(data => {
      this.setData({
        accountInfo: data.data
      });
      let webContent = data.data ? data.data : '';
      WxParse.wxParse('webContent', 'html', webContent, that, 0);
    }, res => {});
  },

  getLayout() {
    var data = {
      url: config.getLayout,
      params: {}
    }
    app.nGet(data).then(data => {
      // console.log(data);
      this.setData({
        userbg: data.data.userbg
      });
    }, res => { });
  },
  /* 路由跳转 */
  jump (e) {
    if (!app.isLogin()) {
      wx.navigateTo({
        url: '/pages/login/index',
      })
      return
    }
    const pageName = e.currentTarget.dataset.pageName
    if (pageName === 'contactsManager') { // 跳转到收货地址页面
      wx.navigateTo({
        url: `/pages/${pageName}/index?type=0`,
      })
    } else {
      const orderType = e.currentTarget.dataset.orderType
      wx.navigateTo({
        url: `/pages/${pageName}/index?season=${this.data.season}&orderType=${orderType}`,
      })
    }
  },
  /* 路由跳转 */
  jumpPreorder (e) {
    if (!app.isLogin()) {
      wx.navigateTo({
        url: '/pages/login/index',
      })
      return
    }
    wx.navigateTo({
        url: '/pages/preorder/index',
    })
  },
  jumpRevieworder (e) {
    if (!app.isLogin()) {
      wx.navigateTo({
        url: '/pages/login/index',
      })
      return
    }
    wx.navigateTo({
      url: '/pages/reviewOrder/index',
    })
  },
  // 订单的 定量 和 金额
  getPriceNum(index = 0) {
    var data = {
      url: config.getOrderPriNum,
      params: {
        orderType: this.data.orderInfo[index].orderType
      }
    }
    app.nGet(data).then(res => {
      if (res) {
        const key = `orderInfo[${index}].info`
        const { AllOrder, backOrder, returnOrder, normalOrder} = res.data
        this.setData({ [key]: { AllOrder, backOrder, returnOrder, normalOrder}})
      }
    }, res => {
      // console.error(res);
    });
  },
  changeTab (e) {
    // console.log(e.detail)
    const { index: idx, value: season } = e.detail
    this.setData({ activeIndex: idx, season })
    if (this.data.orderInfo[idx].info && Object.keys(this.data.orderInfo[idx].info).length) return
    this.getPriceNum(idx)
  },
  /* 跳转到购物车页面 */
  switchCarTab(e) {
    // console.log(e)
    const orderTypeIndex = e.currentTarget.dataset.orderTypeIndex
    app.globalData.car_defaultOrderTypeIndex = orderTypeIndex // orderType tab下标
    app.globalData.car_defaultSeasonIndex = this.data.season  // 季度 tab下标
    wx.switchTab({
      url: '/pages/cart/index',
      success: function (e) {
        var page = getCurrentPages().pop()
        if (page == undefined || page == null) return
        page.onLoad() // 跳转成功触发购物车的onLond生命周期
      }
    }) 
  }
})
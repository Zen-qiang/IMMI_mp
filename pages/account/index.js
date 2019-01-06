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
  },

  checkLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    });
  },

  onLoad: function() {
    this.getLayout();
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
      console.log(data);
      this.setData({
        userbg: data.data.userbg
      });
    }, res => { });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let userName = app.getValue('username');
    if (userName && userName.length > 0) {
      this.setData({
        userName: userName
      });
      this.prepareData();
    console.log(22)
    }
    // 获取金额 和 数量
    this.getPriceNum()
  },
  /**
   * 进入我的订单、退货单、补货单、地址
   * 判断是否登录 未登录先去登录页面
   * 
   */
  enterOtherPage(e) {
    let username = this.data.userName;
    if (!username) {
      wx.navigateTo({
        url: '/pages/login/index',
      });
    } else {
      let page = e.currentTarget.dataset.page;
      if (page === 'contactsManager') {
        wx.navigateTo({
          url: `/pages/${page}/${page}`,
        })
      } else {
        // console.log(page);
        wx.navigateTo({
          url: `/pages/${page}/index`,
        })
      }
    }
  },
  // 订单的 定量 和 金额
  getPriceNum() {
    var data = {
      url: config.getOrderPriNum,
      params: {}
    }
    app.nGet(data).then(ret => {
      if (ret) {
        // 格式化 数据
        // 总计
        ret.data.AllOrder.qty = ret.data.AllOrder.qty.toLocaleString()
        ret.data.AllOrder.amt = ret.data.AllOrder.amt.toFixed(2)
        ret.data.AllOrder.amt = ret.data.AllOrder.amt.toLocaleString()
        // 补货
        ret.data.backOrder.qty = ret.data.backOrder.qty.toLocaleString()
        ret.data.backOrder.amt = ret.data.backOrder.amt.toFixed(2)
        ret.data.backOrder.amt = ret.data.backOrder.amt.toLocaleString()
        // 退货
        if (ret.data.returnOrder.qty < 0) {
          ret.data.returnOrder.qty = ret.data.returnOrder.qty + '',
          ret.data.returnOrder.qty = ret.data.returnOrder.qty.substring(1)
          ret.data.returnOrder.qty = ret.data.returnOrder.qty.toLocaleString()
        }
        else {
          ret.data.returnOrder.qty = ret.data.returnOrder.qty.toLocaleString()
        }
        if (ret.data.returnOrder.amt < 0) {
          ret.data.returnOrder.amt = ret.data.returnOrder.amt + '',
          ret.data.returnOrder.amt = ret.data.returnOrder.amt.substring(1)
          ret.data.returnOrder.amt = +ret.data.returnOrder.amt
          ret.data.returnOrder.amt = ret.data.returnOrder.amt.toFixed(2)
          ret.data.returnOrder.amt = ret.data.returnOrder.amt.toLocaleString()
        }else {
          ret.data.returnOrder.amt = ret.data.returnOrder.amt.toFixed(2)
          ret.data.returnOrder.amt = ret.data.returnOrder.amt.toLocaleString()
        }

        // 原始
        ret.data.normalOrder.qty = ret.data.normalOrder.qty.toLocaleString()
        ret.data.normalOrder.amt = ret.data.normalOrder.amt.toFixed(2)
        ret.data.normalOrder.amt = ret.data.normalOrder.amt.toLocaleString()
        this.setData({
          allOrder: ret.data.AllOrder,
          backOrder: ret.data.backOrder,
          returnOrder: ret.data.returnOrder,
          normalOrder: ret.data.normalOrder
        })
      }
    }, res => {
      // console.error(res);
    });
  }
})
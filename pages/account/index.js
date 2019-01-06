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
    }
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
  }
})
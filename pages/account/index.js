// pages/account/index.js 我的界面
const app = getApp();
import config from '../../config.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: ""
  },

  checkLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userName = app.getValue('username');
    this.setData({
      userName: userName
    });
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
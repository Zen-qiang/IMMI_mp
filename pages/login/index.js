// pages/login/index.js
const app = getApp();
import config from '../../config.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    isFirst: false,
    userName: {
      title: '用户名',
      placeholder: '用户名',
      value: '',

    },
    password: {
      title: '密码',
      placeholder: '请输入密码',
      value: '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.page && options.page === 'first') {
      this.setData({
        isFirst: options.page
      });
    }
    let sessionKey = app.getValue('sessionKey');
    if (sessionKey) {
      this.setData({
        isLogin: true
      });
      wx.setNavigationBarTitle({
        title: '退出登录页',
      })
    } else {
      wx.setNavigationBarTitle({
        title: '登录页',
      })
    }
  },
  handleUserNameChange(e) {
    // console.log(e);
    let username = e.detail.value;
    if (username) {
      this.setData({
        [`userName.value`] : username
      });
    }
  },
  handlePawwordChange(e) {
    let password = e.detail.value;
    if (password) {
      this.setData({
        [`password.value`]: password
      });
    }
  },
  handleBtn() {
    if (this.data.isLogin) {
      this.logout();
    } else {
      this.login();
    }
  },
  /**
   * 登录
   */
  login() {
    let username = this.data.userName.value;
    let password = this.data.password.value;
    if (username && password) {
      var data = {
        url: config.login,
        params: {
          username: username,
          password: password
        }
      }
      app.nPost(data).then(res => {
        app.showMsg("登录成功");
        if (res.data) {
          app.saveValue('username', res.data.username);
          app.saveValue('uid', res.data.uid);
          app.saveValue('sessionKey', res.data.sessionToken);
          app.saveValue('productMode', res.data.productMode);
          if (this.data.isFirst) {
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }
        }
        wx.navigateBack();
      }, res => {
        // console.error(res);
      });
    } else {
      app.showMsg("请输入用户名或密码！");
    }
  },
  /**
   * 退出
   */
  logout() {
      var data = {
        url: config.logout,
        params: {}
      }
      app.nGet(data).then(res => {
        app.showMsg("退出成功");
        app.clearValue();
        wx.navigateBack();
      }, res => {
        // console.error(res);
      });
    }
})
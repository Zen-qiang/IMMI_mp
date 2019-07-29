// pages/login/index.js
const app = getApp();
import config from '../../config.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    // isFirst: false,
    userName: {
      placeholder: '请输入用户名',
      value: '',
    },
    password: {
      placeholder: '请输入密码',
      value: '',
    },
    oldPassword: {
      placeholder: '请输入原密码',
      value: ''
    },
    newPassword: {
      placeholder: '请输入新密码',
      value: ''
    },
    confirmNewPassword: {
      placeholder: '再次输入新密码',
      value: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // if (options.page && options.page === 'first') {
    //   this.setData({
    //     isFirst: options.page
    //   });
    // }
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
  handleBtn() {
    if (this.data.isLogin) {
      this.logout();
    } else {
      this.login();
    }
  },
  /* input输入事件 */
  handleChange (e) {
    // console.log(e)
    const key = `${e.target.dataset.type}.value`
    this.setData({
      [key]: e.detail.value 
    })
  },
  /* 确更改密码 */
  changePassword () {
    if (this.data.newPassword.value !== this.data.confirmNewPassword.value) return
    const data = {
      url: config.changePassword,
      params: {
        oldPassword: this.data.oldPassword.value,
        newPassword: this.data.newPassword.value,
        confirmNewPassword: this.data.confirmNewPassword.value
      }
    }
    console.log(data)
    app.nPost(data).then(res => {
      console.log(res)
      wx.showModal({
        title: '提示',
        content: '修改成功请重新登陆',
        showCancel: false,
        success: (res) => {
          console.log(res)
          if (res.confirm) {
            console.log('用户点击确定')
            this.logout()
          }
        }
      })
    })
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
          app.saveValue('orderListHeader', res.data.orderListHeader)
          // if (this.data.isFirst) {
            // wx.switchTab({
            //   url: '/pages/index/index',
            // })
          // }
        }
        wx.navigateBack();
      }, res => {
        // console.error(res);
        app.showMsg("登录失败")
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
        // wx.navigateBack();
        wx.redirectTo({
          url: '/pages/login/index',
        })
      }, res => {
        // console.error(res);
      });
    }
})
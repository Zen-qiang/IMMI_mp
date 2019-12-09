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
    if (app.isLogin()) {
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
  onUnload () {
    app.globalData.at_login_page = false
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
    const key = `${e.target.dataset.type}.value`
    this.setData({
      [key]: e.detail
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
          app.saveValue('orderListHeader', res.data.orderListHeader) // 订单头部tab
          app.saveValue('role', res.data.role) // 判断用户身份
          // if (this.data.isFirst) {
            // wx.switchTab({
            //   url: '/pages/index/index',
            // })
          // }
          /* if (res.data.role === 'BU') {
            const tabList = [
              {
                "pagePath": "/pages/index/index",
                "iconPath": "/common/resource/home.png",
                "selectedIconPath": "/common/resource/home-selected.png",
                "text": "首页"
              },
              {
                "pagePath": "/pages/heroOrderList/index",
                "iconPath": "/common/resource/hero.png",
                "selectedIconPath": "/common/resource/hero-selected.png",
                "text": "全国排行榜"
              },
              {
                "pagePath": "/pages/cart/index",
                "iconPath": "/common/resource/cart.png",
                "selectedIconPath": "/common/resource/cart-selected.png",
                "text": "购物车"
              },
              {
                "pagePath": "/pages/account/index",
                "iconPath": "/common/resource/account.png",
                "selectedIconPath": "/common/resource/account-selected.png",
                "text": "我的"
              }
            ]
            app.saveValue('tabList', tabList)
          } else if (res.data.role === 'AU' || res.data.role === 'SUM') {
            const tabList = [
              {
                "pagePath": "/pages/index/index",
                "iconPath": "/common/resource/home.png",
                "selectedIconPath": "/common/resource/home-selected.png",
                "text": "首页"
              },
              {
                "pagePath": "/pages/heroOrderList/index",
                "iconPath": "/common/resource/hero.png",
                "selectedIconPath": "/common/resource/hero-selected.png",
                "text": "全国排行榜"
              },
              {
                "pagePath": "/pages/reviewOrder/index",
                "iconPath": "/common/resource/review.png",
                "selectedIconPath": "/common/resource/review-selected.png",
                "text": "审核订单"
              },
              {
                "pagePath": "/pages/account/index",
                "iconPath": "/common/resource/account.png",
                "selectedIconPath": "/common/resource/account-selected.png",
                "text": "我的"
              }
            ]
            app.saveValue('tabList', tabList)
          } */
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
const openIdUrl = require('./config').openIdUrl
App({

  onLaunch: function(opts) {
    // this.getValue('role') === 'AU' ? tabs.splice(2, 1) : tabs.splice(3, 1)
  },

  onShow: function(opts) {
    // let username = this.getValue('username');
    // if (!username) {
    //   wx.navigateTo({
    //     url: '/pages/login/index'
    //   });
    // }
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
  },

  onHide: function() {
    console.log('App Hide')
  },

  globalData: {
    openid: null,
    car_defaultOrderTypeIndex: null,  // 购物车页面默认orderType tab下标
    car_defaultSeasonIndex: null,  // 购物车页面默认season tab下标
    at_login_page: false  // 避免login页面重复跳转
  },

  // lazy loading openid
  getUserOpenId: function(callback) {
    var self = this

    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success: function(data) {
          wx.request({
            url: openIdUrl,
            data: {
              code: data.code
            },
            success: function(res) {
              console.log('拉取openid成功', res)
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail: function(res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail: function(err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  },

  // ======网络请求======
  fetch: function (data, type = 'GET') {
    const _that = this;
    let sessionKey = this.getValue('sessionKey') || '';
    let cityId = this.getValue('cityCode') || '310000';
    let promise = new Promise(function(resolve, reject) {
      wx.request({
        url: data.url,
        data: data.params,
        method: type,
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'session-Token': sessionKey,
          'city': cityId,
        },
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {
          if (res.data && res.data.code === 666 || res.data.code === 0) {
            resolve(res.data);
          } else if (res.data && res.data.code === 8006 || res.data && res.data.code === 8005) {  // 8006 用户未登录  8005 无效的SESSION-TOKEN
            _that.clearValue();
            const pages = getCurrentPages(),
              currentPage = pages[pages.length - 1]
            if (_that.globalData.at_login_page || currentPage && currentPage.route.split(/\//, 2).pop() === 'login') return
            _that.globalData.at_login_page = true
            wx.navigateTo({
              url: '/pages/login/index'
            });
          } else {
            reject(res.data);
            if (res.data && res.data.message) {
              _that.showMsg(res.data.message);
            }
          }
        }
      });
    });
    return promise;
  },
  nGet: function (data) {
    return this.fetch(data)
  },
  nPost: function (data) {
    return this.fetch(data, 'POST')
  },
  nPut: function (data) {
    return this.fetch(data, 'PUT')
  },
  // ======本地存储======

  saveValue: function(key, value) {
    wx.setStorageSync(key, value);
  },

  getValue: function(key) {
    return wx.getStorageSync(key);
  },

  clearValue: function() {
    wx.clearStorageSync();
  },

  // ======提示框======
  showMsg: function(msg, rduration) {
    if (!rduration) {
      rduration = 2;
    }
    rduration = 1000 * rduration;
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: rduration
    })
  },

  // ============
  showMsgSuccess: function (msg, rduration) {
    if (!rduration) {
      rduration = 2;
    }
    rduration = 1000 * rduration;
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: rduration
    })
  },
  /**
   * 判断用户是否登录
  */
  isLogin: function () {
    var sessionKey = this.getValue('sessionKey');
    return sessionKey ? true : false;
  },
})
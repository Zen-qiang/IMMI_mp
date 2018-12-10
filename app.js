const openIdUrl = require('./config').openIdUrl

App({

  onLaunch: function(opts) {
   
  },

  onShow: function(opts) {
    let username = this.getValue('username');
    console.log('username');
    console.log(!username);
    if (!username) {
      wx.navigateTo({
        url: '/pages/login/index'
      });
    }
  },

  onHide: function() {
    console.log('App Hide')
  },

  globalData: {
    hasLogin: false,
    openid: null
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

  /** get 请求
    var data = {
      url: config.loginP,
      params: {
      }
    }
    app.nGet(data).then(data => {}, res => {});
   */
  nGet: function(data) {
    var _that = this;
    let sessionKey = this.getValue('sessionKey') || '';
    let cityId = this.getValue('cityCode') || '310000';
    let promise = new Promise(function(resolve, reject) {
      wx.request({
        url: data.url,
        data: data.params,
        method: "GET",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'session-Token': sessionKey,
          'city': cityId,
        },
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {
          if (res.data && res.data.code === 666) {
            resolve(res.data);
          } else if (res.data && res.data.code === 8006 || res.data && res.data.code === 8005) {
            _that.clearValue();
            wx.reLaunch({
              url: '/pages/login/index?page=first'
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

  /** post 请求
    var data = {
      url: config.loginP,
      params: {
      }
    }
    app.nPost(data).then(data => {}, res => {});
   */
  nPost: function(data) {
    var _that = this;
    let sessionKey = this.getValue('sessionKey') || '';
    let cityId = this.getValue('cityCode') || '310000';
    let promise = new Promise(function(resolve, reject) {
      wx.request({
        url: data.url,
        data: data.params,
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'session-Token': sessionKey,
          'city': cityId,
        },
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {
          if (res.data && res.data.code === 666) {
            resolve(res.data);
          } else if (res.data && res.data.code === 8006 || res.data && res.data.code === 8005) {
            _that.clearValue();
            wx.reLaunch({
              url: '/pages/login/index?page=first'
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

})
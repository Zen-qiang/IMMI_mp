// pages/pdtInfo/index.js 商品详情
const app = getApp();
import config from '../../config.js';

import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: {},
    productId: '',
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    pdtInfo: {},
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.productId) {
      this.setData({
        productId: options.productId
      });
      this.getPdtInfo();
    }
  },

  onClose (e) {
    this.setData({
      show: false
    })
  },

  showPopUp: function() {
    let username = app.getValue('username');
    if (username) {
      // this.selectComponent("#popup").showModal();
      this.setData({
        show: true
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/index',
      })
    }
  },

  dismissPop: function() {
    
  },

  getPdtInfo() {
    var data = {
      url: config.pdtGet,
      params: {
        productId: this.data.productId
      }
    }
    app.nGet(data).then(data => {
      if (data.data) {
        this.setData({
          pdtInfo: data.data
        });

      }
    }, res => {
      // console.error(res);
    });
  },

  reset: function() {
    // this.selectComponent("#popup").hideModal();
    this.setData({
      show: false
    })
  },
  successOrder: function() {
    // this.selectComponent("#popup").hideModal();
    this.setData({
      show: false
    })
    app.showMsg("成功添加购物车",2)
  },
  successOrderPre () {
    // this.selectComponent("#popup").hideModal();
    this.setData({
      show: false
    })
    // app.showMsg("通知成功", 2)
    Dialog.alert({
      message: '通知成功'
    })
  }
})
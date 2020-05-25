// pages/pdtList/index.js
const app = getApp();
import config from '../../../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList()
  },

  getList () {
    let url = config.getReserve,
    params = {
    }
    app.nGet({url, params}).then(({data}) => {
      if (data) {
        this.setData({
          list: data
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },

  _jumpList ({ currentTarget: { dataset: { id } } }) {
    // console.log(id)
    wx.navigateTo({
      url: `/pages/pdtList/index?type=3&categoryId=${id}`,
    })
  }
})
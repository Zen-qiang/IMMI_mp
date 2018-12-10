// pages/searchPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  searchChange(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  searchDone(e) {
    // console.log('search', e.detail.value)
  }
})
// pages/pdtList/index.js
const app = getApp();
import config from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: '',
    attrIdList: [],
    page: 1,
    size: 10,
    pages: 0,
    total: 0,
    list: [],
    loadMore: { // 加载信息
      title: "",
      isLoad: false
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.search) {
      this.setData({
        search: options.search
      });
    }
    if (options.attrIdList) {
      let attrIdList = options.attrIdList.split(',');
      this.setData({
        attrIdList: attrIdList
      });
    }
    this.getPdtList();
  },

  getPdtList(loadmore) {
    let attrIdList = JSON.stringify(this.data.attrIdList);
    var data = {
      url: config.indexNewPdtQuery,
      params: {
        search: this.data.search,
        attrIdList: attrIdList,
        page: this.data.page,
        size: this.data.size
      }
    }
    app.nGet(data).then(data => {
      if (data.data && data.data.list) {
        if (!loadmore) {
          if (data.data.list && data.data.list.length === 0) {
            this.setData({
              ["loadMore.title"]: '暂无数据'
            });
          }
          this.setData({
            page: data.data.page,
            size: data.data.size,
            pages: data.data.pages,
            total: data.data.total,
            list: data.data.list,
          });
        } else {
          let list = [...this.data.list, ...data.data.list];
          this.setData(
            {
              ["loadMore.isLoad"]: false,
              page: data.data.page,
              size: data.data.size,
              pages: data.data.pages,
              total: data.data.total,
              list: list,
            }
          );
        }
      } 
    }, res => {
      this.setData(
        {
          ["loadMore.isLoad"]: false
        }
      );

      // console.error(res);
    });

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    wx.hideNavigationBarLoading();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (Number(this.data.page) < Number(this.data.pages)) {
      this.setData({
        ["loadMore.isLoad"]: true,
        page: Number(this.data.page) + 1,
      });
      this.getPdtList('loadmore');
    } else {
      this.setData({
        ["loadMore.title"]: '没有更多数据啦'
      });
    }
  }
})
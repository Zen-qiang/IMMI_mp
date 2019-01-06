// pages/pdtList/index.js
const app = getApp();
import config from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "",
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
  onLoad: function(options) {
    if (options.type) {
      this.setData({
        type: options.type
      });
    } else {
      if (options.search) {
        this.setData({
          search: options.search,
          type: '3'
        });
      }
      if (options.attrIdList) {
        let attrIdList = options.attrIdList.split(',');
        this.setData({
          attrIdList: attrIdList,
          type: '3'
        });
      }
    }
    this.prepareData();
  },

  prepareData(loadmore) {
    if (this.data.type == '1') {
      this.getType1Data(loadmore);
    } else if (this.data.type == '2') {
      this.getType2Data(loadmore);
    } else {
      this.getPdtList(loadmore);
    }
  },

  // 新品推荐
  getType1Data(loadmore) {
    var data = {
      url: config.indexNewPdtQuery,
      params: {
        recommend: true,
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
          this.setData({
            ["loadMore.isLoad"]: false,
            page: data.data.page,
            size: data.data.size,
            pages: data.data.pages,
            total: data.data.total,
            list: list,
          });
        }
      }
    }, res => {
      this.setData({
        ["loadMore.isLoad"]: false
      });
    });
  },

  // Top 20
  getType2Data(loadmore) {
    let attrIdList = JSON.stringify(this.data.attrIdList);
    var data = {
      url: config.searchB2bProductTopList,
      params: {
        page: 1,
        size: 20,
        orderBy: 'QTY',
        sort: "DESC",
      }
    }
    app.nGet(data).then(data => {
      if (data.data && data.data.list) {
        if (data.data.list && data.data.list.length === 0) {
          this.setData({
            ["loadMore.title"]: '暂无数据'
          });
        } else {
          this.setData({
            page: 1,
            size: 20,
            pages: 1,
            total: 20,
            list: data.data.list,
            ["loadMore.isLoad"]: false,
          });
        }
      }
    }, res => {
      this.setData({
        ["loadMore.isLoad"]: false
      });
    });
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
          this.setData({
            ["loadMore.isLoad"]: false,
            page: data.data.page,
            size: data.data.size,
            pages: data.data.pages,
            total: data.data.total,
            list: list,
          });
        }
      }
    }, res => {
      this.setData({
        ["loadMore.isLoad"]: false
      });
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading();
    wx.hideNavigationBarLoading();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (Number(this.data.page) < Number(this.data.pages)) {
      this.setData({
        ["loadMore.isLoad"]: true,
        page: Number(this.data.page) + 1,
      });
      this.prepareData('loadmore');
    } else {
      this.setData({
        ["loadMore.title"]: '没有更多数据啦'
      });
    }
  }
})
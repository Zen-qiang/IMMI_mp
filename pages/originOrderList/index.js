const app = getApp();
import config from '../../config.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    ordersData: {},
    loadDone: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.prepareData();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.data.ordersData = {};
    this.preparePageData();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.loadDone) {
      this.prepareData();
    }
  },

  // 点击订单，进入订单详情页
  orderClickAction: function(e) {
    // console.log(JSON.stringify(e.currentTarget.dataset.data));
    wx.navigateTo({
      // url: '/pages/orderDetailList/index?orderType=' + '02' + '&orderID=' + e.currentTarget.dataset.data.orderId,
      url: `/pages/orderDetailList/index?orderType=${'04'}&orderID=${e.currentTarget.dataset.data.orderId}`,
    });
  },

  // ----------------------------

  /** 加载数据 */
  prepareData() {

    // 分页加载
    var page = 1;
    var sData = this.data.ordersData;
    if (sData.page && sData.page < sData.pages) {
      page = sData.page + 1;
    } else {
      this.data.ordersData.list = [];
      page = 1;
    }

    var data = {
      url: config.rOrderQuery,
      params: {
        page: page,
        size: 10,
        orderType: 'normal',
      }
    };

    app.nGet(data).then(ret => {
      if (ret.data) {
        if (ret.data.page >= ret.data.pages) {
          this.setData({
            loadDone: true,
          });
        }
        ret.data.list = [...this.data.ordersData.list, ...ret.data.list];
        this.setData({
          ordersData: ret.data
        });
      }
    }, res => {
      // console.error(JSON.stringify(res));
    });
  },


})
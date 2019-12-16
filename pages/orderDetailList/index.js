// pages/orderList/index.js
const app = getApp();
import config from '../../config.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderConfig: {},
    ordersData: [],
    orderID: '', // 补退货单 订单号
    showType: {
      from: 'rOrderInfo',
      orderType: ''
    } // 下单组件所需要参数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var orderType = options.orderType || '';
    var orderID = options.orderID || '';

    switch (orderType.toLocaleLowerCase()) {
      case 'backorder':
        wx.setNavigationBarTitle({ title: '补货订单' })
        break
      case 'returnorder':
        wx.setNavigationBarTitle({ title: '退货订单' })
        break
      case 'normal':
        wx.setNavigationBarTitle({ title: '原始订单' })
        break
    }
    this.setData({
      orderID,
      'showType.orderType': orderType
    })

    var title = "";
    var showType = {
      from: 'rOrderInfo',
      orderType: ''
    };

    this.preparePageData(); // 加载页面数据
  },

  /** 加载数据 */
  preparePageData() {
    var paramData = {
      url: config.rOrderGet,
      params: {
        orderId: this.data.orderID,
        orderType: this.data.showType.orderType
      }
    };
    app.nGet(paramData).then(ret => {
      if (ret.data) {
        // for (var i = 0; i < ret.data.list.length; i++) {
        //   ret.data.list[i].isCheck = false;
        // }
        let orderConfig = {
          orderNumber: ret.data.orderNumber,
          orderStatus: ret.data.orderStatus,
          totalAmount: ret.data.totalAmount,
          totalQty: ret.data.totalQty,
          address: ret.data.address,
          orderStatus: ret.data.orderStatus
        };
        this.setData({
          orderConfig: orderConfig,
          ordersData: ret.data.list
        });
        // console.log(JSON.stringify(ret.data.list));
      }
    }, res => {
      // console.error(JSON.stringify(res));
    });
  },
})
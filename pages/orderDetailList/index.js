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
    orderType: '', // '02':补货单; '03':退货单;
    orderID: '', // 补退货单 订单号
    showType: {} // 下单组件所需要参数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var orderType = options.orderType || '';
    var orderID = options.orderID || '';

    var title = "";
    var showType = {
      from: 'rOrderInfo',
      orderType: ''
    };
    // console.log(orderType);
    if (orderType == '02') {
      title = "补货订单";
      showType.orderType = "backOrder";
    } else if (orderType == '03') {
      title = "退货订单";
      showType.orderType = "returnOrder";
    } else if (orderType == '04') {
      title = "原始订单";
      showType.orderType = "Normal";
    }
    wx.setNavigationBarTitle({
      title: title,
    })

    this.setData({
      orderType: orderType,
      orderID: orderID,
      showType: showType
    });
    this.preparePageData(); // 加载页面数据
  },

  /** 加载数据 */
  preparePageData() {
    var paramData = {
      url: config.rOrderGet,
      params: {
        orderId: this.data.orderID,
        orderType: this.data.orderType == '04' ? 'Normal' : 'BackOrder'
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
Component({
  properties: {
    prodata: {
      type: Object
    }
  },
  data: {
    amount: null,
    sumQty: null
  },
  lifetimes: {
    attached () {
    }
  },
  methods: {
    onTap (e) {
      // console.log(e)
      // this.triggerEvent('onTap', this.data.prodata.id)
      /* this.setData({
        showDetail: !this.data.showDetail
      }) */
      wx.navigateTo({
        url: `/pages/orderDetailList/index?orderType=${this.data.prodata.orderType}&orderID=${this.data.prodata.orderId}`,
      })
    }
  }
})
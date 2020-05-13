Page({
  data: {
    number: null, // 物流单号
    orderNumber: '',  // 订单编号
    totalQty: '', // 总订量
    totalAmount: '', // 总金额
    address: {} // 收货信息
  },
  onLoad (option) {
    console.log(getCurrentPages()[0].data)
    const pageObj = getCurrentPages()
    const prePage = pageObj[pageObj.length - 2] // 上一个页面
    const { orderNumber, totalAmount, totalQty, address } = prePage.data.orderConfig
    this.setData({ orderNumber, totalAmount, totalQty, address })
  },
  inputNumber (e) {
    console.log(e)
  }
})
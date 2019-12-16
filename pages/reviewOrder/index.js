const app = getApp()
import config from '../../config.js';
const resultList = [
  {
    "orderQty": 8340,
    "orderStatus": "审核完成",
    "status": "APPROVED",
    "currentAuUserName": "-",
    "indicatorsQty": 0,
    "nextAuName": "-",
    "achievingQtyRate": "-",
    "achievingRate": "120",
    "currentAuName": null,
    "id": 1799,
    "orderNo": "QDH1911077949",
    "indicatorsAmout": 565000,
    "orderAmt": 678955.41000000003,
    "createdDate": "2019-11-07 00:01:07",
    "buId": 2050,
    "buName": "YY123",
    "isactive": true,
    "userName": "南京鼎威",
    "orderPricelist": 1322457,
    "nextAuUserName": "-"
  },
  {
    "orderQty": 1149,
    "orderStatus": "审核完成",
    "status": "APPROVED",
    "currentAuUserName": "-",
    "indicatorsQty": 0,
    "nextAuName": "-",
    "achievingQtyRate": "-",
    "achievingRate": "196",
    "currentAuName": null,
    "id": 1802,
    "orderNo": "QDH1911077944",
    "indicatorsAmout": 90400,
    "orderAmt": 176961.13,
    "createdDate": "2019-11-07 00:01:07",
    "buId": 2055,
    "buName": "YY144",
    "isactive": true,
    "userName": "无锡天成",
    "orderPricelist": 345753,
    "nextAuUserName": "-"
  },
  {
    "orderQty": 3464,
    "orderStatus": "审核完成",
    "status": "APPROVED",
    "currentAuUserName": "-",
    "indicatorsQty": 0,
    "nextAuName": "-",
    "achievingQtyRate": "-",
    "achievingRate": "85",
    "currentAuName": null,
    "id": 1804,
    "orderNo": "QDH1911077941",
    "indicatorsAmout": 565000,
    "orderAmt": 478803.58000000002,
    "createdDate": "2019-11-07 00:01:07",
    "buId": 2058,
    "buName": "YY163",
    "isactive": true,
    "userName": "苏州瑞力",
    "orderPricelist": 882846,
    "nextAuUserName": "-"
  },
  {
    "orderQty": 11425,
    "orderStatus": "审核完成",
    "status": "APPROVED",
    "currentAuUserName": "-",
    "indicatorsQty": 0,
    "nextAuName": "-",
    "achievingQtyRate": "-",
    "achievingRate": "117",
    "currentAuName": null,
    "id": 1808,
    "orderNo": "QDH1911077936",
    "indicatorsAmout": 1130000,
    "orderAmt": 1319114.28,
    "createdDate": "2019-11-07 00:01:07",
    "buId": 2063,
    "buName": "YY212",
    "isactive": true,
    "userName": "无锡爱动",
    "orderPricelist": 2557340,
    "nextAuUserName": "-"
  },
  {
    "orderQty": 897,
    "orderStatus": "审核完成",
    "status": "APPROVED",
    "currentAuUserName": "-",
    "indicatorsQty": 0,
    "nextAuName": "-",
    "achievingQtyRate": "-",
    "achievingRate": "102",
    "currentAuName": null,
    "id": 1809,
    "orderNo": "QDH1911077935",
    "indicatorsAmout": 90400,
    "orderAmt": 92351.259999999995,
    "createdDate": "2019-11-07 00:01:07",
    "buId": 2064,
    "buName": "YY222",
    "isactive": true,
    "userName": "常州高凡",
    "orderPricelist": 176232,
    "nextAuUserName": "-"
  },
  {
    "orderQty": 18711,
    "orderStatus": "审核完成",
    "status": "APPROVED",
    "currentAuUserName": "-",
    "indicatorsQty": 0,
    "nextAuName": "-",
    "achievingQtyRate": "-",
    "achievingRate": "151",
    "currentAuName": null,
    "id": 1822,
    "orderNo": "QDH1911077922",
    "indicatorsAmout": 904000,
    "orderAmt": 1368592,
    "createdDate": "2019-11-07 00:01:07",
    "buId": 2077,
    "buName": "YY294",
    "isactive": true,
    "userName": "南京羽强",
    "orderPricelist": 2746980,
    "nextAuUserName": "-"
  },
  {
    "orderQty": 1957,
    "orderStatus": "审核完成",
    "status": "APPROVED",
    "currentAuUserName": "-",
    "indicatorsQty": 0,
    "nextAuName": "-",
    "achievingQtyRate": "-",
    "achievingRate": "116",
    "currentAuName": null,
    "id": 1827,
    "orderNo": "QDH1911077917",
    "indicatorsAmout": 203400,
    "orderAmt": 235848.79999999999,
    "createdDate": "2019-11-07 00:01:07",
    "buId": 2082,
    "buName": "YY371",
    "isactive": true,
    "userName": "昆山优体",
    "orderPricelist": 449860,
    "nextAuUserName": "-"
  },
  {
    "orderQty": 662,
    "orderStatus": "审核完成",
    "status": "APPROVED",
    "currentAuUserName": "-",
    "indicatorsQty": 0,
    "nextAuName": "-",
    "achievingQtyRate": "-",
    "achievingRate": "63",
    "currentAuName": null,
    "id": 1837,
    "orderNo": "QDH1911077907",
    "indicatorsAmout": 94925.649999999994,
    "orderAmt": 59382.800000000003,
    "createdDate": "2019-11-07 00:01:07",
    "buId": 2092,
    "buName": "YY647",
    "isactive": true,
    "userName": "苏州五环体育",
    "orderPricelist": 114200,
    "nextAuUserName": "-"
  },
  {
    "orderQty": 4676,
    "orderStatus": "审核完成",
    "status": "APPROVED",
    "currentAuUserName": "-",
    "indicatorsQty": 0,
    "nextAuName": "-",
    "achievingQtyRate": "-",
    "achievingRate": "138",
    "currentAuName": null,
    "id": 1838,
    "orderNo": "QDH1911077906",
    "indicatorsAmout": 395500,
    "orderAmt": 545204.35999999999,
    "createdDate": "2019-11-07 00:01:07",
    "buId": 2093,
    "buName": "YY688",
    "isactive": true,
    "userName": "东海凯达",
    "orderPricelist": 1046692,
    "nextAuUserName": "-"
  },
  {
    "orderQty": 2962,
    "orderStatus": "审核完成",
    "status": "APPROVED",
    "currentAuUserName": "-",
    "indicatorsQty": 0,
    "nextAuName": "-",
    "achievingQtyRate": "-",
    "achievingRate": "42",
    "currentAuName": null,
    "id": 1839,
    "orderNo": "QDH1911077905",
    "indicatorsAmout": 565000,
    "orderAmt": 238166.54999999999,
    "createdDate": "2019-11-07 00:01:07",
    "buId": 2094,
    "buName": "YY714",
    "isactive": true,
    "userName": "无锡爱迪",
    "orderPricelist": 454185,
    "nextAuUserName": "-"
  },
  {
    "orderQty": 578,
    "orderStatus": "审核完成",
    "status": "APPROVED",
    "currentAuUserName": "-",
    "indicatorsQty": 0,
    "nextAuName": "-",
    "achievingQtyRate": "-",
    "achievingRate": "120",
    "currentAuName": null,
    "id": 1841,
    "orderNo": "QDH1911077903",
    "indicatorsAmout": 56500,
    "orderAmt": 68035.800000000003,
    "createdDate": "2019-11-07 00:01:07",
    "buId": 2096,
    "buName": "YY773",
    "isactive": true,
    "userName": "无锡尚赛体育",
    "orderPricelist": 125280,
    "nextAuUserName": "-"
  },
  {
    "orderQty": 381,
    "orderStatus": "审核完成",
    "status": "APPROVED",
    "currentAuUserName": "-",
    "indicatorsQty": 0,
    "nextAuName": "-",
    "achievingQtyRate": "-",
    "achievingRate": "90",
    "currentAuName": null,
    "id": 1842,
    "orderNo": "QDH1911077902",
    "indicatorsAmout": 56500,
    "orderAmt": 50607.300000000003,
    "createdDate": "2019-11-07 00:01:07",
    "buId": 2097,
    "buName": "YY801",
    "isactive": true,
    "userName": "镇江云涌",
    "orderPricelist": 99930,
    "nextAuUserName": "-"
  },
  {
    "orderQty": 3196,
    "orderStatus": "审核完成",
    "status": "APPROVED",
    "currentAuUserName": "-",
    "indicatorsQty": 0,
    "nextAuName": "-",
    "achievingQtyRate": "-",
    "achievingRate": "118",
    "currentAuName": null,
    "id": 1843,
    "orderNo": "QDH1911077901",
    "indicatorsAmout": 395500,
    "orderAmt": 467597,
    "createdDate": "2019-11-07 00:01:07",
    "buId": 2098,
    "buName": "YY802",
    "isactive": true,
    "userName": "南京吉睿",
    "orderPricelist": 961976,
    "nextAuUserName": "-"
  },
  {
    "orderQty": 1137,
    "orderStatus": "审核完成",
    "status": "APPROVED",
    "currentAuUserName": "-",
    "indicatorsQty": 0,
    "nextAuName": "-",
    "achievingQtyRate": "-",
    "achievingRate": "108",
    "currentAuName": null,
    "id": 1847,
    "orderNo": "QDH1911077897",
    "indicatorsAmout": 169500,
    "orderAmt": 183813.29999999999,
    "createdDate": "2019-11-07 00:01:07",
    "buId": 2102,
    "buName": "YY855",
    "isactive": true,
    "userName": "常州枫垚",
    "orderPricelist": 346600,
    "nextAuUserName": "-"
  },
  {
    "orderQty": 1921,
    "orderStatus": "审核完成",
    "status": "APPROVED",
    "currentAuUserName": "-",
    "indicatorsQty": 0,
    "nextAuName": "-",
    "achievingQtyRate": "-",
    "achievingRate": "241",
    "currentAuName": null,
    "id": 1852,
    "orderNo": "QDH1911077892",
    "indicatorsAmout": 169500,
    "orderAmt": 408612.39000000001,
    "createdDate": "2019-11-07 00:01:07",
    "buId": 2107,
    "buName": "YY892",
    "isactive": true,
    "userName": "苏州逐风",
    "orderPricelist": 832383,
    "nextAuUserName": "-"
  },
  {
    "orderQty": 2842,
    "orderStatus": "审核完成",
    "status": "APPROVED",
    "currentAuUserName": "-",
    "indicatorsQty": 0,
    "nextAuName": "-",
    "achievingQtyRate": "-",
    "achievingRate": "155",
    "currentAuName": null,
    "id": 1853,
    "orderNo": "QDH1911077891",
    "indicatorsAmout": 226000,
    "orderAmt": 351117.09999999998,
    "createdDate": "2019-11-07 00:01:07",
    "buId": 2108,
    "buName": "YY893",
    "isactive": true,
    "userName": "南京浩康",
    "orderPricelist": 630570,
    "nextAuUserName": "-"
  }  
]
const fields = [
  {
    "fSqlId": 3,
    "sort": true,
    "flex": 1,
    "id": 41,
    "visible": false,
    "formatter": null,
    "field": "id",
    "label": "订单ID",
    "seq": 1
  },
  {
    "fSqlId": 3,
    "sort": true,
    "flex": 1,
    "id": 59,
    "visible": true,
    "formatter": "",
    "field": "userName",
    "label": "经销商",
    "seq": 1
  },
  {
    "fSqlId": 3,
    "sort": true,
    "flex": 1,
    "id": 42,
    "visible": false,
    "formatter": "",
    "field": "orderNo",
    "label": "订单号",
    "seq": 2
  },
  {
    "fSqlId": 3,
    "sort": true,
    "flex": 1,
    "id": 43,
    "visible": true,
    "formatter": "filterImage",
    "field": "status",
    "label": "订单状态",
    "seq": 3
  },
  {
    "fSqlId": 3,
    "sort": true,
    "flex": 1,
    "id": 44,
    "visible": false,
    "formatter": "",
    "field": "orderStatus",
    "label": "订单状态",
    "seq": 4
  },
  {
    "fSqlId": 3,
    "sort": true,
    "flex": 1,
    "id": 45,
    "visible": false,
    "formatter": null,
    "field": "statusProcess",
    "label": "状态进度",
    "seq": 5
  },
  {
    "fSqlId": 3,
    "sort": true,
    "flex": 1,
    "id": 46,
    "visible": false,
    "formatter": null,
    "field": "canEdit",
    "label": "可编辑",
    "seq": 6
  },
  {
    "fSqlId": 3,
    "sort": true,
    "flex": 1,
    "id": 47,
    "visible": false,
    "formatter": null,
    "field": "canSubmit",
    "label": "可提交",
    "seq": 7
  },
  {
    "fSqlId": 3,
    "sort": true,
    "flex": 1,
    "id": 48,
    "visible": true,
    "formatter": "filterMoney",
    "field": "indicatorsAmout",
    "label": "指标(含税)",
    "seq": 8
  },
  {
    "fSqlId": 3,
    "sort": true,
    "flex": 1,
    "id": 49,
    "visible": true,
    "formatter": "filterRate",
    "field": "achievingRate",
    "label": "达成率",
    "seq": 9
  },
  {
    "fSqlId": 3,
    "sort": true,
    "flex": 1,
    "id": 50,
    "visible": true,
    "formatter": "filterNumber",
    "field": "orderQty",
    "label": "订量",
    "seq": 10
  },
  {
    "fSqlId": 3,
    "sort": true,
    "flex": 1,
    "id": 51,
    "visible": false,
    "formatter": "filterMoney",
    "field": "orderPricelist",
    "label": "订单金额",
    "seq": 11
  },
  {
    "fSqlId": 3,
    "sort": true,
    "flex": 1,
    "id": 52,
    "visible": true,
    "formatter": "filterMoney",
    "field": "orderAmt",
    "label": "结算金额",
    "seq": 12
  },
  {
    "fSqlId": 3,
    "sort": true,
    "flex": 1,
    "id": 53,
    "visible": false,
    "formatter": "",
    "field": "nextAuName",
    "label": "下级审批人账户",
    "seq": 13
  },
  {
    "fSqlId": 3,
    "sort": true,
    "flex": 1,
    "id": 54,
    "visible": false,
    "formatter": null,
    "field": "nextAuUserName",
    "label": "下级审批人",
    "seq": 14
  },
  {
    "fSqlId": 3,
    "sort": true,
    "flex": 1,
    "id": 55,
    "visible": false,
    "formatter": "",
    "field": "currentAuName",
    "label": "当前审批人账户",
    "seq": 15
  },
  {
    "fSqlId": 3,
    "sort": true,
    "flex": 1,
    "id": 56,
    "visible": true,
    "formatter": "",
    "field": "currentAuUserName",
    "label": "当前审批人",
    "seq": 16
  },
  {
    "fSqlId": 3,
    "sort": true,
    "flex": 1,
    "id": 57,
    "visible": false,
    "formatter": null,
    "field": "buId",
    "label": "用户ID",
    "seq": 17
  },
  {
    "fSqlId": 3,
    "sort": true,
    "flex": 1,
    "id": 58,
    "visible": false,
    "formatter": null,
    "field": "buName",
    "label": "用户账户",
    "seq": 18
  }
] 
Page({
  data: {
    active: 1, // 当前选中的tab下标
    tabs: [
      {
        scrollTop: 0,
        pageNo: 1,
        loadDone: false,
        loadText: '加载中...',
        label: '全部',
        value: 0
      }, {
        scrollTop: 0,
        pageNo: 1,
        showCtrl: false,
        loadDone: false,
        loadText: '加载中...',
        label: '待审核',
        value: 1,
        checkedId: null // 单选按钮选中的id
      }, {
        scrollTop: 0,
        pageNo: 1,
        showCtrl: false,
        loadDone: false,
        loadText: '加载中...',
        label: '已审核',
        value: 1,
        checkedId: null
      }
    ],
    orderList_all: {
      summary: {
        "foName": "尤尼克斯2020年第一季度产品订货会",
        "totalPricelist": 13093284,
        "approvedDate": null,
        "totalQty": 64298,
        "surname": "黄",
        "status": false,
        "totalAmt": 6723163.0599999987,
        "name": "晨",
        "logo": "http:\/\/101.132.156.18:8080\/resource\/fOrder\/1\/logo.jpg"
      },
      resultList: [],
      fields: []
    },
    orderList_wait: {
      summary: {},
      resultList: [],
      fields: []
    },
    orderList_ed: {
      summary: {},
      resultList: [],
      fields: []
    },
  },
  onLoad () {
  },
  onShow () {
    /* if (app.isLogin() || typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        tabList: app.getValue('tabList'),
        selected: 2
      })
    } */
    this.getList()
  },
  /**
   * TODO 上拉加载
   */
  onReachBottom () {
    if (this.data.tabs[this.data.active].loadDone) return
    let keyPageNum = `tabs[${this.data.active}].pageNo`
    this.setData({
      [keyPageNum]: this.data.tabs[this.data.active].pageNo + 1
    })
    this.getList()
  },
  /**
   * @param dataType WAIT_APPROVE/IN_APPROVE/APPROVED，空值或不传值显示全部
   */
  getList () {
    let objKey = 'orderList_'
    switch (this.data.active) {
      case 1:
        objKey += 'wait'
        break
      case 2:
        objKey += 'ed'
        break
      default:
        objKey += 'all'
    }
    const types = ['', 'WAIT_APPROVE', 'APPROVED']
    const pageNo = this.data.tabs[this.data.active].pageNo
    const paramData = {
      url: config.getApprovalOrderList,
      params: {
        pageNo: pageNo,
        dataType: types[this.data.active]
      }
    }
    app.nGet(paramData).then(({data}) => {
      let { resultList, pageSize } = data
      let loadDoneKey = `tabs[${this.data.active}].loadDone`
      let textKey = `tabs[${this.data.active}].loadText`
      if (pageNo === 1) {
        this.setData({
          [objKey]: data
        })
      } else {
        let orderListKey = `${objKey}.resultList`
        this.data[objKey].resultList.push(...resultList)
        this.setData({
          [orderListKey]: this.data[objKey].resultList
        })
      }
      this.setData({
        [loadDoneKey]: resultList.length < pageSize,
        [textKey]: resultList.length < pageSize ? '暂无更多数据' : '加载中...'
      })
    }).catch(err => {
      let loadDoneKey = `tabs[${this.data.active}].loadDone`
      let textKey = `tabs[${this.data.active}].loadText`
      this.setData({
        [loadDoneKey]: true,
        [textKey]: '加载失败'
      })
    })
  },
  tabChange(e) {
    const query = wx.createSelectorQuery(),
      index = this.data.active  // 获取切换前的tab下标
    query.selectViewport().scrollOffset(res => {
      // console.log(res)
      const key = `tabs[${index}].scrollTop`
      this.setData({ [key]: res.scrollTop })  // 保存切换前页面滚动高度
    }).exec()
    let active = e.detail.index
    this.setData({ active });
    wx.pageScrollTo({ // 跳转到之前保留的滚动位置
      scrollTop: this.data.tabs[active].scrollTop,
      duration: 0
    })
    if (active === 0 && this.data.orderList_all.resultList.length === 0) {
      this.getList()
    }
    if (active === 1 && this.data.orderList_wait.resultList.length === 0) {
      this.getList()
    } else if (active === 2 && this.data.orderList_ed.resultList.length === 0) {
      this.getList()
    }
  },
  radioChange (e) {
    if (e.detail) {
      const ctrlKey = `tabs[${this.data.active}].showCtrl`
      const checkKey = `tabs[${this.data.active}].checkedId`
      this.setData({
        [ctrlKey]: true,
        [checkKey]: e.detail
      })
    }
  },
  /**
   * TODO 驳回订单
   */
  rejectOrder (e) {
    const params = {
      url: config.rejectOrder,
      params: {
        // orderIds: JSON.stringify([parseInt(this.data.tabs[this.data.active].checkedId)]),
        orderId: parseInt(this.data.tabs[this.data.active].checkedId),
        rejectMsg: ''
      }
    }
    app.nPost(params).then(res => {
      // console.log(res)
      let list = this.data.orderList_wait.resultList
      let index = this.data.tabs[this.data.active].checkedId.split(',')[1]
      list.splice(index, 1)
      this.setData({
        'orderList_wait.resultList': list
      })
    })
  },
  /**
   * TODO 提交订单
   */
  passOrder (e) {
    const params = {
      url: config.approveOrder,
      params: {
        // orderIds: JSON.stringify([parseInt(this.data.tabs[this.data.active].checkedId)])
        orderId: parseInt(this.data.tabs[this.data.active].checkedId)
      }
    }
    app.nPost(params).then(res => {
      // console.log(res)
      let list = this.data.orderList_wait.resultList
      let index = this.data.tabs[this.data.active].checkedId.split(',')[1]
      list.splice(index, 1)
      this.setData({
        'orderList_wait.resultList': list
      })
    })
  },
  /**
   * TODO 反提交
   */
  unPassOrder (e) {
    const params = {
      url: config.unsubmit,
      params: {
        // orderIds: JSON.stringify([parseInt(this.data.tabs[this.data.active].checkedId)])
        orderId: parseInt(this.data.tabs[this.data.active].checkedId)
      }
    }
    app.nPost(params).then(res => {
      // console.log(res)
      let list = this.data.orderList_ed.resultList
      let index = this.data.tabs[this.data.active].checkedId.split(',')[1]
      list.splice(index, 1)
      this.setData({
        'orderList_wait.resultList': list
      })
    })
  },
  // cellTap (e) {
  //   console.log(e)
  //   // wx.navigateTo({
  //   //   // url: '/pages/orderDetailList/index?orderType=' + '03' + '&orderID=' + e.currentTarget.dataset.data.orderId,
  //   //   url: `/pages/orderDetailList/index?orderType=03&orderID=${e.detail}`,
  //   // });
  // }
})
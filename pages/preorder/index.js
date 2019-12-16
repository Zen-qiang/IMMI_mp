// pages/orderList/index.js
const app = getApp();
import config from '../../config.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    size: 20,
    list: [],
    loadDone: false,
    loadText: '正在加载',
    active: 0,
    tabs: [
      {
        scrollTop: 0,
        label: '未读',
        value: 0
      }, {
        scrollTop: 0,
        label: '已读',
        value: 1
      }, {
        scrollTop: 0,
        label: '全部',
        value: 2
      }
    ],
    showDetail: false, // 是否显示详情
    detailImage: '',
    detailArr: [], // 当前详情color数组
    preorderInfo: {}, // 储存请求过的详情
  },

  onLoad: function () {
    this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.loadDone) return
    this.setData({
      page: this.data.page + 1
    })
    this.getList()
  },
  /**
   * TODO 顶部tab切换
   * @param {e} e 
   */
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
  },
  itemClick (e) {
    // console.log(e.detail)
    const { stylename, image, id } = e.detail
    this.setData({
      showDetail: true,
      detailImage: image
    })
    if(this.data.preorderInfo[stylename]) {
      this.setData({
        detailArr: this.data.preorderInfo[stylename]
      })
      return // 如果请求多就不再发送请求
    }
    this.readNotice(id, stylename)
  },
  itemClose () {
    this.setData({
      showDetail: false
    })
  },
  /**
   * TODO 获取
   */
  getList () {
    let params = {
      url: config.getArrivalNoticeList,
      params: {
        page: this.data.page,
        size: this.data.size
      }
    }
    app.nGet(params).then(({data}) => {
      if (data && data.list) {
        const {page, pages, list: resList} = data
        let list = resList
        if (this.data.page !== 1) {
          list = [this.data.list, ...list]
        }
        this.setData({
          list,
          loadDone: page >= pages || !resList.length,
          loadText: page >= pages || !resList.length ? '暂无数据' : '正在加载'
        })
      } else {
        this.setData({
          loadDone: true,
          loadText: '获取失败'
        })
      }
    }).catch(err => {
      console.log(err)
      this.setData({
        loadDone: true,
        loadText: '获取失败'
      })
    })
  },
  /**
   * 读取到货通知
   */
  readNotice (id, stylename) {
    if (this.data.queryResultTips) { // 清空上次请求结果提示消息
      this.setData({queryResultTips: ''})
    }
    let params = {
      url: config.getArrivalNotice,
      params: {
        userId: id,
        stylename: stylename
      }
    }
    app.nGet(params).then(({ data }) => {
      // console.log(data)
      const index = this.data.list.findIndex(item => item.stylename === item.stylename)
      if (index !== -1) {
        const key = `list[${index}].isRead`
        // 设置为已读
        this.setData({
          [key]: 1
        })
      }
      const key = `preorderInfo.${stylename}`
      this.setData({
        [key]: data,
        detailArr: data
      })
      if (!data.length) {
        this.setData({
          queryResultTips: '暂无数据'
        })
      }
    }).catch(err => {
      console.log(err)
      this.setData({
        queryResultTips: '加载失败！'
      })
    })
  }
})

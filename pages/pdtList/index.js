// pages/pdtList/index.js
const app = getApp();
import config from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    search: '',
    attrIdList: [],
    categoryId: '',
    page: 1,
    size: 20,
    total: 0,
    list: [],
    loadMore: { // 加载信息
      title: '正在加载',
      loadDone: false
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      type: options.type || '',
      search: options.search || '',
      attrIdList: options.attrIdList && options.attrIdList.split(',') || [],
      categoryId: options?.categoryId ?? ''
    })
    let title = ''
    switch (this.data.type) {
      case '1':
        title = '当季新品'
        break
      case '2':
        title = '过季商品'
        break
      case '3':
        title = '预订商品'
          break
    }
    title && wx.setNavigationBarTitle({title})
    this.getList()
  },

  getList () {
    let url = '',
      type = '',
      params = {
        page: this.data.page,
        size: this.data.size,
        categoryId: this.data.categoryId
      }
    switch (this.data.type) {
      case '1':
        url = config.timeGoods
        params = {
          type: 'in_season',
          ...params
        }
        break
      case '2':
        url = config.timeGoods
        params = {
          type: 'out_dated',
          ...params
        }
        break
      case '3':
        url = config.indexNewPdtQuery
        params = {
          search: this.data.search,
          attrIdList: JSON.stringify(this.data.attrIdList),
          isReserve: true,
          ...params
        }
        break
      default:
        url = config.indexNewPdtQuery
        params = {
          search: this.data.search,
          attrIdList: JSON.stringify(this.data.attrIdList),
          ...params
        }
    }

    app.nGet({url, params}).then(({data}) => {
      if (data && data.list) {
        const { total, list, page, pages } = data
        if (this.data.page === 1) {
          this.setData({
            total,
            list,
            'loadMore.title': Number(page) >= Number(pages) || !list.length ? '暂无数据' : '正在加载',
            'loadMore.loadDone': Number(page) >= Number(pages) || !list.length
          })
        } else {
          let loadlist = [...this.data.list, ...list]
          this.setData({
            total,
            list: loadlist,
            'loadMore.title': Number(page) >= Number(pages) || !list.length ? '暂无数据' : '正在加载',
            'loadMore.loadDone': Number(page) >= Number(pages) || !list.length
          })
        }
      } else {
        this.setData({
          'loadMore.title': '暂无数据',
          'loadMore.loadDone': true
        })
      }
    }).catch(err => {
      this.setData({
        'loadMore.title': '获取失败',
        'loadMore.loadDone': true
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.loadMore.loadDone) return
    this.setData({
      page: this.data.page + 1
    })
    this.getList()
  }
})
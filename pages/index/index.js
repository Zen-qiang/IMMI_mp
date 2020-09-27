//index.js
//获取应用实例
const app = getApp();
import config from '../../config.js';
var WxParse = require('../../common/lib/wxParse/wxParse.js');


Page({
  data: {
    selectedId: 'new',
    carouselList: [], // 幻灯片列表
    recommendInfo: { // 今日新品 推荐商品列表信息
      page: 1,
      size: 30,
      pages: 0,
      total: 0,
      list: []
    },
    accountInfo: "",
    newLoadMore: { // 今日新品 加载信息
      title: "",
      loadDone: false
    },
    inputValue: '',
    categoryList: [], // 分类列表
    allInfo: { // 全部 商品列表信息
      page: 1,
      size: 30,
      pages: 0,
      total: 0,
      list: []
    },
    allLoadMore: { //全部 加载信息
      title: "",
      loadDone: false
    },
    attrsList: [], // 筛选 属性list
    home_new: "",
    home_top: "",
    home_title: '',
    active: 0,
    tabList: [
      { label: '首页', value: 0, scrollTop: 0 },
      { label: '全部', value: 1, scrollTop: 0 },
      { label: '筛选', value: 2, scrollTop: 0 }
    ]
  },

  onLoad: function() {
    // this.getCarouselList();
    // this.getCategory();
    // this.getPdtList({})
    // this.getFilterList()
    // this.getAccountInfo();
    // this.getLayout();
    // this.getPdtList({
    //   recommend: true
    // });
    /* this.getCarouselList();
    this.getCategory();
    this.getPdtList({ recommend: true })
    this.getAccountInfo();
    this.getLayout(); */
  },

  onHide: function() {
    wx.removeStorage({
      key: 'selectedFilterItem'
    })
  },

  onShow: function() {
    /* if (app.isLogin() || typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        tabList: app.getValue('tabList'),
        selected: 0
      })
    } */
    // this.setData({
    //   active: 0
    // });
    this.getCarouselList();
    this.getCategory();
    this.data.active === 0 ? this.getPdtList({ recommend: true }) : this.getPdtList({})
    this.getAccountInfo();
    this.getLayout();
  },
  tabChange (e) {
    const query = wx.createSelectorQuery(),
      index = this.data.active  // 获取切换前的tab下标
    query.selectViewport().scrollOffset(res => {
      // console.log(res)
      const key = `tabList[${index}].scrollTop`
      this.setData({[key]: res.scrollTop})  // 保存切换前页面滚动高度
    }).exec()
    let active = e.detail.index
    this.setData({active});
    wx.pageScrollTo({ // 跳转到之前保留的滚动位置
      scrollTop: this.data.tabList[active].scrollTop,
      duration: 0
    })
    if (active === 1 && this.data.allInfo.list.length === 0) {
      this.getCategory();
      this.getPdtList({});
    } else if (active === 2 && this.data.attrsList.length === 0) {
      this.getFilterList();
    }
  },
  /**
   * tab切换
   */
  handleTabChange(e) {
    // console.log(e)
    let active = e.detail.index
    this.setData({
      active: active
    });
    if (active === 1 && this.data.allInfo.list.length === 0) {
      this.getCategory();
      this.getPdtList({});
    } else if (active === 2 && this.data.attrsList.length === 0) {      
      this.getFilterList();
    }
  },
  /**
   * 获取首页幻灯片
   */
  getCarouselList() {
    var data = {
      url: config.indexCarouselQuery,
      params: {}
    }
    app.nGet(data).then(data => {
      if (data.data && data.data.list) {
        this.setData({
          carouselList: data.data.list,
        });
      }
    }, res => {
      // console.error(res);
    });
  },
/* 获取用户信息 */
  getAccountInfo() {
    let that = this;
    var data = {
      url: config.getAccountInfo,
      params: {}
    }
    app.nGet(data).then(data => {
      // console.log(data)
      this.setData({
        accountInfo: data.data
      });
      let webContent = data.data ? data.data : '';
      WxParse.wxParse('webContent', 'html', webContent, that, 0);
      // console.log(data.data,22)
    }, res => {});
  },

  getLayout() {
    var data = {
      url: config.getLayout,
      params: {}
    }
    app.nGet(data).then(data => {
      // console.log(data);
      this.setData({
        home_new: data.data.new,
        home_top: data.data.top,
        home_title: data.data.indexTtile
      });
    }, res => {});
  },

  homeShowModel(e) {
    wx.navigateTo({
      url: `/pages/pdtList/index?type=${e.currentTarget.dataset.type}`,
    });

  },
  // 跳转到预定商品页面
  _toReserve () {
    wx.navigateTo({
      url: `/subPackages/reserve/pages/index/index`
    })
  },
  /**
   * 获取最新商品列表
   * loadmore 是否上拉加载请求
   */
  getPdtList(params, loadmore) {
    let active = this.data.active
    var data = {
      url: config.indexNewPdtQuery,
      params: {
        ...params,
        page: active === 0 ? this.data.recommendInfo.page : this.data.allInfo.page,
        size: active === 0 ? this.data.recommendInfo.size : this.data.allInfo.size
      }
    }
    app.nGet(data).then(({ data }) => {
      if (data && data.list) {
        switch (active) {
          case 0:
            this.setData({
              'newLoadMore.loadDone': this.data.recommendInfo.size > data.list.length
            })
            if (this.data.recommendInfo.page === 1) {
              this.setData({
                recommendInfo: data
              })
            } else {
              const list = [...this.data.recommendInfo.list, ...data.list]
              this.setData({
                'recommendInfo.list': list
              })
            }
            break
          case 1:
            this.setData({
              'allLoadMore.loadDone': this.data.allInfo.size > data.list.length
            })
            if (this.data.allInfo.page === 1) {
              this.setData({
                allInfo: data
              })
            } else {
              const list = [...this.data.allInfo.list, ...data.list]
              this.setData({
                'allInfo.list': list
              })
            }
            break
        }
      } else {
        switch (active) {
          case 0:
            this.setData({
              'newLoadMore.loadDone': true,
              'newLoadMore.title': '没有更多数据啦'
            })
            break
          case 1:
            this.setData({
              'allLoadMore.loadDone': true,
              'allLoadMore.title': '没有更多数据啦'
            })
            break
        }
      }
    }).catch(err => {
      switch (active) {
        case 0:
          this.setData({
            'newLoadMore.loadDone': true,
            'newLoadMore.title': '加载失败'
          })
          break
        case 1:
          this.setData({
            'allLoadMore.loadDone': true,
            'allLoadMore.title': '加载失败'
          })
          break
      }
    })
  },
  /**
   * 获取商品分类列表
   */
  getCategory() {
    var data = {
      url: config.indexCategoryQuery,
      params: {}
    }
    app.nGet(data).then(data => {
      // console.log(data)
      if (data.data) {
        this.setData({
          categoryList: data.data,
        });

      }
    }, res => {
      // console.error(res);
    });
  },
  /**
   * 获取筛选列表
   */
  getFilterList() {
    var data = {
      url: config.indexFilterQuery,
      params: {}
    }
    app.nGet(data).then(data => {
      if (data.data) {
        this.setData({
          attrsList: data.data,
        });
      }
    }, res => {
      // console.error(res);
    });
  },
  searchChange(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  searchDone(e) {
    let search = e.detail.value;
    if (search) {
      wx.navigateTo({
        url: `/pages/pdtList/index?search=${search}`,
      });
    }
  },
  jumpToSearch() {
    wx.navigateTo({
      url: '/pages/searchPage/index',
    })
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
    let active = this.data.active
    switch (active) {
      case 0:
        if (this.data.newLoadMore.loadDone) return
        this.setData({
          'recommendInfo.page': Number(this.data.recommendInfo.page) + 1
        })
        this.getPdtList({ recommend: true })
        break
      case 1:
        if (this.data.allLoadMore.loadDone) return
        this.setData({
          'allInfo.page': Number(this.data.allInfo.page) + 1
        })
        this.getPdtList({})
        break
    }
  }
})
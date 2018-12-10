//index.js
//获取应用实例
const app = getApp();
import config from '../../config.js';

Page({
  data: {
    tab: {
      list: [
        {
          id: 'new',
          title: '今日新品'
        },
        {
          id: 'all',
          title: '全部'
        },
        {
          id: 'filter',
          title: '筛选'
        }
      ]
    },
    selectedId: 'new',
    carouselList: [], // 幻灯片列表
    recommendInfo: { // 今日新品 推荐商品列表信息
      page: 1,
      size: 6,
      pages: 0,
      total: 0,
      list:[]
    }, 
    newLoadMore: {// 今日新品 加载信息
      title: "",
      isLoad: false
    },
    inputValue: '',
    categoryList: [], // 分类列表
    allInfo: { // 全部 商品列表信息
      page: 1,
      size: 9,
      pages: 0,
      total: 0,
      list: []
    },
    allLoadMore: {//全部 加载信息
      title: "",
      isLoad: false
    },
    attrsList: [] // 筛选 属性list
  },

  onLoad: function () {
    this.getCarouselList();
    this.getPdtList({ recommend: true});
  },
  onHide: function() {
    wx.removeStorage({
      key: 'selectedFilterItem'
    })
  },
  /**
   * tab切换
   */
  handleTabChange(e) {
    let selectedId = e.detail;
    this.setData({
      selectedId: selectedId
    });
    if (selectedId === 'all' && this.data.allInfo.list.length === 0) {
      this.getCategory();
      this.getPdtList({});
    } else if (selectedId === 'filter' && this.data.attrsList.length === 0) {
      this.getFilterList();
    }
  },
  /**
   * 获取首页幻灯片
   */
  getCarouselList() {
    var data = {
      url: config.indexCarouselQuery,
      params: {
      }
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
  /**
   * 获取最新商品列表
   * loadmore 是否上拉加载请求
   */
  getPdtList(params, loadmore) {
    let selectedId = this.data.selectedId;
    var data = {
      url: config.indexNewPdtQuery,
      params: {
        ...params,
        page: selectedId === 'new' ? this.data.recommendInfo.page : this.data.allInfo.page,
        size: selectedId === 'new' ? this.data.recommendInfo.size : this.data.allInfo.size
      }
    }
    app.nGet(data).then(data => {
      if (data.data && data.data.list) {
        if (!loadmore) {
          if (selectedId === 'new') {
            this.setData({
              recommendInfo: data.data,
            });
          } else if (selectedId === 'all') {
            this.setData({
              allInfo: data.data,
            });
          }
        } else {
          if (selectedId === 'new') { 
            let list = [...this.data.recommendInfo.list, ...data.data.list];
            this.setData(
              {
                ["newLoadMore.isLoad"]: false,
                ["recommendInfo.page"]: data.data.page,
                ["recommendInfo.size"]: data.data.size,
                ["recommendInfo.total"]: data.data.total,
                ["recommendInfo.pages"]: data.data.pages,
                ["recommendInfo.list"]: list,
              }
            );
          } else if (selectedId === 'all') {
            let list = [...this.data.allInfo.list, ...data.data.list];
            this.setData(
              {
                ["allLoadMore.isLoad"]: false,
                ["allInfo.page"]: data.data.page,
                ["allInfo.size"]: data.data.size,
                ["allInfo.total"]: data.data.total,
                ["allInfo.pages"]: data.data.pages,
                ["allInfo.list"]: list,
              }
            );
          }
        }
      }
    }, res => {
      if (selectedId === 'new') { 
        this.setData(
          {
            ["newLoadMore.isLoad"]: false
          }
        );
      } else if (selectedId === 'all') { 
        this.setData(
          {
            ["allLoadMore.isLoad"]: false
          }
        );
      }
      // console.error(res);
    });
  },
  /**
   * 获取商品分类列表
   */
  getCategory() {
    var data = {
      url: config.indexCategoryQuery,
      params: {
      }
    }
    app.nGet(data).then(data => {
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
      params: {
      }
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
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    wx.hideNavigationBarLoading();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let selectedId = this.data.selectedId;
    if (selectedId === 'new') {
      if (Number(this.data.recommendInfo.page) < Number(this.data.recommendInfo.pages)) {
        this.setData({
          ["newLoadMore.isLoad"]: true,
          ["recommendInfo.page"]: Number(this.data.recommendInfo.page) + 1,
        });
        this.getPdtList({ recommend: true}, 'loadmore');
      } else {
        this.setData({
          ["newLoadMore.title"]: '没有更多数据啦'
        });
      }
    } else if (selectedId === 'all') {
      if (Number(this.data.allInfo.page) < Number(this.data.allInfo.pages)) {
        this.setData({
          ["allLoadMore.isLoad"]: true,
          ["allInfo.page"]: Number(this.data.allInfo.page) + 1,
        });
        this.getPdtList({}, 'loadmore');
      } else {
        this.setData({
          ["allLoadMore.title"]: '没有更多数据啦'
        });
      }
    } else {
      return;
    }
  }
})

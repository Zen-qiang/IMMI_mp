// pages/orderList/index.js
const app = getApp();
import config from '../../config.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    ordersData: {},
    showType: {
      from: 'cart',
      orderType: 'backOrder',
      isHero: true
    },
    loadDone: false,
    title: '',
    showSelectView1: false,
    showSelectView2: false,
    attrsList: [], // 筛选数据
    attrIdList: [], // 选择的筛选数据
    sortText: '默认排序', // 排序结果 ，保存用于接口请求
    orderBy: "", // QTY（定量） | AMT（金额） ，保存用于接口请求
    sort: "", // DESC（倒叙） | ASC（正序） ，保存用于接口请求
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.prepareData(); // 加载页面数据
    this.getFilterList();
  },

  onHide: function() {
    // wx.removeStorage({
    //   key: 'heroSelectedFilterItem'
    // })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.loadDone) {
      this.prepareData();
    }
  },

  selectActive: function(e) {
    this.setData({
      showSelectView1: e.detail.showModal1,
      showSelectView2: e.detail.showModal2
    });
    this.selectComponent("#popup").setMaskTop();
  },

  /**
   * 点击排序列表
   */
  sortAction: function(e) {
    console.log(e.currentTarget.dataset.param);
    let _sortText = "";
    let _orderBy = "";
    let _sort = ""
    if (e.currentTarget.dataset.param == 0) {
      _sortText = "默认排序";
    } else if (e.currentTarget.dataset.param == 1) {
      _sortText = "定量从高到低";
      _orderBy = "QTY";
      _sort = "DESC"
    } else if (e.currentTarget.dataset.param == 2) {
      _sortText = "定量从低到高";
      _orderBy = "QTY";
      _sort = "ASC"
    } else if (e.currentTarget.dataset.param == 3) {
      _sortText = "金额从高到低";
      _orderBy = "AMT";
      _sort = "DESC"
    } else if (e.currentTarget.dataset.param == 4) {
      _sortText = "金额从低到高";
      _orderBy = "AMT";
      _sort = "ASC"
    }
    this.setData({
      sortText: _sortText,
      orderBy: _orderBy,
      sort: _sort,
      ordersData: {},
    });
    this.selectComponent("#popup").hideModal();
    this.prepareData();
  },

  //--------筛选组件 ------

  cancel: function(e) {
    this.selectComponent("#popup").hideModal();
  },

  /**
   * 点击筛选条件
   */
  selectFilter: function(e) {
    // e.detail.filterList;
    this.selectComponent("#popup").hideModal();
    this.setData({
      ordersData: {},
      attrIdList: e.detail.filterList,
    });
    this.prepareData();
  },

  //--------搜索框-------

  searchDone(e) {
    let search = e.detail.searchText;
    this.setData({
      ordersData: {},
      inputValue: search
    });
    this.prepareData();
  },

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

    var paramData = {
      url: config.searchB2bProductTopList,
      params: {
        search: this.data.inputValue,
        orderBy: this.data.orderBy,
        sort: this.data.sort,
        attrIdList: this.data.attrIdList,
        size: 8,
        page: page,
      }
    };

    app.nGet(paramData).then(ret => {
      if (ret.data) {
        if (ret.data.page >= ret.data.pages) {
          this.setData({
            loadDone: true,
          });
        }
        if (ret.data.page === 1 && ret.data.list && ret.data.list.length === 0) {
          // console.log('@@@@@' + this.data.loadDone);
          this.setData({
            title: '暂无数据'
          });
          // console.log('@@@@@' + this.data.title);
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


})
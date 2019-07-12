const app = getApp();
import config from '../../config.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    contactsData: [],
    type: null
  },
  onLoad (option) {
    this.setData({type: option.type})
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.preparePageData();
  },

  //===============================

  /** 设置默认 */
  isDefaultAction: function(e) {
    // console.log(JSON.stringify(e.detail));
  },

  /** 编辑 */
  editAction: function(e) {
    wx.navigateTo({
      url: '/pages/contactsUpdate/index?addressId=' + e.detail.addressId,
    });
  },

  /** 删除 */
  delAction: function(e) {
    // console.log(JSON.stringify(e.detail));

    var paramData = {
      url: config.addressDelete,
      params: {
        addressId: e.detail.addressId
      }
    };
    app.nPost(paramData).then(ret => {
      app.showMsgSuccess("删除成功", 2);
      this.preparePageData();
    }, res => {
      // console.error(JSON.stringify(res));
    });
  },

  /** 新增联系人 */
  addAddressAction: function() {
    wx.navigateTo({
      url: '/pages/contactsUpdate/index',
    });
  },

  //===============================

  /** 加载数据 */
  preparePageData() {
    var data = {
      url: config.addressList,
      params: {
        type: this.data.type
      }
    };
    app.nGet(data).then(ret => {
      if (ret.data) {
        if (ret.data) {
          this.setData({
            contactsData: ret.data
          });
        }
        // console.log(JSON.stringify(ret.data));
      }
    }, res => {
      // console.error(JSON.stringify(res));
    });
  },

})
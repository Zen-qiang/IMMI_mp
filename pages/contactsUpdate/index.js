// pages/contactsUpdate/index.js
const app = getApp();
import config from '../../config.js';
var Check = require('../../utils/check.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    consignee: "", // 联系人
    phone: "", // 手机号码
    province: "", // 省
    city: "", // 市
    district: "", // 区
    detail: "", // 详细地址
    full_address: "", // 全地址
    region: ['省', '市', '区'], // 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var addressId = options.addressId;
    if (addressId && addressId.length > 0) { // 修改地址
      this.preparePageData(addressId);
      // console.log("编辑收货地址");
      wx.setNavigationBarTitle({
        title: '编辑收货地址',
      });
    } else {
      // console.log("新增地址");
      wx.setNavigationBarTitle({
        title: '新增收货地址',
      });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * input 绑定事件
   */
  inputChange: function(e) {

    switch (e.target.dataset.type) {
      case "01":
        this.setData({
          consignee: e.detail.value
        });
        break;
      case "02":
        this.setData({
          phone: e.detail.value
        });
        break;
      case "03":
        this.setData({
          detail: e.detail.value,
          full_address: this.data.province + this.data.city + this.data.district + e.detail.value, // 全地址
        });
        break;
    }
  },

  /**
   * Picker 绑定事件
   */
  bindRegionChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      province: e.detail.value[0], // 省
      city: e.detail.value[1], // 市
      district: e.detail.value[2], // 区
      full_address: e.detail.value.join('') + this.data.detail, // 全地址
    })
  },

  /**
   * 保存按钮事件
   */
  addAddressAction: function() {
    // 校验
    if (!Check.isName(this.data.consignee, 20, "收货人姓名")) {
      return;
    } else if (!Check.isPhoneNo(this.data.phone, '手机号码')) {
      return;
    } else if (this.data.province.length == 0) {
      app.showMsg('选择省市区', 2);
      return;
    } else if (!Check.isAddress(this.data.detail, 50, '详细地址')) {
      return;
    }
    // 保存
    this.saveContactsData();
  },

  /** 加载数据 */
  preparePageData(addressId) {
    var data = {
      url: config.addressGet,
      params: {
        addressId: addressId,
      }
    };
    app.nGet(data).then(ret => {
      if (ret.data) {
        this.setData({
          id: ret.data.id,
          consignee: ret.data.consignee,
          phone: ret.data.phone,
          province: ret.data.province,
          city: ret.data.city,
          district: ret.data.district,
          detail: ret.data.detail,
          region: [ret.data.province, ret.data.city, ret.data.district],
        });
        // console.log(JSON.stringify(ret.data));
      }
    }, res => {
      // console.error(JSON.stringify(res));
    });
  },

  /** 保存数据 */
  saveContactsData() {
    var data = {
      url: config.addressCreate,
      params: {
        id: this.data.id || "",
        consignee: this.data.consignee,
        phone: this.data.phone,
        province: this.data.province,
        city: this.data.city,
        district: this.data.district,
        detail: this.data.detail,
        fullAddress: this.data.full_address,
        qUserId: app.getValue("uid"),
      }
    };
    app.nPost(data).then(ret => {
      app.showMsgSuccess('保存成功', 2);
      wx.navigateBack({
        delta: 1,
      });
    }, res => {
      // console.error(JSON.stringify(res));
    });
  },

})
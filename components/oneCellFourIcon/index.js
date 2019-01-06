// components/oneCellFourIcon/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpUrl: function(e) {
      let item = e.currentTarget.dataset.item;
      let attrIdList = [item.attrId];
      wx.navigateTo({
        url: `/pages/pdtList/index?attrIdList=${attrIdList}`
      });
    }
  }
})

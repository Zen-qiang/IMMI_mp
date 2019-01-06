// components/oneCellTwoPdt/index.js
var app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal, changedPath) {
        let showtype = app.getValue('productMode');
        this.setData({
          showName: showtype || 'styleName'
        });
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showName: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpUrl(e) {
      console.log(e);
      let item = e.currentTarget.dataset.item;
      if (item && item.productId) {
        wx.navigateTo({
          url: `/pages/pdtInfo/index?productId=${item.productId}`,
        });
      };
    }
  }
})

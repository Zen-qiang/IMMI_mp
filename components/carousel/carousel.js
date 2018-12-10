// components/carousel.js
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
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpUrl(e) {
      let item = e.currentTarget.dataset.item;
      if (item && item.target && item.type === 'href') {
        wx.navigateTo({
          url: `/pages/webview/index?url=${item.target}`
        });
      } else if (item && item.target && item.type === 'pdt') {
        wx.navigateTo({
          url: `/pages/pdtInfo/index?productId=${item.target}`

        });
      } else if (item && item.target && item.type === 'filter') {
        let target = [item.target];
        wx.navigateTo({
          url: `/pages/pdtList/index?attrIdList=${target}`
        });
      }
    }
  }
})

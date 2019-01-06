// components/filterItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    datas: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedFilter: {}
  },
  ready() {
    let selectedFilter = wx.getStorageSync('selectedFilterItem');
    if (selectedFilter) {
      this.setData({
        selectedFilter: JSON.parse(selectedFilter)
      });
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handlePdtList(e) {
      let item = e.currentTarget.dataset.item;
      if (item && item.attrId) {
        let selectedFilter = this.data.selectedFilter;
        let selectedKey = selectedFilter[item.attrId]; // 是否已经选中
        if (selectedKey) {
          delete selectedFilter[item.attrId];
        } else {
          selectedFilter[item.attrId] = item.attrId;
        }
        this.setData({
          selectedFilter: selectedFilter
        });
      }
    },
    confirmFilter() {
      let attrIdList = [];
      for (let key in this.data.selectedFilter) {
        attrIdList.push(key);
      };
      if (attrIdList.length === 0) {
        return;
      } else {
        wx.setStorageSync('selectedFilterItem', JSON.stringify(this.data.selectedFilter));
        wx.navigateTo({
          url: `/pages/pdtList/index?attrIdList=${attrIdList}`,
        })
      }
    }
  }
})

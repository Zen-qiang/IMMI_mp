// components/filterItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    datas: {
      type: Array,
      value: []
    },
    /**
     * 从哪个页面过来
     * 排行榜还是订单
     */
    from: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedFilter: {}
  },

  ready() {
    let selectedFilter = wx.getStorageSync(`${this.data.from}SelectedFilterItem`);
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

    /**
     * 取消
     */
    cancel() {
      this.triggerEvent('cancel', {});
    },

    /**
     * 确认
     */
    confirmFilter() {
      let attrIdList = [];
      for (let key in this.data.selectedFilter) {
        attrIdList.push(key);
      };
      if (attrIdList.length === 0) {
        return;
      } else {
        wx.setStorageSync(`${this.data.from}SelectedFilterItem`, JSON.stringify(this.data.selectedFilter));        
        this.triggerEvent('selectFilter', {
          filterList: attrIdList
        });
      }
    },
  }
})
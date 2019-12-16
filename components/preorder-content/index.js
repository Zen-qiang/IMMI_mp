const computedBehavior = require('miniprogram-computed')
Component({
  externalClasses: ['custom-class'],
  behaviors: [computedBehavior],
  properties: {
    originData: { // 数据源
      type: Array,
      value: [],
      observer: function (newVal, oldVal) {
        this.setData({
          list: newVal
        })
      }
    },
    filterType: Number // 0 未读 1 已读 2 全部
  },
  data: {
    list: [],
    types: null
  },
  computed: {
    filterList (data) {
      if (data.types === 2) {
        return data.list
      }
      return data.list.filter(item => item.isRead === data.types)
    }
  },
  lifetimes: {
    attached () {
      this.setData({
        types: this.data.filterType
      })
    }
  },
  methods: {
    onTap (e) {
      // console.log(e)
      const { stylename, image, id } = e.currentTarget.dataset
      this.triggerEvent('itemTap', {stylename, image, id})
    }
  }
})
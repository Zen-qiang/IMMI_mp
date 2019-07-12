Component({
  externalClasses: ['custom-class', 'tab-class', 'tab-active-class'],
  properties: {
    tabList: Array,  // [{label, value}]
    defaultIndex: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal) {
        this.setData({ index: newVal })
      }
    }
  },
  data: {
    index: 0
  },
  methods: {
    onTap (e) {
      // console.log(e)
      const index = e.currentTarget.dataset.index
      if (this.data.index === index) return
      this.trigger(index)
    },
    trigger (index) {
      this.setData({ index: index })
      this.triggerEvent('change', { index: index, ...this.properties.tabList[index] })
    }
  }
})
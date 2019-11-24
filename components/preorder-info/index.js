Component({
  properties: {
    text: { // 提示消息
      type: String,
      value: '',
      observer: function (newVal, oldVal) {
        this.setData({
          tips: newVal
        })
      }
    },
    imgSrc: String,
    colorList: {
      type: Array,
      observer: function (newVal, oldVal) {
        this.setData({
          list: newVal
        })
      }
    }
  },
  data: {
    selectedId: 0,
    list: [],
    tips: ''
  },
  methods: {
    tabChange (e) {
      // console.log(e)
      const selectedId = e.detail.index
      this.setData({selectedId})
    },
  }
})
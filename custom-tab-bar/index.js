const app = getApp()
Component({
  data: {
    userRole: null,
    selected: 0,
    color: '#ffffff',
    selectedColor: '#ffffff',
    backgroundColor: '#000000',
    tabList: []
  },
  lifetimes: {
    // attached() {
    //   this.setData({
    //     tabList: app.globalData.tabList
    //   })
    // }
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})
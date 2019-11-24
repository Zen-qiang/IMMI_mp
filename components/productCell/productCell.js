Component({
  properties: {
    prodata: {
      type: Object
    }
  },
  lifetimes: {
    attached () {
    }
  },
  methods: {
    onTap (e) {
      // console.log(e)
      this.triggerEvent('onTap', this.data.prodata.id)
    }
  }
})
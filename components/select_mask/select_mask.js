// components/select_mask/select_mask.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showText:{
      type: String,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showModalStatus: false,
    showModal1: false,
    showModal2: false,
    inputValue: "", // 输入框的值
    maskTop: '0px',
  },

  ready(){
    this.setMaskTop();
  },

  /**
   * 组件的方法列表
   */
  methods: {

    butt1Click: function() {
      if (this.data.showModal1) {
        this.setData({
          showModalStatus: false, //显示遮罩层
          showModal1: false,
          showModal2: false,
        })
      } else {
        this.setData({
          showModalStatus: true,
          showModal1: true,
          showModal2: false,
        });
      }
      this.triggerEvent('selectActive', {
        showModal1: this.data.showModal1,
        showModal2: this.data.showModal2
      });

    },

    butt2Click: function() {
      if (this.data.showModal2) {
        this.setData({
          showModalStatus: false, //显示遮罩层
          showModal1: false,
          showModal2: false,
        })
      } else {
        this.setData({
          showModalStatus: true,
          showModal1: false,
          showModal2: true,
        });
      }
      this.triggerEvent('selectActive', {
        showModal1: this.data.showModal1,
        showModal2: this.data.showModal2
      });
    },

    /**
     * 动态设置遮罩层高度
     */
    setMaskTop: function() {
      wx.createSelectorQuery().in(this).select('#anchors').boundingClientRect((res) => {
        this.setData({
          maskTop: res.top + "px"
        });
      }).exec();
    },

    /*----------------搜索框--------------------*/

    searchChange: function(e) {
      // console.log(e.detail.value);
    },

    searchDone: function(e) {
      // console.log(e.detail.value);
      this.triggerEvent('searchDone', {
        searchText: e.detail.value
      });
    },

    /*----------------下单弹出框--------------------*/

    // 显示遮罩层  
    showModal: function() {
      this.setData({
        showModalStatus: true //显示遮罩层
      })
    },

    // 隐藏遮罩层  
    hideModal: function() {
      this.setData({
        showModalStatus: false, //显示遮罩层
        showModal1: false,
        showModal2: false,
      })
      this.triggerEvent('selectActive', {
        showModal1: this.data.showModal1,
        showModal2: this.data.showModal2
      });
    },

    preventTouchMove:function(){}
  }
})
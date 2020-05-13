// components/select_mask/select_mask.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showText:{
      type: String,
    },
    showNum: {
      type: String,
    },
    showTime: {
      type: String,
    },
    showP: {
      type: Boolean,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showModalStatus: false,
    showModal1: false,
    showModal2: false,
    // 订量
    showModal3: false,
    // 时间
    showModal4: false,
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
          showModal3: false,
          showModal4: false,
        })
      } else {
        this.setData({
          showModalStatus: true,
          showModal1: true,
          showModal2: false,
          showModal3: false,
          showModal4: false,
        });
      }
      this.triggerEvent('selectActive', {
        showModal1: this.data.showModal1,
        showModal2: this.data.showModal2,
        showModal3: this.data.showModal3,
        showModal4: this.data.showModal4
      });

    },

    butt2Click: function() {
      if (this.data.showModal2) {
        this.setData({
          showModalStatus: false, //显示遮罩层
          showModal1: false,
          showModal2: false,
          showModal3: false,
          showModal4: false,
        })
      } else {
        this.setData({
          showModalStatus: true,
          showModal1: false,
          showModal2: true,
          showModal3: false,
          showModal4: false,
        });
      }
      this.triggerEvent('selectActive', {
        showModal1: this.data.showModal1,
        showModal2: this.data.showModal2,
        showModal3: this.data.showModal3,
        showModal4: this.data.showModal4
      });
    },
    butt3Click() {
      if (this.data.showModal3) {
        this.setData({
          showModalStatus: false, //显示遮罩层
          showModal1: false,
          showModal2: false,
          showModal3: false,
          showModal4: false,
        })
      } else {
        this.setData({
          showModalStatus: true,
          showModal1: false,
          showModal2: false,
          showModal3: true,
          showModal4: false,
        });
      }
      this.triggerEvent('selectActive', {
        showModal1: this.data.showModal1,
        showModal2: this.data.showModal2,
        showModal3: this.data.showModal3,
        showModal4: this.data.showModal4
      });
    },
    butt4Click() {
      if (this.data.showModal4) {
        this.setData({
          showModalStatus: false, //显示遮罩层
          showModal1: false,
          showModal2: false,
          showModal3: false,
          showModal4: false,
        })
      } else {
        this.setData({
          showModalStatus: true,
          showModal1: false,
          showModal2: false,
          showModal3: false,
          showModal4: true,
        });
      }
      this.triggerEvent('selectActive', {
        showModal1: this.data.showModal1,
        showModal2: this.data.showModal2,
        showModal3: this.data.showModal3,
        showModal4: this.data.showModal4
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
        showModal3: false,
        showModal4: false,
      })
      this.triggerEvent('selectActive', {
        showModal1: this.data.showModal1,
        showModal2: this.data.showModal2,
        showModal3: this.data.showModal3,
        showModal4: this.data.showModal4,
      });
    },

    preventTouchMove:function(){}
  }
})
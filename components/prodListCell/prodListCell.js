Component({

  /**
   * 组件的属性列表
   */
  properties: {

    /**
     * 该元素在父组件中数组元素的下标
     */
    index: {
      type: Number,
    },

    // 选中状态
    checkObj: {
      type: Object,
    },

    /**
     * 数据源
     */
    shopData: {
      type: Object,
      observer: function(newVal, oldVal) {}
    },

    showType: {
      type: Object,
      value: {},
      observer: function(newVal, oldVal) {}
    },
    /**
     * 订单id
     */
    orderId: {
      type: Number,
      value: 0
    },

    /**
     * 是否允许多选
     */
    canCheck: {
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal) {}
    },

    /**
     * 是否允许多选
     */
    canDel: {
      type: Boolean
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    startX: 0, //开始坐标
    startY: 0,
    isTouchMove: false, // 是否允许侧滑
    showDetail: false, // 是否显示商品详情
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 点击整行产品 选择框
     */
    cellSelected: function(e) {
      let obj = e.currentTarget.dataset.type;
      this.setData({
        showDetail: !this.data.showDetail, // 是否显示商品详情
      });
    },

    /** 点击多选框 */
    checkAction: function(e) {
      var obj = this.data.shopData;
      obj.isCheck = !obj.isCheck;
      this.setData({
        shopData: obj
      });
      obj.index = this.data.index; // 该元素在数组中的下标传递给父组件
      this.triggerEvent('check', obj);
    },

    /**
     * 删除事件
     */
    del: function(e) {
      let obj = e.currentTarget.dataset.type;
      obj.index = this.data.index; // 该元素在数组中的下标传递给父组件
      this.triggerEvent('del', obj);
    },

    /** 子组件事件  */
    successOrder: function(e) {
      var obj = this.data.shopData;
      obj.amount = e.detail.amount;
      obj.sumQty = e.detail.sumQty;
      this.setData({
        shopData: obj,
        showDetail: false, // 是否显示商品详情
      });
      obj.index = this.data.index; // 该元素在数组中的下标传递给父组件
      this.triggerEvent('change', obj);
    },

    /** 子组件事件 */
    reset: function() {
      this.setData({
        showDetail: false, // 是否显示商品详情
      });
    },

    showMask: function(e) {
      this.triggerEvent('showMask', e.detail);
    },

    // ==============侧滑事件==========================================================

    //手指触摸动作开始 记录起点X坐标
    touchstart: function(e) {
      this.setData({
        startX: e.changedTouches[0].clientX,
        startY: e.changedTouches[0].clientY,
        isTouchMove: false
      })
    },

    //滑动事件处理
    touchmove: function(e) {

      if (!this.data.canDel) {
        return;
      }

      if (this.data.showDetail) {
        return;
      }

      var index = e.currentTarget.dataset.index; //当前索引
      var startX = this.data.startX; //开始X坐标
      var startY = this.data.startY; //开始Y坐标
      var touchMoveX = e.changedTouches[0].clientX; //滑动变化坐标
      var touchMoveY = e.changedTouches[0].clientY; //滑动变化坐标
      var angle = this.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      }); //获取滑动角度

      if (Math.abs(angle) > 30) return;
      if (touchMoveX > startX) { // 右滑
        this.data.isTouchMove = false;
      } else { // 左滑
        this.data.isTouchMove = true;
      }

      //更新数据
      this.setData({
        isTouchMove: this.data.isTouchMove
      });
    },

    /**
     * 计算滑动角度
     * @param {Object} start 起点坐标
     * @param {Object} end 终点坐标
     */
    angle: function(start, end) {
      var _X = end.X - start.X;
      var _Y = end.Y - start.Y;
      //返回角度 / Math.atan()返回数字的反正切值
      return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
    },
  }
})
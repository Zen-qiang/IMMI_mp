// components/popBottom/popBottom.js

var interval = ""; //周期执行函数的对象
var time = 0; //滑动时间
var touchDot = 0; //触摸时的原点
var flag_hd = true; //判定是否可以滑动
let animationShowHeight = 300; //动画偏移高度

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: { // 属性名
      type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: false, // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function(newVal, oldVal, changedPath) {
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: "", // 遮罩层变量
    showModalStatus: false,
  },

  animation: '',

  created:function(){
    this.setPopView();
  },

  attached: function() {
    this.setPopView();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /*----------------下单弹出框--------------------*/
    // 基本设置
    setPopView: function() {
      flag_hd = true; // 重新进入页面之后，可以再次执行滑动切换页面代码
      clearInterval(interval); // 清除setInterval
      time = 0;
      wx.getSystemInfo({
        success: function(res) {
          animationShowHeight = res.windowHeight;
        }
      });
      // 创建一个动画实例animation。调用实例的方法来描述动画。
      var animation = wx.createAnimation({
        duration: 500, //动画持续时间500ms
        timingFunction: "ease", //动画以低速开始，然后加快，在结束前变慢
        delay: 0 //动画延迟时间0ms
      });
      this.animation = animation;
    },

    // 显示遮罩层  
    showModal: function() {
      var animation = this.animation;
      animation.translateY(animationShowHeight).step(); // 在Y轴向上偏移300
      this.setData({
        // 通过动画实例的export方法导出动画数据传递给组件的animation属性。
        animationData: this.animation.export(),
        showModalStatus: true //显示遮罩层
      })
      setTimeout(function() {
        var animation = this.animation;
        animation.translateY(0).step();
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), 10)
    },

    // 隐藏遮罩层  
    hideModal: function() {
      var animation = this.animation;
      animation.translateY(animationShowHeight).step();
      this.setData({
        animationData: animation.export(),
      });
      setTimeout(function() {
        var animation = this.animation;
        animation.translateY(0).step();
        this.setData({
          animationData: animation.export(),
          showModalStatus: false
        })
      }.bind(this), 200);
      this.triggerEvent('cancel', {});
    },
  }
})
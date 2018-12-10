// components/contactsButtCell/contactsButtCell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    contactData: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isChecked: true,
    iconName: "check"
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /** 设置默认地址 */
    setDefaultAction: function() {
      console.log("设置默认地址");
      this.triggerEvent('isDefault', this.data.contactData);

      // if (this.data.isChecked) { // 取消选中
      //   this.setData({
      //     iconName: "checked",
      //     isChecked: !this.data.isChecked
      //   });
      // } else { // 选中
      //   this.setData({
      //     iconName: "check",
      //     isChecked: !this.data.isChecked
      //   });
      // }
    },

    /** 编辑事件 */
    editAction: function() {
      console.log("编辑事件");
      this.triggerEvent('edit', this.data.contactData);
    },

    /** 删除按钮 */
    delAction: function() {
      console.log("删除按钮");
      this.triggerEvent('del', this.data.contactData)
    },

  }
})
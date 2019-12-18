// components/orderMatrix/index.js
const app = getApp();
import config from '../../config.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 订单Id
     */
    orderId: {
      type: Number
    },
    /**
     * 商品Id
     */
    productId: {
      type: Number
    },
    /**
     * // 下单矩阵来源 
     * 1. 商品详情 pdtInfo 获取的尺寸没有下单量, 下面btn:取消， 提交订单
     * 2. 购物车 cart  获取的尺寸有数量 下面btn为保存
     * 3. 我的订单 order 退货数量只能为负数
     * 4. 补货单退货单详情 rOrderInfo 补货单退货单详情 尺寸不能编辑
     */
    from: {
      type: String,
      value: ''
    },
    /**
     * 类型
     * 退货 returnOrder
     * 补货 backOrder
     */
    orderType: {
      type: String,
      value: ''
    },
    /**
     * 订单状态
     * TODO 判断是否可以在订单列表中直接提交订单
     */
    canSubmit: Boolean
  },


  /**
   * 组件的初始数据
   */
  data: {
    loading: true, // 控制骨架屏显示
    tabList: [],
    selectedId: 0,
    scroll: true,
    matrix: {}, // 矩阵数据
    matrixPrice: {}, // 每个色不同价格
    matrixTotal: {}, // 每个颜色的数量
    total: 0, // 总下单量
    radio: '1',
    radioList: [
      {
        name: '1',
        value: '残次品(收获7天内发现有残次，未经穿着、洗涤、吊牌完整)'
      },
      {
        name: '2',
        value: '顾客退回(已穿着或洗涤后发现质量问题)'
      },
      {
        name: '3',
        value: '其他'
      }
    ],
    reasonShow: false,
    reasonText: '',
    stock: false // 是否还有库存 false：提交到货通知 true：加入购物车
  },
  ready() {
    this.getSpec();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getSpec() {
      console.log(this.data.from)
      var data = {
        url: config.specQuery,
        params: {
          orderId: this.data.orderId,
          productId: this.data.productId,
          from: this.data.from,
          orderType: this.data.orderType
        }
      }
      app.nGet(data).then(data => {
        this.setData({
          loading: false
        })
        if (data.data && data.data.color) {
          let tabList = [];
          let matrix = {};
          let matrixPrice = {};
          let matrixTotal = {};
          data.data.color.map((item, index) => {
            let tab = {
              id: index,
              title: item.colorName
            };
            tabList.push(tab);
            matrix[index] = item.size;
            matrixPrice[index] = item.price;
            let sum = 0;
            item.size.map(size => {
              sum += Number(size.qty);
            });
            matrixTotal[index] = sum;
          });
          this.setData({
            tabList: tabList,
            matrix: matrix,
            matrixPrice: matrixPrice,
            matrixTotal: matrixTotal,
            stock: data.data.stock
          });
          // console.log(this.data)
        }
      }, res => {
        // console.error(res);
        this.setData({
          loading: false
        })
      });
    },
    handleTabChange(e) {
      let selectedId = e.detail;
      this.setData({
        selectedId: selectedId
      });
    },
    tabChange (e) {
      // console.log(e)
      const selectedId = e.detail.index
      this.setData({selectedId})
    },
    handleZanStepperChange({
      detail: stepper,
      target: {
        dataset: {
          idx
        }
      }
    }) {
      let selectedId = this.data.selectedId;
      this.setData({
        [`matrix.${selectedId}[${idx}].qty`]: stepper
      });
      let sizes = this.data.matrix[selectedId];
      let sum = 0;
      sizes.map(item => {
        sum += Number(item.qty);
      });
      this.setData({
        [`matrixTotal.${selectedId}`]: sum
      });

    },
    reset() {
      this.triggerEvent('reset');
    },
    submitOrder() {
      let that = this;
      let matrixData = [];
      let sum = 0;
      for (let key in this.data.matrix) {
        let value = this.data.matrix[key];
        value.map((item, idx) => {
          if (Number(item.qty) > 0) {
            sum += Number(item.qty);
            let data = {
              aliasId: item.aliasId,
              qty: item.qty,
              productId: that.data.productId
            }
            matrixData.push(data);
          }
        });

      };
      if (sum) {
        this.data.stock ? this.cartHttp(matrixData) : this.addPre(matrixData)
      } else {
        app.showMsg("请输入补货量！");
      }
    },
    /**
     * 对之前的下量进行补充, 退货或者补货
     */
    updateOrder() {
      let that = this;
      let matrixData = [];
      let sum = 0;
      for (let key in this.data.matrix) {
        let value = this.data.matrix[key];
        value.map((item, idx) => {
          if (Number(item.qty) > 0) {
            sum += Number(item.qty);
            let data = {
              aliasId: item.aliasId,
              qty: this.data.orderType === 'returnOrder' ? (item.qty ? -item.qty : 0) : item.qty,
              productId: that.data.productId
            }
            matrixData.push(data);
          } 
        });

      };
      if (sum) {
        this.cartHttp(matrixData);
      } else {
        let message = this.data.orderType === 'returnOrder' ? '请输入退货量！' : '请输入补货量！'
        app.showMsg(`${message}`);
      }
    },

    /**
     * TODO 提交到货通知
     * @param {*} matrixData 
     */
    addPre (matrixData) {
      var data = {
        url: config.arrivalNotice,
        params: {
          data: JSON.stringify(matrixData)
        }
      }
      wx.showLoading({
        title: '数据保存中',
      });
      app.nPost(data).then(data => {
        app.showMsg("保存成功");
        this.triggerEvent('successPre');
        wx.hideLoading();
      }, res => {
        console.error(res);
        wx.hideLoading();
        app.showMsg("保存失败")
      });
    },
    cartHttp(matrixData) {
      var data = {
        url: config.addCart,
        params: {
          data: JSON.stringify(matrixData),
          orderType: this.data.orderType,
          from: this.data.from,
          message: this.data.reasonInfo
        }
      }
      wx.showLoading({
        title: '数据保存中',
      });
      app.nPost(data).then(data => {
        if (data.data) {
          app.showMsg("保存成功");
          this.triggerEvent('success', data.data);
        }
        wx.hideLoading();
      }, res => {
        console.error(res);
        wx.hideLoading();
        app.showMsg("保存失败")
      });
    },
    openReson () {
      this.setData({
        reasonShow: true
      })
    },
    onClose(e) {
      // console.log(this.data.reasonText)
      if (this.data.radio === '3' && !this.data.reasonText) {
        app.showMsg("请输入退货原因！")
        return
      }
      this.updateOrder()
    },
    radioChange: function(e) {
      // console.log(e)
      this.setData({
        radio: e.detail
      })
    },
    setReasonInfo: function(e) {
      // console.log(e);
      this.setData({
        reasonText: e.detail.value
      })
    },
    /**
     * TODO 直接提交订单
     */
    directSubmitOrder () {
      let matrixData = []
      let sum = 0
      for (const key in this.data.matrix) {
        if (this.data.matrix.hasOwnProperty(key)) {
          const element = this.data.matrix[key]
          let arr = element.map(item => {
            sum += Number(item.qty)
            return {
              pAliasId: item.aliasId,
              qty: item.qty
            }
          })
          matrixData.push(...arr)
        }
      }
      var data = {
        url: config.submitOrder,
        params: {
          orderId: this.data.orderId,
          qtyList: JSON.stringify(matrixData),
          totalQty: sum
        }
      }
      app.nPost(data).then(res => {
        // console.log(res)
        if (res.code === 0) {
          app.showMsgSuccess('提交成功')
        } else {
          app.showMsg('提交失败')
        }
      }).catch(err => {
        // console.log(err)
        app.showMsg(err.message || '提交失败')
      })
    }
  }
})
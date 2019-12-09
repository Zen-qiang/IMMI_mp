/**
 * 接口配置文件
 */

// const host = "https://immi.dingliantech.com";
// const host = "http://192.168.3.16:8080/trendfinder";
// const host = "http://172.16.0.176:8082";
// const host = "http://192.168.8.8:55661/immi";
// const host = 'https://invitation.dingliantech.com/immi';
// const host = "http://192.168.3.7:8080";
const host = "https://bobo.easy.echosite.cn/immi"

// 首页接口汇总
let api = {
  login: `${host}/b2b/login`, // 登录
  changePassword: `${host}/b2b/user/changePassword`, // 修改密码
  logout: `${host}/b2b/logout`, // 退出登录
  indexCarouselQuery: `${host}/b2b/product/productCarousel`, // 首页幻灯片
  indexNewPdtQuery: `${host}/b2b/product/productList`, // 商品列表
  indexCategoryQuery: `${host}/b2b/product/getCategory`, // 商品分类查询
  indexFilterQuery: `${host}/b2b/product/getSearchCriteria`, // 商品筛选列表
  pdtGet: `${host}/b2b/product/productInfo`, // 获取商品详情
  specQuery: `${host}/b2b/product/productColorSize`, // 获取规格
  addCart: `${host}/b2b/cart/saveCartItem`, // 添加|修改购物车
  cartListQuery: `${host}/b2b/cart/cartList`, // 购物车列表
  cartCalculate: `${host}/b2b/cart/calculateAmount`, //购物车计算
  orderCreate: `${host}/b2b/cart/submitOrder`, // 购物车提交
  cartDelete: `${host}/b2b/cart/cartDelete`, // 购物车删除
  addressList: `${host}/b2b/user/shipAddressList`, // 获取地址列表
  addressDelete: `${host}/b2b/user/removeShipAddress`, // 地址删除
  addressGet: `${host}/b2b/user/shipAddressInfo`, // 获取地址详情
  addressCreate: `${host}/b2b/user/saveShipAddress`, // 地址修改|保存
  orderQuery: `${host}/b2b/order/myOrder`, // 获取订单列表
  rOrderQuery: `${host}/b2b/order/orderList`, // 获取退货单|补货单列表
  rOrderGet: `${host}/b2b/order/orderInfo`, // 获取退货单|补货单详情
  searchB2bProductTopList: `${host}/b2b/product/searchB2bProductTopList`, // 排行榜
  getAccountInfo: `${host}/b2b/user/getAccountInfo`, // 用户信息
  getLayout: `${host}/b2b/getLayout`, // 首页展示图片
  timeGoods: `${host}/b2b/product/queryIsInseasonProduct`, // 首页 当季/过季商品
  getOrderPriNum: `${host}/b2b/order/queryMyOrderCount`, // 我的页面 订单的金额 和 数量
  getApprovalOrderList: `${host}/b2b/order/getApprovalOrderList`, // 审核人获取订单列表
  rejectOrder: `${host}/b2b/order/rejectOrder`, // 驳回订单
  approveOrder: `${host}/b2b/order/approveOrder`, // 提交订单
  unsubmit: `${host}/b2b/order/unsubmit`, // 反提交
  getArrivalNoticeList: `${host}/b2b/product/getArrivalNoticeList`, // 到货通知列表
  getArrivalNotice: `${host}/b2b/product/getArrivalNotice`, // 读取到货通知
  arrivalNotice: `${host}//b2b/product/arrivalNotice` // 提交预订商品
};

var config = {
  host,
  ...api
};

module.exports = config;
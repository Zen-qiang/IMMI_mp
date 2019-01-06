<<<<<<< HEAD
/**
 * 接口配置文件
 */
// const host = "https://result.eolinker.com";
// // 首页接口汇总
// let api = {
//   // 登录
//   login: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=login`,
//   // 退出登录
//   logout: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=logout`,
//   // 首页幻灯片
//   indexCarouselQuery: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=carousel`,
//   // 商品列表 
//   indexNewPdtQuery: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=pdtList`,
//   // 商品分类查询
//   indexCategoryQuery: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=category`,
//   // 商品筛选列表
//   indexFilterQuery: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=filter`,
//   // 获取商品详情
//   pdtGet: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=pdtInfo`,
//   // 获取规格
//   specQuery: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=spec`,
//   // 添加|修改购物车
//   addCart: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=addCart`,
//   // 购物车列表
//   cartListQuery: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=cartList`,
//   //购物车计算
//   cartCalculate: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=calculate`,
//   // 购物车提交
//   orderCreate: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=createOrder`,
//   // 购物车删除
//   cartDelete: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=cartDelete`,
//   // 获取地址列表
//   addressList: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=addressList`,
//   // 地址删除
//   addressDelete: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=addressDelete`,
//   // 获取地址详情
//   addressGet: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=addressGet`,
//   // 地址修改|保存
//   addressCreate: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=addressCreate`,
//   // 获取订单列表
//   orderQuery: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=orderList`,
//   // 获取退货单|补货单列表
//   rOrderQuery: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=rOrderList`,
//   // 获取退货单|补货单详情
//   rOrderGet: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=rOrderInfo`,
// };

const host = "https://immi.dingliantech.com";
// const host = "http://192.168.3.16:8080/trendfinder";
// const host = "http://172.16.0.176:8082";


// 首页接口汇总
let api = {
  // 登录
  login: `${host}/b2b/login`,
  // 退出登录
  logout: `${host}/b2b/logout`,
  // 首页幻灯片
  indexCarouselQuery: `${host}/b2b/product/productCarousel`,
  // 商品列表 
  indexNewPdtQuery: `${host}/b2b/product/productList`,
  // 商品分类查询
  indexCategoryQuery: `${host}/b2b/product/getCategory`,
  // 商品筛选列表
  indexFilterQuery: `${host}/b2b/product/getSearchCriteria`,
  // 获取商品详情
  pdtGet: `${host}/b2b/product/productInfo`,
  // 获取规格
  specQuery: `${host}/b2b/product/productColorSize`,
  // 添加|修改购物车
  addCart: `${host}/b2b/cart/saveCartItem`,
  // 购物车列表
  cartListQuery: `${host}/b2b/cart/cartList`,
  //购物车计算
  cartCalculate: `${host}/b2b/cart/calculateAmount`,
  // 购物车提交
  orderCreate: `${host}/b2b/cart/submitOrder`,
  // 购物车删除
  cartDelete: `${host}/b2b/cart/cartDelete`,
  // 获取地址列表
  addressList: `${host}/b2b/user/shipAddressList`,
  // 地址删除
  addressDelete: `${host}/b2b/user/removeShipAddress`,
  // 获取地址详情
  addressGet: `${host}/b2b/user/shipAddressInfo`,
  // 地址修改|保存
  addressCreate: `${host}/b2b/user/saveShipAddress`,
  // 获取订单列表
  orderQuery: `${host}/b2b/order/myOrder`,
  // 获取退货单|补货单列表
  rOrderQuery: `${host}/b2b/order/orderList`,
  // 获取退货单|补货单详情
  rOrderGet: `${host}/b2b/order/orderInfo`,
  // 排行榜/b2b/order/queryMyOrderCount
  searchB2bProductTopList: `${host}/b2b/product/searchB2bProductTopList`,
  // 我的页面 订单的金额 和 数量
  getOrderPriNum: `${host}/b2b/order/queryMyOrderCount`,
};

var config = {
  host,
  ...api
};

=======
/**
 * 接口配置文件
 */
// const host = "https://result.eolinker.com";
// // 首页接口汇总
// let api = {
//   // 登录
//   login: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=login`,
//   // 退出登录
//   logout: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=logout`,
//   // 首页幻灯片
//   indexCarouselQuery: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=carousel`,
//   // 商品列表 
//   indexNewPdtQuery: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=pdtList`,
//   // 商品分类查询
//   indexCategoryQuery: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=category`,
//   // 商品筛选列表
//   indexFilterQuery: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=filter`,
//   // 获取商品详情
//   pdtGet: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=pdtInfo`,
//   // 获取规格
//   specQuery: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=spec`,
//   // 添加|修改购物车
//   addCart: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=addCart`,
//   // 购物车列表
//   cartListQuery: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=cartList`,
//   //购物车计算
//   cartCalculate: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=calculate`,
//   // 购物车提交
//   orderCreate: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=createOrder`,
//   // 购物车删除
//   cartDelete: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=cartDelete`,
//   // 获取地址列表
//   addressList: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=addressList`,
//   // 地址删除
//   addressDelete: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=addressDelete`,
//   // 获取地址详情
//   addressGet: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=addressGet`,
//   // 地址修改|保存
//   addressCreate: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=addressCreate`,
//   // 获取订单列表
//   orderQuery: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=orderList`,
//   // 获取退货单|补货单列表
//   rOrderQuery: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=rOrderList`,
//   // 获取退货单|补货单详情
//   rOrderGet: `${host}/DeQfXCMe20abf31cfcc88344ad196f0b31e775e8d44ca09?uri=rOrderInfo`,
// };

const host = "https://immi.dingliantech.com";
// const host = "http://192.168.3.16:8080/trendfinder";

// 首页接口汇总
let api = {
  // 登录
  login: `${host}/b2b/login`,
  // 退出登录
  logout: `${host}/b2b/logout`,
  // 首页幻灯片
  indexCarouselQuery: `${host}/b2b/product/productCarousel`,
  // 商品列表 
  indexNewPdtQuery: `${host}/b2b/product/productList`,
  // 商品分类查询
  indexCategoryQuery: `${host}/b2b/product/getCategory`,
  // 商品筛选列表
  indexFilterQuery: `${host}/b2b/product/getSearchCriteria`,
  // 获取商品详情
  pdtGet: `${host}/b2b/product/productInfo`,
  // 获取规格
  specQuery: `${host}/b2b/product/productColorSize`,
  // 添加|修改购物车
  addCart: `${host}/b2b/cart/saveCartItem`,
  // 购物车列表
  cartListQuery: `${host}/b2b/cart/cartList`,
  //购物车计算
  cartCalculate: `${host}/b2b/cart/calculateAmount`,
  // 购物车提交
  orderCreate: `${host}/b2b/cart/submitOrder`,
  // 购物车删除
  cartDelete: `${host}/b2b/cart/cartDelete`,
  // 获取地址列表
  addressList: `${host}/b2b/user/shipAddressList`,
  // 地址删除
  addressDelete: `${host}/b2b/user/removeShipAddress`,
  // 获取地址详情
  addressGet: `${host}/b2b/user/shipAddressInfo`,
  // 地址修改|保存
  addressCreate: `${host}/b2b/user/saveShipAddress`,
  // 获取订单列表
  orderQuery: `${host}/b2b/order/myOrder`,
  // 获取退货单|补货单列表
  rOrderQuery: `${host}/b2b/order/orderList`,
  // 获取退货单|补货单详情
  rOrderGet: `${host}/b2b/order/orderInfo`,
  // 排行榜
  searchB2bProductTopList: `${host}/b2b/product/searchB2bProductTopList`,
  // 用户信息
  getAccountInfo: `${host}/b2b/user/getAccountInfo`,
  // 首页展示图片
  getLayout: `${host}/b2b/getLayout`,
};

var config = {
  host,
  ...api
};

>>>>>>> master
module.exports = config;
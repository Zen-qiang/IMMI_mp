var app = getApp();

/**
 * Picker Code 是否为空
 */
var isPickerCode = function(value, showMsg) {
  if (!value || value.length <= 0) {
    var showTost = '请选择' + showMsg;
    app.showMsg(showTost, 2);
    return false;
  } else {
    return true;
  }
}

/**
 * 地址信息校验: 汉字、字母、数字
 */
var isAddress = function(value, length, showMsg) {

  if (!isNull(value, showMsg)) { // 非空校验 && 空格校验
    return false;
  }
  if (!isLength(value, length, showMsg)) { // 长度校验
    return false;
  }
  if (!isCharacter(value, showMsg)) { // 格式校验
    return false;
  }
  return true;
}

/**
 * 姓名校验：字母、汉字
 */
var isName = function(value, length, showMsg) {
  if (!isNull(value, showMsg)) { // 非空校验 && 空格校验
    return false;
  }
  if (!isLength(value, length, showMsg)) { // 长度校验
    return false;
  }
  if (!isCharacter2(value, showMsg)) { // 格式校验
    return false;
  }
  return true;
}

/**
 * 公司名称校验: 汉字、括号
 */
var isCompanyName = function(value, length, showMsg) {

  if (!isNull(value, showMsg)) { // 非空校验 && 空格校验
    return false;
  }
  if (!isLength(value, length, showMsg)) { // 长度校验
    return false;
  }
  if (!isCharacter3(value, showMsg)) { // 格式校验
    return false;
  }
  return true;
}
/**
 * 法人名称: 汉字
 */
var isFaRenName = function(value, length, showMsg) {
  if (!isNull(value, showMsg)) { // 非空校验 && 空格校验
    return false;
  }
  if (!isLength(value, length, showMsg)) { // 长度校验
    return false;
  }
  if (!isCharacter4(value, showMsg)) { // 格式校验
    return false;
  }
  return true;
}

/**
 * 身份证后6位: 数字、字母
 */
var isIdCard6 = function(value, length, showMsg) {
  if (!isNull(value, showMsg)) { // 非空校验 && 空格校验
    return false;
  }
  if (!isLength(value, length, showMsg)) { // 长度校验
    return false;
  }
  if (!isCharacter5(value, showMsg)) { // 格式校验
    return false;
  }
  return true;
}
/**
 * 密码校验: 字母、数字、英文符号
 */
var isPassWord = function(value, length, showMsg) {

  if (!isNull(value, showMsg)) { // 非空校验 && 空格校验
    return false;
  }
  if (!isLength(value, length, showMsg)) { // 长度校验
    return false;
  }
  if (!isPwd(value, showMsg)) { // 格式校验
    return false;
  }
  return true;
}

/**
 * 手机号校验: 1开头的11位数字
 */
var isPhoneNo = function(value, showMsg) {
  if (!isNull(value, showMsg)) { // 非空校验 && 空格校验
    return false;
  }
  let regx = /^1\d{10}$/
  if (!regx.test(value)) {
    var showTost = '请输入正确的' + showMsg;
    app.showMsg(showTost, 2);
    return false;
  } else {
    return true;
  }
}

/**
 * 固话区号校验 eg. 025
 */
var isTell1 = function(value, msg) {
  let regx = /^0\d{2,3}$/
  if (!regx.test(value)) {
    var showTost = '请输入正确的' + msg;
    app.showMsg(showTost, 2);
    return false;
  } else {
    return true;
  }
}

/**
 * 固话号码校验 eg. 
 */
var isTell2 = function(value, msg) {
  let regx = /^\d{7,8}$/
  if (!regx.test(value)) {
    var showTost = '请输入正确的' + msg;
    app.showMsg(showTost, 2);
    return false;
  } else {
    return true;
  }
}

/**
 * 身份证号码校验
 */
var isIDCard = function(value, msg) {

  if (!isNull(value, msg)) { // 非空校验 && 空格校验
    return false;
  }

  if (!isIdCardNoUtil(value)) {
    var showTost = '请输入正确的' + msg;
    app.showMsg(showTost, 2);
    return false;
  } else {
    return true;
  }
}

// -=============== 以上方法为 封装校验 调用 ===================
// -=============== 以下方法为 基本校验 ===================

/**
 * 非空校验 && 空格校验
 */
var isNull = function(value, showMsg) {
  if (value == '' || value == undefined) {
    var showTost = '请输入' + showMsg;
    app.showMsg(showTost, 2);
    return false;
  } else if (typeof(value) == "string" && value.indexOf(" ") != -1) {
    var showTost = showMsg + '中不能含有空格';
    app.showMsg(showTost, 2);
    return false;
  } else {
    return true;
  }
}

/**
 * 长度校验
 */
var isLength = function(value, length, showMsg) {
  if (value.length > length) {
    var showTost = showMsg + '最多可输入' + length + '个字符';
    app.showMsg(showTost, 2);
    return false;
  } else {
    return true;
  }
}

/**
 * 格式校验: 字母、汉字、数字
 */
var isCharacter = function(value, showMsg) {
  var regx = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
  if (!regx.test(value)) {
    var showTost = showMsg + '中不能含有特殊字符';
    app.showMsg(showTost, 2);
    return false;
  } else {
    return true;
  }
}

/**
 * 格式校验: 字母、汉字
 */
var isCharacter2 = function(value, showMsg) {
  var regx = /^[A-Za-z\u4e00-\u9fa5]+$/
  if (!regx.test(value)) {
    var showTost = showMsg + '只能为汉字、字母或汉字字母组合';
    app.showMsg(showTost, 2);
    return false;
  } else {
    return true;
  }
}

/**
 * 格式校验: 汉字、括号
 */
var isCharacter3 = function(value, showMsg) {
  var regx = /^[\（\）\(\)\u4e00-\u9fa5]+$/
  if (!regx.test(value)) {
    var showTost = '请输入正确的' + showMsg;
    app.showMsg(showTost, 2);
    return false;
  } else {
    return true;
  }
}
/**
 * 格式校验: 汉字
 */
var isCharacter4 = function(value, showMsg) {
  var regx = /^[\u4e00-\u9fa5]+$/
  if (!regx.test(value)) {
    var showTost = showMsg + '只能为汉字';
    app.showMsg(showTost, 2);
    return false;
  } else {
    return true;
  }
}
/**
 * 格式校验: 字母和数字
 */
var isCharacter5 = function(value, showMsg) {
  var regx = /^([0-9]{5})([0-9xX]{1})+$/
  if (!regx.test(value)) {
    var showTost = showMsg + '格式错误';
    app.showMsg(showTost, 2);
    return false;
  } else {
    return true;
  }
}
/**
 * 格式校验密码 字母、汉字、英文符号
 */
var isPwd = function(value, showMsg) {
  var regx = /^[0-9A-Za-z€£¥•\.\,\?\!\’\-\:\;\(\)\$\&\@\“\”\_\\\|\~\<\>\=\+\*\^\%\#\}\{\]\[\/]+$/
  if (!regx.test(value)) {
    var showTost = showMsg + '只能为字母，数字、英文字符';
    app.showMsg(showTost, 2);
    return false;
  } else {
    return true;
  }
}

/**
 * 身份证号码校验规则
 */
var isIdCardNoUtil = function(num) {
  let factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
  let parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
  let varArray = new Array();
  let lngProduct = 0;
  let intCheckDigit;
  let intStrLen = num.length;
  let idNumber = num;
  // initialize
  if ((intStrLen != 15) && (intStrLen != 18)) {
    return false;
  }
  // check and set value
  for (let i = 0; i < intStrLen; i++) {
    varArray[i] = idNumber.charAt(i);
    if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
      return false;
    } else if (i < 17) {
      varArray[i] = varArray[i] * factorArr[i];
    }
  }
  if (intStrLen == 18) {
    //check date
    var date8 = idNumber.substring(6, 14);
    if (isDate8(date8) == false) {
      return false;
    }
    // calculate the sum of the products
    for (let i = 0; i < 17; i++) {
      lngProduct = lngProduct + varArray[i];
    }
    // calculate the check digit
    intCheckDigit = parityBit[lngProduct % 11];
    // check last digit
    if (varArray[17] != intCheckDigit) {
      return false;
    }
  } else { //length is 15
    //check date
    var date6 = idNumber.substring(6, 12);
    if (isDate6(date6) == false) {
      return false;
    }
  }
  return true;
}

var isDate6 = function(sDate) {
  if (!/^[0-9]{6}$/.test(sDate)) {
    return false;
  }
  let year, month;
  year = sDate.substring(0, 4);
  month = sDate.substring(4, 6);
  if (year < 1700 || year > 2500) return false;
  if (month < 1 || month > 12) return false;
  return true
}

//判断是否为“YYYYMMDD”式的时期
var isDate8 = function(sDate) {
  if (!/^[0-9]{8}$/.test(sDate)) {
    return false;
  }
  let year;
  let month
  let day;
  year = sDate.substring(0, 4);
  month = sDate.substring(4, 6);
  day = sDate.substring(6, 8);
  let iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (year < 1700 || year > 2500) return false;
  if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > iaMonthDays[month - 1]) return false;
  return true;
}
var checkEmail = function(str) {
  var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
  if (re.test(str)) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  isPickerCode, // 选择框输入校验
  isAddress, // 地址信息校验: 汉字、字母、数字
  isName, //姓名校验：字母、汉字
  isCompanyName, // 名称校验: 汉字、括号
  isPassWord, // 密码校验: 字母、数字、英文符号
  isPhoneNo, // 手机号校验: 1开头的11位数字
  isTell1, // 固话区号校验 eg. 025
  isTell2, // 固话号码校验 : 7—8 位数字
  isIDCard, // 身份证号码校验
  isFaRenName, //法人名称
  isIdCard6, //身份证后6位
  checkEmail, //邮箱
  isNull, //非空
}
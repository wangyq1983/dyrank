const app = getApp();
var CusBase64 = require('base64.js');  
var md5 = require('md5.js')

var base64_decode = input => { // 解码，配合decodeURIComponent使用
  var base64EncodeChars = "BCDEFGHAIJKLMNOPQRSTUVWXYZnbcdefghijklmaopqrstuvwxyz1023856749+/=";
  var output = "";
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  //input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  while (i < input.length) {
    enc1 = base64EncodeChars.indexOf(input.charAt(i++));
    enc2 = base64EncodeChars.indexOf(input.charAt(i++));
    enc3 = base64EncodeChars.indexOf(input.charAt(i++));
    enc4 = base64EncodeChars.indexOf(input.charAt(i++));
    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;
    output = output + String.fromCharCode(chr1);
    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }
  }
  return utf8_decode(output);
}

var utf8_decode = utftext => { // utf-8解码
  var string = '';
  let i = 0;
  let c = 0;
  let c1 = 0;
  let c2 = 0;
  while (i < utftext.length) {
    c = utftext.charCodeAt(i);
    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    } else if ((c > 191) && (c < 224)) {
      c1 = utftext.charCodeAt(i + 1);
      string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
      i += 2;
    } else {
      c1 = utftext.charCodeAt(i + 1);
      c2 = utftext.charCodeAt(i + 2);
      string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
      i += 3;
    }
  }
  return string;
}


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//obj格式转str格式
const objToStr = obj => {
  var strParmas = '';
  var firstP = 1;
  for (var p in obj) {
    var linkAdd = "";
    if (firstP == 0) {
      linkAdd = '&';
    }
    strParmas = strParmas + linkAdd + p + '=' + obj[p];
    firstP = 0;
  }
  return strParmas;
}

/*
*获取今日的起始和结束时间
*返回值："起始时间,结束时间"
*/
const ToDayStr = () => {
  var returnStr = "";
  var date = new Date();      //当前时间
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  //var hour = date.getHours();
  //var minutes = date.getMinutes();
  //var second = date.getSeconds();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  returnStr = year + "/" + month + "/" + day + " 00:00:00,";       //起始时间
  returnStr += year + "/" + month + "/" + day + " 23:59:59";      //结束时间
  return returnStr;
}

/*
*获取昨日的起始和结束时间
*返回值："起始时间,结束时间"
*/
const YesterDayStr = () => {
  var date = GetDate(1, 1);       //当前时间前一天
  console.log('date='+date)
  var returnStr = "";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  // returnStr = year + "/" + month + "/" + day + " 00:00:00,";       //起始时间
  // returnStr += year + "/" + month + "/" + day + " 23:59:59";      //结束时间
  returnStr = year + "-" + month + "-" + day;
  return returnStr;
}

/*
*获取本周的起始和结束时间
*返回值："起始时间,结束时间"
*/
const ThisWeekStr = () => {
  var returnStr = "";
  var date = new Date();      //当前时间
  var week = date.getDay();   //获取今天星期几
  var monday = GetDate2(week - 1, 1, date);      //获取星期一
  var sunday = GetDate2(7 - week, 2, date);   //获取星期天
  //起始时间的年月日
  var year1 = monday.getFullYear();
  var month1 = monday.getMonth() + 1;
  var day1 = monday.getDate();
  //结束时间的年月日
  var year2 = sunday.getFullYear();
  var month2 = sunday.getMonth() + 1;
  var day2 = sunday.getDate();
  //处理起始时间小于10的追加"0"在前面
  month1 = month1 < 10 ? "0" + month1 : month1;
  day1 = day1 < 10 ? "0" + day1 : day1;
  //处理结束时间小于10的追加"0"在前面
  month2 = month2 < 10 ? "0" + month2 : month2;
  day2 = day2 < 10 ? "0" + day2 : day2;

  returnStr = year1 + "/" + month1 + "/" + day1 + " 00:00:00,";       //起始时间
  returnStr += year2 + "/" + month2 + "/" + day2 + " 23:59:59";      //结束时间
  return returnStr;
}

/*
*获取上周的起始和结束时间
*返回值："起始时间,结束时间"
*/
const LastWeekStr = (n=0) => {
  var returnStr = "";
  var date = new Date();      //当前时间
  var week = date.getDay();   //获取今天星期几
  var monday = GetDate2(week + 6+7*n, 1, date);      //获取上周星期一
  var sunday = GetDate2(week+7*n, 1, date);          //获取上周星期天
  //起始时间的年月日
  var year1 = monday.getFullYear();
  var month1 = monday.getMonth() + 1;
  var day1 = monday.getDate();
  //结束时间的年月日
  var year2 = sunday.getFullYear();
  var month2 = sunday.getMonth() + 1;
  var day2 = sunday.getDate();
  //处理起始时间小于10的追加"0"在前面
  month1 = month1 < 10 ? "0" + month1 : month1;
  day1 = day1 < 10 ? "0" + day1 : day1;
  //处理结束时间小于10的追加"0"在前面
  month2 = month2 < 10 ? "0" + month2 : month2;
  day2 = day2 < 10 ? "0" + day2 : day2;

  //returnStr = year1 + "/" + month1 + "/" + day1 + " 00:00:00,";       //起始时间
  //returnStr += year2 + "/" + month2 + "/" + day2 + " 23:59:59";      //结束时间

  returnStr = year1 + "/" + month1 + "/" + day1;       //起始时间
  returnStr += '-'+year2 + "/" + month2 + "/" + day2 ;      //结束时间

  return returnStr;
}

/*
*获取本月的起始和结束时间
*返回值："起始时间,结束时间"
*/
const ThisMonthStr = () => {
  var returnStr = "";
  var date = new Date();      //当前时间
  var year = date.getFullYear();
  var month = date.getMonth();

  var min = new Date(year, month, 1);                 //本月月初
  var max = new Date(year, month + 1, 0);             //本月月底

  //起始时间的年月日
  var year1 = min.getFullYear();
  var month1 = min.getMonth() + 1;
  var day1 = min.getDate();
  //结束时间的年月日
  var year2 = max.getFullYear();
  var month2 = max.getMonth() + 1;
  var day2 = max.getDate();
  //处理起始时间小于10的追加"0"在前面
  month1 = month1 < 10 ? "0" + month1 : month1;
  day1 = day1 < 10 ? "0" + day1 : day1;
  //处理结束时间小于10的追加"0"在前面
  month2 = month2 < 10 ? "0" + month2 : month2;
  day2 = day2 < 10 ? "0" + day2 : day2;

  returnStr = year1 + "/" + month1 + "/" + day1 + " 00:00:00,";       //起始时间
  returnStr += year2 + "/" + month2 + "/" + day2 + " 23:59:59";      //结束时间
  return returnStr;
}

/*
*获取当前日期前N天或后N日期(N = day)
*type:1：前；2：后
*/
const GetDate = (day, type) => {
  var zdate = new Date();
  var edate;
  if (type === 1) {
    edate = new Date(zdate.getTime() - (day * 24 * 60 * 60 * 1000));
  } else {
    edate = new Date(zdate.getTime() + (day * 24 * 60 * 60 * 1000));
  }
  return edate;
}

/*
*获取传入的日期前N天或后N日期(N = day)
*type:1：前；2：后
*date：传入的日期
*/
const GetDate2 = (day, type, date) => {
  var zdate;
  if (date === null || date === undefined) {
    zdate = new Date();
  } else {
    zdate = date;
  }
  var edate;
  if (type === 1) {
    edate = new Date(zdate.getTime() - (day * 24 * 60 * 60 * 1000));
  } else {
    edate = new Date(zdate.getTime() + (day * 24 * 60 * 60 * 1000));
  }
  return edate;
}

/**
 * 返回日榜时间列表
 */
const dayList = () => {
  var daylists = new Array();
  for(var i=1; i<15;i++){
    var date = GetDate(i, 1);       //当前时间前一天
    console.log('date=' + date)
    var returnStr = "";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    returnStr = year + "-" + month + "-" + day;
    daylists.push(returnStr)
    // return returnStr;
  }
  console.log(daylists);
  return daylists;
}

/**
 * 返回数据表需要的日期格式
 */
const chartDayList = () => {
  var daylists = new Array();
  for (var i = 1; i < 8; i++) {
    var date = GetDate(i, 1);       //当前时间前一天
    console.log('date=' + date)
    var returnStr = "";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    returnStr = month + "-" + day;
    daylists.push(returnStr)
    // return returnStr;
  }
  console.log(daylists);
  return daylists.reverse();
}

/**
 * 返回周榜时间列表
 */
const weekList = () =>{
  var daylists = new Array();
  for(var i=0; i<3; i++){
    //LastWeekStr(i);
    daylists.push(LastWeekStr(i))
  }
  return daylists;
}



/**
 * 重新封装的ajax请求方法
 * @param {请求地址} url 
 * @param {请求参数} params 
 * @param {回调函数} callback 
 * @param {动作类型} types 
 */
const doRequest = (url, params, callback, types) => {
  console.log(url);
  console.log(params);
  console.log(types);
  console.log('version'+app.globalData.version);
  var timestamp = new Date().getTime();
  console.log('时间戳'+timestamp);
  var oriData = types + app.globalData.version + timestamp
  var key = md5.hexMD5(oriData);
  console.log('key'+ key);
  //let allParams = '?' + objToStr(params); //组合为完成请求参数
  // var url = url + allParams + '&timeStamp=' + timestamp + '&type=' + types + '&version=' + app.globalData.version + '&key=' + key +'&param={}' ;
  console.log(url);
  wx.showLoading({
    title: '加载中',
  });
  wx.request({
    url: url,
    data: {
      type: types,
      param: params,
      // from: params.from,
      // to:params.to,
      version: app.globalData.version,
      key:key,
      timeStamp: timestamp
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: (res) => {
      console.log(res.data);
      // console.log(base64_decode(res.data.data));
      wx.hideLoading();
      callback(JSON.parse(base64_decode(res.data.data)));
    },
    fail: (res) => {
      console.log(res)
    }
  })
}

module.exports = {
  formatTime: formatTime,
  doRequest: doRequest,
  LastWeekStr: LastWeekStr,
  YesterDayStr: YesterDayStr,
  dayList:dayList,
  weekList:weekList,
  chartDayList: chartDayList
}
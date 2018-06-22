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



/**
 * 重新封装的ajax请求方法
 * @param {请求地址} url 
 * @param {请求参数} params 
 * @param {回调函数} callback 
 * @param {动作类型} types 
 */
const doRequest = (url, params, callback, types,objparams) => {
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
      param: {},
      from: params.from,
      to:params.to,
      version: app.globalData.version,
      key:key,
      timeStamp: timestamp
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: (res) => {
      console.log(res.data);
      //console.log(base64_decode(res.data.data));
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
  doRequest: doRequest
}
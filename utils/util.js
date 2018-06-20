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
const doRequest = (url, params, callback, types) => {
  console.log(url);
  console.log(params);
  console.log(callback);

  let allParams = '?' + objToStr(params); //组合为完成请求参数
  var url = url + allParams;
  console.log(url);
  wx.showLoading({
    title: '加载中',
  });
  wx.request({
    url: url,
    data: {
      x: '',
      y: '',
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: (res) => {
      console.log(res.data);
      wx.hideLoading();
      callback(res);
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
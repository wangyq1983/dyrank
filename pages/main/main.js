const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sub_menu_cur:0,
    list: [],
    listThree:[],
    listOther:[],
    listFs:[],
    listPl:[],
    listBs:[],
    dataStep:20,
    isEnd:false,
    timeType:'day', //day or week 
    time:'',
    daylist: [],
    weeklist:[],
    weeknum:0,
    dayindex:0,
    weekindex:0,
    urlApi: app.globalData.zhuboApi.dianzanApi,
    apiType: app.globalData.zhuboApi.dianzanApiType
  },

  getUrlApi:function(id){
  var dataUrlList = [app.globalData.zhuboApi.dianzanApi,
                      app.globalData.zhuboApi.fensi, 
                      app.globalData.zhuboApi.pinglun, 
                      app.globalData.zhuboApi.biaosheng]
  return dataUrlList[id];
},

getApiType:function(id){
  var dataTypeList = [app.globalData.zhuboApi.dianzanApiType,
  app.globalData.zhuboApi.fensiType,
  app.globalData.zhuboApi.pinglunType,
  app.globalData.zhuboApi.biaoshengType]
  return dataTypeList[id];
},

  menuFunc:function(e){
    console.log(e.target.dataset.id);
    let getUrl = this.getUrlApi(e.target.dataset.id);
    let getType = this.getApiType(e.target.dataset.id);
    this.setData({
      sub_menu_cur:e.target.dataset.id,
      urlApi:getUrl,
      apiType:getType,
      list:[],
      isEnd:false
    });
    if (e.target.dataset.id == 3){
      this.setData({
        time: util.YesterDayStr(),
        daylist: util.dayList()
      });

      var params = {
        from: 1,
        to: this.data.dataStep,
        timeType: this.data.timeType,
        time: this.data.time
      }
    }else{
      var params = {
        from: 1,
        to: this.data.dataStep
      }
    }
    
    util.doRequest(this.data.urlApi, params, this.zanList, this.data.apiType);
  },

  dayPickerChange: function (e) {
    console.log(e);
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      list: [],
      dayindex: e.detail.value
    });
    let params = {
      from: 1,
      to: this.data.dataStep,
      timeType: this.data.timeType,
      time: this.data.daylist[this.data.dayindex]
    }
    util.doRequest(this.data.urlApi, params, this.zanList, this.data.apiType);
  },

  weekPickerChange: function (e) {
    console.log(e);
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      list: [],
      weekindex: e.detail.value
    })
    let params = {
      from: 1,
      to: this.data.dataStep,
      timeType: this.data.timeType,
      time: this.data.weekindex
    }
    util.doRequest(this.data.urlApi, params, this.zanList, this.data.apiType);
  },

  timeType:function(e){
    var timeselect = e.currentTarget.dataset.type;
    console.log(e.currentTarget.dataset.type);
    this.setData({
      list:[],
      timeType: timeselect
    });
    if (timeselect == "day"){
      this.setData({
        time: util.YesterDayStr(),
        daylist: util.dayList()
      });
      let params = {
        from: 1,
        to: this.data.dataStep,
        timeType: this.data.timeType,
        time: this.data.time
      }
      util.doRequest(this.data.urlApi, params, this.zanList, this.data.apiType);
    } else if (timeselect == "week"){
      this.setData({
        time: util.LastWeekStr(),
        weeklist: util.weekList()
      })
      let params = {
        from: 1,
        to: this.data.dataStep,
        timeType: this.data.timeType,
        time: this.data.weeknum
      }
      util.doRequest(this.data.urlApi, params, this.zanList, this.data.apiType);
    }
  },

  //ajax方法的回调函数
  zanList:function(res){
    console.log(this.data.list)
    console.log(res)
    this.setData({
      list: this.data.list.concat(res)
    });
    console.log('list is');
    console.log(this.data.list);
    var three = this.data.list.slice(0,2);
    var other = this.data.list.slice(3);
    this.setData({
      listThree: three,
      listOther: other
    });
    if(res.length == 0){
      this.setData({
        isEnd: true
      });
    };
  },
  
  gotoZozhuDetail:function (e){
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id
    console.log('id='+id);
    wx.navigateTo({
      url: "bozhu/detail?id="+id
    })
  },

  testChart:function(e){
    wx.navigateTo({
      url: '../bar/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    console.log();
    let params = {
      from:1,
      to: this.data.dataStep
    }
    util.doRequest(this.data.urlApi, params, this.zanList, app.globalData.zhuboApi.dianzanApiType)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let params = {
      from: this.data.list.length + 1,
      to: this.data.list.length + this.data.dataStep
    }
    if (this.data.isEnd !== true){
      util.doRequest(this.data.urlApi, params, this.zanList, app.globalData.zhuboApi.dianzanApiType)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sub_menu_cur: 0,
    list: [],
    listFs: [],
    listPl: [],
    listBs: [],
    dataStep: 20,
    isEnd: false,
    urlApi: app.globalData.shipinApi.dianzanApi,
    apiType: app.globalData.shipinApi.dianzanApiType
  },

  getUrlApi: function (id) {
    var dataUrlList = [app.globalData.shipinApi.dianzanApi,
      app.globalData.shipinApi.pinglunApi,
      app.globalData.shipinApi.biaosheng]
    return dataUrlList[id];
  },

  getApiType: function (id) {
    var dataTypeList = [app.globalData.shipinApi.dianzanApiType,
      app.globalData.shipinApi.pinglunApiType,
    app.globalData.shipinApi.biaoshengType]
    return dataTypeList[id];
  },

  menuFunc: function (e) {
    console.log(e.target.dataset.id);
    let getUrl = this.getUrlApi(e.target.dataset.id);
    let getType = this.getApiType(e.target.dataset.id);
    this.setData({
      sub_menu_cur: e.target.dataset.id,
      urlApi: getUrl,
      apiType: getType,
      list: [],
      isEnd: false
    });
    let params = {
      from: 1,
      to: this.data.dataStep
    }
    util.doRequest(this.data.urlApi, params, this.zanList, this.data.apiType);
  },

  //点赞列表 
  zanList: function (res) {
    console.log(this.data.list)
    console.log(res)
    this.setData({
      list: this.data.list.concat(res)
    });
    if (res == 0) {
      this.setData({
        isEnd: true
      });
    };
    console.log(res[1])
  },

  gotoZozhuDetail: function (e) {
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "bozhu/detail?id=" + id
    })
  },

  testChart: function (e) {
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
      from: 1,
      to: this.data.dataStep
    }
    util.doRequest(this.data.urlApi, params, this.zanList, app.globalData.shipinApi.dianzanApiType)
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
    if (this.data.isEnd !== true) {
      util.doRequest(this.data.urlApi, params, this.zanList)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
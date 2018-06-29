const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sub_menu_cur: 0,
    diffMenu:[],
    list: [],
    listFeature: [],
    dataStep: 20,
    isEnd: false,
    menuApi: app.globalData.diffApi.menu,
    menuType: app.globalData.diffApi.menuType,
    oneSpecialApi: app.globalData.diffApi.oneSpecial,
    oneSpecialType: app.globalData.diffApi.oneSpecialType
  },

  menuFunc: function (e) {
    console.log(e.target.dataset.id);
    this.setData({
      sub_menu_cur: e.target.dataset.id,
      list: [],
      isEnd: false
    });
    let params = {
      // from: 1,
      // to: this.data.dataStep
      special_id: e.target.dataset.id
    }
    util.doRequest(this.data.oneSpecialApi, params, this.zanList, this.data.oneSpecialType);
  },
 
  zanList: function (res) {
    console.log(res)
    this.setData({
      list: res
    });
    // if (res == 0) {
    //   this.setData({
    //     isEnd: true
    //   });
    // };
  },

  initMenu: function(res){
    console.log('initmenu');
    console.log(res);
    this.setData({
      diffMenu:res,
      sub_menu_cur:res[0].id
    });
    let params = {
      // from: 1,
      // to: this.data.dataStep
      special_id: this.data.sub_menu_cur
    }
    util.doRequest(this.data.oneSpecialApi, params, this.zanList, this.data.oneSpecialType);
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    let params = {
    }
    util.doRequest(this.data.menuApi, params, this.initMenu, app.globalData.diffApi.menuType)
  },
  gotoDetail:function(e){
    console.log(e.currentTarget.dataset);
    let cid = e.currentTarget.dataset.cid;
    let sid = e.currentTarget.dataset.sid;
    wx.navigateTo({
      url: "diffdetail/detail?special_id=" + sid +"&classify_id="+cid
    })
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
    // let params = {
    //   from: this.data.list.length + 1,
    //   to: this.data.list.length + this.data.dataStep
    // }
    // if (this.data.isEnd !== true) {
    //   util.doRequest(this.data.urlApi, params, this.zanList)
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
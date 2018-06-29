const util = require('../../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataCon: {},
    testVideo: ''
  },

  //详情渲染
  zanDetail: function (res) {
    console.log(res);
    this.setData({
      dataCon: res,
    });
    wx.setNavigationBarTitle({
      title: res.special_comment
    })
  },
  //复制路径到剪贴板
  copyPath: function (e) {
    wx.showModal({
      title: '提示',
      confirmText: '复制链接',
      content: '点击“复制链接”按钮，粘贴到手机浏览器中打开',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.setClipboardData({
            data: e.currentTarget.dataset.path,
            success: function () {
              console.log('复制成功');
              // wx.getClipboardData({
              //   success: function (res) {
              //     console.log(res.data) // data
              //   }
              // })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });

    console.log(e.currentTarget.dataset.path);

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('detail');
    console.log(options);
    // var params = {
    //   id: options.id
    // };
    var params = { 
      special_id: options.special_id, 
      classify_id: options.classify_id
      };
    util.doRequest(app.globalData.diffApi.detail, params, this.zanDetail, app.globalData.diffApi.detailType)
  },

  shareTest: function () {
    console.log(12)
    wx.showShareMenu({
      withShareTicket: true
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
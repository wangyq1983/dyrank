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
      testVideo: 'https://api.amemv.com/aweme/v1/play/?video_id=42c41824794a48c998c1f469fd89aa61&line=1&ratio=720p&watermark=0&media_type=4&vr_type=0&test_cdn=None&improve_bitrate=0'
    });
    wx.setNavigationBarTitle({
      title: "话题" + res.topic_title
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
    console.log(options);
    var params = {
      id: options.id
    };
    util.doRequest(app.globalData.huatiApi.detail, params, this.zanDetail, app.globalData.huatiApi.detailType)
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
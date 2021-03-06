//app.js
//var webhost = 'http://api-dev.jiyoushe.cn/v2/';
//var webhost = "http://192.168.101.226:8061/";
//var webhost = "http://192.168.100.251:8061/";
var webhost = "https://douyin-verify.haimacloud.com/";
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
  },
  globalData: {
    userInfo: null,
    version: "1.0",
    zhuboApi: {
      dianzanApi: webhost + "anchor",
      dianzanApiType: "aLike",
      fensi: webhost + "anchor",
      fensiType: "aFans",
      pinglun: webhost + "anchor",
      pinglunType: "aComment",
      biaosheng: webhost + "anchorRise",
      biaoshengType: "aRise",
      detail: webhost + "anchorDetail",
      detailType: "anchor"
    },
    huatiApi: {
      zuireApi: webhost + "topicHottest",
      zuireApiType: "tHottest",
      biaosheng: webhost + "topicRise",
      biaoshengType: "tRise",
      detail: webhost + "topicDetail",
      detailType: "topic"
    },
    yinyueApi: {
      dianzanApi: webhost + "musicHottest",
      dianzanApiType: "mHottest",
      biaosheng: webhost + "musicRise",
      biaoshengType: "mRise",
      detail: webhost + "musicDetail",
      detailType: "music"
    },
    shipinApi: {
      dianzanApi: webhost + "video",
      dianzanApiType: "vLike",
      pinglunApi: webhost + "video",
      pinglunApiType: "vComment",
      biaosheng: webhost + "videoRise",
      biaoshengType: "vRise"
    },
    diffApi: {
      menu: webhost + "special",
      menuType: "title",
      oneSpecial: webhost + "oneSpecial",
      oneSpecialType: "feature",
      detail: webhost + "specialDetail",
      detailType: "special"
    }
  }
});

const util = require('../../../utils/util.js');
const app = getApp();
import * as echarts from '../../../ec-canvas/echarts';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataCon: {},
    ec: {
      lazyLoad: true
    },
  },

  //详情渲染
  zanDetail: function (res) {
    console.log('huatiDetail');
    console.log(res);
    this.setData({
      dataCon: res,
    });
    wx.setNavigationBarTitle({
      title: "话题" + res.topic_title
    });
    this.barComponent = this.selectComponent('#mychart-dom-bar');
    this.init_bar();
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
  init_bar: function () {
    //初始化图表
    this.barComponent.init((canvas, width, height) => {
      // 初始化图表
      const barChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      barChart.setOption(this.getBarOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return barChart;
    });
  },
  getBarOption: function () {

    // var commitMax = util.maxAxis(this.data.dataCon.comment_counts);
    var likeMax = util.maxAxis(this.data.dataCon.new_video_count);
    // var commitInterval = util.intervalNum(this.data.dataCon.comment_counts);
    var likeInterval = util.intervalNum(this.data.dataCon.new_video_count);

    // console.log('commitMax' + commitMax);
    console.log('likeMax' + likeMax);
    // console.log('commitInterval' + commitInterval);
    console.log('likeInterval' + likeInterval);
    // console.log('testnum' + testnum);

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#0ff'
          }
        }
      },
      toolbox: {
      },
      legend: {
        data: ['新增视频量'],
        textStyle: {
          color: '#fff'          //legend字体颜色 
        }
      },
      xAxis: [
        {
          type: 'category',
          data: util.chartDayList(),
          axisPointer: {
            type: 'shadow'
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#979797',
              fontSize: '12'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#979797',
              width: 1,   //这里是坐标轴的宽度,可以去掉
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '新增视频量',
          min: 0,
          max: likeMax,
          interval: likeInterval,
          axisLabel: {
            formatter: function (value) {
              var dzl = [];
              // console.log('value');
              // console.log(value);
              // console.log(typeof value);
              if (value > 9999) {
                var value1 = Math.round(value / 10000) + 'w';
              } else {
                var value1 = value;
              }
              dzl.push(value1);
              return dzl;
            }
          },
          axisLine: {
            lineStyle: {
              color: '#979797',
              width: 1,   //这里是坐标轴的宽度,可以去掉
            }
          }
        }
      ],
      series: [
        {
          name: '新增视频量',
          type: 'bar',
          barWidth: 10,
          barBorderRadius: 50,
          itemStyle: {
            normal: {
              color: '#50E3C2',
              barBorderRadius: [10, 10, 10, 10],
            },
          },
          data: this.data.dataCon.new_video_count
        },

      ]
    }
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
const util = require('../../../utils/util.js');
const app = getApp();

import * as echarts from '../../../ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
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
      // feature: {
      //   dataView: { show: true, readOnly: false },
      //   magicType: { show: true, type: ['line', 'bar'] },
      //   restore: { show: true },
      //   saveAsImage: { show: true }
      // }
    },
    legend: {
      data: ['蒸发量', '降水量', '平均温度']
    },
    xAxis: [
      {
        type: 'category',
        data: ['5/12', '5/13', '5/14', '5/15', '5/16', '5/17', '5/18'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '水量',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value} ml'
        }
      },
      {
        type: 'value',
        name: '温度',
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
          formatter: '{value} °C'
        }
      }
    ],
    series: [
      {
        name: '蒸发量',
        type: 'bar',
        barWidth: 10,
        barBorderRadius: 50,
        itemStyle: {
          normal: {
            color: '#50E3C2',
            barBorderRadius: [10, 10, 10, 10],
          },
        },
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6]
      },
      {
        name: '降水量',
        type: 'bar',
        barWidth: 10,
        itemStyle: {
          normal: {
            color: '#00A0FA',
            barBorderRadius: [10, 10, 10, 10]
          },
        },
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
      },
      {
        name: '平均温度',
        type: 'line',
        yAxisIndex: 1,
        symbolSize: 20,
        smooth: false,
        symbol: 'circle',
        color: '#00A0FA',
        lineStyle: {
          type: 'solid',
          color: '#50E3C2',
          width: 6
        },
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
      }
    ]
  };

  chart.setOption(option);
  return chart;
}



Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataCon:{},
    testVideo:'',
    ec: {
      onInit: initChart
    }
  },

  //详情渲染
  zanDetail: function (res) {
    console.log(res);
    this.setData({
      dataCon:res,
      testVideo:'https://api.amemv.com/aweme/v1/play/?video_id=42c41824794a48c998c1f469fd89aa61&line=1&ratio=720p&watermark=0&media_type=4&vr_type=0&test_cdn=None&improve_bitrate=0'
    });
    wx.setNavigationBarTitle({
      title: "播主"+res.nickname
    })
  },
  //复制路径到剪贴板
  copyPath:function(e){
    wx.showModal({
      title: '提示',
      confirmText:'复制链接',
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
    var params ={
      id:options.id
    };
    util.doRequest(app.globalData.zhuboApi.detail, params, this.zanDetail, app.globalData.zhuboApi.detailType)
  },

  shareTest:function(){
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
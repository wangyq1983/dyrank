const util = require('../../../utils/util.js');
const app = getApp();

import * as echarts from '../../../ec-canvas/echarts';







Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataCon:{},
    ec: {
      
    },
  },

  initChart: function (canvas, width, height,obj){
    var chart = echarts.init(canvas, null, {
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
      },
      legend: {
        data: ['点赞量', '评论量'],
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
          name: '点赞量',
          min: 0,
          max: 334411,
          interval: 50000,
          axisLabel: {
            formatter: '{value}w'
          },
          axisLine: {
            lineStyle: {
              color: '#979797',
              width: 1,   //这里是坐标轴的宽度,可以去掉
            }
          }
        },
        {
          type: 'value',
          name: '评论量',
          min: 0,
          max: 334411,
          interval: 50000,
          axisLabel: {
            formatter: '{value}w'
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
          name: '点赞量',
          type: 'bar',
          barWidth: 10,
          barBorderRadius: 50,
          itemStyle: {
            normal: {
              color: '#50E3C2',
              barBorderRadius: [10, 10, 10, 10],
            },
          },
          data: obj.comment_counts
        },
        {
          name: '评论量',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            normal: {
              color: '#00A0FA',
              barBorderRadius: [10, 10, 10, 10]
            },
          },
          data: ["1000", "51000", "101000", "151000", "201000", "251000", "301000"]
        },
      ]
    };

    chart.setOption(option);
    return chart;
  },

  //详情渲染
  zanDetail: function (res) {
    console.log('res');
    console.log(res);
    

    this.setData({
      dataCon:res,
      ec:{
        onInit: this.initChart('','100%','',res)
      }
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
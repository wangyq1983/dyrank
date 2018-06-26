import * as echarts from '../../ec-canvas/echarts';

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
        itemStyle:{
          normal:{
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
        symbolSize:20,
        smooth:false,
        symbol: 'circle', 
        color:'#00A0FA',
        lineStyle:{
          type:'solid',
          color:'#50E3C2',
          width:6
        },
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
  }
});

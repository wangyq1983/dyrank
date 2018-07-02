Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    pdata: {
      type: Array,
      value:[]
    },
    num:{
      type: Number
    },
    gid:{
      type:Number
    }

  },
  data: {
    sameData:{}
    // 这里是一些组件内部数据
    
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { },
    gotoZozhuDetail:function(e){
      console.log(e.currentTarget.dataset.id);
      let id = e.currentTarget.dataset.id
      console.log('id=' + id);
      wx.navigateTo({
        url: "bozhu/detail?id=" + id
      })
    }
  }
})
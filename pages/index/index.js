//获取应用实例
const app = getApp()

import util from "../../pages/util/util.js";

Page({

  data:{
    //tabbar
    tabbar: {},
    newslist:[],
    loading:true
  },

  onLoad:function(){ 

    this.getData();

    // 底部导航栏tabbar显示的方法
    app.editTabbar();

    //获取地理位置
    var that = this;
    wx.request({
      url: 'url',
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      success(res){
        console.log(res);
        that.setData({
          result:res.data
        });
      },
      fail: function (res) {
        console.log("fail");
      }
    })
  },


  
  //获取新闻列表数据
  getData(size=0){
    wx.cloud.callFunction({
      name:"news_list",
      data:{
        size:size
      }
    })
    .then(res=>{
      res.result.data.forEach(item=>{
        let hits= item.hits?item.hits:0
        item.hits=util.getNumber(hits);
        item._createTime=util.getTime(item._createTime,4)
      })

      if (res.result.data<=0){
        this.setData({
          loading:false
        })
      }

      console.log(res);
      let oldData = this.data.newslist;
      let newData = oldData.concat(res.result.data)
      this.setData({
        newslist:newData
      })
    })
  },

   //获取地理位置
   getLocationDetail () {
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log("lat:" + latitude + ",lon:" + longitude)
        this.getCity(latitude, longitude);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  getCity (latitude, longitude) {
    wx.request({
        url: "http://api.map.baidu.com/reverse_geocoding/v3/",
        data: {
          ak: "TNHtjUbuw7CiqHc9Z4jGCUT99GUqvW35",
          output: "json",
          location: latitude + "," + longitude
        },
      success: res => {
        console.log('获取成功的地理数据',res)
        this.setData({
          country:res.data.result.addressComponent.country,
          province:res.data.result.addressComponent.province,
          city:res.data.result.addressComponent.city,
          district:res.data.result.addressComponent.district
        })
      },
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getData(this.data.newslist.length);
  }
  
})

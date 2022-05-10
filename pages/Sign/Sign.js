Page({
  data:{
  firstTime:'0',
  flag:true
  },
  onBindTap:function(){
  var D=(new Date()).getDate().toString();
  if(D != wx.getStorageSync('D')){
   wx.setStorageSync('D', D);
   wx.setStorage({
   key: 'FirstTime',
   data: (parseInt(this.data.firstTime) + 1).toString(),
   })
   var that = this;
   var firstTime = wx.getStorage({
   key: 'FirstTime',
   success: function (res) {
    that.setData({
    firstTime: res.data,
    flag:false
    })
    wx.showToast({
    title: '签到成功！',
    icon: 'success',
    duration: 1200,
    mask: true
    })
   },
   })
  }else{
   wx.showToast({
   title: '今日打卡已完成！',
   icon:'success',
   duration:1200,
   mask:true
   })
  }
  },
  onShow:function(options){
  var that = this;
  var firstTime = wx.getStorage({
   key: 'FirstTime',
   success: function (res) {
   that.setData({
    firstTime: res.data
   })
   },
  })
  var D = (new Date()).getDate().toString();
  if (D != wx.getStorageSync('D')){
   this.setData({
   flag:true
   })
  }else{
   this.setData({
   flag:false
   })
  }
  },
 })
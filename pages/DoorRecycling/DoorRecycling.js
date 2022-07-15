
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false
  },

 // 外面的弹窗
 btn: function () {
  this.setData({
    showModal: true
  })
},

// 禁止屏幕滚动
preventTouchMove: function () {
},

// 弹出层里面的弹窗
ok: function () {
  this.setData({
    showModal: false
  })
},
  
handleContact (e) {
  console.log(e.detail.path)
  console.log(e.detail.query)
},

// 跳转至表单信息填写界面
  DirectNav(){
    wx.navigateTo({
      url: '../form/form',
    })
  }
  
})
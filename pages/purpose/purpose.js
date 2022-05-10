//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: null,//是否已经弹出
    Page:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
  },

  // 中间的回收按钮动画效果
  btnPop() {
    this.setData({
      isShow: !this.data.isShow,
      Page:!this.data.Page
    })
  },
})
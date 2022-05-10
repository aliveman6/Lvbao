// 获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    loginOut:false
  },

  // 事件处理函数
  onLoad() {
    app.editTabbar();
    let user = wx.getStorageSync('user')
      console.log('进入小程序的获取缓存',user)
      this.setData({
        userInfo:user
      })
      wx.setStorageSync('user', null)
  },

  //授权登录
  login(){
    let that = this
    console.log('点击事件执行了')
  wx.getUserProfile({
    desc: '必须要授权才能登录',
    success: res => {
      let user = res.userInfo
      
      //把用户缓存到本地
      wx.setStorageSync('user', user)
      console.log('用户信息',res.userInfo)
      that.setData({
        userInfo:user
      })
    },
    fail: res => {
      console.log('授权失败',res)
    }
  })
    },
  
  //退出登录
  loginOut(){
    this.setData({
      userInfo:''
    })
  },
  
  
})
// 获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    loginOut:false,
    showModalStatus: false
  },

  // “分享”页面的弹窗事件函数
  powerDrawer: function(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    },
    util: function(currentStatu) {
      
    /* 动画部分 */
    // 创建动画实例 
    var animation = wx.createAnimation({
     duration: 100, //动画时长 
     timingFunction: "linear", //线性 
     delay: 0 //0则不延迟 
    });
   
    // 这个动画实例赋给当前的动画实例 
    this.animation = animation;
   
    // 执行第一组动画 
    animation.opacity(0).rotateY(100).step();
   
    // 导出动画对象赋给数据对象储存 
    this.setData({
     animationData: animation.export()
    })
   
    // 设置定时器到指定时候后，执行第二组动画 
    setTimeout(function() {
     // 执行第二组动画 
     animation.opacity(1).rotateY(0).step();
     // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
     this.setData({
     animationData: animation
     })
   
     //关闭 
     if (currentStatu == "close") {
     this.setData({
      showModalStatus: false
     });
     }
    }.bind(this), 200)
   
    // 显示 
    if (currentStatu == "open") {
     this.setData({
     showModalStatus: true
     });
    }
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

  // 分享页面的自定义事件
  onShareAppMessage: function (res) {
    console.log(res.from)
    return {
      title: '绿宝，只为有你',//自定义转发标题
      path:'/pages/index/index',//当前页面的路径 ，必须是以 / 开头的完整路径
      // imageUrl: ''//不设置此字段时，默认截取当前页面作为展示的图片
    }
},

    handleContact (e) {
      console.log(e.detail.path)
      console.log(e.detail.query)
}

})
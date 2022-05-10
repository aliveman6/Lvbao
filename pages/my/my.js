
// 获取应用实例
const app = getApp()

Page({

  data: {
    //tabbar
    tabbar: {},
    userInfo: '',
    loginOut:false,
    openid:''
  },

  // 事件处理函数
  onLoad() {
    app.editTabbar();
    let user = wx.getStorageSync('user')
      console.log('进入小程序的获取缓存',user)
      this.setData({
        userInfo:user
      })
  },

    //授权登录
      login(e){
      const that = this
      console.log('点击事件执行了',e)
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

        // 把获取的用户数据放到后台的cms后台管理系统
        wx.cloud.callFunction({
          name:'addUsers',
          data:{
            name:user.nickName,
            headshot:user.avatarUrl
          }
        })
        complete: res => {
          console.log('传参数据为',res)
       }
      },
      fail: res => {
        console.log('授权失败',res)
      },
    })


    //获取用户openid
    // let that = this
    wx.cloud.callFunction({
      name:"openid",
      success(res){
        console.log("success",res.result.openid)
        that.setData({
          openid:res.result.openid
        })
      }
    })
  },

    //退出登录
    loginOut(){
      this.setData({
        userInfo:''
      })
    wx.setStorageSync('user', null)
    }
    
})
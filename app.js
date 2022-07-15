
App({
  onLaunch() {

    // 隐藏系统tabbar
     wx.hideTabBar();

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
    // console.log('小程序启动啦！')



    wx.cloud.init({
      env:'cloud1-0gsuywlee1316d01'
    })

  },

  
onShow(){
   //隐藏系统tabbar
   wx.hideTabBar();
},

editTabbar: function () {
  let tabbar = this.globalData.tabBar;
  let currentPages = getCurrentPages();
  let _this = currentPages[currentPages.length - 1];
  let pagePath = _this.route;
  (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
  for (let i in tabbar.list) {
    tabbar.list[i].selected = false;
    (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
  }
  _this.setData({
    tabbar: tabbar
  });
},





  globalData: {
    userInfo: null,

    tabBar:{
      "backgroundColor": "#ffffff",
      "color": "#CCCCCC",
      "selectedColor": "#80AF08",
    "list": [
      {
        "pagePath": "/pages/index/index",
        "iconPath": "icon/home.png",
        "selectedIconPath": "icon/_home.png",
        "text": "首页"
      },
      {
        "pagePath": "/pages/purpose/purpose",
        "iconPath": "icon/purpose.png",
        "selectedIconPath": "icon/_purpose.png",
        "text": "用途"
      },
      {
        "pagePath": "/pages/service/service",
        "iconPath": "icon/service.png",
        "isSpecial": true,
        "text": ""
      },
      {
        "pagePath": "/pages/order/order",
        "iconPath": "icon/order.png",
        "selectedIconPath": "icon/_order.png",
        "text": "订单"
      },
      {
        "pagePath": "/pages/my/my",
        "iconPath": "icon/my.png",
        "selectedIconPath": "icon/_my.png",
        "text": "我的"
      },

    ]
  }

  },

})
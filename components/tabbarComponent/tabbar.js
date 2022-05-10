//获取应用实例
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#80AF08",
        "list": [
          {
            "pagePath": "pages/index/index",
            "iconPath": "icon/home.png",
            "selectedIconPath": "icon/_home.png",
            "text": "首页"
          },
          {
            "pagePath":"pages/purpose/purpose",
            "iconPath": "icon/purpose.png",
            "selectedIconPath": "icon/_purpose.png",
            "text": "用途"
          },
          {
            "pagePath": "pages/service/service",
            "iconPath": "icon/service.png",
            "isSpecial": true,
            "text": ""
          },
          {
            "pagePath": "pages/order/order",
            "iconPath": "icon/order.png",
            "selectedIconPath": "icon/_order.png",
            "text": "订单"
          },
          {
            "pagePath": "pages/my/my",
            "iconPath": "icon/my.png",
            "selectedIconPath": "icon/_my.png",
            "text": "我的"
          },
    
        ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //tabbar
    tabbar: {},
    tabs:['进行中','已完成','已评价','已取消'],
    currentTab:0,
    list:[]
  },


  // 上方tab按钮的事件函数
  selectTab(e){
    let index = e.currentTarget.dataset.index
    console.log(index)
    this.setData({
      currentTab:index
    })

    // 点击后的订单按钮与CMS后台管理系统的订单枚举类型的枚举值相对应
    if (index == 3) {
      index = -1
    }
    console.log('相应的订单状态值',index)
    this.getList(index)
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    this.getList(0);
  },

  // 获取cms管理系统的订单数据
  getList(status){
    wx.cloud.callFunction({
      name:"getOrder",
      data:{
        status:status       //    订单状态 1订单已评价 0新订单 2订单已完成 -1订单已取消
      }
    })
    .then(res => {
      console.log("获取订单数据成功",res)
      this.setData({
        list:res.result.data
      })
    })
  },

  //取消订单
  cancel(e){
    let id = e.currentTarget.dataset.id
    console.log('id的数据',id)
  wx.cloud.callFunction({
    name:'change',
    data:{
      status:0,
      id:id
    }
  })
  .then(res =>{
    console.log('成功',res)
    this.getList(0)
  })
  .catch(err => {
    console.log('失败',err)
  })
  },

   //完成订单
   finish(e){
    let id = e.currentTarget.dataset.id
    console.log('id的数据',id)
  wx.cloud.callFunction({
    name:'finish',
    data:{
      status:0,
      id:id
    }
  })
  .then(res =>{
    console.log('成功',res)
    this.getList(0)
  })
  .catch(err => {
    console.log('失败',err)
  })
  }
  
})
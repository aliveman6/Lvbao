//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Recycler:'',
    tabs:['进行中','已完成',],
    currentTab:0,
    list:[],
    showDialog: true
  },


  // 弹窗控制
  toggleDialog() {
    this.setData({
     showDialog: !this.data.showDialog
    });
   },

  // 上方tab按钮的事件函数
  selectTab(e){
    let index = e.currentTarget.dataset.index
    console.log(index)
    this.setData({
      currentTab:index
    })

    // 点击后的订单按钮与CMS后台管理系统的订单枚举类型的枚举值相对应
    // if (index == 3) {
    //   index = -1
    // }
    console.log('相应的订单状态值',index)
    this.getList(index)
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log("options",options)
    this.setData({
      Recycler:options.Recycler
    })

    app.editTabbar();
    this.getList(0);
  },

  getList(status){
    wx.cloud.database().collection('orders')
    .where({
      status: status,               //    订单状态 1订单已评价 0新订单 2订单已完成 -1订单已取消
    })
    .get()
    .then(res => {
      console.log('请求到的订单数据',res)
      this.setData({
        list:res.data
      })
    })
    .catch(res => {
      console.log('请求订单数据失败',res)
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
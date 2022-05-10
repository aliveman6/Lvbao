

import util from "../../pages/util/util";



const db = wx.cloud.database()


Page({
  //初始化数据
  data: {
   index: 0,
   date: '',
   time: '',
   region: [],
   allValue:'',
   status:0,
   openid:'',
   totalMoney:0,
   totalWeight:0,
   createTime:''
  },

onLoad: function (options) {
  this.getMoneyOrder();

},


getMoneyOrder(){
  
  wx.cloud.callFunction({
    name:"getMoneyOrder"
  })
  .then(res =>{
    console.log("预估金额表",res)
    this.setData({
      MoneyOrderList:res.result.data
    })
  })

},


add(e){
  const id = e.currentTarget.dataset.id
  console.log('点击了+',e.currentTarget.dataset.id)
  const list = this.data.MoneyOrderList
  let totalMoney = this.data.totalMoney
  let totalWeight = this.data.totalWeight

  console.log('当前预估金额表',list)
  list.forEach(item => {
    // console.log('遍历了' + item.RecycleSorting)
    if (item._id == id) {
      item.num += 1
      this.setData({
        totalMoney:this.data.totalMoney += item.Money,
        totalWeight:this.data.totalWeight += 1
      })
    }
  })
  console.log('遍历后的预估金额表',list)
  this.setData({
    MoneyOrderList:list
  })
},

subtract(e){
  const id = e.currentTarget.dataset.id
  console.log('点击了-',e.currentTarget.dataset.id)
  const list = this.data.MoneyOrderList
  console.log('当前预估金额表',list)
  list.forEach(item => {
    // console.loTg('遍历了' + item.RecycleSorting)
    if (item._id == id) {
      if (item.num > 0){
        item.num = item.num - 1
        this.setData({
          totalMoney:this.data.totalMoney -= item.Money,
          totalWeight:this.data.totalWeight -= 1
        })
      }else{
        wx.showToast({
          icon:"none",
          title: '数量不能小于0',
        })
      }
    }
  })
  console.log('遍历后的预估金额表',list)
  this.setData({
    MoneyOrderList:list
  })
},



  //表单提交按钮
  formSubmit: function(e) {
    const that = this;

    let totalMoney = this.data.totalMoney
    let totalWeight = this.data.totalWeight

    // let createTime = Date.now();
    // createTime=util.getTime(createTime,4)



    
   console.log('form发生了submit事件，携带数据为：', e.detail.value)
  //  console.log("createTime",createTime)
   this.setData({
    allValue:e.detail.value,
    totalMoney,
    totalWeight
   })
   var name = e.detail.value.name
   var phone = e.detail.value.phone
   var idcard = e.detail.value.idcard
   var radio = e.detail.value.radio
   var areaPicker = e.detail.value.areaPicker
   var datePicker = e.detail.value.datePicker
   var timePicker = e.detail.value.timePicker
   var address = e.detail.value.address
   var remarks = e.detail.value.remarks
   var status = e.detail.value.status

  //  校验表单的if语句
   if (name == '' || phone == '' || idcard == '' || radio == '' || areaPicker == '' || datePicker == '' || timePicker == '' || address == '') {
     wx.showToast({
       title: '请输入完整的信息',
       icon:"none"
     })
     return;
   } else {
    wx.showModal({
      title: '提交成功!',
      content: '感谢您的填写，后续将有工作人员跟踪处理',
      showCancel: false ,   //去掉取消按钮
      confirmText: '确定',
      cancelText: '取消',
      confirmColor: '#09BB07'
    })
   }


   this.setData({
     name:e.detail.value.name,
     phone:e.detail.value.phone
   })




    //获取用户openid
    // let that = this
    // wx.cloud.callFunction({
    //   name:"openid",
    //   success(res){
    //     console.log("success",res.result.openid)
    //     that.setData({
    //       openid:res.result.openid
    //     })
    //   }
    // })



    


  //  调用名为“add”的云函数添加到CMS后台管理系统的订单表上
   wx.cloud.callFunction({
     name:"add",
     data: {
      name:name,
      phone:parseInt(phone),
      radio:radio,
      areaPicker:areaPicker,
      address:address,
      datePicker:datePicker,
      timePicker:timePicker,
      remarks:remarks,
      status:0,
      totalMoney:parseInt(totalMoney),
      totalWeight:parseInt(totalWeight),
      // createTime:parseInt(createTime)
     },
     complete: res => {
       console.log('传参数据为',res)
    }
   })




  },

  //表单重置按钮
  formReset: function(e) {

    const that = this;
    let totalMoney = this.data.totalMoney
    let totalWeight = this.data.totalWeight

   console.log('form发生了reset事件，携带数据为：', e.detail.value)
   this.setData({
    allValue:'',
    totalMoney:0,
    totalWeight:0
   })
  },

  //---------------------与选择器相关的方法
  //地区选择
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  //日期选择
  bindDateChange: function(e) {
   this.setData({
    date: e.detail.value
   })
  },

  //时间选择
  bindTimeChange: function(e) {
   this.setData({
    time: e.detail.value
   })
  },


  // createTime(){
  //       let createTime = Date.now();
  //   wx.getUserProfile({
  //     desc: '获取订单创建时间',
  //     success:res=>{
  //       let createTime = Date.now();
  //       createTime=util.getTime(createTime,4)
  //       console.log("获取的订单创建时间",createTime)
  //     }
      
  //   })
  // },










 })
 
 
 
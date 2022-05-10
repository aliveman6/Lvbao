
Page({

  //初始化数据
  data: {
   index: 0,
   allValue:'',
   img:''
  },

  //表单提交按钮
  formSubmit: function(e) {
    const that = this;
   console.log('form发生了submit事件，携带数据为：', e.detail.value)
   this.setData({
    allValue:e.detail.value
   })
   var name = e.detail.value.name
   var phone = e.detail.value.phone
   var idcard = e.detail.value.idcard
   var radio = e.detail.value.radio
   var remarks = e.detail.value.remarks

  //  校验表单信息的if语句
   if (name == '' || phone == '' || idcard == '' || radio == '' || remarks == '') {
     wx.showToast({
       title: '请输入完整的信息',
       icon:"none"
     })
     return;
   } else {
    wx.showModal({
      title: '提交成功!',
      content: '感谢您的填写，后续将有工作人员与你联系，请保持电话畅通',
      showCancel: false ,   //去掉取消按钮
      confirmText: '确定',
      cancelText: '取消',
      confirmColor: '#09BB07'
    })
   }

  //  读取cloud文件夹里名为RecyclerApplication的云函数
   wx.cloud.callFunction({
     name:"RecyclerApplication",
     data: {
      name:name,
      phone:parseInt(phone),
      idcard:parseInt(idcard),
      radio:radio,
      remarks:remarks
     },
     complete: res => {
       console.log('传参数据为',res)
    }
   })
  },

  //表单重置按钮
  formReset: function(e) {
   console.log('form发生了reset事件，携带数据为：', e.detail.value)
   this.setData({
    allValue:''
   })
  },


 })
 
 
 
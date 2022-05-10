// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext()



  return await db.collection('orders')

  .add({
    data: {
      name:event.name,
      phone:event.phone,
      radio:event.radio,
      areaPicker:event.areaPicker,
      address:event.address,
      datePicker:event.datePicker,
      timePicker:event.timePicker,
      remarks:event.remarks,
      status:event.status,
      totalMoney:event.totalMoney,
      totalWeight:event.totalWeight,
      // createTime:event.createTime
    }
   })

}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  
  const db = cloud.database()
  const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    
    return await db.collection("news").doc(event.id)
    .update({
        data:{
            CollectionStatus:event.CollectionStatus
        }
    })
    .then(res => {
        console.log('改变收藏状态成功',res)
    })
}
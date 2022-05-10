// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  })

  const db = cloud.database();
  const _ = db.command
  

// 云函数入口函数
exports.main = async (event, context) => {
    const openid = cloud.getWXContext().OPENID  
    let {nickName,avatarUrl,posttime,artid}=event;

    let count = await db.collection("acticle_like").where({
      artid,
      openid
    })
    .count();

    if(count.total){
      return await db.collection("acticle_like").where({
        artid,
        openid
      })
      .remove();
    }

    return await db.collection("acticle_like").add({
      data:{
        nickName,avatarUrl,posttime,artid,openid
      }
    })
}
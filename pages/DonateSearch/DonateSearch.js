

const db = wx.cloud.database()
let searchKey = ''

Page({

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("options",options)
        let searchKey = options.searchKey
        db.collection('DonateWithLove').where({
            ProjectTitle: db.RegExp({
              regexp:searchKey,
              options:'i'
            })
          })
          .get()
          .then(res => {
            console.log('搜索成功',res)
            this.setData({
                list:res.data
            })
          })
          .catch(res => {
            console.log('搜索失败',res)
          })
    },


  //去到项目详情页
  goDetail(e){
  wx.navigateTo({
    url: '/pages/DonateTextDeatil/DonateTextDeatil?id=' + e.currentTarget.dataset.id,
  })
}


})
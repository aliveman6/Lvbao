
const db = wx.cloud.database()
let searchKey = ''

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getProjectList();
        this.getProjectList2();
    },


    //获取用户输入的内容
    getSearch(e){
      searchKey = e.detail.value
    },

    //触发搜索事件
    goSearch(){
      if (searchKey && searchKey.length > 0) {
        //搜索的触发
        wx.navigateTo({
          url: '/pages/DonateSearch/DonateSearch?searchKey=' + searchKey,
        })
      }else{
        wx.showToast({
          icon:"error",
          title: '搜索词为空',
        })
      }
    },


    // 获取爱心捐赠项目的详情页数据
    getProjectList(){
        db.collection('DonateWithLove')
    .where({
        ProjectStatus: 0,            
    })
    .get()
    .then(res => {
      console.log('请求到的订单数据',res)
      this.setData({
          ProjectList:res.data
      })
    })
    .catch(res => {
      console.log('请求订单数据失败',res)
    })

  },

// 获取爱心捐赠项目的详情页数据
getProjectList2(){
db.collection('DonateWithLove')
.where({
    ProjectStatus: 1,            
})
.get()
.then(res => {
  console.log('请求到的订单数据',res)
  this.setData({
      ProjectList2:res.data
  })
})
.catch(res => {
  console.log('请求订单数据失败',res)
})
},

//去到项目详情页
goDetail(e){
  wx.navigateTo({
    url: '/pages/DonateTextDeatil/DonateTextDeatil?id=' + e.currentTarget.dataset.id,
  })
}

})
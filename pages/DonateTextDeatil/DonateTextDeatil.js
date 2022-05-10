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

        // 展示项目的详情页
        wx.cloud.database().collection('DonateWithLove')
        .doc(options.id)
        .get()
        .then(res => {
            console.log('详情页数据',res)
            this.setData({
                detail:res.data
            })
        })
    },

})
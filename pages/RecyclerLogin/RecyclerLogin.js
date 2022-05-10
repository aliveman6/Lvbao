Page({

    data: {
        account:'',
        password:''
    },

    // 获取用户账号
    getAccount(event){
    this.setData({
        account:event.detail.value
    })
    },

    // 获取用户密码
    getPassword(event){
    this.setData({
        password:event.detail.value
    })
    },

    // 回收员登录
    login(){
    let account = this.data.account
    let password = this.data.password
    console.log('账号',account,'密码',password)
    if (account.length < 4) {
        wx.showToast({
            icon:'none',
          title: '账号至少4位',
        })
        return
    }
    if (password.length < 4) {
        wx.showToast({
            icon:'none',
          title: '密码至少4位',
        })
        return
    }

    wx.cloud.database().collection('RecyclerUsers').where({
        account:account
    }).get({
        success(res) {
            console.log('获取数据成功',res)
            let user = res.data[0]
            console.log("user",user)
            
            if (password == user.password) {
                console.log('登录成功')
                wx.showToast({
                    icon:'success',
                  title: '登录成功',
                })
                wx.navigateTo({
                  url: '../RecyclerLogs/RecyclerLogs?Recycler='+user.Recycler,
                })
            }else{
                console.log('登录失败')
                wx.showToast({
                    icon:'none',
                  title: '账号或密码不正确'
                })
            }
        },
        fail(res) {
            console.log('获取数据失败',res)
        }
    })
    }
    
})
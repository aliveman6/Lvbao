//获取应用实例
const app = getApp()

let id,index;
let CollectionStatus = false

Page({

  data: {
    popupEvaluation: {
      isShow: false, // 评论框弹层弹窗是否显示
      id: null, // id
      typeName: '',
      isClear: false // 是否清空上次的数据
    },
    evaluationData: [], // 评论数据
    paddingHeight: '', // 页面需要填充的高度，输入框获取焦点时用到
    scrollViewHeight: '', // 滚动区域高度
    scrollIntoView: '', // 滚动的节点
    loading:true,
    imgUrl:'https://636c-cloud1-0gsuywlee1316d01-1309842656.tcb.qcloud.la/image/%E6%94%B6%E8%97%8F%EF%BC%88%E7%94%A8%EF%BC%89.png', //收藏按钮
    detail:''
  },

  
  onLoad: function (options) {
    id = options.id;
    index = options.index;
    this.getDetail();
    this.initData() // 未对接接口时，初始化一堆数据便于视图观察
    this.getDom('.page-footer', res => {
      const windowHeight = wx.getSystemInfoSync().windowHeight // 可使用窗口高度，单位px
      this.setData({
        scrollViewHeight: windowHeight - res[0].height + 'px' // 设置scroll-view的高度
      });
    });
  },


  getDetail(){
    wx.cloud.callFunction({
      name:"news_list_get",
      data:{
        id
      }
    })
    .then(res=>{
      this.setData({
        detail:res.result.data,
        loading:false
      })
    })
  },

  clickLike(){
    let onlike = this.data.detail.onlike;
    let ZanSize = this.data.detail.ZanSize;
    // let UserArr = this.data.detail.UserArr;
    // let avatarUrl = this.data.detail.avatarUrl;
    if(onlike){
      ZanSize--
    }else{
      ZanSize++ 
      // UserArr.push({avatarUrl})
    }

    this.setData({
      "detail.onlike":!onlike,
      "detail.ZanSize":ZanSize,
      // "detail.avatarUrl":avatarUrl

    })

    wx.getUserProfile({
      desc: '点赞和收藏需要授权',
      success:res=>{
        let {nickName,avatarUrl}=res.userInfo
        let posttime=Date.now();
        wx.cloud.callFunction({
          name:"news_like_add",
          data:{
            nickName,
            avatarUrl,
            posttime,
            artid:id
          }
        }).then(res=>{
          console.log(res);
        })
      }
    })
  },

  //点击收藏
  clickCollection(e){
    console.log(e)
    let onCollection = this.data.onCollection
    this.setData({
      onCollection : !onCollection
    })
    if (CollectionStatus) {
      this.setData({
        imgUrl:"https://636c-cloud1-0gsuywlee1316d01-1309842656.tcb.qcloud.la/image/%E6%94%B6%E8%97%8F%EF%BC%88%E7%94%A8%EF%BC%89.png"
      })
      CollectionStatus = false
    }else{
      this.setData({
        imgUrl:"https://636c-cloud1-0gsuywlee1316d01-1309842656.tcb.qcloud.la/image/%E6%94%B6%E8%97%8F-%E9%80%89%E4%B8%AD%EF%BC%88%E7%94%A8%EF%BC%89.png"
      })
      CollectionStatus = true
    }

    wx.cloud.callFunction({
      name:"news_collection_add",
      data:{
        id:id,
        CollectionStatus:CollectionStatus
      }
    })
    .then(res => {
      console.log("改变成功",res)
    })
    .catch(res => {
      console.log("改变失败",res)
    })
  },

  /**
   * @description: 滚动到最新评论（第一条）
   */
  pageScrollFirst() {
    this.setData({
      scrollIntoView: 'evaluation-wrap'
    });
  },

  /**
   * @description: 滚动到最后一条评论的位置
   */
  pageScrollBottom() {
    this.setData({
      scrollIntoView: 'evaluation-end'
    });
  },

  /**
   * @description: 评论数据
   */
  myeventEvaluationData(event) {
    let {
      isShow,
      typeName,
      content,
      id,
      keyHeight,
      domHeight
    } = event.detail;
    if (typeName) { // 点击了发布评论按钮
      wx.showLoading({
        title: '发布中...'
      });
      setTimeout(() => {
        let editEvaluationData = this.data.evaluationData;
        const data = {
          name: '匿名用户' + (this.data.evaluationData.length + 1),
          text: content,
          type: typeName,
          time: Date.now()
        };
        editEvaluationData.splice(0, 0, data);
        this.setData({
          'popupEvaluation.isShow': false,
          'popupEvaluation.isClear': true,
          evaluationData: editEvaluationData,
          paddingHeight: ''
        });
        this.pageScrollFirst(); /* 新增：滚动到最新评论处 */
        wx.showToast({
          title: '发布成功',
          icon:'success'
        })
        
        setTimeout(() => {
          wx.hideLoading();
        }, 500);
      }, 1000);
    } else {
      if (keyHeight) { // 软键盘弹起时
        this.setData({
          paddingHeight: domHeight / 2 + keyHeight
        })
        this.pageScrollBottom() // 滚动到最后一条评论
      } else {
        this.setData({
          'popupEvaluation.isShow': isShow,
          'popupEvaluation.isClear': false,
          paddingHeight: '' // 清空值
        })
      };
    }
  },

  /**
   * @description: 点击时显示评论组件
   */
  handleIsShowComment() {
    this.setData({
      'popupEvaluation.isShow': true,
      'popupEvaluation.id': 0, 
      'popupEvaluation.typeName': 'card',
      'popupEvaluation.isClear': this.data.popupEvaluation.isClear
    });
  },

  /**
   * @description: 获取dom信息
   */
  getDom(name, callback) {
    let query = wx.createSelectorQuery().in(this);
    query.select(name).boundingClientRect();
    query.exec(res => {
      callback && callback(res);
    });
  },

  /**
   * @description: 初始化一堆假数据
   */
  initData() {
    let data = []
    for (let i = 0; i < 12; i++) {
      data.push({
        name: '匿名用户' + (parseInt(i) + 1),
        text: '第' + (parseInt(i) + 1) + '条评论',
        // type: '资讯',
        time: Date.now()
      });
    }
    this.setData({
      evaluationData: data
    });
  },

  onUnload: function () {
    let pages = getCurrentPages()[getCurrentPages().length-2];
    let newslist = pages.data.newslist
    newslist[index].ZanSize=this.data.detail.ZanSize;
    pages.setData({
      newslist
    })
  }

})
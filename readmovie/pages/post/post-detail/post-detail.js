var postsData = require('../../../data/posts-data.js')
var app = getApp();
Page({
  data:{
    isPlayingMusic: false
  },
  onLoad: function (option) {
    var postId = option.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    this.setData({
      postData: postsData.postList[postId]
    });
    var postCollected = wx.getStorageSync('postCollection');
    if (postCollected) {
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      })
    } else {
      var postsCollected = {}
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId
      === postId) {
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setMusicMonitor();
  },
  setMusicMonitor: function () {
    //点击播放图标和总控开关都会触发这个函数
    var that = this;
    wx.onBackgroundAudioPlay(function (event) {
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];
      if (currentPage.data.currentPostId === that.data.currentPostId) {
        // 打开多个post-detail页面后，每个页面不会关闭，只会隐藏。通过页面栈拿到到
        // 当前页面的postid，只处理当前页面的音乐播放。
        if (app.globalData.g_currentMusicPostId == that.data.currentPostId) {
          // 播放当前页面音乐才改变图标
          that.setData({
            isPlayingMusic: true
          })
        }
        // if(app.globalData.g_currentMusicPostId == that.data.currentPostId )
        // app.globalData.g_currentMusicPostId = that.data.currentPostId;
      }
      app.globalData.g_isPlayingMusic = true;

    });
    wx.onBackgroundAudioPause(function () {
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];
      if (currentPage.data.currentPostId === that.data.currentPostId) {
        if (app.globalData.g_currentMusicPostId == that.data.currentPostId) {
          that.setData({
            isPlayingMusic: false
          })
        }
      }
      app.globalData.g_isPlayingMusic = false;
      // app.globalData.g_currentMusicPostId = null;
    });
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      // app.globalData.g_currentMusicPostId = null;
    });
  },
  onCollectionTap:function(event){
    //拿到这个缓存的值
    var postsCollected = wx.getStorageSync('posts_collected');
    //拿到这个值
    var postCollected = postsCollected[this.data.currentPostId];
    //取反操作 收藏的变成未收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    //更新文章是否的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    //更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      duration: 800,
      icon: 'success'
    })
  },
  onShareTap:function(evevt){
    var itemList=[
      "分享给微信好友",
      "分享到朋友圈",
      "分享给QQ好友",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor:"#405F80",
      success:function(res){
        //res.cancel  用户是不是点击了取消按钮
        //res.tapIndex  数组元素的序号，从0开始
        wx.showModal({
          title: '用户'+itemList[res.tapIndex],
          content:'现在无法实现分享功能',
        })
      }
    })
  },
  onMusicTap:function(event){
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
      // app.globalData.g_currentMusicPostId = null;
      app.globalData.g_isPlayingMusic = false;
    }
    else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
      })
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_currentMusicPostId = this.data.currentPostId;
      app.globalData.g_isPlayingMusic = true;
    }
  }
})
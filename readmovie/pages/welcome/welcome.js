//welcome.js
//获取应用实例
Page({
  onTap:function(){
   
    wx.redirectTo({
      url: '../post/post',
    })
  }
})
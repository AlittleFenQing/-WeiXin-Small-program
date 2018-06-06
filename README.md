# 微信小程序
## 推送电影文章与电影排行榜
###  项目组成：
#### 文章：<br/> 
##### 布局：<br> 
* 上下布局，上部分为一个轮播图，下面是有关电影的介绍。
##### 数据：<br>
* 请求方式：require<br>
* 请求地址：('../../data/posts-data.js')<br/>
* 数据参数：<br/>
    `'{`'<br/>
      `'"date": "Sep 18 2016",`'<br/>
     `' "avatar": /images/avatar/1.png`'<br/>
      `' "imgSrc": /images/post/clod.jpeg`'<br/>
       `' "content": 里昂是名孤独的职业杀手，受人雇佣。一天，邻居家小姑娘马蒂尔达敲开他的房门，要求在他那里暂避杀身之祸。原来邻居家的主人是警方缉毒组的眼线.`'<br/>
     `' "imgSrc": [`'<br/>
        `'{`'<br/>
          `'"dateTime": "24小时前",`'<br/>
         `' "price": 10,`'<br/>
          `'"oldPrice": "",`'<br/>
          `'"postId": "0",`'<br/>
          `'"sellCount": 229,`'<br/>
          `'"rating": 100,<br>`'<br/>
      `'}`'<br/> 
    `']`'<br/> 
 `'}`'<br/> 
#### 电影：
##### 布局：<br> 
* 上中下布局：
  * 上：正在热映的电影。<br/>
  * 中：将上映的电影。<br/>
  * 下：豆瓣top250。<br/>
##### 数据：<br>
* 请求方式：GET<br>
* 请求地址：http://t.yushu.im<br/>
* 数据参数：<br/>
     onBindBlur: function (event) {<br/>
    var text = event.detail.value;<br/>
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;<br/>
    this.getMovieListData(searchUrl, "searchResult", "");<br/>
  },<br/>

  processDoubanData: function (moviesDouban, settedKey, categoryTitle) {<br/>
    var movies = [];<br/>
    for (var idx in moviesDouban.subjects) {<br/>
      var subject = moviesDouban.subjects[idx];<br/>
      var title = subject.title;<br/>
      if (title.length >= 6) {<br/>
        title = title.substring(0, 6) + "...";<br/>
      }<br/>
      // [1,1,1,1,1] [1,1,1,0,0]<br/>
      var temp = {<br/>
        stars: util.convertToStarsArray(subject.rating.stars),<br/>
        title: title,<br/>
        average: subject.rating.average,<br/>
        coverageUrl: subject.images.large,<br/>
        movieId: subject.id<br/>
      }<br/>
      movies.push(temp)<br/>
    }<br/>
    var readyData = {};<br/>
    readyData[settedKey] = {<br/>
      categoryTitle: categoryTitle,<br/>
      movies: movies<br/>
    }<br/>
    this.setData(readyData);<br/>
  }<br/>
})<br/> 

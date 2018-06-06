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
    ` onBindBlur: function (event) {
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, "searchResult", "");
  },

  processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData);
  }
})`<br/> 

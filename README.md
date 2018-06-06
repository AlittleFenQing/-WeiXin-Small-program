sell-app
Vue.js 高仿饿了么外卖 App
项目组成：
商品页：
布局：
flex左右布局，左侧为商品菜单，右侧是商品展示，基于一个tab选项卡结构。
数据：
请求方式：GET
请求地址：http://ustbhuangyi.com/sell/api/goods
数据参数：
'{'
'"name": "热销榜",'
' "type": -1,'
' "foods": ['
'{'
'"name": "皮蛋瘦肉粥",'
' "price": 10,'
'"oldPrice": "",'
'"description": "咸粥",'
'"sellCount": 229,'
'"rating": 100,<br>'
     '}'
  ']'
  '}'
 
评论页：
布局：
上下布局：  * 上：包含综合评分、服务态度、商品评分等星级评价。
 * 下：顾客的所有评价，分别为全部、满意、不满意。
数据：
请求方式：GET
请求地址：http://ustbhuangyi.com/sell/api/ratings
数据参数：
'{'
'"username": "3******c",'
' "rateTime": 1469281964000,'
' "foods": ['
'{'
'"rateType": " 0",'
' "price": 10,'
'"oldPrice": "",'
'"text": "",'
'"sellCount": 229,'
'"rating": 100,<br>'
     '}'
  ']'
  '}'
 
商家页：
布局：
上下布局：  * 上：包含综合评分、服务态度、商品评分、商家收藏等星级评价。
 * 下：公告活动、商家实景、商家信息。
数据：
请求方式：GET
请求地址：http://ustbhuangyi.com/sell/api/ratings
数据参数：
'{'
'"username": "3******c",'
' "rateTime": 1469281964000,'
' "foods": ['
'{'
'"rateType": " 0",'
' "price": 10,'
'"oldPrice": "",'
'"text": "",'
'"sellCount": 229,'
'"rating": 100,<br>'
     '}'
  ']'
  '}'
 
运行方法：
npm instaill
cd sell
npm run dev

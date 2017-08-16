title: nodejs-http-抓取bing首页图片
date: 2014-10-05 14:34:31
tags: [nodejs]
categories: nodejs 
---
必应[首页](http://bing.com)，封面的图片很好看，并且每天都更新，怎么Bing的图片展示在自己的首页呢？Let's go!
打开必应首页，F12打开，在页面加载完毕后，ajax会去响应的接口获取当日的图片以及图片的描述信息。

![bingimg-interface.png](http://icaifeimg.qiniudn.com/bingimg-interface.png)

复制这个接口连接：
	
	http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1

浏览器打开，可以看到url就是当日图片的地址了。
<!--more-->
![bing-img-interface-json.png](http://icaifeimg.qiniudn.com/bing-img-interface-json.png)

接口地址中有三个主要参数，format、idx、n，format是输出格式，默认是xml，js就是json，idx，是返回距离今天之前的日期，0就是今天，1就是昨天，依次类推，n，不过n过大就不行了，是获取几张图片，1就只有今天的1张，2是今天加昨天的，依次类推。
现在我们通过nodejs的http模块去访问这个接口，然后将图片输出在自己的页面上，正好也可以当作一个小练习。
bingimg.js：
	
	var HTTP = require('http');
	var URL = require('url');
	
	HTTP.createServer(onRequest).listen(80);
	console.log('server start on port 80!');
	
	function getBingImg(format,idx,n,success,error){
	     var url = 'http://cn.bing.com/HPImageArchive.aspx?format=' + format + '&idx=' + idx + '&n=' + n;
	     var buffer = [];
	     HTTP.get(url,function(back){
	          back.on('data',function(data){//on 看起来好像很熟悉的样子，jquery中,
					//$dom.on('click',function(){});，这里很好地解释了node是基于事件驱动的(个人理解，不晓得错没得，望大神指点一二。)
	               //node把数据分成一小块一小块，当在数据接收完成之前都会出发data这个事件，函数返回的是数据
	               buffer.push(data);//这儿用数组装起来。
	          }).on('end',function(){//当数据接收完毕之后触发
	               success(buffer.toString());
	          }).on('error', function(e) {//出错后触发
	               error();
	          });
	     });
	}

	function onRequest(req,res){
	     var callback = getParameter(req.url,'callback');
	
	     res.writeHead(200, {"Content-Type": "application/json"});
	    
	     var cfg = {format : 'js',idx : '1',n : '1',error : function(e){
	          res.end('{error:1,msg:"can not get bing img!"}');
	     },success:function(data){
	          if(callback){
	               res.writeHead(200, {"Content-Type": "text/html"});
	               // var str = '<script>function ' + callback + '(data){console.log(data);}</script>';
	               res.end(callback + '(' + data + ')');//jsonp 用于跨域
	               return true;
	          }
	          res.end(data);
	     }};
	
	     getBingImg(cfg.format,cfg.idx,cfg.n,cfg.success,cfg.error);
	}
	
	function getParameter(url,key){
	     var reg = new RegExp(key + '=([^&]*)','gi');
	     var arr = reg.exec(url);
	     return arr ? arr[1] : '';
	}

在不跨域的情况下，直接访问，可以看到是标准的JSON格式（这儿用了chrome插件，美化json，json viewer）

![local-json-show.png](http://icaifeimg.qiniudn.com/local-json-show.png)

有时会在其他站访问这个接口，此时需要跨域访问，具体代码如下：

**jsonp.html**

	<!DOCTYPE html>
	<html>
	<head>
	     <meta chatset="utf-8">
	     <title>获取Bing图片</title>
	</head>
	<body>
	<button id="btn">获取Bing图片</button>
	<br/>
	<img src="" width="900" id="img">
	<script type="text/javascript">
	     var img = document.getElementById('img');
	     var btn = document.getElementById('btn');
	     btn.onclick = function(){
	          var script = document.createElement('script');
	          script.src = 'http://localhost:80?callback=show';
	          var head = document.getElementsByTagName('head')[0];
	          head.appendChild(script);
	     }
	
	     function show(data){
	          img.src = data.images[0].url;
	     }
	</script>
	</body>
	</html>
点击按钮，即可获取图片：
![bing-img.png](http://icaifeimg.qiniudn.com/bing-img.png)

OVER.
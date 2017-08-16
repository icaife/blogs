title: hello-nodejs
date: 2014-10-01 14:52:24
tags: nodejs
categories: nodejs
---
###乱来###
很早之前就知道nodejs了，最初也只是写了一个hello world，原来的想法是新技术还不成熟，了解一下就行，但是现在的前端工程师招聘、面试基本都会问到nodejs，看来各大公司都有朝nodejs发展的趋势，很久没有更新自己的知识了，再不更新就会跟不上潮流辣！会被无情地抛弃......，作为一个才毕业三个月的前端工程尸，还有很多要学习的，所以good good study,day day up。但是我觉得不能盲目去学习新的技术，这样反而在浪费时间、浪费生命，当然好奇心强、精力过剩的可以尝试一下，在我看来，新技术出来的时候，可以了解一下，不用刻意深入，只需弄懂其中的原理即可，但是要时不时关注新技术的发展，通过一段时间的的关注，发现某种新的技术已经有上升的趋势了，此时去深入学习也为时不晚，不要刻意而为之，打牢基础才是根本。现在呢，Nodejs已经有上升的趋势了，各大互联网公司都有项目跑在node下了，趁国庆，别人在人挤人的时候，我还是安静地呆在家里，学习nodejs吧，我真是一个机智的骚年啊！这是写在印象笔记里面的，作为学习笔记，将来温故而知新，可以为师矣！<!--more-->大学的时候学习的是java，后来servlet、jsp、ssh等，主要做的是web开发，到头来也只是会用而已，js呢，jquery吧，原生的js了解的很少，也就算个js的用户，算不上开发者，差不多也停留在会用的水平，在去年找工作的时候，边找工作边看《javascript高级程序设计》，才慢慢地了解的多一些，那时才觉得基础是多么地重要。学习nodejs，希望能够让我从js的用户上升到js的开发者吧，希望不会太晚。先来看看nodejs的原理吧，Google的V8引擎,Chrome的javascript执行环境，node利用它来解释执行js代码，node底层提供了许多js可以调用的接口，此时就可以利用js代码来调用底层的东西了，咋一看有点像java呢，node就像一个虚拟机，照我的理解是这样的o_O。看着教程来整吧，[Nodejs入门教程](http://www.nodebeginner.org/index-zh-cn.html)。


###Hello World!###
新建一个文件，hello.js，里面就简单的代码，

	console.log('hello nodejs! ');

然后打开cmd，node hello，可以看到控制台输出了我想要的hello nodejs!。
![](http://icaifeimg.qiniudn.com/hello-nodejs.png)
###一个简单的HTTP服务器###
新建一个文件server.js,输入以下代码：

	var http = require("http");//引入HTTP模块
	
	http.createServer(function(request, response) {
	  console.log('receive a http request!');
	  response.writeHead(200, {"Content-Type": "text/html"});
	  response.write("<h1>Hello World!</h1>");
	  response.end();
	}).listen(80);//监听80端口
然后打开浏览器，输入localhost，可以看到已经正常输出了！
![](http://icaifeimg.qiniudn.com/hello-nodejs-express.png)
###使用自定义模块###
现在我把刚才的server.js整成一个模块，然后在其他地方调用他， 将代码改成：

	var http = require("http");//引入HTTP模块

	function start(){
	     http.createServer(function(request, response) {
	          console.log('receive a http request!');
	          response.writeHead(200, {"Content-Type": "text/html"});
	          response.write("<h1>Hello World!</h1>");
	          response.end();
	     }).listen(80);//监听80端口
	     console.log('server started on port 80!');
	}

	exports.start = start;
	//导出模块，这儿也可以使用module.exports.start，
	//当然module.exports和exports 是有区别的，module.exports会优先于exports。

然后新建一个文件index.js，输入以下代码：

	var server = require('./server');//引入模块
	console.log(server);
	server.start();//开启

cmd->node index，然后访问，可以看到：
![](http://icaifeimg.qiniudn.com/hello-nodejs-show.png)

PS:[module.exports与exports的区别](http://www.cnblogs.com/pigtail/archive/2013/01/14/2859555.html)

###路由###
我的理解就是路，你要到北京就走北京那条路，你要到成都就走成都那条路，不同的目的走不同的路。
浏览器访问服务器自然需要链接，我将它看作为路径，不同的路径通向不同的目的地，比如注册我就输入注册的路径，登录就输入登录的路径，现在我们要根据不同的路径，返回不同的结果。
新建文件：register.js、login.js、info.js
register.js:

	function execute(req,res){
	     console.log('execute register action!');
	     res.writeHead(200, {"Content-Type": "text/html"});
	     res.write("<h1>register action!</h1>");
	     res.end();
	}
	exports.execute = execute;

login.js:

	function execute(req,res){
	     console.log('execute login action!');
	     res.writeHead(200, {"Content-Type": "text/html"});
	     res.write("<h1>login action!</h1>");
	     res.end();
	}
	exports.execute = execute;

info.js

	function execute(req,res){
	     console.log('execute info action!');
	     res.writeHead(200, {"Content-Type": "text/html"});
	     res.write("<h1>userinfo action!</h1>");
	     res.end();
	}
	exports.execute = execute;

修改server.js：

	var http = require("http");//引入HTTP模块
	
	function start(callback){
	     http.createServer(function(request, response) {
	          callback(request,response);
	     }).listen(80);//监听80端口
	     console.log('server started on port 80!');
	}
	
	exports.start = start;

修改index.js

	var server = require('./server');//引入模块
	var loginAction = require('./routes/login');//引入路由
	var regAction = require('./routes/register');
	var infoAction = require('./routes/info');
	
	var url = require('url');
	
	function onRequest(req,res){
	     var path = url.parse(req.url).pathname;
	     console.log(path);
	     switch(path){
	          case '/login':
	          loginAction.execute(req,res);
	          break;
	          case '/reg':
	          regAction.execute(req,res);
	          break;
	          case '/info':
	          infoAction.execute(req,res);
	          break;
	          default:
	          res.writeHead(200, {"Content-Type": "text/html"});
	          res.end('<h1>404</h1>');
	     }
	}
	
	server.start(onRequest);//开启服务器

然后cmd->node index，在浏览器输入相应的地址即可。
可以看到控制台输出的路径和每个路由执行的情况。。（感觉有点像Struts里面的Action   o_O）

![](http://icaifeimg.qiniudn.com/hello-nodejs-show-result.png)
OVER
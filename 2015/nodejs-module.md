title: nodejs-module
date: 2014-10-02 16:52:09
tags: [nodejs] 
categories: nodejs 
description: nodejs module
---
###require###
require在nodejs中是全局的方法，用于加载别的模块，参数为模块的路径。
	
	var a = require(./a);
	var b = require(./b.js);//.js后缀可以省略

	也可以加载一个json文件
	var json = require('./data.json');

###exports###
exports对象是当前模块的导出对象，当require模块时，会得到模块中的exports对象。

	exports.hello = function(){
    	console.log('hello nodejs!');
	}

<!--more-->
###module.exports###
module.exports 也可以用来导出当前对象，但是和exports有点区别-->链接：[exports和module.exports区别](http://www.cnblogs.com/pigtail/archive/2013/01/14/2859555.html)

###主模块###
在项目越来越庞大的时候，就可能出现很多模块，在编写程序的时候必然会出现require很多模块，这样不容易维护也不好管理，现在我们把常用的模块组成一个主模块，我的感觉就像java里面的包，在一个模块A中，将要用到的其他模块A、B全部require出来，然后通过exports导出，这样只要require主模块A就可以使用A和B模块了。

    var a = require('../modules/a');
	var b = require('../modules/b.js');

	exports.create = function(){
    	 return {a : a.a(),b : b.b()}
	}
###示例###
a.js:

	function a(){
    	console.log('this is module a !');
	}

	console.log('load module a success!');
	exports.execute = a;

b.js:

	function b(){
    	console.log('this is module b !');
	}

	console.log('load module b success!');
	exports.execute = b;

lib.js:

	var a = require('../modules/a');
	var b = require('../modules/b.js');

	exports.create = function(){
	    return {a : a,b : b}
	}

data.json:

	{
	     "code" : "0",
	     "msg"  :"this is a json file!"
	}

index.js:

	var lib = require('./lib/lib');
	var data = require('./data');
	
	var modules = lib.create();
	
	modules.a.execute();
	console.log(data);

###运行截图###

![运行截图](http://icaifeimg.qiniudn.com/node-module-exec.png)

###参考资料###


1. [七天学会Nodejs](http://nqdeng.github.io/7-days-nodejs/#1.5)
2. [深入Node.js的模块机制](http://www.infoq.com/cn/articles/nodejs-module-mechanism/) 
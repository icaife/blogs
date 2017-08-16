title: 关于call 的面试题两则之我的分析
date: 2014-11-13 18:54:02
tags: javascript
categories: javascript
---
**第一题：**

	function f1(){
	        console.log('this is function f1!');
	}
	
	function f2(){
	         console.log('this is function f2!');
	}
	
	var f3 = f1.call;
	f1.call(f2);
	f3.call(f2);

**第二题：**

	function fn(a,b){
		 console.log(this);
		 this.a=a;
		 this.b=b;
		 console.log(this.a+":"+this.b);
	}
	fn.call.call(fn,8,7);
<!--more-->
前几天在前端群里面看见的两个面试题，想了几天，尼玛理解能力太差，直到昨天晚上洗澡的时候静下心来想了一下，终于想通了，又对*call*方法进一步了解了，同时我也学到了：洗澡的时候利于静下心来思考，以后多洗澡、多思考，洗澡洗澡，皮肤好好。

![](http://icaifeimg.qiniudn.com/chicken.gif)

首先了解一下*call*方法，看看*ECMAScript*里面的解释：


15.3.4.4 Function.prototype.call (thisArg [ , arg1 [ , arg2, … ] ] )
When the call method is called on an object func with argument thisArg and optional arguments arg1, arg2
etc, the following steps are taken:

1. If IsCallable(func) is false, then throw a TypeError exception.
2. Let argList be an empty List.
3. If this method was called with more than one argument then in left to right order starting with arg1 append
each argument as the last element of argList
4. Return the result of calling the [[Call]] internal method of func, providing thisArg as the this value and
argList as the list of arguments.
The length property of the call method is 1.

NOTE The thisArg value is passed without modification as the this value. This is a change from Edition 3, where a
undefined or null thisArg is replaced with the global object and ToObject is applied to all other values and that result is
passed as the this value.

翻译出来就是：

15.3.4.4 Function.prototype.call (thisArg [ , arg1 [ , arg2, … ] ] )
当以 thisArg 和可选的 arg1, arg2 等等作为参数在一个 func 对象上调用 call 方法，采用如下步骤：


1.	如果 IsCallable(func) 是 false, 则抛出一个 TypeError 异常。
2.	令 argList 为一个空列表。
3.	如果调用这个方法的参数多余一个，则从 arg1 开始以从左到右的顺序将每个参数插入为 argList 的最后一个元素。
4.	提供 thisArg 作为 this 值并以 argList 作为参数列表，调用 func 的 [[Call]] 内部方法，返回结果。

call 方法的 length 属性是 1。

注：在外面传入的 thisArg 值会修改并成为 this 值。thisArg 是 undefined 或 null 时它会被替换成全局对象，所有其他值会被应用 ToObject 并将结果作为 this 值，这是第三版引入的更改。

*call*方法是属于*Function.prototype*的，在声明函数的时候，每个函数是*Function*的一个实例，自然每个函数就带上了*call*方法，当然*call*也是一个函数，*call*也是*Function*的一个实例，*call.call*这是理所当然的。

![](http://icaifeimg.qiniudn.com/Function.prototype.call.png)


首先来看看第一题：

	function f1(){
	        console.log('this is function f1!');
	}
	
	function f2(){
	         console.log('this is function f2!');
	}
	
	var f3 = f1.call;
	f1.call(f2);
	f3.call(f2);

首先声明了*f1*、*f2*两个函数，即为*Function*的一个实例，自然可以call辣。
然后声明了一个变量*f3*，值为*f1.call*。
执行：*f1.call(f2)*；

这儿应该不难吧，根据call的解释，*f1.call*在执行的时候，*this*是指向的是*f2*的，记为*f1.this* -> *f2*，如果在*f1*中*console.log(this)*，打印的肯定是*f2*函数，*f1.call*执行，我的理解是*f1*会执行，只是在执行的时候*this*变成*f2*了，相当于*f2*调用*f1*，即*f2.f1()*，这儿自然打印的是 ：

	this is function f1!

再来看看*f3.call(f2)*，根据*f1.call(f2)*的解释，在*f3*执行的时候,*f3*的*this*指向的是*f2*，记为*f3.this* -> *f2*，相当于*f2.f3()*，此时调用*f3*的应该是*f2*，由于*f3*是等于*f1.call*的，那么调用*f1.call*的应该是*f2*，即*f2.call()*;那么这儿自然就打印：

	this is function f2!

图示：

![](http://icaifeimg.qiniudn.com/f1.call.call.png)

OK，第一题就到这儿。

再看看第二题，

	function fn(a,b){
	    console.log(this);
	    this.a=a;
	    this.b=b;
	    console.log(this.a+":"+this.b);
	}
	fn.call.call(fn,8,7);

声明了一个函数*fn*,参数有*a*和*b*，接下来执行*fn.call.call(fn,8,7)*，为了便于理解，这儿把*fn.call*看作一个整体，记为*var fn1 = fn.call*，可见 *fn1.call(fn,8,7)*，看看第一题，*fn1*的*this*变成了*fn*，记为 *fn1.this -> fn*,则调用fn1函数的实际是*fn*，即*fn.fn1()*，根据*call*方法的官方解释，把参数带过来，即*fn.fn1(8,7)*，因为*fn1*等于*fn.call*，那么调用*fn.call*的应该是*fn*,即*fn.call()*，参数带过来，*fn.call(8,7)*，因为只传递了一个参数，那么*fn*中的*a*就等于*7*，*b*就是*undefined*，这儿自然打印的是：

	Number {[[PrimitiveValue]]: 8}
	7:undefined

因为，*8*是一个数字，所以*console.log(this)*，打印出的就是*Number {[[PrimitiveValue]]: 8}*。


看到这儿，我相信可以自己模拟一个*call*方法了，下边是我自己模拟call方法的代码：

	Function.prototype.mycall = function(thisObj){
        var args = [].slice.call(arguments,1);
        return this.apply(thisObj,args);
	}

改写代码：
**第一题**

	function f1(){
		console.log('this is function f1!');
	}

	function f2(){
		console.log('this is function f2!');
	}
   
	var f3 = f1.mycall;
	f1.mycall(f2);
	f3.mycall(f2);

打印结果：

	this is function f1! 
	this is function f2! 

**第二题**

	function fn(a,b){
	    console.log(this);
	    this.a=a;
	    this.b=b;
	    console.log(this.a+":"+this.b);
	}
	fn.mycall.mycall(fn,8,7);

打印结果：

	Number {[[PrimitiveValue]]: 8} 
	7:undefined 

OVER，以上仅是个人理解，不代表完全正确，有不对的地方还请指正。:)


title: 某客面试题（TODO）
date: 2014-11-27 09:21:37
tags: 面试题
categories: 面试题
---

这是某客公司的笔试题，时间是40分钟，当然我在40分钟是肯定做不完的，笔试就像考试，考验自己在某领域中对某项技能的熟练程度，考的基本是理论知识在实际中的运用，如果要提高自己能力，我觉得就要多做笔试题，在理论和实践结合的面试题中，熟能生巧，在今后的工作中遇到问题才能迎刃而解，在做笔试题的过程中，可以看到自己的不足，这样才好查漏补缺，更快地拿到double！

这我是利用工作的空余时间做的，鉴于本人能力有限，题目做得可能并不完美，还请大神指教！
<!--more-->

这就是笔试题了：

1. 数组去重、并按倒数第二个字母排序
2. 设计一个分页、搜索及时显示
3. five(one(one())) 返回 511
4. 数字转中文, 1234 一千两百三十四

**第一题**

数组去重，很多面试题里面都考过，这道题是将去重和排序都结合起来了，考了对js数组的使用熟练程度。
我的思路是先将数组中重复的去掉，然后再按每个元素的第二个字母排序，当然，每个元素的长度至少为2。

	function distinct(arr){
		var obj = {};//用来装数组中的元素，用于判断重复元素。
		var result = [];//去重后的数组
		for(var i = 0,len = arr.length;i < len;i ++){
			var item = arr[i];//拿到元素
			if(item in obj){//判断是否已存在，如果存在，continue
				continue;
			}
			obj[item] = 1;//如果不存在，那么就将该元素装起来
			result.push(item);//装在结果集中
		}
		return result.sort(function(a,b){
			return a.charCodeAt(a.length-2) - b.charCodeAt(b.length-2);
			//取出每个元素的倒数第二个字母，取出charCode，然后进行比较。
		});
	}

	var arr =['hello','world','nodejs','javascript',
			  'html','world','css','flash','adobe','java','hello'];
	
	distinct(arr)
	输出：
	["adobe", "nodejs", "hello", "world", "html", "javascript", "css", "flash", "java"]

*Array* 中 *sort* 方法是用来对数组项进行排序的 ，默认情况下是进行升序排列，内置排序是冒泡排序，*sort()* 方法可以接受一个 *function* 为参数 ，这个方法有两个参数。分别代表每次排序比较时的两个数组项。*sort()* 排序时会比较相邻两个元素，如果返回值小于0或者等于0都不会交换元素，如果返回值大于0则会交换这两个元素，
	
	var arr = [0,1,2,6,2,3,4,5]
	
	arr.sort()
	输出：[0, 1, 2, 2, 3, 4, 5, 6]
	
	arr = [0,1,2,6,2,3,4,5]
	arr.sort(function(a,b){return a-b})
	输出：[0, 1, 2, 2, 3, 4, 5, 6]
	
	arr = [0,1,2,6,2,3,4,5]
	arr.sort(function(a,b){return b-a})
	输出：[6, 5, 4, 3, 2, 2, 1, 0]

传入*function*相当于可以自定义排序了吧，如果里面装的是对象咋办呢，我们就可以利用*sort*传入的*function*参数做文章。
比如一个像这样的数组：

	var arr = [
				{index:0,name:'小菜'},{index:4,name:'小菜'},
				{index:2,name:'小菜'},{index:9,name:'小菜'},
				{index:8,name:'小菜'},{index:5,name:'小菜'},
				{index:3,name:'小菜'}
			  ]

现在有个需求是按照数组中每个对象的*index*进行排序，我们就可以这样做：

	arr.sort(function(a,b){
		return a.index - b.index;
	});

输出：
	
![](http://icaifeimg.qiniudn.com/obj-sort.png)

可以看到，结果出来是按照*index*进行排序的。


**第二题**

设计一个分页、搜索及时显示

*TODO*

这个暂时没做，搜索及时显示，我的理解是用户在输入的时候*ajax*去请求数据，服务器返回搜索的数据并展示出来，分页也可以这样，传入页码，每页显示的个数，服务器返回数据显示出来，可以参照百度搜索，下回再分解。


**第三题**
*five(one(one()))* 返回 *511*

这道题感觉怎么这么简单呢，是不是我理解错了。。(/ □ \)

	function one(){
		return 1 + '' + (arguments[0] || '') ;
	}

	function five(){
		return 5 + '' + (arguments[0] || '') ;
	}

	five(one(one()));
	
	输出:
	511


**第四题**

以前一直都想写一个数字转中文，偷懒，一直没写，然后这次下决心写了一个。。只支持正整数和0，小数的话，无非是判断是否有小数点，小数点后的读法不带单位，负数的话，无非是判断是否有 *- * 号，这儿就偷下懒了o(∩_∩)o ，还有数字如果大于了*9999999999999998*，那么就要将转换的数字用引号包起来额。。。。

这儿涨点姿势：
大整数的精度丢失：[http://www.dwz.cn/wHje4)
中文数字单位：[http://www.dwz.cn/wHlPA)

中文中，四位四位隔开，每四位的单位是：'万','亿','兆','京','垓','杼','穰','沟' ，小于四位的单位有十、百、千，通过把传入的数字参数每四位截开，然后再添加单位，我的思路就是这样。。具体看代码注释，代码如下：

	function en2cn(num){
		if(isNaN(num)){
			throw new Error('这不是数字哦！');
			return '';
		}
		// console.log(num);
		var cn = ['零','一','二','三','四','五','六','七','八','九'];
		var unit = ['十','百','千','万','亿','兆','京','垓','杼','穰','沟','涧','正','载'];//暂且就这么多单位吧。。
		var str = num + '';
		// console.log(str);
		var result = [];
		var index = 0;
		// 1234 一千二百三十四
		for(var i = 0;i < str.length;i ++){
			((i+1) % 4 == 0) && result.unshift(convert(str.substr(str.length-i-1,4),index++));//四位数就转换
		}

		(str.length % 4) && result.unshift(convert(str.substr(0,str.length%4),index));//转换剩下的额数字

		//num {String}  截断的数字，最多四位
		//index {Number} 四位、四位、四位 0 1 2
		function convert(num,index){
			if(isNaN(num)){
				return '';
			}
			var str = num + '';
			str = '0000'.substr(str.length) + str;//不足四位的补足四位
			var result = [];
			for(var i = str.length - 1;i > -1;i --){
				str[i] != '0' && result.unshift(unit[2 - i]);//不是零加 万以下的单位
				result.unshift(cn[str[i]]);
			}

			return result.join('') + (str !='0000' && index > 0 ? unit[2 + index] : '');//万以上的单位，包括万
		}

		return result.join('').replace(new RegExp('(^' + cn[0] + '+)|(' + cn[0] + '+$)','ig'),'').replace(new RegExp(cn[0] + '{2,}'),cn[0]);//去除首尾‘零’、去除连续的‘零’
	}

输出

![](http://icaifeimg.qiniudn.com/en2cn-result.png)
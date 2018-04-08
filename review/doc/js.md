# JavaScript

## DOM && BOM

 > DOM ( document object model) -> document是一种树形结构的数据结构，提供提供统一的接口供js调用。BOM(browser object model) -> window

- document.getElementById document.getElementsByTagName document.getElementsByName document.querySelector document.querySelectorAll
- elment 1 attribute 2 text 3 comment 8 document 9
- window.screen window.history window.location window.navigator window.event
- clientWidth scrollWidth offsetWidth innerWidth, scrollWidth >= offsetWidth >= clientWidth
- parentNode parentElement nextSibling previousSibling nextElementSibling previousSibling
- cloneNode() cloneNode(true)
- document.documentElement.scrollTop || document.body.scrollTop

## 基础
- 数据类型
    - 基础数据类型：null undefined number string boolean，保存在栈内存中的简单数据段。Undefined, Null,Boolean,Number和String，在内存中分别占有固定大小的空间，一般称它们按值访问。
    - 引用数据类型：object array function，保存在堆内存中的对象。
- 字符串、数组常用操作
- 作用域
    - 函数内部可以访问的变量区域，function作为作用域
    - 活动对象 activation object -> 全局变量  global object
- 闭包
    - 可以访问函数内变量的一块区域，常驻内存中
    - 防止变量污染，模块化
- 原型
    - 万物皆对象，普通对象、函数对象
    - 原型对象 函数 -> prototype ， 对象 -> __proto__ -> constructor 构造器的原型
- 原型链
    - 访问属性的路径，自有属性 -> __proto__.prototype

## 重绘 && 回流：
- 重绘： 当背景色等不会引起页面布局变化，只需要重新渲染的过程叫重绘。
- 回流：当render树的一部分或者因为边距等问题发生改变需要重建的过程。
- 重绘不一定回流，回流一定会重绘。
- display: none 影响了结构，回流； visibility: hidden 不影响结构 重绘
- 优化点：
    - 多次操作dom，display:none，完成后block
    - 创建多个结点，document.createFragment 创建后一次性append到结点
    - 避免使用table布局
    - 避免使用css表达式
    - 批量修改样式，className 、 cssText 
    - 脱离文档流 position: absolute
    - 取值 缓存到变量

## 模块化
- > 前端功能越来越多，功能之间的依赖混乱成了很大问题，模块化解决的问题是模块之间的依赖，摒弃script.src方式加载。
    - 方便维护
    - 系统模块分开、定义暴露接口
    - 也有缺点：性能损耗、调用复杂、通信复杂
    - 高内聚、低耦合
- CMD 懒加载  AMD 提前加载
- require/exports 运行时加载执行 动态
- import/export 静态分析，加载模块变量， export default
- 写法：
    - object 方式
    - function 执行返回 object方式

## Set & Map
- Set: 类似数组，不重复
- Map: key-value形式，key 不重复。

- Object.create && new
    - Object.create: 

            Object.create = (function() {
                function F(){};

                return function(prototype) {
                    F.ptototype = prototype;
                    var obj = new F();
                    // add properties to obj

                    return obj;
                };
            })();
    - new: 

            function A() {};
            var object = {};
            object.__proto__ = A.prototype;
            A.call(object);
    
## Object.bind
        
        Function.protype.bind = function () {
            var self = this,
                ctx = [].shift.call(arguments),
                args = [].slice.call(arguments);

            return function() {
                return self.apply(ctx,[].concat.call(args,[].slice.call(arguments)));
            };
        };
## 继承
- call apply
- prototype
- 拷贝继承
- 组合继承: 两次父类构造函数，生成两份实例。
- 寄生组合继承: 避免父类初始化两次，避免子类初始化对父类的影响，需要额外一个函数来处理。Tmp.prototype = Super.prototype;Child.prototype = new Tmp();

## this
- 指向函数的调用者

## 事件
- DOM0: `<div onclick="clickHandler()"></div>`
- DOM2: dom.onclick = clickHandler;
- DOM3: dom.addEventListener('click',clickHandler);
- target: 实际触发事件的那个元素
- currentTarget: 实际绑定事件的元素

## 函数节流 & 函数防抖
- 节流（throttle）：固定时间执行，未达到时间不执行
- 防抖（debounce）：重复调用后重新计时，clearTimeout

## 异步
- callback
- Promise
    - pending fulfilled(resolved) rejected
- async await
- generator
    - https://www.cnblogs.com/diligenceday/p/5488037.html#_label0

## 浅拷贝 && 深拷贝
- 浅拷贝：因为浅复制只会将对象的各个属性进行依次复制，并不会进行递归复制，引用类型只复制了一地址。
- 深拷贝：

## "use strict"
- 变量必须先声明后调用
- 禁止使用 arguments.callee arguments.caller
- 不能使用with语句
- 不能删除delete变量

## 内存泄漏
- dom移除事件未移除
- 闭包
- 循环引用

## js垃圾回收机制
- 标记清除: 进入环境，标记使用，离开环境，标记清除
- 引用计数：跟踪每个变量被引用的次数

## 双向绑定
- 发布-订阅者模式
- 脏检查模式
- 数据劫持: 发布订阅 + Object.defineProperty

## Virtual DOM
- 改变真实的DOM状态远比改变一个JavaScript对象的花销要大得多。
- 将DOM树放在内存中，状态变更的时候通过`diff(O(n^3))`算法，对同一层级的元素进行对比。
- diff算法：深度优先遍历，记录差异。

## 框架
- Vue
    - 模版语法
    - 语法简单、上手容易
    - 与现有系统融合、迁移成本较低
    - Vue.nextTick
    - 生命周期
        - beforeCreate -> created   挂载dom
        - beforeMount -> mounted    挂载数据
        - beforeUpdate -> updated   data变化
        - destoryed                 解除事件监听、双向绑定解除
    - Vue.directive
        - inserted bind update unbind
    - vuex: 全局状态管理，比如登录状态、购物车、组件状态等
    - Object.defineProperty
        - 生成getter setter，监听数据变化
        - compile 模板指令，生成vm
        - Watcher Observer Compile
- React
    - JSX 语法
    - 单项数据流
    - 生命周期 

            componentWillMount：组件挂载之前执行，只执行一次
            componentDidMount: 组件渲染完成，只执行一次
            =======================================================
            componentWillRecevieProps: 组件将要接收新的props执行
            shouldComponentUpdate: 判断组件是否应该重新渲染，默认是true
            componentWillUpdate: 组件将要重新渲染
            componentDidUpdate: 组件重新渲染完成
            =======================================================
            componentWillUnmount: 卸载组件

- 组件化
    - 应用拆分不同模块，每个模块通过合适的方式（事件）相互联系

- 状态管理
    - Vuex、Redux
- JSX && Template
    - 

## js事件循环 event-loop
- 发起函数、回调函数
- 事件循环
    - 检查事件队列是否为空，如果为空，则继续检查；如果不为空，则下一步
    - 取出事件队列的首部，压入执行栈
    - 执行任务
    - 检查执行栈，如果执行栈为空，则执行第一步；如果不为空，则继续检查。

## fetch
- promise、async await
- 语法简洁
- 默认不带cookie，{credentials: 'include'}
- 不能中断

## ES6新特性
- Default Parameters（默认参数） in ES6
- Template Literals （模板文本）in ES6
- Multi-line Strings （多行字符串）in ES6
- Destructuring Assignment （解构赋值）in ES6
- Enhanced Object Literals （增强的对象文本）in ES6
- Arrow Functions （箭头函数）in ES6
- Promises in ES6
- Block-Scoped Constructs Let and Const（块作用域构造Let and Const）
- Classes（类） in ES6
- Modules（模块） in ES6

## 函数式编程
- 纯函数的定义是，对于相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用(不改变原有数据‘’)，也`不依赖外部环境的状态`，每一步都是单纯的运算，而且都有返回值。
- Array.slice是纯函数，不改变原有数据，Array.splice不是纯函数，因为改变了原有数据。

## 高阶函数 high order function
- JavaScript的函数其实都指向某个变量。既然变量可以指向函数，函数的参数能接收变量，那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数

## 函数柯里化
- 传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

        es5:
        
        function add(x) {
            return function(y) {
                x + y;
            };
        }

        es6:
        var add = x => (y => x + y);

- 事实上柯里化是一种“预加载”函数的方法，通过传递较少的参数，得到一个已经记住了这些参数的新函数，某种意义上讲，这是一种对参数的“缓存”，是一种非常高效的编写函数的方法。
## WebAssembly
- 二进制
- 性能：游戏渲染、物理引擎、加密算法等
- 兼容性
## 模板引擎
## Babel
- 作用：很多浏览器目前还不支持ES6的代码，但是我们可以通过Babel将ES6的代码转译成ES5代码，让所有的浏览器都能理解的代码，这就是Babel的作用。
- 抽象语法树 Abstract Syntas Tree AST：源代码的抽象语法结构的树状表现形式。
- 流程：
    - 解析 PARSE (解析得到 AST) -> 转换 TRANSFORM (插件进行遍历转义) -> 生成 GENERATE (得到新的AST语法树后生成es5代码)
    <img src="https://images2017.cnblogs.com/blog/561794/201711/561794-20171120013201211-2132813361.png">
- babel只转换最新语法，最新的API不支持。
    - polyfill: core-js + renenetator runtime ，可能污染全局变量。
    - runtime: 对不支持的语法使用帮助函数实现。
        - 比如[...] -> [].concat()
        - {...obj} -> Object.assign({},obj);

## WebSocket
- WebSocket 协议实现在受控环境中运行不受信任代码的一个客户端到一个从该代码已经选择加入通信的远程主机之间的全双工通信。该协议包括一个打开阶段握手规定以及通信时基本消息帧的定义。其基于TCP之上。此技术的目标是为基于浏览器的应用程序提供一种机制，这些应用程序需要与服务器进行双向通信，而不依赖于打开多个HTTP连接（例如，使用XMLHttpRequest或`<iframe>`和长轮询）。

## 参考
- [Vue与React两个框架的区别和优势对比](http://caibaojian.com/vue-vs-react.html)
- [JS实现继承的几种方式](https://www.cnblogs.com/humin/p/4556820.html)
- [lodash源码学习debounce,throttle](https://www.cnblogs.com/wandiao/p/7223269.html)
- [30 seconds of code](https://github.com/kujian/30-seconds-of-code)
- [深度剖析：如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)
- [浏览器的工作原理：新式网络浏览器幕后揭秘](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)
- [React 常用面试题目与分析](https://zhuanlan.zhihu.com/p/24856035)
- [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
- [Vue2.0源码阅读笔记--双向绑定实现原理](http://www.cnblogs.com/wj204/p/6423478.html)
- [JavaScript函数式编程（一）](https://zhuanlan.zhihu.com/p/21714695)
- [函数式编程初探](http://www.ruanyifeng.com/blog/2012/04/functional_programming.html)
- [深入Promise](https://zhuanlan.zhihu.com/p/25178630)
- [性感的Promise，拥抱ta然后扒光ta](https://juejin.im/post/5ab20c58f265da23a228fe0f)
- [Vue diff 算法](https://github.com/aooy/blog/issues/2)
- [如何构建一个微型的CMD模块化加载器](http://natumsol.github.io/2015/12/21/a-mirco-cmd-loader/)
- [Promise 小书](http://liubin.org/promises-book/)
- [2018 前端性能检查表](https://juejin.im/post/5ac1d117f265da2396128b9f)
- DOM && BOM
- > DOM ( document object model) -> document是一种树形结构的数据结构，提供提供统一的接口供js调用。BOM(browser object model) -> window
    - document.getElementById document.getElementsByTagName document.getElementsByName document.querySelector document.querySelectorAll
    - elment 1 attribute 2 text 3 comment 8 document 9
    - window.screen window.history window.location window.navigator window.event
    - clientWidth scrollWidth offsetWidth innerWidth, scrollWidth >= offsetWidth >= clientWidth
    - parentNode parentElement nextSibling previousSibling nextElementSibling previousSibling
    - cloneNode() cloneNode(true)
    - document.documentElement.scrollTop || document.body.scrollTop

- 基础
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
- 重绘 && 回流：
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
- 模块化
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

- Set & Map
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
- Object.bind
        
        Function.protype.bind = function () {
            var self = this,
                ctx = [].shift.call(arguments),
                args = [].slice.call(arguments);

            return function() {
                return self.apply(ctx,[].concat.call(args,[].slice.call(arguments)));
            };
        };
- 继承
    - call apply
    - prototype
    - 拷贝继承
    - 组合继承: 两次父类构造函数，生成两份实例。
    - 寄生组合继承: 避免父类初始化两次，避免子类初始化对父类的影响，需要额外一个函数来处理。Tmp.prototype = Super.prototype;Child.prototype = new Tmp();

- this
    - 指向函数的调用者

- 事件
    - DOM0: `<div onclick="clickHandler()"></div>`
    - DOM2: dom.onclick = clickHandler;
    - DOM3: dom.addEventListener('click',clickHandler);
    - target: 实际触发事件的那个元素
    - currentTarget: 实际绑定事件的元素

- 函数节流 & 函数防抖
    - 节流（throttle）：固定时间执行，未达到时间不执行
    - 防抖（debounce）：重复调用后重新计时，clearTimeout

- 异步
    - callback
    - Promise
        - pending fulfilled(resolved) rejected
    - async await
    - generator
        - https://www.cnblogs.com/diligenceday/p/5488037.html#_label0

- 浅拷贝 && 深拷贝
    - 浅拷贝：因为浅复制只会将对象的各个属性进行依次复制，并不会进行递归复制，引用类型只复制了一地址。
    - 深拷贝：

- "use strict"
    - 变量必须先声明后调用
    - 禁止使用 arguments.callee arguments.caller
    - 不能使用with语句
    - 不能删除delete变量

- 函数柯里化
    - 把接受多个参数的函数变换成接受一个单一参数，bind

- 内存泄漏
    - dom移除事件未移除
    - 闭包
    - 循环引用

- js垃圾回收机制
    - 标记清除: 进入环境，标记使用，离开环境，标记清除
    - 引用计数：跟踪每个变量被引用的次数

- 双向绑定
    - 发布-订阅者模式
    - 脏检查模式
    - 数据劫持: 发布订阅 + Object.defineProperty

- Virtual DOM
    - 改变真实的DOM状态远比改变一个JavaScript对象的花销要大得多。
    - 将DOM树放在内存中，状态变更的时候通过`diff(O(n^3))`算法，对同一层级的元素进行对比。
    - diff算法：深度优先遍历，记录差异。

- 框架
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
        - 

- js事件循环 event-loop
    - 消息队列：异步操作回调函数放入事件循环队列当中
    - 事件循环

- fetch
    - promise、async await
    - 语法简洁
    - 默认不带cookie，{credentials: 'include'}
    - 不能中断

- ES6新特性
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



- 参考
    - [Vue与React两个框架的区别和优势对比](http://caibaojian.com/vue-vs-react.html)
    - [JS实现继承的几种方式](https://www.cnblogs.com/humin/p/4556820.html)
    - [lodash源码学习debounce,throttle](https://www.cnblogs.com/wandiao/p/7223269.html)
    - [30 seconds of code](https://github.com/kujian/30-seconds-of-code)
    - [深度剖析：如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)
    - [浏览器的工作原理：新式网络浏览器幕后揭秘](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)
    - [React 常用面试题目与分析](https://zhuanlan.zhihu.com/p/24856035)
    - [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
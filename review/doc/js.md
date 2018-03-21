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

- 库存 && 框架
    - angular
    - react
    - vue

- 库 && 框架
    - 参考
        - [Vue与React两个框架的区别和优势对比](http://caibaojian.com/vue-vs-react.html)
        - [JS实现继承的几种方式](https://www.cnblogs.com/humin/p/4556820.html)
        - [lodash源码学习debounce,throttle](https://www.cnblogs.com/wandiao/p/7223269.html)
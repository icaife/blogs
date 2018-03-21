# CSS
- 居中：元素居中、文字居中
    - position: absolute;left: 50%;top: 50%;margin-top: -xxpx;margin-left: -xxpx;
    - display: flex;align-items: center;align-content: center;justify-content: center;
    - display: table-cell; vertical-align: middle;
    - 图片、文字居中 vertical-align: middle;

- css 选择符 & 优先级
    - important > inline > #id > .class > tag=伪元素
    - 通配符选择符 `*`
    - id选择符 `#`
    - class选择符 `.`
    - tag选择符 `tagName`
    - 属性选择器 [name="leon"]、[name$="leon"]、[name^="leon"]、[name*="leon"]
    - :nth-of-type 不限制元素，:nth-child限制元素
    - inline = 1000 , id = 100 , class = 10 , tag = 1

- 盒子模型
    - 标准：content
    - IE: content+padding+border
    - box-sizing: border-box、content-box
- BFC Block Formating Context
    - > BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。
    - Box:
        - block-level box: list-item table
        - inline-level box: inline inline-block inline-table
    -  规则：
        -  内部box在垂直方向上，一个接一个放置
        -  浮动元素参与高度计算
        -  margin不会重叠
        -  是一个独立的容器，不影响外界的布局。
        -  BFC区域不会与 float重叠
        -  每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)
    - 如何生成：
        - 根元素 html
        - float不为none
        - position不为relative和static
        - display为inline-block inline-table flex inline-flex
        - overflow 不为 visible
    - 参考
        - [前端精选文摘：BFC 神奇背后的原理](http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)

- 伪元素 伪类区别
    - > CSS 伪类本质上是为了弥补常规CSS选择器的不足，以便获取到更多信息
    - 伪类描述状态，a标签的LVHA，:linked、:visited、:hover、active。
    - 伪元素本质上是创建了一个有内容的虚拟容器，::first-letter、::first-line、::before、::after
    - 可以同时使用多个伪类，而只能同时使用一个伪元素

- CSS3 新特性
    - CSS3 选择器
        - nth-of-type nth child ...
        - :checked :disabled :empty
        - ::selection

    - 边框和颜色
        - RGBA
        - border-radius
        - border-image
    - 渐变 gradient
        - linear 线性渐变  
        - radial 径向渐变
    - 阴影
        - box-shadow
    - 盒子模型 box-sizing
        - content-box
        - border-box
    - 动画
        - transform: rotate scale skew translate matrix, transform-origin
            - transition: property duration animation-type delay
        - transition: wdith、opacity、color......
        - animation: name duration timing-function delay interation-count direction
            - keyframes
            - from to
            - percentage

    - css3 硬件加速
        - translate3d 
        - 可能的问题：元素抖动闪烁
    - 参考
        - [深入了解CSS3新特性](https://www.ibm.com/developerworks/cn/web/1202_zhouxiang_css3/)

- Flex、Grid布局
    - Flex: flex-direction、align-items、align-content、justify-content、flex-flow，flex= flex-grow flex-shrink flex-basis,flex-flow= flex-direction + flex-wrap
    - Grid: grid-area、grid-tempalte-areas | grid-template-rows、grid-template-columns

- CSS 兼容性问题
    - IE hack: ie7: `*` `+` ie89:`\0` ie678:`\9` ie6:`_`
    - writing-mode firefox
    - autoprefixer  -webkit- -o- -ms- -moz-

- 1px border 问题:
    - media query  -webkit-min-device-pixel-ratio 1px 0.5 px 0.333px
    - border image
    - 参考
        - https://www.cnblogs.com/lunarorbitx/p/5287309.html

- Viewport、移动端适配
    - ideal viewport 理想视口  dip 设备逻辑像素
    - meta viewport width 640
    - css3 media query
    - meta viewport rem
    - vw vh
- 清除浮动 -> 闭合浮动，减少浮动带来的影响：诸如高度塌陷，元素重叠等。
    - clearfix  
            
            .clearfix:after{content:'.';display:block;height:0;clear:both;visibility:hidden}
    - hasLayout BFC 
        - *zoom:1;
        - position: absolute | fixed
        - overflow: hidden
        - display: inline-block table-cell ...
    - 标签清除： `<br>`
    - 参考
        - http://www.iyunlu.com/demo/enclosing-float-and-clearing-float/index.html

- 文档流
    - 普通流  normal flow
- px em rem vh vw等单位区别
    - px 像素
    - em 当前对象内文本的尺寸 
    - rem root em -> html font-size
- 常见布局
- 动画
- 规范：命名方式、模块化
    - BEM 命名
    - id限制
    - 嵌套限制
    - 常用命名： header footer 
    - 全局样式
    - 功能分块
        - logo login registe shop status btn tab 
    - 整体结构: reset.css common.css color.css font.css form.css ...
- LESS
- reset normalize
    - reset 清空重置 片甲不留
    - normalize 抹平浏览器差异，存在即合理
- 选择器
- 性能优化
- 文档流、清除浮动
- 继承
    - 可继承： color font-size cursor text-align ...
    - 不可继承：width  border display vertical-align background ...
- 权重计算
    - important = 1000
    - id = 100
    - class = 10
    - tag = 1
- postcss 原理
    - css界的babel
    - 解析器解析 css 语法树 -> plugin system -> stirngifier -> css
    - 参考: [PostCSS是个什么鬼东西？](http://www.60sky.com/post/postcss-introduce.html)

- 文本溢出
    - 单行: overflow: hidden; text-overflow: ellipsis; 
    - 多行: :after content: '...' :before content: '' position: absolute; 或者 display: -webkit-box;-webkit-line-clamp: 3;text-overflow: ellipsis;

- 单行文本居中 & 多行文本居中
    - table display: table table-cell
    - padding
    - line-height
    - flex

- 流式布局与响应式布局的区别
    - 流式布局: 使用非固定像素来定义网页内容，也就是百分比布局，通过盒子的宽度设置成百分比来根据屏幕的宽度来进行伸缩，不受固定像素的限制，内容向两侧填充。
    - 响应式开发: 利用CSS3 中的 Media Query(媒介查询)，通过查询 screen 的宽度来指定某个宽度区间的网页布局。

- input[type="search"]
    - -webkit-appearance: none

- line-height
    - 行高，可以撑开容器。
    - 单位：px em number %
    - px em : px 固定值 em 父元素 font-size计算行高
    - 数字：元素本身font-size * number -> 12px * 1.5 = 18px
    - %: 父元素 font-size * % -> 12px * 150% = 18px

- 性能优化
    - css文件合并
    - 避免嵌套过深、命名过长
    - 提取公共样式，减少代码量
    - css sprite

- 参考
    - https://github.com/poetries/FE-Interview-Questions/blob/master/CSS.md
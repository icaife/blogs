# HTML问题

## DOCTYPE是什么，有什么作用？
`DOCTYPE`是`document type`的缩写，用于区分标准模式和怪异模式，告知浏览器以什么样的标准来渲染该文档。

- 标准模式 Standard Mode ,在标准模式下，浏览器会根据`HTML`和`CSS`标准渲染当前页面。
- [怪异模式 Quicks Mode](https://www.ibm.com/developerworks/cn/web/1310_shatao_quirks/)，在早期，浏览器会按照旧的非标准的模式去渲染页面，导致相同的代码在不同浏览器当中展示的效果不同。

- 区别：
    - IE盒模型：`content` + `padding` + `border`
    - 标准盒模型： `content`
- 判断：
    - document.compatMode: 怪异模式 `BackCompact`  标准模式 `CSS1Compat`;
- `<meta http-equiv="X-UA-Compatible" content="IE=Edge">` 告诉浏览器以IE最新标准渲染当前文档，IE 最新版本的 Standards

*参考*
- [怪异模式（Quirks Mode）对 HTML 页面的影响](https://www.ibm.com/developerworks/cn/web/1310_shatao_quirks/)

## data-属性
用于存dom节点存储数据

- 如何获取：`dom.dataset` 返回当前节点存储的所用数据，数据类型为Object

## HTML5
HTML5 是定义 HTML 标准的最新的版本。 该术语表示两个不同的概念：
- 它是一个新版本的HTML语言，具有新的元素，属性和行为
- 它有更大的技术集，允许更多样化和强大的网站和应用程序。这个集合有时称为HTML5和朋友，通常缩写为HTML5

**根据功能分组:**

- 语义 - 提供更准确地描述内容
    - 新增语意标签，`<section>`、`<article>` 、`<nav>`、`<header>`、`<footer>`、`<aside>`等
    - input: caneldar time email url
    - 好处：利于维护利于SEO
- 连接 - 提供新的方式与服务器通信
    - WebSocket
- 离线和存储 - 允许网页在本地存储数据并有效地离线运行
    - localStorate、sessionStorage
- 多媒体 - 在 Open Web 中，视频和音频被视为一等公民（first-class citizens）
    - video、audio
- 2D/3D 图形和特效 - 提供更多种演示选项
    - canvas
- 性能和集成 - 提供更快的访问速度和性能更好的计算机硬件
    - 硬件加速
- 设备访问 - 允许使用各种输入、输出设备
    - camera
- 外观 - 可以开发丰富的主题

**参考**
- [https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5](HTML5)

## Cookie、LocalStorage、SessionStorage
- Cookie
    - 生命周期
- localStorage、sessionStorage
    - 生命周期
    - setItem、getItem、removeItem、key

## script
`script`标签用于加载js脚本或者立即运行标签之内的js脚本。

- `sync`同html解析同步，解析完成后执行，多个顺序执行
- `async`同html解析同步，执行的时间不定，不一定按照顺序执行

## img
- `srcset`
- `sizes`、`w`

## 前端分层
- 结构层、表示层、行为层

**参考**
- [响应式图片srcset全新释义sizes属性w描述符](http://www.zhangxinxu.com/wordpress/2014/10/responsive-images-srcset-size-w-descriptor/)
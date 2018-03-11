# HTML问题

## DOCTYPE是什么，有什么作用？
`DOCTYPE`是`document type`的缩写，用于区分标准模式和怪异模式，告知浏览器以什么样的标准来渲染该文档。
- 标准模式 Standard Mode ,在标准模式下，浏览器会根据`HTML`和`CSS`标准渲染当前页面。
- [怪异模式 Quicks Mode](https://www.ibm.com/developerworks/cn/web/1310_shatao_quirks/)，在早期，浏览器会按照旧的非标准的模式去渲染页面，导致相同的代码在不同浏览器当中展示的效果不同。
- 区别：
    - IE盒模型：`content + padding + border`;
    - 标准盒模型： `content`;
- 判断：
    - document.compatMode: 怪异模式 `BackCompact`  标准模式 `CSS1Compat`;
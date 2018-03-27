# Webpack
> 一切皆js，所有资源都是模块。

- Entry
- Output
- Loader
    - 实现对不同文件的处理，less to css,ts to js
    - 转换文件，添加到依赖视图当中
    - babel-loader、css-loader、style-loader等
    - 使用loaderUtil.getOptions
    - 特性
        - 链式调用
        - 可以是同步函数或异步函数
        - 可接收查询参数
        - 可options配置
        - 可产生额外的任意文
    - callback asyncCallback
- Plugin
    - apply挂载插件
    - compiler.plugin 挂载webpack事件钩子: compilation 、make
        - compilation.plugin 挂载事件钩子: build-module, optimize-chunk-assets

- Tapable 发布、订阅事件

- 优化
    - 为什么慢: 模块分析构建、uglify压缩慢、entry太多、单线程cpu计算慢
    - 多页部分构建
    - alias减少文件搜索范围
    - CommonsChunkPlugin 提取公共代码
    - dll处理
    - happypack
    - external

- babel
    - 解析：将代码字符串抽象成语法树
        - 分词
        - 语义分析
    - 变换：抽象语法树进行变换操作
    - 再建：根据变换和的语法树再生成代码字符串

- hot-reload
    - EventSource

- 参考
    - [前端面试之webpack篇](https://juejin.im/post/59cb6307f265da064e1f65b9#heading-5)
    - [编写自己的loader](https://doc.webpack-china.org/contribute/writing-a-loader)
    - [webpack之plugin内部运行机制](https://fengmiaosen.github.io/2017/03/21/webpack-core-code/)
    - [多页为王：webpack多页应用架构专题系列](https://array_huang.coding.me/webpack-book/chapter0/preface.html)
    - [Webpack 热更新实现原理分析](https://zhuanlan.zhihu.com/p/30623057)
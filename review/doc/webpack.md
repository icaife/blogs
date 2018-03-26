# Webpack
> 一切皆js，所有资源都是模块。

## Entry
## Output
## Loader
- 实现对不同文件的处理，less to css,ts to js
- 转换文件，添加到依赖视图当中
- babel-loader、css-loader、style-loader等
- 使用loaderUtil.getOptions
- 链式调用，从右往左
- callback asyncCallback

## Plugin
- apply挂载插件
- compiler.plugin 挂载webpack事件钩子: compilation 、make
    - compilation.plugin 挂载事件钩子: build-module, optimize-chunk-assets

## Tapable 发布、订阅事件

## 优化
- 为什么慢: 模块分析构建、uglify压缩慢、entry太多、单线程cpu计算慢
- 多页部分构建
- alias减少文件搜索范围
- CommonsChunkPlugin 提取公共代码
- dll处理
- happypack
- external

## babel
- 解析：将代码字符串抽象成语法树
    - 分词
    - 语义分析
- 变换：抽象语法树进行变换操作
- 再建：根据变换和的语法树再生成代码字符串

## hot-reload
    - EventSource
## 流程
- 初始化阶段
    - 初始化参数
        从配置文件和 Shell 语句中读取与合并参数，得出最终的参数。 这个过程中还会执行配置文件中的插件实例化语句 new Plugin()。

    - 实例化 Compiler
        用上一步得到的参数初始化 Compiler 实例，Compiler 负责文件监听和启动编译。Compiler 实例中包含了完整的 Webpack 配置，全局只有一个 Compiler 实例。
    - 加载插件
        依次调用插件的 apply 方法，让插件可以监听后续的所有事件节点。同时给插件传入 compiler 实例的引用，以方便插件通过 compiler 调用 Webpack 提供的 API。
    - environment
        开始应用 Node.js 风格的文件系统到 compiler 对象，以方便后续的文件寻找和读取。
    - entry-option
        读取配置的 Entrys，为每个 Entry 实例化一个对应的 EntryPlugin，为后面该 Entry 的递归解析工作做准备。
    - after-plugins
        调用完所有内置的和配置的插件的 apply 方法。
    - after-resolvers
        根据配置初始化完 resolver，resolver 负责在文件系统中寻找指定路径的文件。

- 编译阶段
    - run
        启动一次新的编译。
    - watch-run
        和 run 类似，区别在于它是在监听模式下启动的编译，在这个事件中可以获取到是哪些文件发生了变化导致重新启动一次新的编译。
    - compile
        该事件是为了告诉插件一次新的编译将要启动，同时会给插件带上 compiler 对象。

    - compilation
        当 Webpack 以开发模式运行时，每当检测到文件变化，一次新的 Compilation 将被创建。一个 Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。Compilation 对象也提供了很多事件回调供插件做扩展。

    - make
        一个新的 Compilation 创建完毕，即将从 Entry 开始读取文件，根据文件类型和配置的 Loader 对文件进行编译，编译完后再找出该文件依赖的文件，递归的编译和解析。

    - after-compile
        一次 Compilation 执行完成。

    - invalid
        当遇到文件不存在、文件编译错误等异常时会触发该事件，该事件不会导致 Webpack 退出。

    - 在编译阶段中，最重要的要数 compilation 事件了，因为在             compilation 阶段调用了 Loader 完成了每个模块的转换操作，在       compilation 阶段又包括很多小的事件，它们分别是：

        - build-module
        使用对应的 Loader 去转换一个模块。
        - normal-module-loader
        在用 Loader 对一个模块转换完后，使用 acorn 解析转换后的内容，输出对应的抽象语法树（AST），以方便 Webpack 后面对代码的分析。
        - program
        从配置的入口模块开始，分析其 AST，当遇到 require 等导入其它模块语句时，便将其加入到依赖的模块列表，同时对新找出的依赖模块递归分析，最终搞清所有模块的依赖关系。
        - seal
        所有模块及其依赖的模块都通过 Loader 转换完成后，根据依赖关系开始生成 Chunk。

- 输出阶段
    - should-emit
        所有需要输出的文件已经生成好，询问插件哪些文件需要输出，哪些不需要。
    - emit
        确定好要输出哪些文件后，执行文件输出，可以在这里获取和修改输出内容。
    - after-emit
        文件输出完毕。
    - done
        成功完成一次完成的编译和输出流程。
    - failed
        如果在编译和输出流程中遇到异常导致 Webpack 退出时，就会直接跳转到本步骤，插件可以在本事件中获取到具体的错误原因。
                                

- 参考
    - [前端面试之webpack篇](https://juejin.im/post/59cb6307f265da064e1f65b9#heading-5)
    - [编写自己的loader](https://doc.webpack-china.org/contribute/writing-a-loader)
    - [webpack之plugin内部运行机制](https://fengmiaosen.github.io/2017/03/21/webpack-core-code/)
    - [多页为王：webpack多页应用架构专题系列](https://array_huang.coding.me/webpack-book/chapter0/preface.html)
    - [Webpack 热更新实现原理分析](https://zhuanlan.zhihu.com/p/30623057)
    - [webpack原理与实战](http://wuhaolin.cn/2017/05/31/webpack%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E6%88%98/)
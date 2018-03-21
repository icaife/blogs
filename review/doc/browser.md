- 浏览器缓存
    - 强缓存：
        - expires: GMT格式的时间字符串 
        - cache-control: max-age 单位为秒
    - 协商缓存： 
        - last-modified: 资源最后更新时间
        - if-modified-since: 时间比较，如果修改，则命中缓存
        - etag: 资源的唯一标识
        - if-none-match: etag如果不匹配，则重新请求，如果匹配，则命中缓存。


- 参考
    - https://www.cnblogs.com/shixiaomiao1122/p/7591556.html
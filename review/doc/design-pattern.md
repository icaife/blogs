# 设计模式

## 单例模式
> 保证一个类仅有一个实例，病提供一个全局访问接口。

```
function Singleton(name) {
    if(Singleton.instance) {
        return Singleton.instance;
    }

    this.name = name;

    Singleton.instance = this;
}

```

## 策略模式

## 观察者模式

## 发布/订阅者模式
EventEmitter

## 参考
    - https://juejin.im/entry/5ab1f181f265da23a141c6c3
# 科协-管理端

## 记录一些魔改

### fix：ant-design-vue与tailwindcss的样式冲突

~~样式冲突问题：按钮透明。~~

~~解决方案：禁用了tailwindcss的预渲染，然后cv了他的css文件到全局并注释了部分冲突样式~~

~~ref:~~

~~https://juejin.cn/post/7311343199292276763~~

**已弃用**

https://juejin.cn/post/7231883802196066362?from=search-suggest

考虑到这种方式的更改是隐性的，并且难以维护，而且部分会有报错，也不知道未来这种方式会如何运行。

采用再覆盖的方式

出于此顾虑也不再引入daisyUI

### Refactor: axios封装

在对全局message处理的时候突然想到可以使用请求拦截器，但是处理下来的感觉怪怪的

保留两个版本

axios封装还是有问题，不是所有请求都要使用message交互的，在考虑这个的解决方案

或许只用全局错误处理，成功的话在对应处理数据的逻辑里塞上message？

### refactor: axios封装与useRequest

后端帮助给了token，因此axios不用配置请求拦截

三个模块：

axios/http：暴露axios实例，其实是统一配置接口和允许cookie参数，使用响应拦截器实现全局错误处理

api：封装请求url、方法、类型参数

useRequest：实际业务需求，获取/操作请求状态，实现对应业务以及message提示


### 样式问题

对于a-select，w-64的class不起作用，只能通过css写，而input保持正常

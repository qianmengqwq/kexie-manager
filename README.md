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


### 样式问题

对于a-select，w-64的class不起作用，只能通过css写，而input保持正常

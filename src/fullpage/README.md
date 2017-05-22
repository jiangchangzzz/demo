# 全屏滚动效果实现

## 1.通过CSS使div实现全屏效果
全屏要素
- 全屏的元素及其父元素都要设置height: 100%
- 将html、body标签设置height: 100%
**注意：height: 100%是随其父元素高度变化而变化**
- 隐藏滚动条，即将多余的元素隐藏起来，添加overflow: hidden
- 横屏展示，设置整体container为400%宽度，然后设置每一个section为浮动，及其宽度为25%

## 2.jquery插件开发
- 将插件代码放在块级作用域中,避免污染全局空间
```
(function($){

})(jQuery);
```

- 开发方式
类级别组件开发
在jQuery命名空间下添加新的全局函数，也称为静态方法
jQuery.myPlugin即为其添加静态方法，方法是设置在jQuery的实例对象上。
$.myPlugin=function(){}

- 对象级别组件开发
即挂在jQuery原型下的方法，这样通过选择器获取的jQuery对象实例也能共享该方法，也称为动态方法。
$.fn.myPlugin=function(){}
这里的$.fn===$.prototype其原型对象上，即需要创建实例来使用

- 链式调用

```
$('div').next().addClass();
$.fn.myPlugin=function(){
    return this.each(function(){

    });
}
```
    - return this返回当前对象，来维护插件的链式调用
    - each循环实现对每个元素的访问


- 单例模式
```
//使用单例模式保证全屏滚动页面对象仅创建一次，重复调用PageSwitch也不会重复调用
var instance=element.data('PageSwitch');
if(!instance){
    instance=new PageSwitch(element,options);
    element.data('PageSwitch',instance);   //将引用存入属性中
}
```


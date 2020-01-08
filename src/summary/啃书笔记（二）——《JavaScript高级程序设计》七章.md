## 第七章：函数表达式
通过一个非标准的name属性可以访问到给函数指定的名字：
```javascript
// 只在 Firefox、Safari、Chrome 和 Opera 有效
alert(functionName.name); // "functionName"
```
函数声明提升：
```javascript
sayHi();
function sayHi(){
    alert("Hi!");
}

sayHi(); //错误：函数还不存在
var sayHi = function(){
alert("Hi!");
};
```
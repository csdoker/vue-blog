## 第六章：面向对象的程序设计
ECMA-262的对象定义：“无序属性的集合，其属性可以包含基本值、对象或者函数。”

### 理解对象
创建自定义对象：
```javascript
// 创建一个 Object 的实例
var person = new Object();
person.name = "Nicholas";
person.age = 29;
person.job = "Software Engineer";
person.sayName = function(){
    alert(this.name);
};

// 对象字面量
var person = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName: function(){
        alert(this.name);
    }
};
```
## 第五章：引用类型
引用类型的值（对象）是引用类型的一个实例，新对象是使用new操作符后跟一个构造函数来创建的，构造函数本身就是一个函数，只不过是出于创建新对象的目的而定义的。

### Object类型
创建Object实例的两种方式：
```javascript
var person = new Object();
person.name = "Nicholas";
person.age = 29;

var person = {
    name : "Nicholas",
    age : 29
};
```
在JavaScript也可以使用方括号表示法来访问对象的属性：
```javascript
alert(person["name"]); //"Nicholas"
alert(person.name); //"Nicholas"
```
方括号语法的优点是可以通过变量来访问属性或者包含会导致语法错误字符的属性名：
```javascript
var propertyName = "name";
alert(person[propertyName]); //"Nicholas"

person["first name"] = "Nicholas";
```

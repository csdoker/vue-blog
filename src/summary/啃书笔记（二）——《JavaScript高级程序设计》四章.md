## 第四章：变量、作用域和内存问题
### 基本类型和引用类型的值
当复制保存着对象的某个变量时，操作的是对象的引用。但在为对象添加属性时，操作的是实际的对象。

#### 动态的属性
只能给引用类型值动态地添加属性，不能给基本类型的值添加属性：
```javascript
var person = new Object();
person.name = "Nicholas";
alert(person.name); //"Nicholas"

var name = "Nicholas";
name.age = 27;
alert(name.age); //undefined
```

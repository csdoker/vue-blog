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

<!--more-->

#### 属性类型
ECMAScript中有两种属性：数据属性和访问器属性。

##### 数据属性
直接在对象上定义的属性，它们的[[Configurable]]、[[Enumerable]]和[[Writable]]特性都被设置为true，而[[Value]]特性被设置为指定的值：
```javascript
var person = {
    name: "Nicholas"
};
```
修改属性默认的特性，必须使用ECMAScript5的Object.defineProperty()方法：
```javascript
// "Nicholas"是只读的，这个属性的值是不可修改的
var person = {};
Object.defineProperty(person, "name", {
    writable: false,
    value: "Nicholas"
});
alert(person.name); //"Nicholas"
person.name = "Greg";
alert(person.name); //"Nicholas"

// "Nicholas"是不可配置的，不能从对象中删除属性
var person = {};
Object.defineProperty(person, "name", {
    configurable: false,
    value: "Nicholas"
});
alert(person.name); //"Nicholas"
delete person.name;
alert(person.name); //"Nicholas"

// 一旦把属性定义为不可配置的，就不能再把它变回可配置了
var person = {};
Object.defineProperty(person, "name", {
    configurable: false,
    value: "Nicholas"
});
//抛出错误
Object.defineProperty(person, "name", {
    configurable: true,
    value: "Nicholas"
});
```

##### 访问器属性
在读取访问器属性时，会调用getter函数，这个函数负责返回有效的值；在写入访问器属性时，会调用setter函数并传入新值，这个函数负责决定如何处理数据：
```javascript
var book = {
    _year: 2004,
    edition: 1
};
Object.defineProperty(book, "year", {
    get: function(){
        return this._year;
    },
    set: function(newValue){
        if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
        }
    }
});
book.year = 2005;
alert(book.edition); //2
```

#### 定义多个属性
利用Object.definePro-perties()方法可以通过描述符一次定义多个属性：
```javascript
var book = {};
Object.defineProperties(book, {
    _year: {
        value: 2004
    },
    edition: {
        value: 1
    },
    year: {
        get: function(){
            return this._year;
        },
        set: function(newValue){
            if (newValue > 2004) {
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    }
});
```

#### 读取属性的特性
Object.getOwnPropertyDescriptor()方法可以取得给定属性的描述符：
```javascript
var book = {};
Object.defineProperties(book, {
    _year: {
        value: 2004
    },
    edition: {
        value: 1
    },
    year: {
        get: function(){
            return this._year;
        },
        set: function(newValue){
            if (newValue > 2004) {
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    }
});
var descriptor = Object.getOwnPropertyDescriptor(book, "_year");
alert(descriptor.value); //2004
alert(descriptor.configurable); //false
alert(typeof descriptor.get); //"undefined"

var descriptor = Object.getOwnPropertyDescriptor(book, "year");
alert(descriptor.value); //undefined
alert(descriptor.enumerable); //false
alert(typeof descriptor.get); //"function"
```

### 创建对象
#### 工厂模式
工厂模式抽象了创建具体对象的过程，用函数来封装以特定接口创建对象的细节（虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题）：
```javascript
function createPerson(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };
    return o;
}
var person1 = createPerson("Nicholas", 29, "Software Engineer");
var person2 = createPerson("Greg", 27, "Doctor");
```

#### 构造函数模式
```javascript
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        alert(this.name);
    };
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
```
person1和person2都有一个constructor（构造函数）属性，该属性指向Person：
```javascript
alert(person1.constructor == Person); //true
alert(person2.constructor == Person); //true
```
在这个例子中创建的所有对象既是Object的实例，同时也是Person的实例：
```javascript
alert(person1 instanceof Object); //true
alert(person1 instanceof Person); //true
alert(person2 instanceof Object); //true
alert(person2 instanceof Person); //true
```

##### 将构造函数当作函数
任何函数，只要通过new操作符来调用，那它就可以作为构造函数；而任何函数，如果不通过new操作符来调用，那它跟普通函数也不会有什么两样：
```javascript
// 当作构造函数使用
var person = new Person("Nicholas", 29, "Software Engineer");
person.sayName(); //"Nicholas"
// 作为普通函数调用
Person("Greg", 27, "Doctor"); // 添加到 window
window.sayName(); //"Greg"
// 在另一个对象的作用域中调用
var o = new Object();
Person.call(o, "Kristen", 25, "Nurse");
o.sayName(); //"Kristen"
```

##### 构造函数的问题
使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍，person1和person2都有一个名为sayName()的方法，但那两个方法不是同一个Function的实例：
```javascript
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = new Function("alert(this.name)"); // 与声明函数在逻辑上是等价的
}

alert(person1.sayName == person2.sayName); // false
```
可以通过把函数定义转移到构造函数外部来解决这个问题：
```javascript
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}
function sayName(){
    alert(this.name);
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
```
在全局作用域中定义的函数实际上只能被某个对象调用，如果对象需要定义很多方法，那么就要定义很多个全局函数，于是我们这个自定义的引用类型就丝毫没有封装性可言了，这些问题可以通过使用原型模式来解决。

#### 原型模式
prototype （原型）属性指向一个对象，这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法，使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法：
```javascript
function Person(){

}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var person1 = new Person();
person1.sayName(); //"Nicholas"
var person2 = new Person();
person2.sayName(); //"Nicholas"
alert(person1.sayName == person2.sayName); //true
```

##### 理解原型对象
所有原型对象都会自动获得一个constructor（构造函数）属性，这个属性包含一个指向prototype属性所在函数的指针：
```javascript
Person.prototype.constructor = Person // true
```
当调用构造函数创建一个新实例后，该实例的内部将包含一个指针（内部属性[[Prototype]]），指向构造函数的原型对象，如果 [[Prototype]]指向调用isPrototypeOf()方法的对象（Person.prototype），那么这个方法就返回true：
```javascript
alert(Person.prototype.isPrototypeOf(person1)); //true
alert(Person.prototype.isPrototypeOf(person2)); //true
```
Object.getPrototypeOf()返回[[Prototype]]的值：
```javascript
alert(Object.getPrototypeOf(person1) == Person.prototype); //true
alert(Object.getPrototypeOf(person1).name); //"Nicholas"
```
可以通过对象实例访问保存在原型中的值，但却不能通过对象实例重写原型中的值，在实例中创建该属性，该属性将会屏蔽原型中的那个属性：
```javascript
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var person1 = new Person();
var person2 = new Person();
person1.name = "Greg";
alert(person1.name); //"Greg" —— 来自实例
alert(person2.name); //"Nicholas" —— 来自原型
```
使用delete操作符则可以完全删除实例属性，从而让我们能够重新访问原型中的属性：
```javascript
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var person1 = new Person();
var person2 = new Person();
person1.name = "Greg";
alert(person1.name); //"Greg" —— 来自实例
alert(person2.name); //"Nicholas" —— 来自原型
delete person1.name;
alert(person1.name); //"Nicholas" —— 来自原型
```
hasOwnProperty()方法可以检测一个属性是存在于实例中，还是存在于原型中：
```javascript
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var person1 = new Person();
var person2 = new Person();
alert(person1.hasOwnProperty("name")); //false
person1.name = "Greg";
alert(person1.name); //"Greg"——来自实例
alert(person1.hasOwnProperty("name")); //true
alert(person2.name); //"Nicholas"——来自原型
alert(person2.hasOwnProperty("name")); //false
delete person1.name;
alert(person1.name); //"Nicholas"——来自原型
alert(person1.hasOwnProperty("name")); //false    
```

##### 原型与in操作符
in操作符会在通过对象能够访问给定属性时返回true，无论该属性存在于实例中还是原型中：
```javascript
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var person1 = new Person();
var person2 = new Person();
alert(person1.hasOwnProperty("name")); //false
alert("name" in person1); //true
person1.name = "Greg";
alert(person1.name); //"Greg" ——来自实例
alert(person1.hasOwnProperty("name")); //true
alert("name" in person1); //true
alert(person2.name); //"Nicholas" ——来自原型
alert(person2.hasOwnProperty("name")); //false
alert("name" in person2); //true
delete person1.name;
alert(person1.name); //"Nicholas" ——来自原型
alert(person1.hasOwnProperty("name")); //false
alert("name" in person1); //true
```
同时使用`hasOwnProperty()`方法和in操作符，就可以确定该属性到底是存在于对象中，还是存在于原型中：
```javascript
function hasPrototypeProperty(object, name){
    return !object.hasOwnProperty(name) && (name in object);
}
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var person = new Person();
alert(hasPrototypeProperty(person, "name")); //true
person.name = "Greg";
alert(hasPrototypeProperty(person, "name")); //false
```
Object.keys()方法可以取得对象上所有可枚举的实例属性：
```javascript
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var keys = Object.keys(Person.prototype);
alert(keys); //"name,age,job,sayName"
var p1 = new Person();
p1.name = "Rob";
p1.age = 31;
var p1keys = Object.keys(p1);
alert(p1keys); //"name,age"
```
Object.getOwnPropertyNames()得到所有实例属性，无论它是否可枚举：
```javascript
var keys = Object.getOwnPropertyNames(Person.prototype);
alert(keys); //"constructor,name,age,job,sayName"
```

##### 更简单的原型语法
用一个包含所有属性和方法的对象字面量来重写整个原型对象，重写后constructor属性不再指向Person了：
```javascript
function Person(){
}
Person.prototype = {
    name : "Nicholas",
    age : 29,
    job: "Software Engineer",
    sayName : function () {
        alert(this.name);
    }
};

var friend = new Person();
alert(friend instanceof Object); //true
alert(friend instanceof Person); //true
alert(friend.constructor == Person); //false
alert(friend.constructor == Object); //true
```
可以将constructor属性的值重设为Person：
```javascript
function Person(){
}
Person.prototype = {
    constructor : Person,
    name : "Nicholas",
    age : 29,
    job: "Software Engineer",
    sayName : function () {
        alert(this.name);
    }
};
```
或者可以使用Object.defineProperty()：
```javascript
// 重设构造函数，只适用于 ECMAScript 5  兼容的浏览器
Object.defineProperty(Person.prototype, "constructor", {
    enumerable: false,
    value: Person
});
```

##### 原型的动态性
对原型对象所做的任何修改都能够立即从实例上反映出来：
```javascript
var friend = new Person();
Person.prototype.sayHi = function(){
    alert("hi");
};
friend.sayHi(); //"hi"（没有问题！）
```
如果重写整个原型对象，切断了现有原型与任何之前已经存在的对象实例之间的联系，它们引用的仍然是最初的原型：
```javascript
function Person(){
}
var friend = new Person();
Person.prototype = {
    constructor: Person,
    name : "Nicholas",
    age : 29,
    job : "Software Engineer",
    sayName : function () {
        alert(this.name);
    }
};
friend.sayName(); //error
```

##### 原生对象的原型
所有原生引用类型（Object、Array、String等）都在其构造函数的原型上定义了方法：
```javascript
alert(typeof Array.prototype.sort); //"function"
alert(typeof String.prototype.substring); //"function"

String.prototype.startsWith = function (text) {
    return this.indexOf(text) == 0;
};
var msg = "Hello world!";
alert(msg.startsWith("Hello")); //true
```

##### 原型对象的问题
```javascript
function Person(){
}
Person.prototype = {
    constructor: Person,
    name : "Nicholas",
    age : 29,
    job : "Software Engineer",
    friends : ["Shelby", "Court"],
    sayName : function () {
        alert(this.name);
    }
};
var person1 = new Person();
var person2 = new Person();
person1.friends.push("Van");
alert(person1.friends); //"Shelby,Court,Van"
alert(person2.friends); //"Shelby,Court,Van"
alert(person1.friends === person2.friends); //true
```
修改了person1.friends引用的数组也会通过person2.friends（与person1.friends指向同一个数组）反映出来。

#### 组合使用构造函数模式和原型模式
构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性：
```javascript
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["Shelby", "Court"];
}
Person.prototype = {
    constructor : Person,
    sayName : function(){
        alert(this.name);
    }
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
person1.friends.push("Van");
alert(person1.friends); //"Shelby,Count,Van"
alert(person2.friends); //"Shelby,Count"
alert(person1.friends === person2.friends); //false
alert(person1.sayName === person2.sayName); //true
```

#### 动态原型模式
```javascript
function Person(name, age, job){
    //属性
    this.name = name;
    this.age = age;
    this.job = job;
    // 方法
    if (typeof this.sayName != "function"){
            Person.prototype.sayName = function(){
            alert(this.name);
        };
    }
}
var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName();
```

#### 寄生构造函数模式
基本思想是创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象：
```javascript
function Person(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };
    return o;
}
var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName(); //"Nicholas"
```
创建一个具有额外方法的特殊数组。由于不能直接修改Array构造函数，因此可以使用这个模式：
```javascript
function SpecialArray(){
    //创建数组
    var values = new Array();
    //添加值
    values.push.apply(values, arguments);
    //添加方法
    values.toPipedString = function(){
        return this.join("|");
    };
    //返回数组
    return values;
}
var colors = new SpecialArray("red", "blue", "green");
alert(colors.toPipedString()); //"red|blue|green"
```

#### 稳妥构造函数模式
稳妥对象，指的是没有公共属性，而且其方法也不引用this的对象：
```javascript
function Person(name, age, job){
    //创建要返回的对象
    var o = new Object();
    //可以在这里定义私有变量和函数
    //添加方法
    o.sayName = function(){
        alert(name);
    };
    //返回对象
    return o;
}
var friend = Person("Nicholas", 29, "Software Engineer");
friend.sayName(); //"Nicholas"
```
变量friend中保存的是一个稳妥对象，而除了调用sayName()方法外，没有别的方式可以访问其数据成员

### 继承
#### 原型链
原型链作为实现继承的主要方法，其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法，基本模式代码大致如下：
```javascript
function SuperType(){
    this.property = true;
}
SuperType.prototype.getSuperValue = function(){
    return this.property;
};
function SubType(){
    this.subproperty = false;
}
//继承了 SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function (){
    return this.subproperty;
};
var instance = new SubType();
alert(instance.getSuperValue()); //true
```

##### 别忘记默认的原型
所有函数的默认原型都是Object的实例，因此默认原型都会包含一个内部指针，指向Object.prototype。SubType继承了SuperType，而SuperType继承了Object。当调用instance.toString()时，实际上调用的是保存在Object.prototype中的那个方法。

##### 确定原型和实例的关系
```javascript
alert(instance instanceof Object); //true
alert(instance instanceof SuperType); //true
alert(instance instanceof SubType); //true

alert(Object.prototype.isPrototypeOf(instance)); //true
alert(SuperType.prototype.isPrototypeOf(instance)); //true
alert(SubType.prototype.isPrototypeOf(instance)); //true
```

##### 谨慎地定义方法
给原型添加或重写方法的代码一定要放在替换原型的语句之后，并且不能使用对象字面量创建原型方法：
```javascript
function SuperType(){
    this.property = true;
}
SuperType.prototype.getSuperValue = function(){
    return this.property;
};
function SubType(){
    this.subproperty = false;
}
//继承了 SuperType
SubType.prototype = new SuperType();
// 添加新方法
SubType.prototype.getSubValue = function (){
    return this.subproperty;
};
// 重写超类型中的方法
SubType.prototype.getSuperValue = function (){
    return false;
};
var instance = new SubType();
alert(instance.getSuperValue()); //false

// 使用字面量添加新方法，会导致上一行代码无效
SubType.prototype = {
    getSubValue : function (){
        return this.subproperty;
    },
    someOtherMethod : function (){
        return false;
    }
};
var instance = new SubType();
alert(instance.getSuperValue()); //error!
```

##### 原型链的问题
在通过原型来实现继承时，原型实际上会变成另一个类型的实例：
```javascript
function SuperType(){
    this.colors = ["red", "blue", "green"];
}
function SubType(){
}
//继承了 SuperType
SubType.prototype = new SuperType();
var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
var instance2 = new SubType();
alert(instance2.colors); //"red,blue,green,black"    
```
原型链的第二个问题是：在创建子类型的实例时，不能向超类型的构造函数中传递参数。

#### 借用构造函数
通过使用apply()和call()方法可以在（将来）新创建的对象上执行构造函数：
```javascript
function SuperType(){
    this.colors = ["red", "blue", "green"];
}
function SubType(){
    // 继承了 SuperType
    SuperType.call(this);
}
var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
var instance2 = new SubType();
alert(instance2.colors); //"red,blue,green"
```
借用构造函数有一个很大的优势，可以在子类型构造函数中向超类型构造函数传递参数：
```javascript
function SuperType(name){
    this.name = name;
}
function SubType(){
    //继承了 SuperType，同时还传递了参数
    SuperType.call(this, "Nicholas");
    //实例属性
    this.age = 29;
}
var instance = new SubType();
alert(instance.name); //"Nicholas";
alert(instance.age); //29
```

#### 组合继承
组合继承指的是将原型链和借用构造函数的技术组合到一块，从而发挥二者之长的一种继承模式，使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承：
```javascript
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
    alert(this.name);
};
function SubType(name, age){
    //继承属性
    SuperType.call(this, name);
    this.age = age;
}
//继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
    alert(this.age);
};
var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29
var instance2 = new SubType("Greg", 27);
alert(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27
```
两个不同的SubType实例既分别拥有自己属性——包括colors属性，又可以使用相同的方法。

#### 原型式继承
借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型：
```javascript
function object(o){
    function F(){}
    F.prototype = o;
    return new F();
}
var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");
var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
alert(person.friends); //"Shelby,Court,Van,Rob,Barbie"
```
person.friends不仅属于person所有，而且也会被anotherPerson以及yetAnotherPerson共享。实际上，这就相当于又创建了person对象的两个副本。
Object.create()方法规范化了原型式继承。这个方法接收两个参数：一个用作新对象原型的对象和（可选的）一个为新对象定义额外属性的对象：
```javascript
var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");
var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
alert(person.friends); //"Shelby,Court,Van,Rob,Barbie"

var anotherPerson = Object.create(person, {
    name: {
        value: "Greg"
    }
});
alert(anotherPerson.name); //"Greg"
```

#### 寄生式继承
```javascript
function createAnother(original){
    var clone = object(original); //通过调用函数创建一个新对象
    clone.sayHi = function(){ //以某种方式来增强这个对象
        alert("hi");
    };
    return clone; //返回这个对象
}

var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi"
```

#### 寄生组合式继承
组合继承最大的问题就是无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部：
```javascript
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
    alert(this.name);
};
function SubType(name, age){
    SuperType.call(this, name); // 第二次调用 SuperType()
    this.age = age;
}
SubType.prototype = new SuperType(); // 第一次调用 SuperType()
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
    alert(this.age);
};
```
一组在实例上，一组在 SubType 原型中。这就是调用两次SuperType构造函数的结果，不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已。本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型：
```javascript
function inheritPrototype(subType, superType){
    var prototype = object(superType.prototype); //创建对象
    prototype.constructor = subType; //增强对象
    subType.prototype = prototype; //指定对象
}
```
调用inherit-Prototype()函数的语句，去替换前面例子中为子类型原型赋值的语句了：
```javascript
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
    alert(this.name);
};
function SubType(name, age){
    SuperType.call(this, name);
    this.age = age;
}
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function(){
    alert(this.age);
};
```

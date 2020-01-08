工作之余，当然是要恶补下基础了，拿什么开刀好呢？补基础肯定是要从读书开始咯~所以我就决定开个新坑“啃书笔记”。顾名思义，这个文章系列其实就是记录下一些书中个人认为有价值的东西和思路。
整理了下自己最近的学习路线，还是决定先从JavaScript开始，随便在网上搜了下JavaScript方面的基础书籍，发现这本DOM编程艺术的上镜率特高，而书本身的内容比较适合入门，篇幅也不长，所以就理所当然的被我用来当漫长啃书之路的热身书了~

<!--more-->

## 图片库
> 项目演示地址：*[image_gallery](https://blog.csdoker.com/StudyProject/BookProject/DOM_Scripting/image_gallery/gallery.html)*

本书前七章以一个JavaScript图片库的Demo作为演示，从最原始的代码开始，每章改进一个功能点，最终完成了这个图片库。个人非常喜欢这种讲解方式，这里就直接以最终版本的代码来进行讲解了，我们一个一个函数的分析，看看到底用了哪些知识点。

### addLoadEvent
```javascript
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        };
    }
}
```
首先是`addLoadEvent()`这个函数，它是整个程序的入口函数。我们可以发现，这里并没有像以前一样直接用`window.onload`这样的方式，而是把它封装在这样一个函数里，为什么要这样做呢？
答案很简单，假如我们在页面加载完成之后只需要加载一个方法`myfunction()`，那么我们完全可以直接把它把绑定在onload上：
```javascript
window.onload = myfunction();
```
但是如果有更多的函数呢？可能你会这样写：
```javascript
window.onload = firstFunction();
window.onload = secondFunction();
```
其实你可能马上就能意识到问题所在了，这种方式`secondFunction()`将会把`firstFunction()`的功能取代了，所以是不行的。
当然我们可以稍加改进：
```javascript
window.onload = function() {
    firstFunction();
    secondFunction();
};
```
这种方式是正确的，但是缺点在于每次增加一个函数都必须在方法体内手动添加，而且假如我们的页面引入了多个js，而每个js都有一个window.onload的话还是会出现覆盖的情况，所以我们还可以采用一种更优雅的实现方式，不管你打算在页面加载完毕后要执行多少个函数，利用该函数都可以轻松的实现。
该函数名为`addLoadEvent`。该函数仅一个参数：该参数指定了你打算在页面加载完毕后需要执行的函数的函数名。
`addLoadEvent`函数主要是完成如下的操作：
1. 把现有的window.onload事件处理函数的值记录到oldonload中
2. 判断当前window.onload上面是否绑定了函数
3. 如果没有绑定任何函数，就把当前传入的函数添加给它
4. 如果已经绑定了函数，就把传入的函数追加到现有函数的后面

现在通过这个函数，我们就可以像下面这样绑定我们需要用到的函数了：
```javascript
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
```
这个函数非常有用，尤其当代码变得很复杂的时候。无论你打算在页面加载完毕时执行多少个函数，只需要多写几条这样的语句就可以解决了。

### insertAfter
众所周知，DOM本身提供了`insertBefore()`这个方法，当你告诉它下面这三件事后，它就能将一个新元素添加到一个现有元素之前：
1. newElement：你想插入的新元素
2. targetElement：你想把这个新元素插入到哪个现有元素（目标元素）之前
3. parentElement：目标元素的父元素

调用语法：
```javascript
parent.insertBefore(newElement,targetElement);
```
这时候你可能会想有没有一个函数能让我们把指定元素添加到一个目标元素的后面呢？很遗憾，DOM并没有给我们实现这样的函数，不过我们可以利用`insertBefore()`来自己封装一个：
```javascript
function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
```
这个函数用到了以下DOM方法和属性：（自行查阅w3c文档，本文不作讲解）
- parentNode属性
- lastChild属性
- appendChild方法
- insertBefore方法
- nextSibling方法

下面我们就看看这个函数是如何一步一步完成工作的：
1. 函数有两个传入的参数：一个是将被插入的新元素`newElement`，另一个是目标元素`targetElement`。
2. 找到目标元素的父元素`parentNode`并保存在`parent`变量里
3. 判断目标元素是不是其父元素的最后一个子元素`lastChild`（相当于判断是否是唯一子元素）
4. 如果最后一个子元素，就用`appendChild()`方法把新元素追加到parent元素上，这样新元素就恰好被插入到目标元素之后
5. 如果不是，就把新元素插入到目标元素和目标元素的下一个兄弟元素之间：（即目标元素的nextSibling属性）

利用封装好的`insertAfter()`函数，我们就能一步一步把想要的元素插入进文档中了。

#### 补充：getElementsByClassName
与`insertAfter()`类似的，既然有`getElementsByTagName()`，那么肯定就有`getElementsByClassName()`，幸运的是HTML5已经有这个函数的实现了，所以我们在版本较新的浏览器中可以直接使用，而在不支持这个新API的浏览器里我们依然需要自己去封装一个函数，书中给出了一种实现：
```javascript
function getElementsByClassName(node, classname) {
    if (node.getElementsByClassName) {
        return node.getElementsByClassName(classname);
    } else {
        var results = new Array();
        var elems = node.getElementsByTagName("*");
        for (var i = 0; i < elems.length; i++) {
            if (elems[i].className.indexOf(classname) != -1) {
                results[results.length] = elems[i];
            }
        }
        return results;
    }
}
```
这个函数接收两个参数，第一个node表示DOM树中的搜索起点，第二个classname就是要搜索的类名了，接下来我们还是看看函数的执行过程：
1. 判断传入的节点上是否存在`getElementsByClassName()`
2. 如果已经存在，就直接返回对应classname的节点列表
3. 如果不存在，那么遍历所有标签，找到带有相应类名的元素

思路很清晰吧，不过这个函数只适用于单类名的情况，所以还需要考虑多类名的情况：
```javascript
function getElementsByClassName(node, classname) {
    if (node.getElementsByClassName) {
        return node.getElementsByClassName(classname);
    } else {
        var results = new Array();
        var elems = node.getElementsByTagName("*");
        for (var i = 0; i < elems.length; i++) {
            var arr = elems[i].className.split(" ");
            for (var j = 0; j < arr.length; j++) {
                if (arr[j].indexOf(" " + classname + " ") != -1) {
                    results.push(elems[i]);
                }
            }
        }
        return results;
    }
}
```
在遍历元素数组时，我们需要把每个元素的类名以空格作为分割，全部记录在一个数组arr里，然后再去遍历这个arr数组，如果arr的其中一项与我们传入的classname匹配，就将当前的元素放入results数组里，最后返回这个结果。
> 这里值得一提的是，我们在判断是否匹配时，将条件改为`" " + classname + " "`，这是因为书中给出的实现会将`div123`、`123div`、`1div23`之类的情况也匹配到，这明显是不合理的。

好了，现在让我们来看看这个方法是否真正照顾到了所有情况呢？其实上面的实现虽然能处理元素多类名的情况，但是传入的classname参数默认还是必须单类名，所以参数多类名也必须处理：
```javascript
function getElementsByClassName(node, classnames) {
    var containIn = function(parent, child) {
        var result = true;
        for (var i = 0; i < child.length; i++) {
            if ((parent).indexOf(" " + child[i] + " ") == -1) {
                result = false;
                break;
            }
        }
        return result;
    };

    if (node.getElementsByClassName) {
        return node.getElementsByClassName(classnames);
    } else {
        var results = new Array();
        var elems = node.getElementsByTagName("*");
        classnames = classnames.split(" ");
        for (var i = 0; i < elems.length; i++) {
            if (containIn(" " + elems[i].className + " ", classnames)) {
                results.push(elems[i]);
            }
        }
        return results;
    }
}
```
改进后的代码中，只将传入的classnames参数分割成数组，而元素的类名作为一个整体来进行判断。这里因为逻辑稍显复杂了，所以将循环部分的逻辑单独封装成`containIn()`函数以供使用。至此，我们封装的这个`getElementsByClassName()`函数才能算是相对完整的实现出来了。

### preparePlaceholder
这个函数主要是将作为图片展示的img元素和提示信息的p元素从文档中分离出来，个人认为可有可无，这里不做细讲。

### prepareGallery
接下来就应该为我们页面上展示的图片绑定点击事件了：
```javascript
function prepareGallery() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for ( var i=0; i < links.length; i++) {
        links[i].onclick = function() {
            return showPic(this);
        }
        links[i].onkeypress = links[i].onclick;
    }
}
```
这里用一个循环来给每个a标签添加onclick事件，而`showPic()`函数最终会返回一个false，避免a标签的href属性带来的影响。不过我们最后还是在HTML文档中为a标签加上了href属性，这是假设JavaScript脚本不起作用或者没有加载成功时，页面在一定程度上仍然可以正常使用。接下来，我们就应该实现`showPic()`函数了。

#### showPic
```javascript
function showPic(whichpic) {
    if (!document.getElementById("placeholder")) return true;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src",source);
    if (!document.getElementById("description")) return false;
    if (whichpic.getAttribute("title")) {
        var text = whichpic.getAttribute("title");
    } else {
        var text = "";
    }
    var description = document.getElementById("description");
    if (description.firstChild.nodeType == 3) {
        description.firstChild.nodeValue = text;
    }
    return false;
}
```
这个函数接收的`whichpic`参数便是当前点击的a标签的dom对象，而在函数中，首先获取到当前标签的href属性值，然后设置给图片展示标签的src属性，最后改变了描述信息标签的文本值。

到这里，图片库这个例子就全部分析完毕了。

> References：
> 
> *[onload事件——addLoadEvent函数](http://blog.csdn.net/chenssy/article/details/7365184)*
>
> *[关于getElementsByClassName在老版本浏览器中的支持方法函数解释](https://www.zhihu.com/question/35877074)*
> 
> *[JavaScript getElementsByClassName方法求解](https://segmentfault.com/q/1010000006897689)*

## Tab栏
> 项目演示地址：*[tab](https://blog.csdoker.com/StudyProject/VideoProject/Tab/tab.html)*

关于DOM的操作，以及各种事件的绑定，有时候活用this关键字也会取得意想不到的效果。这个tab栏的例子是从某视频课程里截选出来的，虽然简单，但是其中的思想很有学习的意义：
```javascript
function fn(str) {
    var arrLi = str.getElementsByTagName("li");
    var arrDiv = str.getElementsByTagName("span");
    for (var i = 0; i < arrLi.length; i++) {
        arrLi[i].index = i;
        arrLi[i].onmouseover = function() {
            for (var j = 0; j < arrLi.length; j++) {
                arrLi[j].className = "";
                arrDiv[j].className = "";
            }
            this.className = "current";
            arrDiv[this.index].className = "show";
        };
    }
}
```
这个函数的重点便是将每次循环的索引值保存在每个li元素对象的index属性中，因为只有这样，才能在给这些对象绑定的onmouseover事件中获取到它们的index值，从而找到对应span元素的className。这种this关键字的运用比我们在图片库中的使用更为巧妙，其实this在JavaScript中的用法非常之多，适当的使用可以大大减少不必要的冗余代码。

## 滑动动画
> 项目演示地址：*[slideshow](https://blog.csdoker.com/StudyProject/BookProject/DOM_Scripting/slideshow/list.html)*

第十章介绍了利用JavaScript内置的`setTimeout`实现动画效果，这里我们就直接看书中图片滑动效果的封装函数了，实现如下：
```javascript
function moveElement(elementID, final_x, final_y, interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    if (!elem.style.left) {
        elem.style.left = "0px";
    }
    if (!elem.style.top) {
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) {
        var dist = Math.ceil((final_x - xpos)/10);
        xpos = xpos + dist;
    }
    if (xpos > final_x) {
        var dist = Math.ceil((xpos - final_x)/10);
        xpos = xpos - dist;
    }
    if (ypos < final_y) {
        var dist = Math.ceil((final_y - ypos)/10);
        ypos = ypos + dist;
    }
    if (ypos > final_y) {
        var dist = Math.ceil((ypos - final_y)/10);
        ypos = ypos - dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement = setTimeout(repeat,interval);
}
```
传入的四个参数：
- elementID：要移动元素的id
- final_x：移动终点的x坐标
- final_y：移动终点的y坐标
- interval：setTimeout的调用函数间隔时间

有了它们，我们就能进行移动的操作了。

首先setTimeout的原理是间隔指定的时间调用一次指定的函数，可以理解为一个递归的效果，不停的调用一个函数，直到满足函数里的一个条件，最后退出调用。而具体到这个例子中，结束条件即是元素的坐标值是否和目标点的坐标值相等（为了方便，一般条件判断采用大于小于来表示这种关系）。

动画，或者说是元素位置的移动，其实就是通过对其绝对定位的left、top值的改变来实现的，每次间隔改变一定的值，在人眼看来就像是一个动画的效果了。书中最终实现的是一个速度变小的运动过程，距离终点越近，每次移动的距离越小，关键点便是使用了`Math.ceil`来向上取整，因为如果不取整，当距离小于1时，由于不可能移动小于1像素的距离，元素就将停止移动了。

另外一个需要处理的问题就是由于一次又一次的递归调用，或者由于用户快速的操作而导致重复触发这个移动函数，setTimeout队列里的事件就会积累起来，最终就会使动画效果产生滞后。为了避免这种情况，我们就必须在每次调用setTimeout之前，先清除掉这个元素以前绑定的setTimeout事件。（需要注意的是书中这里再次使用了对象的属性来绑定这个标识，巧妙的解决了变量作用域的问题，所以可以明显看到属性在很多时候比临时变量的用途要大得多，而且方便后期我们进行程序变量的维护。）

## 综合示例
书中最后一章的实践项目把前面所有章节的知识点串联起来了，实现与前面大致是相同的，本文不再赘述。
嘛。。貌似距离上次更新博客已经过了一万年？？（雾

首先说明一点，五子棋AI本人并没有弃坑，毕竟在没有更好的项目选择的前提下已经把它当做毕业设计了，而且目前已经的进展也还算不错，完成了静态估值函数、极大极小值算法以及效率更高的Alpha-Beta剪枝，那为啥没有更新文章呢？原因有很多，主要还是因为工作方面实在太忙，挤不出时间来进行一些后续的优化，所以就打算暂时搁置下来，等后面再进行系统的开发和优化。
> 场外观众内心OS：其实你丫的就是想偷懒吧。。
> 我：没错！因为目前的重心还是打算放在工作方面的学习上，所以这个项目就暂时会进入一段时间的“休眠”，等空闲时间多了会让它“苏醒”的。

<!--more-->

那么说了这么多，也是时候该进入这篇文章的正题了。
在实习入职前，因为工作需要，经过了一段时间的自学，多多少少补习了下前端方面的基础知识，最后总结下来感觉CSS的知识是最杂、最细的，非常难以系统的记忆，而JS相关的知识点就更多更复杂了，特别是工作中一些实际需求带来的问题，很难有一个系统的解决方案，可能也只有在解决问题的过程中一点一点的去积累吧。入职后，上手做了自己第一个完整的站，从布局到功能，从样式到交互，CSS出现的问题是最多的。JS方面虽然没有什么严重bug，但是一些需求却经常把我难住，比如轮播图、tab切换等等，虽然这些也算是前端常见的功能了，但是因为大都是第一次做，所以也只能临时去网上搜索解决思路。如果每次都临时去搜，这样解决问题的效率肯定是不高的，而且以前遇到过的问题不做一些记录和总结，下次遇到可能还会犯同样的错误，所以我就准备写一写关于CSS和JS的文章，或者说是学习笔记，来总结自己自学过程和工作中遇到的一些“坑”，以后如果再遇到同样的问题，也能有些自己能参考对照的东西。
> PS：这个系列应该会持续更新的。。

> 2017-7-16 更新
> 说明：考虑到今后这个系列内容增加后，不利于阅览，故将这篇文章作为一些文章链接的导航页。（此贴只贴出一些内容简短的记录，内容过长将单独开文，并贴出对应链接。）

# CSS易错、易忘的知识点以及工作中遇到的坑
### display:inline-block
在公司做第一个站“益家家事”的过程中，遇到不少兼容性方面的问题，特别是后期做响应式的时候，同行的元素经常会被莫名其妙的挤到其他位置去。究其原因，其实是因为使用了浮动`float`导致的。

那么，不用浮动又怎么让两个块级元素显示在同行呢？
这里就给大家介绍一个display的属性值————`inline-block`。

众所周知，类似div这样的块级元素，默认样式是display:`block`，也就是默认会有块级元素的性质，比如可以设置宽高、元素宽度默认为父级元素的宽度并且占用一行等等，而像span这样的行内元素，display的默认值就是`inline`，默认的性质比如有元素不能设置宽高、元素宽度为内容宽度等等。

那么如果想让两个块级元素也能在行内并排显示呢？这个时候其实把这两个元素的display改成`inline-block`就行了。顾名思义，这个属性值的意思就是把元素的显示方式改为了能在行内显示的“块”，说得通俗一点就是这个元素又能在行内显示又能设置宽高，同时具备了块级和行内元素的部分性质，因此最终效果就能像用了浮动那样让两个块级元素也能并排显示了，而且并不会引起浮动的那些兼容问题，可以说非常好用。

但是这个时候细心的同学可能会发现一个严重的问题，为什么这两个元素中间还有空隙，而且上下也没有对齐呢？（逼死强迫症啊有木有。。）其实这就是用了`inline-block`后一定会引起的一个bug，机理这里不细讲（老规矩，详情自行搜索），只说说解决方案。

要解决这两个问题，其实很简单，只需要给两个元素的父级元素设置font-size:0，这时两个元素之间的空隙就会消失了，很神奇吧？然后再给错位的那个元素设置vertical-align:top，这样两个元素就能对齐了，so bug fixed。

### 页面使用overflow: scroll后，在IOS上滑动出现卡顿
在使用overflow的元素上，加上：`-webkit-overflow-scrolling: touch;`
原理：*[解决页面使用overflow:scroll在ios上滑动卡顿的问题](http://www.jianshu.com/p/1f4693d0ad2d)*

### ios端的按钮和输入框自带圆角的问题
两个css样式搞定：
`-webkit-appearance: none;` /*解决ios上按钮的圆角问题*/
`border-radius: 0;` /*解决ios上输入框圆角问题*/

*To be continued...*

# 工作中遇到的一些JS方面的坑
### 移动端input输入框被手机输入法遮盖
总的来说这是个很蛋疼的问题。。手机上如果input文本输入框靠近屏幕底部的话，那么点击文本框后，手机的输入法会正好遮盖住输入框，这样用户在输入的时候就看不见自己输入的内容。这个问题虽然不算是代码方面的bug，但是从交互的角度来说，对用户的体验是极其不友好的，那么也就是说最终我们肯定还是要想办法解决这个问题。

基本思路有很多，比如从设计的角度上讲，可以把输入框设计在上半屏，这样相当于取了个巧，但并没有真正解决问题。而我经过一番百度谷歌后采用的办法是点击输入框时就让屏幕强制滚动到顶部，这样让界面和手机输入法各占一部分屏幕，就完美的解决了问题。代码如下：
```javascript
if(/Android [4-6]/.test(navigator.appVersion)) {
    window.addEventListener("resize", function() {
    if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {
        window.setTimeout(function() {
                document.activeElement.scrollIntoViewIfNeeded();
            },0);
        }
    })
}
```
这是微信UI框架weui中给出的解决方法，其他的算法思路还有很多，这里只贴上一些相关资料的链接，具体不再细讲。
*[移动web页面，input获取焦点弹出系统虚拟键盘时，挡住input，求解决方案？](https://www.zhihu.com/question/32746176)*
*[移动端iOS第三方输入法遮挡底部input及android键盘回落后留白问题](https://segmentfault.com/a/1190000006243816)*

> 2017-7-16 更新

最近在做公司一个H5聊天页的时候，因为input框吸底，所以在一些ios系统的Safari浏览器和部分安卓机型上又会出现手机键盘把输入框遮挡的情况。而因为聊天需求的特殊性，用户必须能够看到自己输入的内容，所以遮挡是必须要解决的，但是这次用以前的办法貌似不灵了（原因未知），不过好在最后还是解决了，先贴代码：
```javascript
$(function() {
    // 解决输入法遮挡 (这里id为的sendInput的元素就是被遮挡的input)
    $('#sendInput').on('focus', function() {
        clearInterval(timer);
        var index = 0;
        timer = setInterval(function() {
            if(index > 5) {
                $('body').scrollTop($("body").scrollHeight);
                clearInterval(timer);
            }
        }, 50)
    })
});
```
简单说下原理，这里的核心是利用了scrollTop方法，以及scrollHeight这个值。scrollTop在jQuery中是个方法，如果不传参数就是获取当前元素相对滚动条顶部（或者说当前元素的容器顶部）的偏移（以像素计），如果传递参数后，就是设置这个元素的偏移值。（注意：js中scrollTop只能当做一个值来使用，同样可以获取和设置）scrollHeight的意思要好理解一些，就是指元素内容高度，而且scrollHeight是只读，不可设置。获取整个文档的scrollHeight，在IE/FF/CH上可能会出现兼容性问题，导致获取到的scrollHeight为0，这时可以通过`document.documentElement.scrollHeight`或`document.body.scrollHeight`获得。
相关资料：
*[关于scrollHeight和scrollTop取值为0的问题](http://www.jianshu.com/p/46087c0ace05)*

除了常见的scrollTop、scrollHeight外，有关浏览器滚动的js和jQuery属性方法还有很多，比如offsetTop、offsetHeight、clientTop、clientHeight等，关于这些值的用法也是个深坑，并且新手非常容易搞混它们的各自的含义，这里不再细讲，以后遇到相关的案例再作探讨。
相关资料：
*[javascript中top、clientTop、scrollTop、offsetTop的讲解](http://www.cnblogs.com/trlanfeng/archive/2012/11/04/2753280.html)*
*[jQuery的height()和JavaScript的height总结，js获取屏幕高度](http://www.cnblogs.com/wyaocn/p/5819774.html)*
*[clientHeight，scrollHeight，offsetHeight之间的区别及解决方案](http://www.cnblogs.com/nanshanlaoyao/p/5964730.html)*

### 页面加载时控制滚动条位置默认在底部
同样是scrollTop()及scrollHeight的用法，只是项目中因为聊天页面的footer吸底后影响了content这个div的高度，所以需要额外加上footer的高度。再有就是需要注意jQuery对象与js对象的区别，比如这里获取到的content就是一个jQuery对象，必须取第一个数组元素后才能获取到它的scrollHeight。
```javascript
$(function() {
    // 页面初始化控制滚动条位置默认在底部
    var footerHeight = $(".footer").height();
    $("#content").scrollTop($('#content')[0].scrollHeight + footerHeight);
});
```
### 判断页面的滚动方向
在pc上可以直接用onmousewheel触发对应的滚动事件：
```javascript
var scrollFunc = function (e) {  
    e = e || window.event;  
    if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件               
        if (e.wheelDelta > 0) { //当滑轮向上滚动时  
            alert("滑轮向上滚动");  
        }  
        if (e.wheelDelta < 0) { //当滑轮向下滚动时  
            alert("滑轮向下滚动");  
        }  
    } else if (e.detail) {  //Firefox滑轮事件  
        if (e.detail> 0) { //当滑轮向上滚动时  
            alert("滑轮向上滚动");  
        }  
        if (e.detail< 0) { //当滑轮向下滚动时  
            alert("滑轮向下滚动");  
        }  
    }
}  
//给页面绑定滑轮滚动事件  
if (document.addEventListener) {//firefox  
    document.addEventListener('DOMMouseScroll', scrollFunc, false);  
}  
//滚动滑轮触发scrollFunc方法  //ie 谷歌  
window.onmousewheel = document.onmousewheel = scrollFunc;
```
手机上由于onmousewheel无效，所以只能调用scroll方法来判断滚动方向：
```javascript
scroll(function(direction) { console.log(direction) });    
function scroll( fn ) {
    var beforeScrollTop = document.body.scrollTop,
        fn = fn || function() {};
    window.addEventListener("scroll", function() {
        var afterScrollTop = document.body.scrollTop,
            delta = afterScrollTop - beforeScrollTop;
        if( delta === 0 ) return false;
        fn( delta > 0 ? "down" : "up" );
        beforeScrollTop = afterScrollTop;
    }, false);
}
```

### 判断滚动条是否到达顶部或者底部
判断是否到达顶部比较简单：
```javascript
// 检测滚动条距离顶部的距离是否小于某个值
if ($('#content').scrollTop() < 1) {
    return true;
}
```
判断是否到达底部相对要复杂点：
```javascript
if ($('#content').scrollTop() + $('#content').height() >= $('#content')[0].scrollHeight) {
    return true;
}
```
### 如何对无序的js对象进行“排序”
在工作中遇到了这么一个情况，需要在前端显示后台接口返回的一个json对象，这个对象后台已经按照一定的顺序排好了，前端只需要依次遍历这个对象，按照原顺序输出对应的值就行了。本来感觉是很简单的一个需求，结果当我像平时遍历数组那样用for in去遍历这个对象的时候，发现遍历出来的顺序乱了。。经过一番百度谷歌后才发现原来js对象本身就是无序的，所以并不能像数组那样保持原顺序的遍历出来。那么这时候有人可能会问，能对这个对象进行一定程度上的“排序”么？虽然这里用排序并不准确，但是我们的目的其实就是想让这个对象按照原来的顺序遍历出结果而已。事实上，这里确实有一种“邪道”（不正规。。）的办法来让对象按照原顺序输出，见代码：
```javascript
var objs = {
    f: {
        id: 2,
        name: '2'
    },
    a: {
        id: 3,
        name: '3'
    },
    c: {
        id: 1,
        name: '1'
    }
};

// 按默认排序规则，依照对象的key排序
var sortedObjKeys = Object.keys(objs).sort();

for (var index in objs) {
    console.log(index);
    console.log(sortedObjKeys[index]);
    console.log(objs[sortedObjKeys[index]]);
}
```
核心就是利用了`Object.keys(objs).sort`获取到排好序的keys，然后依照这个keys来遍历对象，结果确实是能保持原顺序输出对象，很神奇对吧？但是你也许会问，这个默认排序规则和keys到底是神马，我只能说目前暂时不太清楚，不过可以确定的是结果能够正确的输出，至于细节的原理以后再做研究。再多补充一点的是这个sort函数里可以自定义排序规则，这样就可以做到按照自己的规则来对对象进行排序了，怎么样？是不是觉得瞬间怀疑人生了。。
相关资料：
*[Object.keys()把对象安卓属性名的字幕顺序进行排列](http://blog.csdn.net/sinat_17775997/article/details/52297012)*
*[js中有什么办法能让对象进行排序呢？](https://segmentfault.com/q/1010000009965553)*
*[JavaScript获取对象属性和方法](http://www.cnblogs.com/shinejaie/p/5231195.html)*

### ajax中防止快速点击后重复提交请求
编辑中。。。

*To be continued...*
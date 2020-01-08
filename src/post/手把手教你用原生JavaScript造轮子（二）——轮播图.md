通过[上一篇](https://rekodsc.com/detail/10)文章的学习，我们基本掌握了一个轮子的封装和开发流程。那么这次将带大家开发一个更有难度的项目——轮播图，希望能进一步加深大家对于面向对象插件开发的理解和认识。

So, Let's begin!

> 目前项目使用 ES5及UMD 规范封装，所以在前端暂时只支持`<script>`标签的引入方式，未来会逐步用 ES6 进行重构

> 演示地址：*[carousel](https://csdoker.github.io/csdemos/carousel/pc/)* *[carousel-mobile](https://csdoker.github.io/csdemos/carousel/mobile/)*
> Github：*[csdwheels](https://github.com/csdoker/csdwheels)*
> *如果觉得好用就点个Star吧~(〃'▽'〃)*

<!--more-->

![carousel](https://i.loli.net/2018/08/10/5b6d05ea7e673.gif)
![carousel-mobile](https://i.loli.net/2018/08/10/5b6d05e381d6b.gif)

# Web轮播
## 思路分析
老规矩，在写代码之前，我们需要对要开发的东西有个感性的认识，比如你可以先在脑中大致过一遍最终的项目效果是如何的，而在这里你可以直接看上面的动态图or项目页面进行体验。实际的开发阶段之前，我们更要对插件的逻辑思路有一个整体的分析，这样在开发时才会更有效率，并且可以有效避免因为思路不清晰而导致的问题。

首先来看看Web轮播的效果及交互有哪些：
1. 每隔一段时间自动轮播
2. 左右箭头可切换轮播
3. 圆点可切换轮播
4. 当鼠标在轮播区域内时，轮播暂停；离开区域后，轮播重新开始
5. 轮播切换时，会有一个匀速运动的动画效果
6. 当向右切换到最后一张时，会自动循环到第一张；向左切换到第一张时，循环到最后一张

如上几点，可以说都是一个轮播图必须实现的经典效果了。其他效果先忽略，第六点对于新手来说明显是最有难度的，事实上这个效果有个常见的名字——无缝轮播。“无缝”也可以理解为无限循环，其实就是可以让轮播朝着一个方向一直切换，并且自动在切换到头尾图片时循环。

比如现在有五张图片，我们把它们编号为：
> 1 2 3 4 5

要实现上面的效果，你可能会想到在切换至头尾时加个判断，强制改变图片位置，但是如果这么做的话，当你最后一张图切换回第一张图时就会出现空白，因此还需要在头尾分别添加一个尾部和头部的元素作为位置改变时的过渡：
> 5 1 2 3 4 5 1

有了这两张辅助图，上面的效果就能顺利实现了。到此，项目的基础思路分析完毕，让我们进入编码阶段吧！

## 基本架构
正式开始之前，还是需要先把项目的基本架构搭建起来：
```javascript
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
      define([], factory);
    } else if (typeof module === "object" && module.exports) {
      module.exports = factory();
    } else {
      root.Carousel = factory();
    }
  })(typeof self !== "undefined" ? self : this, function() {
    "use strict";

    // ID-NAMES
    var ID = {
      CAROUSEL_WRAP: '#carouselWrap',
      CAROUSEL_DOTS: '#carouselDots',
      ARROW_LEFT: '#arrowLeft',
      ARROW_RIGHT: '#arrowRight'
    };

    var CLASS = {
      CAROUSEL_WRAP: 'carousel-wrap',
      CAROUSEL_IMG: 'carousel-image',
      CAROUSEL_DOTS_WRAP: 'carousel-buttons-wrap',
      CAROUSEL_DOTS: 'carousel-buttons',
      CAROUSEL_DOT: 'carousel-button',
      CAROUSEL_DOT_ON: 'carousel-button on',
      CAROUSEL_ARROW_LEFT: 'carousel-arrow arrow-left',
      CAROUSEL_ARROW_RIGHT: 'carousel-arrow arrow-right'
    };

    // Polyfills
    function addEvent(element, type, handler) {
      if (element.addEventListener) {
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
      } else {
        element["on" + type] = handler;
      }
    }

    // 合并对象
    function extend(o, n, override) {
      for (var p in n) {
        if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override))
          o[p] = n[p];
      }
    }

    // 轮播-构造函数
    var Carousel = function (selector, userOptions) {
      var _this = this;
      // 合并配置
      extend(this.carouselOptions, userOptions, true);
      // 获取轮播元素
      _this.carousel = document.querySelector(selector);
      // 初始化轮播列表
      _this.carousel.appendChild(_this.getImgs());
      // 获取轮播列表
      _this.carouselWrap = document.querySelector(ID.CAROUSEL_WRAP);
      // 每隔 50ms 检测一次轮播是否加载完成
      var checkInterval = 50;
      var checkTimer = setInterval(function () {
        // 检测轮播是否加载完成
        if (_this.isCarouselComplete()) {
          // 加载完成后清除定时器
          clearInterval(checkTimer);
          // 初始化轮播
          _this.initCarousel();
          // 初始化圆点
          _this.initDots();
          // 初识化箭头
          _this.initArrows();
        }
      }, checkInterval);
    };
    // 轮播-原型对象
    Carousel.prototype = {
      carouselOptions: {
        // 是否显示轮播箭头
        showCarouselArrow: true,
        // 是否显示轮播圆点
        showCarouselDot: true,
        // 轮播自动播放间隔
        carouselInterval: 3000,
        // 轮播动画总时间
        carouselAnimateTime: 150,
        // 轮播动画间隔
        carouselAnimateInterval: 10
      },
      isCarouselComplete: function () {
        // 检测页面图片是否加载完成
        var completeCount = 0;
        for (var i = 0; i < this.carouselWrap.children.length; i++) {
          if (this.carouselWrap.children[i].complete) {
            completeCount++;
          }
        }
        return completeCount === this.carouselWrap.children.length ? true : false;
      }
    };
    return Carousel;
});
```
`addEvent()`和`extend()`函数上篇已经介绍过了，构造函数中各种配置项也都是项目中要用到的，不必多说。这里的重点是`checkTimer`定时器，它的作用是每隔一定时间去检查页面上的图片元素是否全部加载完毕，如果加载完毕再进行项目的初始化。
为什么需要这么做呢？因为我们的图片元素是在JS中使用DOM动态加载的，所以可能会出现图片还没加载完成就执行了JS中的一些逻辑语句，导致不能通过DOM API正确获取到图片和对应元素属性的现象。因此，在`isCarouselComplete()`函数中我们利用`img`元素的`complete`属性，判断当前页面上的所有图片是否加载完成，然后就能保证DOM属性的正确获取了。

## 初始化轮播
完成`initCarousel()`函数：
```javascript
initCarousel: function(selector, userOptions) {
    // 获取轮播数量
    this.carouselCount = this.carouselWrap.children.length;
    // 设置轮播
    this.setCarousel();
    // 初始化轮播序号
    this.carouselIndex = 1;
    // 初始化定时器
    this.carouselIntervalr = null;
    // 每次位移量 = 总偏移量 / 次数
    this.carouselAnimateSpeed = this.carouselWidth / (this.carouselOptions.carouselAnimateTime / this.carouselOptions.carouselAnimateInterval);
    // 判断是否处于轮播动画状态
    this.isCarouselAnimate = false;
    // 判断圆点是否点击
    this.isDotClick = false;
    // 绑定轮播图事件
    this.bindCarousel();
    // 播放轮播
    this.playCarousel();
}
```
通过`this.carouselWidth / (this.carouselOptions.carouselAnimateTime / this.carouselOptions.carouselAnimateInterval)`这个公式，可以计算出每次轮播动画位移的偏移量，后面完成动画函数时会用到。

在`setCarousel()`里进行轮播基本属性的设置：
```javascript
setCarousel: function () {
    // 复制首尾节点
    var first = this.carouselWrap.children[0].cloneNode(true);
    var last = this.carouselWrap.children[this.carouselCount - 1].cloneNode(true);
    // 添加过渡元素
    this.carouselWrap.insertBefore(last, this.carouselWrap.children[0]);
    this.carouselWrap.appendChild(first);
    // 设置轮播宽度
    this.setWidth(this.carousel, this.carouselOptions.carouselWidth);
    // 设置轮播高度
    this.setHeight(this.carousel, this.carouselOptions.carouselHeight);
    // 获取轮播宽度
    this.carouselWidth = this.getWidth(this.carousel);
    // 设置初始位置
    this.setLeft(this.carouselWrap, -this.carouselWidth);
    // 设置轮播长度
    this.setWidth(this.carouselWrap, this.carouselWidth * this.carouselWrap.children.length);
}
```
添加首尾的过渡元素、设置高度宽度等。

## 绑定轮播事件
然后是鼠标移入移出事件的绑定：
```javascript
playCarousel: function () {
    var _this = this;
    this.carouselIntervalr = window.setInterval(function() {
        _this.nextCarousel();
    }, this.carouselOptions.carouselInterval);
},
bindCarousel: function () {
    var _this = this;
    // 鼠标移入移出事件
    addEvent(this.carousel, 'mouseenter', function(e) {
        clearInterval(_this.carouselIntervalr);
    });
    addEvent(this.carousel, 'mouseleave', function(e) {
        _this.playCarousel();
    });
}
```
移入时停止轮播播放的定时器，移出后自动开始下一张的播放。

完成`nextCarousel()`和`prevCarousel()`函数：
```javascript
prevCarousel: function () {
    if (!this.isCarouselAnimate) {
        // 改变轮播序号
        this.carouselIndex--;
        if (this.carouselIndex < 1) {
            this.carouselIndex = this.carouselCount;
        }
        // 设置轮播位置
        this.moveCarousel(this.isFirstCarousel(), this.carouselWidth);
        if (this.carouselOptions.showCarouselDot) {
            // 显示当前圆点
            this.setDot();
        }
    }
},
nextCarousel: function () {
    if (!this.isCarouselAnimate) {
        this.carouselIndex++;
        if (this.carouselIndex > this.carouselCount) {
            this.carouselIndex = 1;
        }
        this.moveCarousel(this.isLastCarousel(), -this.carouselWidth);
        if (this.carouselOptions.showCarouselDot) {
            // 显示当前圆点
            this.setDot();
        }
    }
}
```
功能是一样的，改变轮播序号，然后进行轮播的移动。在`moveCarousel()`中完成对过渡元素的处理：
```javascript
moveCarousel: function (status, carouselWidth) {
    var left = 0;
    if (status) {
        left = -this.carouselIndex * this.carouselWidth;
    } else {
        left = this.getLeft(this.carouselWrap) + carouselWidth;
    }
    this.setLeft(this.carouselWrap, left);
}
```
轮播相关属性和事件的设置就完成了。

## 绑定圆点事件
接下来是小圆点的事件绑定：
```javascript
bindDots: function () {
    var _this = this;
    for (var i = 0, len = this.carouselDots.children.length; i < len; i++) {
        (function(i) {
            addEvent(_this.carouselDots.children[i], 'click', function (ev) {
                // 获取点击的圆点序号
                _this.dotIndex = i + 1;
                if (!_this.isCarouselAnimate && _this.carouselIndex !== _this.dotIndex) {
                // 改变圆点点击状态
                _this.isDotClick = true;
                // 改变圆点位置
                _this.moveDot();
                }
            });
        })(i);
    }
},
moveDot: function () {
    // 改变当前轮播序号
    this.carouselIndex = this.dotIndex;
    // 设置轮播位置
    this.setLeft(this.carouselWrap, -this.carouselIndex * this.carouselWidth);
    // 重设当前圆点样式
    this.setDot();
},
setDot: function () {
    for (var i = 0, len = this.carouselDots.children.length; i < len; i++) {
        this.carouselDots.children[i].setAttribute('class', CLASS.CAROUSEL_DOT);
    }
    this.carouselDots.children[this.carouselIndex - 1].setAttribute('class', CLASS.CAROUSEL_DOT_ON);
}
```
功能很简单，点击圆点后，跳转到对应序号的轮播图，并重设小圆点样式。

## 绑定箭头事件
最后，还需要绑定箭头事件：
```javascript
bindArrows: function () {
    var _this = this;
    // 箭头点击事件
    addEvent(this.arrowLeft, 'click', function(e) {
        _this.prevCarousel();
    });
    addEvent(this.arrowRight, 'click', function(e) {
        _this.nextCarousel();
    });
}
```
这样，一个没有动画的无缝轮播效果就完成了，见下图：
![carousel-test](https://i.loli.net/2018/08/10/5b6d520d4dee5.gif)

## 实现动画效果
上一节我们分析后的思路基本是实现了，但是轮播切换时的动画效果又该怎么实现呢？

既然要实现动画，那我们先要找到产生动画的源头——即让轮播发生切换的`moveCarousel()`函数。因此，我们需要先对它进行修改：
```javascript
moveCarousel: function (target, speed) {
    var _this = this;
    _this.isCarouselAnimate = true;
    function animateCarousel () {
        if ((speed > 0 && _this.getLeft(_this.carouselWrap) < target) ||
            (speed < 0 && _this.getLeft(_this.carouselWrap) > target)) {
        _this.setLeft(_this.carouselWrap, _this.getLeft(_this.carouselWrap) + speed);
        timer = window.setTimeout(animateCarousel, _this.carouselOptions.carouselAnimateInterval);
        } else {
        window.clearTimeout(timer);
        // 重置轮播状态
        _this.resetCarousel(target, speed);
        }
    }
    var timer = animateCarousel();
}
```
改造之后的`moveCarousel()`函数接受两个参数，`target`表示要移动到的轮播的位置，`speed`即为我们前面计算出的那个偏移量的值。然后通过`animateCarousel()`函数进行`setTimeout()`的递归调用，模拟出一种定时器的效果，当判断未到达目标位置时继续递归，如果到达后就重置轮播状态：
```javascript
// 不符合位移条件，把当前left值置为目标值
this.setLeft(this.carouselWrap, target);
//如当前在辅助图上，就归位到真的图上
if (target > -this.carouselWidth ) {
    this.setLeft(this.carouselWrap, -this.carouselCount * this.carouselWidth);
}
if (target < (-this.carouselWidth * this.carouselCount)) {
    this.setLeft(this.carouselWrap, -this.carouselWidth);
}
```
重置的过程和前面的实现是一样的，不再赘述。完成新的`moveCarousel()`函数之后，还需要对`prevCarousel()`及`nextCarousel()`进行改造：
```javascript
prevCarousel: function () {
    if (!this.isCarouselAnimate) {
        // 改变轮播序号
        this.carouselIndex--;
        if (this.carouselIndex < 1) {
            this.carouselIndex = this.carouselCount;
        }
        // 设置轮播位置
        this.moveCarousel(this.getLeft(this.carouselWrap) + this.carouselWidth, this.carouselAnimateSpeed);
        if (this.carouselOptions.showCarouselDot) {
            // 显示当前圆点
            this.setDot();
        }
    }
},
nextCarousel: function () {
    if (!this.isCarouselAnimate) {
        this.carouselIndex++;
        if (this.carouselIndex > this.carouselCount) {
            this.carouselIndex = 1;
        }
        this.moveCarousel(this.getLeft(this.carouselWrap) - this.carouselWidth,  -this.carouselAnimateSpeed);
        if (this.carouselOptions.showCarouselDot) {
            // 显示当前圆点
            this.setDot();
        }
    }
},
```
其实就替换了一下`moveCarousel()`调用的参数而已。完成这几个函数的改造后，动画效果初步实现了：
![carousel-test1](https://i.loli.net/2018/08/10/5b6d584522ade.gif)

## 优化动画效果
在页面上进行实际测试的过程中，我们可能偶尔会发现有卡顿的情况出现，这主要是因为用`setTimeout()`递归后模拟动画的时候产生的（直接用`setInterval()`同样会出现这种情况），所以我们需要用`requestAnimationFrame`这个HTML5的新API进行动画效率的优化，再次改造`moveCarousel()`函数：
```javascript
moveCarousel: function (target, speed) {
    var _this = this;
    _this.isCarouselAnimate = true;
    function animateCarousel () {
        if ((speed > 0 && _this.getLeft(_this.carouselWrap) < target) ||
            (speed < 0 && _this.getLeft(_this.carouselWrap) > target)) {
            _this.setLeft(_this.carouselWrap, _this.getLeft(_this.carouselWrap) + speed);
            timer = window.requestAnimationFrame(animateCarousel);
        } else {
            window.cancelAnimationFrame(timer);
            // 重置轮播状态
            _this.resetCarousel(target, speed);
        }
    }
    var timer = window.requestAnimationFrame(animateCarousel);
}
```
两种方法的调用方式是类似的，但是在实际看起来，动画却流畅了不少，最重要的，它让我们动画的效率得到了很大提升。

到这里，我们的开发就结束了吗？
用上面的方式实现完动画后，当你点击圆点时，轮播的切换是跳跃式的，并没有达到我们开头gif中那种完成后的效果。要让任意圆点点击后的切换效果仍然像相邻图片一样的切换，这里还需要一种新的思路。

假如我们当前在第一张图片，这时候的序号为1，而点击的圆点对应图片序号为5的话，我们可以这么处理：在序号1对应图片节点的后面插入一个序号5对应的图片节点，然后让轮播切换到这张新增的图片，切换完成后，立即改变图片位置为真正的序号5图片，最后删除新增的节点，过程如下：
> 第一步：插入一个新节点 5 1 5 2 3 4 5 1

> 第二步：改变图片位置，节点顺序不变

> 第三步：删除新节点，还原节点顺序 5 1 2 3 4 5 1

用代码实现出来就是这样的：
```javascript
moveDot: function () {
    // 改变轮播DOM，增加过渡效果
    this.changeCarousel();
    // 改变当前轮播序号
    this.carouselIndex = this.dotIndex;
    // 重设当前圆点样式
    this.setDot();
},
changeCarousel: function () {
    // 保存当前节点位置
    this.currentNode = this.carouselWrap.children[this.carouselIndex];
    // 获取目标节点位置
    var targetNode = this.carouselWrap.children[this.dotIndex];
    // 判断点击圆点与当前的相对位置
    if (this.carouselIndex < this.dotIndex) {
        // 在当前元素右边插入目标节点
        var nextNode = this.currentNode.nextElementSibling;
        this.carouselWrap.insertBefore(targetNode.cloneNode(true), nextNode);
        this.moveCarousel(this.getLeft(this.carouselWrap) - this.carouselWidth, -this.carouselAnimateSpeed);
    }
    if (this.carouselIndex > this.dotIndex) {
        // 在当前元素左边插入目标节点
        this.carouselWrap.insertBefore(targetNode.cloneNode(true), this.currentNode);
        // 因为向左边插入节点后，当前元素的位置被改变，导致画面有抖动现象，这里重置为新的位置
        this.setLeft(this.carouselWrap, -(this.carouselIndex + 1) * this.carouselWidth);
        this.moveCarousel(this.getLeft(this.carouselWrap) + this.carouselWidth, this.carouselAnimateSpeed);
    }
}
```
需要注意的是，这里要判断点击的圆点序号与当前序号的关系，也就是在当前序号的左边还是右边，如果是左边，还需要对位置进行重置。最后一步，完成新增节点的删除函数`resetMoveDot()`：
```javascript
resetCarousel: function (target, speed) {
    // 判断圆点是否点击
    if (this.isDotClick) {
        // 重置圆点点击后的状态
        this.resetMoveDot(speed);
    } else {
        // 重置箭头或者自动轮播后的状态
        this.resetMoveCarousel(target);
    }
    this.isDotClick = false;
    this.isCarouselAnimate = false;
},
resetMoveDot: function (speed) {
    // 如果是圆点点击触发动画，需要删除新增的过度节点并将轮播位置重置到实际位置
    this.setLeft(this.carouselWrap, -this.dotIndex * this.carouselWidth);
    // 判断点击圆点和当前圆点的相对位置
    if (speed < 0) {
        this.carouselWrap.removeChild(this.currentNode.nextElementSibling);
    } else {
        this.carouselWrap.removeChild(this.currentNode.previousElementSibling);
    }
},
```
查看一下效果：
![carousel-test2](https://i.loli.net/2018/08/10/5b6d60f398104.gif)

大功告成！！

# H5轮播
在Web版轮播的实现中，我们对位置的控制是直接使用元素绝对定位后的`left`值实现的，这种办法虽然兼容性好，但是效率相对是比较低的。在移动端版本的实现中，我们就可以不用考虑这种兼容性的问题了，而可以尽量用更高效的方式实现动画效果。

如果大家对CSS3有所了解，那想必一定知道`transform`这个属性。从字面上来讲，它就是变形，改变的意思，而它的值大致包括`旋转rotate`、`扭曲skew`、`缩放scale`和`移动translate`以及`矩阵变形matrix`等几种类型。我们今天需要用到的就是`translate`，通过使用它以及`transition`等动画属性，可以更高效简洁的实现移动端图片轮播的移动。

由于基本思路与架构和Web版是差不多的，而H5版是基于Web版重写的，所以这里只说下需要改变的几个地方。

## 替换Left的操作方法
既然是用新属性来实现，那首先就要重写`setLeft()`和`getLeft()`方法，这里我们直接替换为两个新方法：
```javascript
setLeft: function (elem, value) {
  elem.style.left = value + 'px';
},
getLeft: function (elem) {
  return parseInt(elem.style.left);
}

setTransform: function(elem ,value) {
  elem.style.transform =
    "translate3d(" + value + "px, 0px, 0px)";
  elem.style["-webkit-transform"] =
    "translate3d(" + value + "px, 0px, 0px)";
  elem.style["-ms-transform"] =
    "translate3d(" + value + "px, 0px, 0px)";
},
getTransform: function() {
  var x =
    this.carouselWrap.style.transform ||
    this.carouselWrap.style["-webkit-transform"] ||
    this.carouselWrap.style["-ms-transform"];
  x = x.substring(12);
  x = x.match(/(\S*)px/)[1];
  return Number(x);
}
```
新版的方法功能与老版完全一直，只是实现所用到的方法不一样了。接下来我们需要一个`transition`值的设置方法，通过这个动画属性，连`requestAnimationFrame`的相关操作也不需要了：
```javascript
setTransition: function(elem, value) {
  elem.style.transition = value + 'ms';
}
```
有了这三个方法，接下来就可以重写`moveCarousel()`、`resetCarousel()`和`resetMoveCarousel()`方法了：
```javascript
moveCarousel: function(target) {
  this.isCarouselAnimate = true;
  this.setTransition(this.carouselWrap, this.carouselOptions.carouselDuration);
  this.setTransform(this.carouselWrap, target);
  this.resetCarousel(target);
},
resetCarousel: function(target) {
  var _this = this;
  window.setTimeout(function() {
    // 重置箭头或者自动轮播后的状态
    _this.resetMoveCarousel(target);
    _this.isCarouselAnimate = false;
  }, _this.carouselOptions.carouselDuration);
},
resetMoveCarousel: function(target) {
  this.setTransition(this.carouselWrap, 0);
  // 不符合位移条件，把当前left值置为目标值
  this.setTransform(this.carouselWrap, target);
  //如当前在辅助图上，就归位到真的图上
  if (target > -this.carouselWidth) {
    this.setTransform(this.carouselWrap, -this.carouselCount * this.carouselWidth);
  }
  if (target < -this.carouselWidth * this.carouselCount) {
    this.setTransform(this.carouselWrap, -this.carouselWidth);
  }
}
```
之所以在每次`setTransform()`改变位置之前都要重新设置`transition`的值，是因为`transition`会使每次位置的改变都带上动画效果，而我们在代码中做的过渡操作又不希望用户直接看到，因此，重设它的值后才能和以前的实现效果保持一致。

## 添加touch事件
在移动端上我们通常习惯用手指直接触摸屏幕来操作应用，所以Web端圆点和箭头的交互方式这时候就显得不那么合适了，取而代之的，我们可以改写成触摸的交互方式，也就是`touch`事件实现的效果：
```javascript
bindCarousel: function() {
  var _this = this;
  // 鼠标移入移出事件
  addEvent(this.carousel, "touchstart", function(e) {
    if (!_this.isCarouselAnimate) {
      clearInterval(_this.carouselIntervalr);
      _this.carouselTouch.startX = _this.getTransform();
      _this.carouselTouch.start = e.changedTouches[e.changedTouches.length - 1].clientX;
    }
  });
  addEvent(this.carousel, "touchmove", function(e) {
    if (!_this.isCarouselAnimate && _this.carouselTouch.start != -1) {
      clearInterval(_this.carouselIntervalr);
      _this.carouselTouch.move =
        e.changedTouches[e.changedTouches.length - 1].clientX - _this.carouselTouch.start;
      _this.setTransform(_this.carouselWrap, _this.carouselTouch.move + _this.carouselTouch.startX);
    }
  });
  addEvent(this.carousel, "touchend", function(e) {
    if (!_this.isCarouselAnimate && _this.carouselTouch.start != -1) {
      clearInterval(_this.carouselIntervalr);
      _this.setTransform(_this.carouselWrap, _this.carouselTouch.move + _this.carouselTouch.startX);
      var x = _this.getTransform();
      x +=
        _this.carouselTouch.move > 0
          ? _this.carouselWidth * _this.carouselTouch.offset
          : _this.carouselWidth * -_this.carouselTouch.offset;
      _this.carouselIndex = Math.round(x / _this.carouselWidth) * -1;
      _this.moveCarousel(
        _this.carouselIndex * -_this.carouselWidth
      );
      if (_this.carouselIndex > _this.carouselCount) {
        _this.carouselIndex = 1;
      }
      if (_this.carouselIndex < 1) {
        _this.carouselIndex = _this.carouselCount;
      }
      _this.playCarousel();
    }
  });
}
```
简单来说，我们把触摸事件分为三个过程——开始、移动、结束，然后在这三个过程中，就可以分别实现对应的逻辑与操作了：
1. touchmove获取触摸的起始点
2. touchmove计算触摸后的偏移量
3. 判断偏移的方向，改变图片位置

通过这套逻辑，我们模拟的移动设备的触摸效果就能成功实现了：
![carousel-test4](https://i.loli.net/2018/08/12/5b6fcc24484ba.gif)

> 文章本身只是对项目整体思路和重点部分的讲解，一些细节点也不可能面面俱到，还请大家对照源码自行理解学习~

最后我想说的是，类似轮播这样的优秀插件其实已经有很多了，但这并不妨碍我们写一个自己的版本。因为只有自己写一遍，并在脑中走一遍自己的思维过程，然后在学习一些优秀的源码及实现时才不至于懵圈。

到止为止，我们第二个轮子的开发也算顺利完成了，所有源码已同步更新到`github`，如果大家发现有bug或其他问题，可以回复在项目的`issue`中，咱们后会有期！（挖坑不填，逃。。

To be continued...

# 参考内容
- [JS 跑马灯（轮播图）效果中，最后一张滚回到第一张，怎样优化“视觉倒退”？](https://www.zhihu.com/question/37809744)
- [用原生的javascript 实现一个无限滚动的轮播图](https://www.cnblogs.com/yewenxiang/p/6115931.html)
- [原生JavaScript实现轮播图](https://kongwsh.github.io/2016/09/28/carousel/)
- [原生js实现轮播图](https://www.cnblogs.com/zhuzhenwei918/p/6416880.html)
- [手把手原生js简单轮播图](http://www.cnblogs.com/LIUYANZUO/p/5679753.html)
- [vue-swiper](https://github.com/zwhGithub/vue-swiper)

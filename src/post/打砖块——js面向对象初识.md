最近看完了阮一峰老师的*[面向对象编程系列](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)*，就一时手痒想写个小demo来练练手，熟悉下面向对象的思想。选来选去，还是想找个逻辑稍微简单点的游戏来做例子，然后有一天突然想到大学时未写完的打砖块，ok！就它了！
> 结果发现是个深坑。。/(ㄒoㄒ)/~~

<!--more-->

好了，废话不多说，正文开始。

> PS：因为这个程序第一遍是用面向过程的老办法写的，所以先从面向过程入手，大致理一遍游戏的逻辑，再讲解用面向对象重构程序的思路。

# pop-程序初始化
## 程序入口
（事先声明，由于本篇文章重点在于面向对象的思路讲解，所以程序本身的逻辑部分就尽量简单的叙述了，有不清楚的可以直接去看源码。）
面向过程程序的初始化通场分为几个部分：入口函数、全局变量声明、初始化方法调用。这里首先要讲的就是整个程序的入口函数，在Web开发中一般可以用以下几种方式让网页在加载完所有资源后调用js文件或者执行js函数：
```javascript
// 1、onload方法
window.onload = function () {
  // 初始化函数
};

// 2、jQuery
$(document).ready(function(){
  // 初始化函数
});
//可以简写为以下形式
$(function(){
  // 初始化函数
});

// 3、自执行函数（挖个坑，重构部分会讲到
```
那么问题来了，这几种方法有区别么？或者说互相能代替么？
答案是不行，具体见：*[js自执行函数可否代替onload事件？](https://segmentfault.com/q/1010000000524008)*

## 全局变量声明
由于面向过程是函数调用函数，所以变量只分为各个函数内的局部变量和函数外的全局变量，本程序的全局变量如下：
```javascript
var canvas; // 画布元素
var context; // context对象
var canvasWidth = 640; // 定义画布宽度
var canvasHeight = 480; // 定义画布高度
var gameStart = true; // 游戏是否开始
var gameTimer; // 游戏定时器，主循环
var gameScore = 0; // 游戏得分
var gameLife = 3; // 游戏生命条数
/* 小球属性 */
var ballRadius = 10; // 小球半径
var ballSpeed = 4; // 小球速度
var ballColor = "#eee"; // 小球颜色
var ballSpeedX = ballSpeed; // 小球X方向的速度
var ballSpeedY = ballSpeed; // 小球Y方向的速度
var ballPositionX = 320; // 小球位置X坐标
var ballPositionY = 420; // 小球位置Y坐标
/* 球板属性 */
var boardWidth = 80; // 球板宽度
var boardHeigth = 10; // 球板高度
var boardSpeed = 40; // 球板速度
var boardPositionX = canvasWidth/2 - boardWidth/2; // 球板位置X坐标
var boardPositionY = canvasHeight - 40 - boardHeigth; // 球板位置Y坐标
var boardColor = "#000"; // 球板颜色
/* 砖块属性 */
var brickWidth = 40; // 砖块宽度
var brickHeight = 20; // 砖块高度
```
为什么有这么多？因为这些变量不写在程序最顶部，程序调用的函数将无法调用或改变其他函数使用的变量。其实这里的缺点已经显而易见了：变量过多难以维护、容易引起作用域混乱、容易与函数内部变量冲突等等，从各个角度讲这都是最low的一种实现方式，在重构部分中我们会有更好的变量组织方式。

## 初始化方法调用
本程序的初始化大体分为几个步骤：绘制游戏界面、初始化游戏生命及分数、绑定事件，见代码：
```javascript
/* 页面加载完成后执行此方法 */
/* 本程序的入口函数 */
window.onload = function () {
    // 获得canvas元素
    canvas = document.getElementById("canvas");
    // 获得context对象
    context = canvas.getContext("2d");
    // 设置canvas尺寸
    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", canvasHeight);

    // 初始化游戏
    initGame();
    // 初始化游戏分数
    document.getElementById("score").innerHTML = gameScore;
    // 初始化游戏生命
    document.getElementById("life").innerHTML = gameLife;

    // 绑定canvas点击事件
    canvas.onclick = function() {
        if (gameStart) {
            gameStart = false;

            // gameTimer = setInterval(function(){
            //        gameLoop(context);
            //    }, 10);

            // 游戏主循环
            gameLoop();
        }
    };

    // 监听键盘事件
    document.addEventListener("keydown", function(event) {
        var e = event || window.event;

        // 按下向左键
        if (e.keyCode === 37) {
            if (gameStart) {
                moveStopBall(-boardSpeed);
            }
            moveBoard(-boardSpeed);
        }

        // 按下向右键
        if (e.keyCode === 39) {
            if (gameStart) {
                moveStopBall(boardSpeed);
            }
            moveBoard(boardSpeed);
        }
    }, false);

    // 监听鼠标移动事件
    document.addEventListener("mousemove", function (e) {
        var relativeX = e.clientX - canvas.getBoundingClientRect().left;
            if(relativeX > boardWidth / 2 && relativeX < canvas.width - boardWidth / 2) {
            if (gameStart) {
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                initBricks();
                ballPositionX = relativeX;
                drawBall(ballPositionX, ballPositionY);
            }
            boardPositionX = relativeX - boardWidth / 2;
            drawBoard(boardPositionX, boardPositionY);
        }
    }, false);
};
```
其中在`initGame()`里分别调用了三个函数来绘制砖块、球板和球的初始位置，绘制代码里值得一提的是砖块的绘制：
```javascript
/* 初始化砖块位置 */
function initBricks() {
    for (var i = 0; i < bricks.length; i++) {
        drawBrick(bricks[i].brickPositionX, bricks[i].brickPositionY, bricks[i].brickColor);
    }
}
```
因为每个砖块都有位置、颜色等基本属性，所以这里将其定义为单独的一个数组，数组里存放砖块对象，格式如下（详情见源码`brickConfig.js`文件）：
```javascript
/* 砖块参数配置 */
var bricks = [
    {
        brickPositionX: 40,
        brickPositionY: 40,
        brickColor: "#ff0000"
    }
]
```
游戏初始化结束后，接下来就是事件的绑定了，为了便于控制，在常规键盘的操作上还增加了鼠标移动，鼠标控制的原理稍显复杂，需要计算鼠标和画布左边的相对距离，不过绘制逻辑是一样的。

# pop-程序主体逻辑
## 游戏主循环
一般涉及到画面有动态图形绘制的游戏都会有一个“主循环”函数，而这也是游戏程序的基本思路之一。在我们的程序中，当用户点击界面后，游戏便会正式开始，这时候我们会去执行`gameLoop()`函数，这个函数的主要逻辑就是让小球移动，然后在画面刷新的每一帧里去检测小球的碰撞。怎么才能让小球移动呢？这里涉及到的又一个游戏编程里的重要概念就是画面刷新以及帧数的控制，小球并不是真的自己在动，而是我们在程序中去给它改变画布上的x、y坐标以及定时去让画面刷新的结果。
```javascript
/* 游戏主循环 */
function gameLoop() {
    gameTimer = requestAnimationFrame(gameLoop);
    moveBall();
    checkBallPosition();
    for (var i = 0; i < bricks.length; i++) {
        if (checkBallCollide(bricks[i].brickPositionX, bricks[i].brickPositionY, brickWidth, brickHeight)) {
            bricks.splice(i, 1);
            gameScore = gameScore + 100;
            document.getElementById("score").innerHTML = gameScore;
            if (bricks.length == 0) {
                cancelAnimationFrame(gameTimer);
                alert("你赢了！你的得分是"+gameScore+"分！");
                document.location.reload();
            }
            break;
        }
    }
    checkBallCollide(boardPositionX, boardPositionY, boardWidth, boardHeigth);
}
```
> PS：在HTML5的新特性中，给我们提供了`requestAnimationFrame()`这样一个函数，它能自动优化画面的刷新，所以我们这里就可以抛弃掉原生的setInterval方法了。

## 碰撞检测
好了，终于到了这个程序逻辑最核心的部分。

碰撞检测，一个可大可小的概念，但是在游戏里的地位却是举足轻重的，因为好的碰撞检测往往能大幅度的提升玩家的游戏体验，而在我们的程序中便是要判断砖块和小球的碰撞。让我们把这个概念稍微抽象一下，其实就是要去判断屏幕上一个矩形与圆形是否重叠。

怎么样？乍看之下觉得简单？当你真正往下思考的时候便会发现这个问题并不简单，甚至当我们在程序中真正使用的时候更会遇到各种各样的问题。我采用的实现是Milo Yip大大在知乎上贴出来的算法实现：*[怎样判断平面上一个矩形和一个圆形是否有重叠？](https://www.zhihu.com/question/24251545)*

这个算法利用了向量来进行位置的判断与运算，大大简化了坐标的运算量。这里说一下，我的程序采用的这种原始坐标的计算方法其实是很low的，比较好的做法是用向量来表示对象的位置和运动，因为我也还在学习研究中，所以并没有给出自己的实现，这里贴出一些关于向量的基础资料：

*[javascript中的“向量”](https://www.bbsmax.com/A/gAJGPPwo5Z/)*

*[Javascript 向量简单应用](http://www.cnblogs.com/xqhppt/archive/2012/03/31/2427611.html)*

*[利用向量运算解决圆线碰撞问题](http://wuzhiwei.net/vector_circle_line_collide/)*

再补充一个关于向量的库：*[verlet-js](https://github.com/subprotocol/verlet-js)*，基本实现了常用的向量运算。

在程序中实现了这个算法后，发现游戏确实能正常判断碰撞了，但是在某些特定情况之下会出现小球进入砖块内部来回碰撞的情况，这是为什么呢？其实这个bug在游戏碰撞中也很常见，但是刚开始我也不知道真正的原因，所以关于这个问题我在segmentfault和zhihu都提了问题：

*[打砖块游戏中 怎么判断小球与方块的撞击 以及小球撞击后运动的方向呢？](https://www.zhihu.com/question/63683267)*

*[打砖块游戏中 怎么判断小球与方块撞击后运动的方向呢？](https://segmentfault.com/q/1010000010567456)*

一句话概括的话，原因主要就是小球在n-1帧处于砖块的外面，然后第n帧进行判断的时候已经在砖块内部了，所以第n+1帧小球再进行碰撞判断就会让它反复在砖块内运动了，我们的碰撞检测的基础是小球不能处于砖块内部，而现在的问题基本就暴露出来了，必须让小球在第n帧的时候一定处于砖块外面或者刚好与砖块相切的位置，所以我们就应该手动去让小球与砖块“分离”，但是这个分离的最小距离和方向应该怎么计算呢？关于这个问题，在我们现在的算法里实际上是很难精确计算出来的，所以我只做了一个简单的坐标纠正，虽然在小部分连续碰撞的情况下还会出问题，但是在大多数时候都比原来好多了。

我知道这个时候你想问的问题，有没有一种算法能完美的计算出这个最小分离量呢？答案是肯定的，这个算法就是在碰撞检测中很有名的`分离轴定理（Separating Axis Theorem）`。运用这个定理能一次性解决2d平面内所有凸边形的碰撞检测，可以说是非常高级的方法了，不过实现过程这里不是重点就带过了，给出一些关于碰撞的资料供参考：

*[碰撞检测之分离轴定理算法讲解](http://blog.csdn.net/yorhomwang/article/details/54869018)*

*[AABB碰撞盒算法](https://developer.mozilla.org/zh-TW/docs/Games/Techniques/2D_collision_detection)*

*[javascript的2D空间碰撞检测](http://blog.mn886.net/chenjianhua/show/dc896035baa6/index.html)*

*[2D碰撞检测之分离轴算法（Separating Axis Theorem）](http://www.umiringo.com/2017/06/02/2dpeng-zhuang-jian-ce-zhi-fen-chi-zhou-suan-fa-separating-axis-theorem/)*

*[“等一下，我碰！”——常见的2D碰撞检测](https://github.com/JChehe/blog/issues/8)*

*[扇形与圆盘相交测试浅析](https://zhuanlan.zhihu.com/p/23903445)*

*[基于canvas的碰撞检测](https://xxyj.github.io/2017/06/07/基于canvas的碰撞检测/)*

*[Detecting collision of rectangle with circle](https://stackoverflow.com/questions/21089959/detecting-collision-of-rectangle-with-circle)*

*[Circle-Rectangle collision detection (intersection)](https://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection?noredirect=1&lq=1)*

*[How to fix circle and rectangle overlap in collision response?](https://stackoverflow.com/questions/18704999/how-to-fix-circle-and-rectangle-overlap-in-collision-response?rq=1)*

*[Circle/rectangle collision response](https://stackoverflow.com/questions/45370692/circle-rectangle-collision-response)*

在搜集资料的过程中，发现两个关于canvas方面的不错的博客，它们也给了我不少启发：

*[岑安](http://www.cnblogs.com/hongru/)*

*[当耐特](http://www.cnblogs.com/iamzhanglei/)*

面向过程的程序梳理就到这里，那么接下来我们就可以用面向对象的思路开始重构了。

# oop-程序初始化
## 自执行函数
首先还是程序的初始化，我们这里就不采用传统的window.onload了，而是用“自执行函数”的方式，关于这个概念可以参考如下问题：
*[javascript 这样写(function(){})() 有什么用途？](https://segmentfault.com/q/1010000000718015)*
简单来说，只要这样写了，浏览器就会自动执行这个js文件的内容，非常方便快捷。

# oop-基本对象的抽象
## 对象梳理
面向对象程序编写的第一步往往是程序对象的梳理，因为只有梳理出基本的对象，程序才能对象化，而不是流程化。
在我们的程序中，最基本的对象无非就是小球、球板、砖块，它们之间相互影响的关系便构成了游戏的核心。

## 小球
首先是小球自身的属性定义：
```javascript
/* 定义小球 */
var Ball = function(x, y) {
    this.ballPositionX = x; // 小球球心X坐标
    this.ballPositionY = y; // 小球球心Y坐标
    this.ballSpeedX = this.ballSpeed; // 小球X方向的速度
    this.ballSpeedY = this.ballSpeed; // 小球Y方向的速度
};
```
这四个属性因为会随着程序的逻辑状态而发生改变，所以我们将它们定义在构造函数中，方便调用，剩下的一些属性和方法就可以定义在Ball对象的原型上了：
```javascript
Ball.prototype = {
    ballRadius: 10, // 小球半径
    ballSpeed: 4, // 小球速度
    ballColor: "#eee", // 小球颜色
    // 绘制小球
    drawBall: function(x, y, context) {
        context.beginPath();
        context.arc(x, y, this.ballRadius, 0, Math.PI * 2, true);
        context.fillStyle = this.ballColor;
        context.fill();
        context.closePath();
    },
    // 改变小球球心X坐标
    moveBallPositionX: function(speed) {
        this.ballPositionX = this.ballPositionX + speed;
    },
    // 改变小球球心Y坐标
    moveBallPositionY: function(speed) {
        this.ballPositionY = this.ballPositionY + speed;
    },
    // 检测小球是否与球板或者砖块碰撞（算法暂时存在bug，待优化）
    checkBallCollide: function(x, y, width, height) {
        //  略
    }
}
```

## 球板
球板的定义只需要左上角的绘制坐标即可：
```javascript
/* 定义球板 */
var Board = function(x, y) {
    this.boardPositionX = x; // 球板位置X坐标
    this.boardPositionY = y; // 球板位置Y坐标
};
```
自身属性以及绘制方法的定义：
```javascript
Board.prototype = {
    boardWidth: 80, // 球板宽度
    boardHeigth: 10, // 球板高度
    boardSpeed: 40, // 球板速度
    boardColor: "#000", // 球板颜色
    // 绘制球板
    drawBoard: function(x, y) {
        context.beginPath();
        context.fillStyle = this.boardColor;
        context.fillRect(x, y, this.boardWidth, this.boardHeigth);
        context.closePath();
    },
    // 检测球板位置
    checkBoardPosition: function(speed) {
        if (this.boardPositionX + speed < 0) {
            this.boardPositionX = 0;
            this.drawBoard(this.boardPositionX, this.boardPositionY);
            return -1;
        } 
        if (this.boardPositionX + speed > canvasWidth - this.boardWidth) {
            this.boardPositionX = canvasWidth - this.boardWidth;
            this.drawBoard(this.boardPositionX, this.boardPositionY);
            return 0;
        }
        return 1;
    },
    // 移动球板
    moveBoard: function(speed) {
        if (this.checkBoardPosition(speed) == 1) {
            this.boardPositionX = this.boardPositionX + speed;
            this.drawBoard(this.boardPositionX, this.boardPositionY);
        }
    }
};
```
在`checkBoardPosition()`中我们会对球板的位置进行判断，如果到达画布边缘就不再让它的坐标变化了，和小球的处理逻辑类似。

## 砖块
砖块的定义：
```javascript
var Brick = function(x, y, level) {
    this.brickPositionX = x;
    this.brickPositionY = y;
    this.brickLevel = level;
};
Brick.prototype = {
    brickWidth: 40, // 砖块宽度
    brickHeight: 20 // 砖块高度
};
```
砖块本身的定义比较简单，没什么好说的。

## 砖块集合
因为我们需要批量去处理所有砖块，所以这里就定义一个砖块集合的对象，统一来配置砖块的属性：
```javascript
var Bricks = function() {};

Bricks.prototype = {
    brickColors: [],
    // 绘制砖块
    drawBrick: function(game) {
        var config = this.bricksConfig[game.gameLevel - 1];
        for (var i = 0; i < config.length; i++) {
            context.beginPath();
            context.fillStyle = this.brickColors[i];
            context.fillRect(config[i].brickPositionX, config[i].brickPositionY, config[i].brickWidth, config[i].brickHeight);
            context.closePath();
        }
    },
    // 初始化方块颜色
    initBrickColors: function () {
        var config = this.bricksConfig[game.gameLevel - 1];

        for (var i = 0; i < config.length; i++) {
            this.brickColors.push('rgb('+this.getRandNum(255)+','+this.getRandNum(255)+','+this.getRandNum(255)+')');
        }
    },
    // 生成随机数
    getRandNum: function (num) {
        return Math.floor(Math.random() * num + 1);
    },
    // 砖块配置信息
    bricksConfig: [
        // 第一关
        [
            // 左上到右下
            new Brick(40,   40, 2), new Brick(80,   60, 1), new Brick(120,  80, 1),
            new Brick(160, 100, 1), new Brick(200, 120, 1), new Brick(240, 140, 1),
            new Brick(280, 160, 1), new Brick(320, 180, 1), new Brick(360, 200, 1),
            new Brick(400, 220, 1), new Brick(440, 240, 1), new Brick(480, 260, 1),
            new Brick(520, 280, 1), new Brick(560, 300, 2), 
        ],
        ...
    ]
}    
```
在`bricksConfig`里我们会将每一关的砖块配置单独定义为一个数组，而砖块就统一用new关键字来创建。（这里因为砖块的坐标没有规律，不然采用循环来创建是最好的）
颜色的初始化是利用的rgb的色值，每次生成的时候就去取255内的随机数，达到颜色的随机效果。

到这里就结束了吗？显然还不够，我们还需要一个游戏状态的对象，来管理游戏的基本属性。

## 游戏状态
在这个程序中，我们需要四个基本的游戏属性状态：游戏开始和结束状态、游戏得分、游戏生命条数、游戏关卡数，而分数的设置就直接将程序中的变量显示到界面即可。
```javascript
/* 定义游戏状态 */
var Game = function(gameStart, gameScore, gameLife, gameLevel) {
    this.gameStart = gameStart; // 游戏是否开始
    this.gameScore = gameScore; // 游戏得分
    this.gameLife = gameLife; // 游戏生命条数
    this.gameLevel = gameLevel; // 游戏关卡数
};

Game.prototype = {
    // 设置游戏分数
    setGameScore: function(gameScore) {
        document.getElementById("score").innerHTML = gameScore;
    },
    // 设置游戏生命
    setGameLife: function(gameLife) {
        document.getElementById("life").innerHTML = gameLife;
    }
};
```

本篇文章基本讲解完毕，靠一篇文章当然是讲不清楚oop和pop的，我们也不能简单的说oop就比pop好，但是通过本篇文章可以看到在大多数时候oop确实能使我们的程序更清晰易懂，即使代码结构稍微复杂点我觉得也是值得的。
*[面向过程 VS 面向对象](https://zhuanlan.zhihu.com/p/28427324?group_id=878914871377424384)*：在这篇文章里用五子棋程序为例也简单的比较了两种方法的优劣，希望能给大家一些启发吧~

最后别忘了给我的项目点个Star哦~(〃'▽'〃) *[Brick](https://github.com/csd758371536/Brick)*
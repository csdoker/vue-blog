上一篇文章我们简单的介绍了五子棋以及AI相关的基本概念，相信大家也对五子棋的历史以及现状有了一个大概的印象，那么从这篇文章起，就正式开始这个五子棋的制作。
本篇文章我们将完成游戏界面的绘制（包括棋盘，棋子）、棋盘的点击事件以及基本的游戏逻辑。
<!--more-->
> Tips：本文以及之后的文章均只贴出关键部分实现的代码，想查看完整的源码及效果可以访问该项目的Github地址以及在线演示页面。（地址将在文末贴出）


## 绘制棋盘与棋子
因为我们的主要目的是AI的设计，所以这个游戏界面设计得比较简单，同时也方便我们的编码实现。

首先大概介绍下这个项目所用到的技术：
* 界面：考虑到游戏的执行效率和优化问题，这里我们采用HTML5的`canvas`来绘制游戏界面。
* 逻辑：不采用复杂的框架或引擎技术，尽量使用简单的`JavaScript`脚本（少量`jQuery`语句）来完成基本的逻辑操作以及AI的实现。

本游戏采用类似井字棋的下法规则，棋子落在格子内而不是交叉点。棋子则采用X和O来代替黑棋和白棋（其实是个人不喜欢传统的黄色棋盘和黑白棋子。。审美疲劳），默认情况下X为传统规则下的黑棋，也就是先手。

五子棋棋盘由横纵各15条等距离，垂直交叉的平行线构成。我们首先要做的就是利用canvas的画线函数`lineTo`来绘制这个棋盘。
```javascript
//绘制棋盘
function drawChessBoard() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.lineWidth = 2;
    context.strokeStyle = "#577A9E";//线条颜色
    var lineOffset = 1;//线条偏移量

    for (var i = 0; i <= 420; i += 28) {//绘制棋盘的线
        context.beginPath();
        context.moveTo(1, i + lineOffset);
        context.lineTo(421, i + lineOffset);
        context.closePath();
        context.stroke();

        context.beginPath();
        context.moveTo(i + lineOffset, 1);
        context.lineTo(i + lineOffset, 421);
        context.closePath();
        context.stroke();
    }
}
```

这里遇到了一个不是bug的bug，用`lineTo`画一条线的时候看不出来，但是循环画出棋盘后，就发现线条粗细不一样。在网上查阅了相关资料，才知道是因为`canvas`绘制线条的方式会使线条变模糊，所以这里必须把原坐标加上一个偏移量才能使绘图恢复正常。(绘制棋子时也会加上这个偏移量)

绘制线条的原理可以参考下面这几篇文章：
*[HTML5 Canvas中实现绘制一个像素宽的细线](http://blog.csdn.net/jia20003/article/details/9474939)*
*[HTML5 Canvas画图教程(3)—canvas出现1像素线条模糊不清的原因](http://www.bozhiyue.com/html5/2016/0629/212509.html)*
*[html canvas绘制1px直线时出现的模糊问题。。线的粗细不同是bug么?](https://segmentfault.com/q/1010000006786067)*

接下来我们需要一个15x15二维数组`chessData`来记录棋盘信息，不同类型的棋子对应二维数组中不同的值。
```javascript
//初始化棋盘信息
function initChessData() {
    chessData = new Array(15);

    for (var x = 0; x < 15; x++) {
        chessData[x] = new Array(15);
        for (var y = 0; y < 15; y++) {
            chessData[x][y] = 0;//初始化0为没有走过的，1为cross走的，2为circle走的
        }
    }
}
```

用canvas封装的`arc`函数可以很轻松的画出圆形：
```javascript
//绘制circle棋子
function drawChessCircle(x, y) {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.lineWidth = 3;
    context.strokeStyle = "#e74c3c";

    var offset = 1;

    context.beginPath();
    context.arc(x + offset, y + offset, 9, 0, Math.PI * 2, true);
    context.closePath();
    context.stroke();
}
```

画一个叉形其实就是画两条相交的直线，画圆的函数传入参数为圆心的坐标，画叉的函数传入的坐标为两条直线相交的坐标，因此需要根据相交点的坐标分别求出直线四个端点的坐标，算法不难，直接上代码：
```javascript
//绘制cross棋子
function drawChessCross(x, y) {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.lineWidth = 3;
    context.strokeStyle = "#2ecc71";

    var crossRadius = 8;
    var offset = 1;

    context.beginPath();
    context.moveTo(x + offset - crossRadius, y + offset - crossRadius);
    context.lineTo(x + offset + crossRadius, y + offset + crossRadius);
    context.lineCap = "round";
    context.stroke();

    context.beginPath();
    context.moveTo(x + offset + crossRadius, y + offset - crossRadius);
    context.lineTo(x + offset - crossRadius, y + offset + crossRadius);
    context.lineCap = "round";
    context.stroke();
}
```

界面的绘制部分到此就基本完成了，接下来我们给canvas画布添加点击事件。
## 添加点击事件

```javascript
//鼠标点击事件
function play(e) {
    //判断该局是否结束
    if (isWell) {
        alert("本局已结束，重玩请刷新");
        return;
    }

    var bbox = canvas.getBoundingClientRect();

    //计算鼠标点击的区域
    var x = parseInt((e.clientX - bbox.left) / 28);
    var y = parseInt((e.clientY - bbox.top) / 28);

    curUser = 1;//设置当前玩家为cross

    if (curUser == 1) {
        chessType = 1;//设置当前棋子类型为cross
    } else {
        chessType = 2;
    }

    //判断该位置是否有棋子
    if (chessData[x][y] != 0) {
        return;
    }

    generateManChess(x, y);

    if (isWell) {
        alert("你赢了");
        return;
    }

    generateAIChess();
}
```

> Tips：`isWell`、`curUser`、`chessType`均为全局变量，游戏开始后便读取其初始值。（见源码）

因为我们要模拟人类与电脑下棋的过程，所以需要两个函数来生成人类和电脑的棋子，他们分别是`generateManChess`和`generateAIChess`函数。
目前还没实现AI，所以`generateAIChess`暂时采用取随机数的方式来体现电脑下棋的效果。
```javascript
//生成人类棋子
function generateManChess(x, y) {
    drawChess(x, y, chessType);//绘制cross棋子
    checkWin(x, y, chessType);
}

//生成AI棋子
function generateAIChess() {
    var x;
    var y;

    curUser = 2;//设置当前玩家为circle

    if (curUser == 1) {
        chessType = 1;
    } else {
        chessType = 2;//设置当前棋子类型为circle
    }

    while (1) {
        x = Math.floor(Math.random()*10) + Math.floor(Math.random()*6);
        y = Math.floor(Math.random()*10) + Math.floor(Math.random()*6);

        if (chessData[x][y] == 0) {
            break;
        }
    }

    drawChess(x, y, chessType);
    checkWin(x, y, chessType);
    if (isWell) {
        alert("你输了");
        return;
    }
}
```

## 棋局判负逻辑
最后要实现的便是游戏的判负逻辑，但是由于五子棋的特殊性，判负并不像象棋那么简单。玩过五子棋的都知道，取得胜利的条件就是让五个子连成一线，所以我们就需要遍历整个棋盘的二维数组，来获取是否有连续的五个棋子连成了一条线。那么这里的思路就是，设置4个变量来计数，当棋盘上每出现一个棋子，就获取这个棋子周围每个方向的情况，如果某个方向上有同类的棋子就让这个方向的变量值+1，最后统计每个变量值是否大于等于5。
```javascript
//判断胜负
function checkWin(x, y, chessType) {
    //设置每个方向的连子计数
    var countLeftRight = 0;
    var countUpDown = 0;
    var countUpperLeftToLowerRight = 0;//左上到右下
    var countUpperRightToLowerLeft = 0;//右上到左下

    //左右判断
    for (var i = x; i >= 0; i--) {
        if (chessData[i][y] != chessType) {
            break;
        }
        countLeftRight++;
    }
    for (var i = x + 1; i < 15; i++) {
        if (chessData[i][y] != chessType) {
            break;
        }
        countLeftRight++;
    }
    //上下判断
    for (var i = y; i >= 0; i--) {
        if (chessData[x][i] != chessType) {
            break;
        }
        countUpDown++;
    }
    for (var i = y + 1; i < 15; i++) {
        if (chessData[x][i] != chessType) {
            break;
        }
        countUpDown++;
    }
    //左上右下判断
    var t = y;
    var w = y + 1;
    for (var i = x; i >= 0; i--) {

        if (chessData[i][t] != chessType) {
            break;
        }
        if (t >= 0) {
            t = t - 1;
        }
        countUpperLeftToLowerRight++;
    }
    for (var i = x + 1; i < 15; i++) {
        if (chessData[i][w] != chessType) {
            break;
        }
        if (w < 15) {
            w = w + 1;
        }
        countUpperLeftToLowerRight++;
    }
    //右上左下判断
    var h = y;
    var z = y + 1;
    for (var i = x; i < 15; i++) {
        if (chessData[i][h] != chessType) {
            break;
        }
        if (h >= 0) {
            h--;
        }
        countUpperRightToLowerLeft++;
    }
    for (var i = x - 1; i >= 0; i--) {
        if (chessData[i][z] != chessType) {
            break;
        }
        if (z <= 15) {
            z++;
        }
        countUpperRightToLowerLeft++;
    }

    if (countLeftRight >= 5 || countUpDown >= 5 || countUpperLeftToLowerRight >= 5 || countUpperRightToLowerLeft >= 5) {
        isWell = true;//设置该局已经获胜，不可以再走了
    }
}
```

至此，一个简单的对弈效果就实现出来了，只是我们现在还没有给电脑添加AI，所以电脑看起来还很傻，没有“智商”。从下一篇文章开始我们就正式进入AI的部分，第三篇文章将会介绍一个棋类AI的常用算法并实现它。

> Tips：本系列的文章并不是一个完整作品的实现教程，博主也是边做边写文章，所以文章里贴出来的代码也许并不是最终版本的代码，但是或多或少代表了一个版本的基本实现思路，仅供参考。

本项目的Github地址：*https://github.com/csd758371536/GomokuWithAI*
在线演示页面：*http://gomoku.csdoker.com/*

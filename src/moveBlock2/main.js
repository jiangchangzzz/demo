'use strict';

(function () {

    //表示方向的枚举
    const TOP = 0;
    const LEFT = 1;
    const BOTTOM = 2;
    const RIGHT = 3;

    /**
     * 方块引用类型，与界面元素无关
     * 
     * @param {any} maxX 可移动X轴坐标最大值
     * @param {any} maxY 可移动Y轴坐标最大值
     */
    function Block(maxX, maxY) {
        this.maxX = maxX;
        this.maxY = maxY;
        //方块坐标
        this.x = 1;
        this.y = 1;
        //方块方向
        this.direction = TOP;
    }

    Block.prototype = {
        //方块向左转
        turnleft: function () {
            this.direction++;
            if (this.direction === 4) {
                this.direction = TOP;
            }
        },

        //方块向右转
        turnright: function () {
            this.direction--;
            if (this.direction === -1) {
                this.direction = RIGHT;
            }
        },

        //方块向后转
        turnback: function () {
            this.direction = (this.direction + 2) % 4;
        },

        //方块向当前方向移动一格
        go: function () {
            switch (this.direction) {
                case TOP:
                    this.move(0, -1);
                    break;
                case LEFT:
                    this.move(-1, 0);
                    break;
                case BOTTOM:
                    this.move(0, 1);
                    break;
                case RIGHT:
                    this.move(1, 0);
                    break;
            }
        },

        //方块X轴移动xm，Y轴移动ym
        move: function (xm, ym) {
            var newX = this.x + xm;
            var newY = this.y + ym;
            if (newX >= 1 && newX <= this.maxX) {
                this.x = newX;
            }

            if (newY >= 1 && newY <= this.maxY) {
                this.y = newY;
            }
        }
    }

    function init() {
        var block = new Block(10, 10);
        var blockEle = document.getElementById('block');
        var text = document.getElementById('text');
        var goBtn = document.getElementById('go');

        //指令模型
        var direction = {
            'GO': function () {
                block.go();
                move();
            },
            'TUN LEF': function () {
                block.turnleft();
                show();
            },
            'TUN RIG': function () {
                block.turnright();
                show();
            },
            'TUN BAC': function () {
                block.turnback();
                show();
            },
            'TRA LEF': function(){
                block.move(-1,0);
                move();
            },
            'TRA TOP': function(){
                block.move(0,-1);
                move();
            },
            'TRA RIG': function(){
                block.move(1,0);
                move();
            },
            'TRA BOT': function(){
                block.move(0,1);
                move();
            },
            'MOV LEF': function(){
                block.direction=LEFT;
                block.move(-1,0);
                show();
                move();
            },
            'MOV TOP': function(){
                block.direction=TOP;
                block.move(0,-1);
                show();
                move();
            },
            'MOV RIG': function(){
                block.direction=RIGHT;
                block.move(1,0);
                show();
                move();
            },
            'MOV BOT': function(){
                block.direction=BOTTOM;
                block.move(0,1);
                show();
                move();
            }
        }

        goBtn.addEventListener('click', function () {
            var value = text.value.trim();
            var currentDirection = direction[value];
            if (typeof currentDirection === 'function') {
                currentDirection();
            }
            else{
                alert('输入指令有误，请重新输入');
            }
        });

        //改变当前方块方向
        function show() {
            var blockClass = 'block ';
            switch (block.direction) {
                case TOP:
                    blockClass += 'top';
                    break;
                case BOTTOM:
                    blockClass += 'bottom';
                    break;
                case LEFT:
                    blockClass += 'left';
                    break;
                case RIGHT:
                    blockClass += 'right';
                    break;
            }
            blockEle.className = blockClass;
        }

        //移动当前方块
        function move() {
            blockEle.style.left = (block.x - 1) * 50 + 'px';
            blockEle.style.top = (block.y - 1) * 50 + 'px';
        }
    }

    init();
})();
'use strict';

(function(){

//表示方向的枚举
const TOP=0;
const LEFT=1;
const BOTTOM=2;
const RIGHT=3;

/**
 * 方块引用类型，与界面元素无关
 * 
 * @param {any} maxX 可移动X轴坐标最大值
 * @param {any} maxY 可移动Y轴坐标最大值
 */
function Block(maxX,maxY){
    this.maxX=maxX;
    this.maxY=maxY;
    //方块坐标
    this.x=1;
    this.y=1;
    //方块方向
    this.direction=TOP;
}

Block.prototype={
    //方块向左转
    turnleft: function(){
        this.direction++;
        if(this.direction===4){
            this.direction=TOP;
        }
    },

    //方块向右转
    turnright: function(){
        this.direction--;
        if(this.direction===-1){
            this.direction=RIGHT;
        }
    },

    //方块向后转
    turnback: function(){
        this.direction=(this.direction+2)%4;
    },

    //方块向当前方向移动一格
    go: function(){
        switch(this.direction){
            case TOP:
                if(this.y>1){
                    this.y--;
                }
                break;
            case LEFT:
                if(this.x>1){
                    this.x--;
                }
                break;
            case BOTTOM:
                if(this.y<this.maxY){
                    this.y++;
                }
                break;
            case RIGHT:
                if(this.x<this.maxX){
                    this.x++;
                }
                break;
        }
    }
}

var block=new Block(10,10);
var blockEle=document.getElementById('block');
var text=document.getElementById('text');
var goBtn=document.getElementById('go')

goBtn.addEventListener('click',function(){
    var value=text.value.trim();
    switch(value){
        case 'GO':
            block.go();
            move();
            break;
        case 'TUN LEF':
            block.turnleft();
            show();
            break;
        case 'TUN RIG':
            block.turnright();
            show();
            break;
        case 'TUN BAC':
            block.turnback();
            show();
            break;
        default:
            alert('输入值有误，请重新输入');
            text.select();
    }
});

//改变当前方块方向
function show(){
    var blockClass='block ';
    switch(block.direction){
        case TOP:
            blockClass+='top';
            break;
        case BOTTOM:
            blockClass+='bottom';
            break;
        case LEFT:
            blockClass+='left';
            break;
        case RIGHT:
            blockClass+='right';
            break;
    }
    blockEle.className=blockClass;
}

//移动当前方块
function move(){
    blockEle.style.left=(block.x-1)*50+'px';
    blockEle.style.top=(block.y-1)*50+'px';
}

})();
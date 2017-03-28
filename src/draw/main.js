'use strict';

(function(){
    
    /**
     * 点的引用类型
     * @param {any} x X轴坐标
     * @param {any} y Y轴坐标 
     * @param {any} top 画布的X轴绝对坐标
     * @param {any} left 画布的Y轴绝对坐标
     */
    function Point(x,y,top,left){
        this.x=x;
        this.y=y;

        this.top=top;
        this.left=left;
    }

    Point.prototype={
        page: function(pageX,pageY){
            this.x=pageX-this.left;
            this.y=pageY-this.top;
        }
    }

    var draw=document.getElementById('draw');
    var context=draw.getContext('2d');
    var color=document.getElementById('color');
    var pen=document.getElementById('pen');
    var brush=document.getElementById('brush');
    var brushW=document.getElementById('brushWidth');
    var gun=document.getElementById('gun');
    var eraser=document.getElementById('eraser');
    var clear=document.getElementById('clear');
    var toolName=document.getElementById('tool-name');

    //获取画布的位置
    var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
    var scrollLeft=document.documentElement.scrollLeft || document.body.scrollLeft;
    var rect=draw.getBoundingClientRect();
    var drawTop=rect.top+scrollTop;
    var drawLeft=rect.left+scrollLeft;

    var point=new Point(0,0,drawTop,drawLeft);   
    var drawing=false;   //是否正在绘制状态
    var type;   //当前使用工具种类
    var brushWidth=20;

    //改变工具类型
    function changeTool(tool){
        type=tool;
        toolName.innerText=type;
    }
    changeTool('pen');

    pen.addEventListener('click',function(){
        changeTool('pen');
    });

    brush.addEventListener('click',function(){
        changeTool('brush');
    });

    eraser.addEventListener('click',function(){
        changeTool('eraser');
    });

    gun.addEventListener('click',function(){
        changeTool('gun');
    });

    color.addEventListener('change',function(event){
        context.strokeStyle=this.value;
        context.fillStyle=this.value;
    });

    clear.addEventListener('click',function(){
        context.clearRect(0,0,800,500);
    });

    brushW.addEventListener('change',function(){
        brushWidth=this.value;
    });

    draw.addEventListener('mousedown',function(event){
        drawing=true;
        point.page(event.pageX,event.pageY);
        context.beginPath();
        context.moveTo(point.x,point.y);
    });

    draw.addEventListener('mousemove',function(event){
        if(drawing){
            point.page(event.pageX,event.pageY);
            switch(type){
                case 'pen':
                    context.lineTo(point.x,point.y);
                    context.stroke();
                    break;
                case 'brush':
                    context.lineWidth=brushWidth;
                    context.lineTo(point.x,point.y);
                    context.stroke();
                    context.lineWidth=1;
                    break;
                case 'gun':
                    context.moveTo(point.x,point.y);
                    context.arc(point.x,point.y,10,0,Math.PI*2,false);
                    context.fill();
                    break;
            }
        }
    });

    draw.addEventListener('mouseup',function(){
        drawing=false;
    });

    draw.addEventListener('mouseout',function(){
         drawing=false;
    });

})();
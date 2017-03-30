'use strict';

(function(){

    //点引用类型
    function Point(x,y){
        this.x=x;   //x轴坐标
        this.y=y;   //y轴坐标
    }

    //手势解锁引用类型
    function Lock(ele){
        this.context=ele.getContext('2d');   //绘图上下文
        this.width=ele.width;                //画布宽度
        this.height=ele.height;              //画布高度 
        this.points=[];                      //九个点的位置
        this.circles=[];                     //空心圈的序号
        this.balls=[];                       //实心球的序号
        this.r=0;                            //九个圈的半径
    }

    Lock.prototype={

        //确定九个点的位置和半径
        createPoint: function(){
            this.r=Math.round(this.width/18);
            var offset=this.r*3;
            var x,y;
            for(var i=0;i<3;i++){
                for(var j=0;j<3;j++){
                    x=(j+1)*offset+(2*j+1)*this.r;
                    y=(i+1)*offset+(2*i+1)*this.r;
                    this.points.push(new Point(x,y));
                }
            }

            this.circles=[];
            for(var i=0;i<9;i++){
                this.circles.push(i);
            }
            this.balls=[];
        },

        //绘制九个点
        drawPoint: function(){
            this.context.save();
            
            //绘制未选择的空心圆
            this.context.beginPath();
            this.context.strokeStyle='#ccc';
            this.context.fillStyle='#fff';
            for(var i=0,len=this.circles.length;i<len;i++){
                var circle=this.points[this.circles[i]];
                this.context.moveTo(circle.x+this.r,circle.y);
                this.context.arc(circle.x,circle.y,this.r,0,2*Math.PI,false);
            }
            this.context.stroke();
            this.context.fill();

            //绘制已选择的实心圆
            this.context.beginPath();
            this.context.fillStyle='orange';
            for(var i=0,len=this.balls.length;i<len;i++){
                var ball=this.points[this.balls[i]];
                this.context.moveTo(ball.x+this.r,ball.y);
                this.context.arc(ball.x,ball.y,this.r,0,2*Math.PI,false);
            }
            this.context.fill();

            this.context.restore();
        },

        //绘制线条
        drawLine: function(x,y){
            var len=this.balls.length;
            
            if(len>0){
                this.context.save();
                this.context.strokeStyle='red';
                this.context.beginPath();

                var ball=this.points[this.balls[0]];
                this.context.moveTo(ball.x,ball.y);
                for(var i=1;i<len;i++){
                    ball=this.points[this.balls[i]];
                    this.context.lineTo(ball.x,ball.y);
                }

                if(arguments.length===2){
                    this.context.lineTo(x,y);
                }

                this.context.stroke();
                this.context.restore();
            }
        },

        //检查是否在未选择的圈内
        checkCircle: function(x,y){
            for(var i=0,len=this.circles.length;i<len;i++){
                var index=this.circles[i];
                var circle=this.points[index];
                if(Math.abs(x-circle.x)<=this.r && Math.abs(y-circle.y)<=this.r){
                    this.circleToBall(index);
                    break;
                }
            }
        },

        //index号圈已选择，将其变为球
        circleToBall: function(index){
            var circleIndex=this.circles.indexOf(index);
            if(circleIndex!==-1){
                this.circles.splice(circleIndex,1);
                this.balls.push(index);
            }
        },

        //初始化解锁面板
        init: function(){
            this.createPoint();

            this.clear();
            this.drawPoint();
        },

        //重绘解锁面板
        update: function(x,y){
            this.checkCircle(x,y);
            this.clear();
            this.drawPoint();
            if(arguments.length===2){
                this.drawLine(x,y);
            }
            else{
                this.drawLine();
            }
        },

        //清空画版
        clear: function(){
            this.context.clearRect(0,0,this.width,this.height);
        },

        //获取密码
        getPassword: function(){
            return this.balls.join('');
        }
    };

    //初始化界面，绑定事件处理程序
    function init(){
        var draw=document.getElementById('draw');
        var text=document.getElementById('text');
        var setPassword=document.getElementById('setPassword');
        var checkPassword=document.getElementById('checkPassword');

        //设置画布的大小
        draw.width=document.documentElement.clientWidth*0.9;
        draw.height=draw.width;
        var position=computePosition(draw);    //计算画布的位置

        var lock=new Lock(draw);
        lock.init();

        var lastPassword="";   //上一次的密码
        var status="firstSet";   //一共三种状态，firstSet,secondSet,check
        var drawing=false;   //是否为正在绘制
        draw.addEventListener('touchstart',function(event){
            drawing=true;
            lock.init();
        });

        draw.addEventListener('touchmove',function(event){
            event.preventDefault();   //防止网页被拖动
            if(drawing){
                var x=event.targetTouches[0].pageX-position.x;
                var y=event.targetTouches[0].pageY-position.y;
                lock.update(x,y);
            }
        });

        draw.addEventListener('touchend',function(){
            drawing=false;
            lock.update();
            setTimeout(function(){
                lock.init();
            },500);
            
            if(status==="firstSet"){
                if(lock.balls.length<5){
                    text.innerText="密码太短，至少需要5个点";
                }
                else{
                    lastPassword=lock.getPassword();
                    status="secondSet";
                    text.innerText="请再次输入手势密码";
                }
            }
            else if(status==="secondSet"){
                if(lock.getPassword()!==lastPassword){
                    status="firstSet";
                    text.innerText="两次输入的不一致";
                }
                else{
                    status="firstSet";
                    localStorage.setItem('password',lastPassword);
                    text.innerText="密码设置成功";
                }
            }
            else if(status==="check"){
                var password=localStorage.getItem('password');
                var current=lock.getPassword();

                if(password===current){
                    text.innerText="密码正确！";
                }
                else{
                    text.innerText="输入的密码不正确";
                }
            }
        });

        setPassword.addEventListener('change',function(){
            status="firstSet";
            text.innerText="请输入手势密码";
        });

        checkPassword.addEventListener('change',function(){
            status="check";
            text.innerText="请输入验证密码";
        });
    }
    init();
    
    //计算元素的绝对位置
    function computePosition(ele){
        var rect=ele.getBoundingClientRect();
        var scrollTop=document.documentElement.scrollTop;
        var scrollLeft=document.documentElement.scrollLeft;
        return {
            y: rect.top+scrollTop,
            x: rect.left+scrollLeft,
        };
    }

})();
'use strict';

(function(){

    //缓动算法
    var tween={
        /**
         * t为当前时间，b为原始位置，c为总路程，d为持续时间
         */
        linear: function(t,b,c,d){
            return c*t/d+b;
        },
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t+b;
        },
        strongEaseIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t*t+b;
        },
        strongEaseOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t*t*t+1)+b;
        },
        sineaseIn: function(t,b,c,d){
            return c*(t/=d)*t*t+b;
        },
        sineaseOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t+1)+b;
        }
    };

    //动画类
    function Animation(dom){
        this.dom=dom;            //动画dom节点
        this.startTime=0;        //起始时间
        this.startPos=0;         //起始位置
        this.endPos=0;           //结束位置
        this.propertyName=null;  //改变的属性
        this.easing=null;        //缓动算法
        this.duration=null;      //持续时间
    }

    //开始动画
    Animation.prototype.start=function(propertyName,endPos,duration,easing){
        this.startTime=+new Date();
        this.startPos=this.dom.getBoundingClientRect()[propertyName];
        this.endPos=endPos;
        this.propertyName=propertyName;
        this.easing=tween[easing];
        this.duration=duration;

        var self=this;
        /*var t=setInterval(function(){
            //持续时间到，则停止动画
            if(!self.step()){
                clearInterval(t);
            }
        },16);*/

        function ready(){
            if(self.step()){
                requestAnimationFrame(ready);
            }
        }
        requestAnimationFrame(ready);
    }

    //每一帧的动画效果
    Animation.prototype.step=function(){
        var t=+new Date();
        if(t>=this.startTime+this.duration){
            this.update(this.endPos);
            return false;
        }

        var pos=this.easing(t-this.startTime,this.startPos,this.endPos-this.startPos,this.duration);
        this.update(pos);
        return true;
    };

    //改变dom元素的样式
    Animation.prototype.update=function(pos){
        this.dom.style[this.propertyName]=pos+'px';
    };

    window.Animation=Animation;

})();
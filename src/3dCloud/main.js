'use strict';

(function(){

    /**
     * 标签引用类型
     */
    function Tag(ele,x,y,z){
        this.ele=ele;
        this.x=x;
        this.y=y;
        this.z=z;
    }

    Tag.prototype={
        roateZ: function(t){
            var x=Math.cos(t)*this.x-Math.sin(t)*this.y;
            var y=Math.cos(t)*this.y+Math.sin(t)*this.x;
            this.x=x;
            this.y=y;
        },

        rotateY: function(t){
            var z=Math.cos(t)*this.z-Math.sin(t)*this.x;
            var x=Math.cos(t)*this.x+Math.sin(t)*this.z;
            this.z=z;
            this.x=x;
        },

        rotateX: function(t){
            var z=Math.cos(t)*this.z-Math.sin(t)*this.y;
            var y=Math.cos(t)*this.y+Math.sin(t)*this.z;
            this.z=z;
            this.y=y;
        }
    }

    /**
     * 标签云引用类型
     */
    function Cloud(ele,r){
        this.ele=ele;
        this.r=r;
        this.tags=[];

        this.xv=0.01;
        this.yv=0.01;
    }

    Cloud.prototype={
        //初始化数据
        init: function(){
            var tagsEle=this.ele.querySelectorAll('.tag');
            this.tags=[];

            //计算每个标签的位置
            for(var i=0,len=tagsEle.length;i<len;i++){
                var a=Math.acos((2*(i+1)-1)/len-1);
                var b=a*Math.sqrt(len*Math.PI);

                var x=this.r*Math.sin(a)*Math.cos(b);
                var y=this.r*Math.sin(a)*Math.sin(b);
                var z=this.r*Math.cos(a);

                tagsEle[i].style.color='rgb('+Math.floor(255*Math.random())+','+Math.floor(255*Math.random())+','+Math.floor(255*Math.random())+')';

                this.tags.push(new Tag(tagsEle[i],x,y,z));
            }
        },

        //渲染每一个标签
        render: function(){
            var centerX=this.ele.offsetWidth/2;
            var centerY=this.ele.offsetHeight/2;
            var maxFont=40;
            var minFont=2;
            var self=this;

            this.tags.forEach(function(tag){
                tag.ele.style.left=tag.x+centerX+'px';
                tag.ele.style.top=tag.y+centerY+'px';

                tag.ele.style.fontSize=((tag.z+self.r)/(2*self.r)*(maxFont-minFont)+minFont)+'px';
                tag.ele.style.opacity=(tag.z+self.r)/(2*self.r);
            });
        },

        //改变绕X轴旋转的速度，angle为每一帧转动的角度
        changeXV: function(angle){
            this.xv=angle/180*Math.PI;
        },

        //改变绕Y轴旋转的速度，angle为每一帧转动的角度
        changeYV: function(angle){
            this.yv=angle/180*Math.PI;
        },

        //开启旋转模式
        rotate: function(){
            var self=this;
            function step(){
                self.tags.forEach(function(item){
                    item.rotateX(self.xv);
                });

                self.tags.forEach(function(item){
                    item.rotateY(self.yv);
                });

                self.render();
                requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        },

        //添加移动事件
        addMoveEvent: function(){
            this.ele.addEventListener('mousemove',function(event){
                var centerX=this.ele.offsetWidth/2;
                var centerY=this.ele.offsetHeight/2;

                var rect=this.getBoundingClientRect();
                var x=Math.abs(event.clientX-rect.left-centerX);
                var y=Math.abs(event.clientY-rect.top-centerY);
            });
        }
    };

    var cloudEle=document.querySelector('.cloud');
    var cloud=new Cloud(cloudEle,200);
    cloud.init();
    cloud.render();
    cloud.rotate();
})();
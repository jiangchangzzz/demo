'use strict';

(function(){
    /**
     * 模态对话框组件引用类型
     * eleSrc：组件ID
     * options:{
     *     dragable 是否支持拖拽
     * }
     */
    window.uiModel=function(eleSrc,options){
        //组件默认选项
        var defaultOption={
            dragable: true
        };
        this.options=Object.assign(defaultOption,options);

        var ele=document.querySelector(eleSrc);
        this.wrap=ele.querySelector('.wrap');
        this.model=ele.querySelector('.model');

        var _this=this;
        this.wrap.addEventListener('click',function(e){
            _this.model.style.display='none';
            _this.wrap.style.display='none';
        });

        //实现点击model头部拖拽
        if(this.options.dragable){
            var dragging=false;
            var diffX=0;
            var diffY=0;
            ele.addEventListener('mousedown',function(e){
                if(e.target.className.indexOf('model-head')>-1 || 
                    e.target.parentNode.className.indexOf('model-head')>-1){
                        dragging=true;
                        var model=_this.model;
                        diffX=e.clientX-model.offsetLeft;
                        diffY=e.clientY-model.offsetTop;
                }
            });

            ele.addEventListener('mousemove',function(e){
                if(dragging){
                    _this.model.style.left=e.clientX-diffX+'px';
                    _this.model.style.top=e.clientY-diffY+'px';
                }
            });

            ele.addEventListener('mouseup',function(){
                dragging=false;
            });
        }
    }

    window.uiModel.prototype={
        //显示模态对话框
        show: function(){
                this.wrap.style.display='block';
                this.model.style.display='block';
        },
        //隐藏模态对话框
        hide: function(){
                this.model.style.display='none';
                this.wrap.style.display='none';
        }
    };

})();

(function(){
    var model=new uiModel('#ui-model');
    
    document.querySelector('#test').addEventListener('click',function(){
        model.show();
    })

    document.querySelector('#cancel').addEventListener('click',function(){
        model.hide();
    });
})();
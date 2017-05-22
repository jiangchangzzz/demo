'use strict';

(function($){

    //PageSwitch引用类型
    var PageSwitch=(function(){
        function PageSwitch(element,options){
            this.settings=Object.assign({},$.fn.PageSwitch.default,options||{});   //合并选项
            this.element=element;                                                  //容器的jquery对象 

            this.init();
        }

        PageSwitch.prototype={
            //初始化插件的DOM结构，添加事件处理程序
            init: function(){                                        
                this.isTransform=false;                                                

                this.section=this.element.find(this.settings.selectors.sections);
                this.sections=this.element.find(this.settings.selectors.section);
                this.sectionCount=this.getSectionCount();
                this.isHorizontals=this.settings.direction==='horizontal';
                this.index=(this.settings.index>=0 && this.settings.index<this.sections.length)?this.settings.index:0;

                if(this.isHorizontals){
                    this._initHorizontal();
                }

                if(this.settings.pagination){
                    this._initPagination();
                }

                this._initEvent();
            },

            //获取分节的个数
            getSectionCount: function(){
                return this.sections.length;
            },

            //获取分节滚动的距离
            getSectionSize: function(){
                if(this.isHorizontals){
                    return this.sections.width();
                }
                else{
                    return this.sections.height();
                }
            },

            //初始化横屏DOM结构
            _initHorizontal: function(){
                this.element.width(this.sectionCount*100+'%');
                this.sections.width(100/this.sectionCount+'%').css('float','left');
            },

            //初始化分页DOM结构
            _initPagination: function(){
                var pageClass=this.settings.selectors.page.slice(1);
                var directionClass=this.settings.direction;
                var activeClass=this.settings.selectors.active.slice(1);

                var page='<ul class="'+pageClass+' '+directionClass+'">';
                for(var i=0,len=this.sections.length;i<len;i++){
                    if(i===this.index){
                        page+='<li class="'+activeClass+'"></li>';
                    }
                    else{
                        page+='<li></li>';
                    }
                }
                page+='</ul>';
                this.element.append(page);
            },

            //绑定事件处理程序
            _initEvent: function(){
                var self=this;

                this.element.on('click',this.settings.selectors.page+' li',function(event){
                    self.index=$(this).index();
                    self._scrollSection();
                });

                this.element.on('mousewheel DOMMouseScroll',function(event){
                    if(!self.isTransform){
                        var wheelDelta=event.originalEvent.wheelDelta || -event.originalEvent.detail;

                        if(wheelDelta>0){
                            self.pre();
                        }
                        else if(wheelDelta<0){
                            self.next();
                        }
                    }
                });

                if(this.settings.keyboard){
                    $(window).on('keydown',function(event){
                        var keyCode=event.keyCode;
                        if(keyCode===37 || keyCode===38){
                            self.pre();
                        }
                        else if(keyCode===39 || keyCode===40){
                            self.next();
                        }
                    });
                }

                this.section.on('transitionend webkitTransitionEnd',function(){
                    self.isTransform=false;
                    if(typeof self.settings.callback==='function'){
                        self.settings.callback(self.index);
                    }
                });
            },

            //向上滚动页面
            pre: function(){
                if(this.index===0){
                    if(this.settings.loop){
                        this.index=this.sectionCount-1;
                    }
                    else{
                        return;
                    }
                }
                else{
                    this.index--;
                }

                this._scrollSection();
            },

            //向下滚动页面
            next: function(){
                if(this.index===this.sectionCount-1){
                    if(this.settings.loop){
                        this.index=0;
                    }
                    else{
                        return;
                    }
                }
                else{
                    this.index++;
                }

                this._scrollSection();
            },

            //根据当前index滚动section
            _scrollSection: function(){
                this.isTransform=true;
                this.section.css('transition','all '+this.settings.duration+'ms '+this.settings.easing);

                var position=this.sections.eq(this.index).position();
                var transform=this.isHorizontals? 'translateX(-'+position.left+'px)':'translateY(-'+position.top+'px)';
                this.section.css('transform',transform);

                if(this.settings.pagination){
                    var activeClass=this.settings.selectors.active.slice(1);
                    this.element.find(this.settings.selectors.page+' li').eq(this.index).addClass(activeClass)
                        .siblings('li').removeClass(activeClass);
                }
            }
        }

        return PageSwitch;
    })();

    $.fn.PageSwitch=function(options){
        //返回this方便链式调用，这里即对每一个对象都执行相应的方法
        //这里的each方法本身就会返回this
        return this.each(function(){
            var element=$(this);   //jqueryDOM对象
            
            //使用单例模式保证全屏滚动页面对象仅创建一次，重复调用PageSwitch也不会重复调用
            var instance=element.data('PageSwitch');
            if(!instance){
                instance=new PageSwitch(element,options);
                element.data('PageSwitch',instance);   //将引用存入属性中
            }

            //提供一个外部调用PageSwitch对象方法的接口
            //调用方法$(div).PageSwitch('init')即可调用init方法
            if(typeof options === 'string'){
                return instance[options]();
            }
        });
    };

    //PageSwitch方法的静态变量，所有方法共用的默认设置
    $.fn.PageSwitch.default={
        selectors: {
            sections: '.sections',
            section: '.section',
            page: '.page',
            active: '.active'
        },
        index: 0,                //开始显示分节的序号
        easing: 'ease',          //缓动动画
        duration: 500,           //动画持续时间
        loop: false,             //滚动是否循环
        pagination: true,        //是否显示分页
        keyboard: true,          //是否支持键盘按键
        direction: 'vertical',   //分节滚动的方向，水平为horizontal，垂直为vertical
        callback: null           //滚动结束时调用的回调函数
    };

    $(function(){
        $('[data-pageSwitch]').PageSwitch({
            callback: function(index){
                if(index!=0){
                    $('#section'+(index+1)+' h3').addClass('slide');
                }
            }
        });
    });

})(jQuery);
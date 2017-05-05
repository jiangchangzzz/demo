'use strict';

(function(){

    //策略对象，主要为各种校验规则
    var strategies={
        required: function(value,errorMsg){
            if(value===''){
                return errorMsg;
            }
        },
        minLength: function(value,length,errorMsg){
            if(value.length<length){
                return errorMsg;
            }
        },
        maxLength: function(value,length,errorMsg){
            if(value.length>length){
                return errorMsg;
            }
        },
        isMobile: function(value,errorMsg){
            if(!/^1[3|5|8][0-9]{9}$/.test(value)){
                return errorMsg;
            }
        }
    }

    //Validater验证器类,context类来使用相应的策略对象中的方法
    function Validater(){
        this.validaters=[];
    }

    //为一个dom添加单一的验证规则
    Validater.prototype.add=function(dom,rule,errorMsg){
        this.validaters.push(function(){
            var arg=rule.split(':');
            var strategy=arg.shift();
            arg.unshift(dom.value);
            arg.push(errorMsg);
            console.log(arg);
            return strategies[strategy].apply(dom,arg);
        });
    };

    //为一个dom添加多个验证规则
    Validater.prototype.set=function(dom,rules){
        var self=this;
        rules.forEach(function(rule){
            //再循环中传递回调函数时，需要注意将循环值用立即执行函数拷贝一份，
            //保存起来，方便闭包进行引用
            (function(rule){
                self.validaters.push(function(){
                    var arg=rule.strategy.split(':');
                    var strategy=arg.shift();
                    arg.unshift(dom.value);
                    arg.push(rule.errorMsg);

                    return strategies[strategy].apply(dom,arg);
                });  
            })(rule); 
        });
    };

    //开始进行验证，找到第一个验证问题即返回
    Validater.prototype.start=function(){
        for(var i=0,len=this.validaters.length;i<len;i++){
            var msg=this.validaters[i]();
            if(msg){
                return msg;
            }
        }
    };

    //将验证器类暴露出来，方便外界调用
    window.Validater=Validater;

})();
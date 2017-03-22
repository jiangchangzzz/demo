'use strict';

(function(){

    var list=document.querySelector('#list');
    const num=30;   //每次向后端获取数据的数量
    var current=0;   //下次获取数据的起始序号，序号从0开始

    //获取数据渲染列表
    function render(){
        getdata(num,current).then(function(data){
            //创建一个元素块
            var block=document.createDocumentFragment();
            data.forEach(function(item){
                var li=document.createElement('li');
                li.innerText=item;
                block.appendChild(li);
            });
            list.appendChild(block);
            current+=num;
        }).catch(function(err){
            console.log(err.message);
        });
    }

    //模拟从后端获取数据,返回一个Promise对象
    function getdata(num,curret){
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                var data=[];
                for(var i=current;i<current+num;i++){
                    data.push('item '+(i+1));
                }
                resolve(data);
            },1000);
        });
    }

    //初始化界面和绑定scoll事件处理程序
    function init(){
        render();

        window.addEventListener('scroll',function(){
            //计算滚动条到底部的距离
            var body=document.body;
            var bottom=body.scrollHeight-body.scrollTop-window.innerHeight;

            //TODO此处应该改为一个范围值，但是暂时不知道怎么处理重复渲染的问题
            if(bottom===0){
                render();
            }
        });
    }

    init();

})();
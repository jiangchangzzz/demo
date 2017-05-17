'use strict';

var Tree=(function(){

    //树形组件类
    function Tree(dom,data){
        this.dom=dom;
        this.data=data;
    }

    Tree.prototype={
        //创建树形组件
        create: function(){
            this.show();
            this.addEvent();
        },

        //显示树形组件
        show: function(){
            function showOnce(data){
                var ul=document.createElement('ul'); 
                for(var i=0,len=data.length;i<len;i++){
                    var li=document.createElement('li');
                    li.innerText=data[i].name;
                    if(data[i].children){
                        var child=showOnce(data[i].children);
                        li.appendChild(child);
                        li.className='show';
                    }
                    ul.appendChild(li);
                }
                return ul;
            }
            var list=showOnce(this.data);
            this.dom.appendChild(list);
        },

        //为树形组件添加事件处理程序
        addEvent: function(){
            this.dom.addEventListener('click',function(event){
                var target=event.target;
                if(target.nodeName.toLowerCase()==='li'){
                    if(target.className==='show'){
                        target.className='hidden';
                    }
                    else if(target.className==='hidden'){
                        target.className='show';
                    }
                }
            });
        },

        //展开所有节点
        spread: function(){
            var hiddens=this.dom.querySelectorAll('.hidden');
            hiddens.forEach(function(item){
                item.className='show';
            });
        },

        //收起所有节点
        pack: function(){
            var shows=this.dom.querySelectorAll('.show');
            shows.forEach(function(item){
                item.className='hidden';
            });
        }
    };

    return Tree;

})();
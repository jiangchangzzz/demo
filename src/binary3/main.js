'use strict';

(function(window){

    var remove=document.getElementById('remove');
    var add=document.getElementById('add');
    var text=document.getElementById('text');
    var container=document.getElementById('container');

    //已选择节点数据模型
    var selectedNode=null;

    container.addEventListener('click',function(event){
        if(event.target.nodeName.toLowerCase()==='div'){
            selectedNode=event.target;
            activeNode();
        }
        //当点击的是span元素的将其父元素突出显示
        else if(event.target.nodeName.toLowerCase()==='span'){
            selectedNode=event.target.parentNode;
            activeNode();
        }
    });

    remove.addEventListener('click',function(){
        if(selectedNode!=null){
            selectedNode.parentNode.removeChild(selectedNode);
        }
    });

    add.addEventListener('click',function(){
        if(selectedNode!=null){
            var value=text.value.trim();
            var div=document.createElement('div');
            var span=document.createElement('span');
            span.appendChild(document.createTextNode(value));
            div.appendChild(span);

            selectedNode.appendChild(div);
        }
    });

    //将已选择节点突出显示
    function activeNode(){
        //重置样式
        var oldActive=container.getElementsByClassName('active')[0];
        if(oldActive!=null){
            oldActive.classList.remove('active');
        }
        selectedNode.classList.add('active');
    }

})(window);
'use strict';

//队列数据模型
var queue=[];
var show=document.getElementById('show');
var num=document.getElementById('num');

document.getElementById('leftin').onclick=function(){
    if(num.value.length!==0){
        queue.unshift(num.value);
        showQueue();
    }
}

document.getElementById('rightin').onclick=function(){
    if(num.value.length!==0){
        queue.push(num.value);
        showQueue();
    }
}

document.getElementById('leftout').onclick=function(){
        var value=queue.shift();
        showQueue();
        //使用定时器是为了在函数执行完成，添加DOM节点后再弹框
        setTimeout(function(){alert(value);},0);
}

document.getElementById('rightout').onclick=function(){
        var value=queue.pop();
        showQueue();
        //使用定时器是为了在函数执行完成，添加DOM节点后再弹框
        setTimeout(function(){alert(value);},0);
}

show.onclick=function(event){
    var event=event || window.event;
    var target=event.target || event.srcElement;

    if(target.nodeName.toLowerCase()==='li'){
        var index=-1;
        var list=show.childNodes;
        //找出删除要删除节点的次序
        for(var i=0,len=list.length;i<len;i++){
            if(list[i]===target){
                index=i;
                break;
            }
        }
        queue.splice(index,1);
        showQueue();
    }
}

/**
 * 用队列数据模型渲染视图
 * 
 */
function showQueue(){
    var str='';
    for(var i=0,len=queue.length;i<len;i++){
        str+='<li>'+queue[i]+'</li>';
    }
    show.innerHTML=str;
}


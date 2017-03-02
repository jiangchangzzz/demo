'use strict';

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
        queue.shift();
        showQueue();
        //使用定时器是为了在函数执行完成，添加DOM节点后再弹框
        setTimeout(function(){alert(queue.length);},0);
}

document.getElementById('rightout').onclick=function(){
        queue.pop();
        showQueue();
        //使用定时器是为了在函数执行完成，添加DOM节点后再弹框
        setTimeout(function(){alert(queue.length);},0);
}

show.onclick=function(event){
    if(event.target.nodeName.toLowerCase()==='li'){
        var current=event.target.innerText.trim();
        queue.splice(queue.indexOf(current),1);
        showQueue();
    }
}

function showQueue(){
    var str='';
    for(var i=0,len=queue.length;i<len;i++){
        str+='<li>'+queue[i]+'</li>';
    }
    show.innerHTML=str;
}


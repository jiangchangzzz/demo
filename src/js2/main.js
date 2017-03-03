'use strict';

var leftin=document.getElementById('leftin');
var rightin=document.getElementById('rightin');
var leftout=document.getElementById('leftout');
var rightout=document.getElementById('rightout');
var sort=document.getElementById('sort');
var num=document.getElementById('num');
var show=document.getElementById('show');

var min=10;
var max=100;
var queueLength=60;

//点击左侧入，左侧插入元素
leftin.onclick=function(){
    var value=getNum();
    if(value!==null){
        var li=createLi(value);
        show.insertBefore(li,show.firstChild);
    }
}

//点击右侧入，右侧插入元素
rightin.onclick=function(){
    var value=getNum();
    if(value!==null){
        var li=createLi(value);
        show.appendChild(li);
    }
}

//点击左侧出，左侧移除元素
leftout.onclick=function(){
    if(show.childElementCount>0){
        var value=parseFloat(show.firstElementChild.style.height);
        show.removeChild(show.firstElementChild);
        setTimeout(function(){
            alert(value);
        },0);
    }
}

//点击右侧出，右侧移除元素
rightout.onclick=function(){
    if(show.childElementCount>0){
        var value=parseFloat(show.lastElementChild.style.height);
        show.removeChild(show.lastElementChild);
        setTimeout(function(){
            alert(value);
        },0);
    }
}

//对队列进行排序
sort.onclick=function(){
    if(show.hasChildNodes()){
        var data=[];
        var list=show.childNodes;
        for(var i=0,len=list.length;i<len;i++){
            if(list[i].nodeType === 1){
                data.push(parseFloat(list[i].style.height));
            }
        }

        MySort(data);

        var index=0;
        for(var i=0,len=list.length;i<len;i++){
            if(list[i].nodeType === 1){
                list[i].style.height=data[index]+'px';
                list[i].style.marginTop=max-data[index]+'px';
                index++;
            }
        }
    }
}

//点击队列删除元素
show.onclick=function(event){
    var event=event || window.event;
    var target=event.target || event.srcElement;
    if(target.tagName.toLowerCase() === 'li'){
        show.removeChild(target);
    }
}

/**
 * 根据输入数值创建相应样式的li元素
 * 
 * @param {any} value 输入数值
 * @returns li元素
 */
function createLi(value){
    var li=document.createElement('li');
    li.style.height=value+'px';
    li.style.marginTop=max-value+'px';
    return li;
}


/**
 * 从输入框获取数字，并进行校验
 * 
 * @returns 输入框数字
 */
function getNum(){
    if(show.childElementCount>=queueLength){
        alert('队列元素最多为'+queueLength);
        return null;
    }

    var value=parseFloat(num.value);
    if(value<min || value>max){
        alert('请输入10-100的数字');
        return null;
    }
    else{
        return value;
    }
}


/**
 * 冒泡排序
 * 
 * @param {any} array 需要排序的数组
 */
function MySort(array){
    for(var i=0;i<array.length-1;i++){
        for(var j=i+1;j<array.length;j++){
            if(array[i]>array[j]){
                var temp=array[i];
                array[i]=array[j];
                array[j]=temp;
            }
        }
    }
}
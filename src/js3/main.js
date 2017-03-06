'use strict';

(function(){

    var contentEle=document.getElementById('content');
    var insertEle=document.getElementById('insert');
    var textEle=document.getElementById('text');
    var findEle=document.getElementById('find');
    var showEle=document.getElementById('show');

    bindEvent(insertEle,'click',function(){
        var content=contentEle.value.trim();
        var array=content.match(/[0-9a-zA-Z\u4e00-\u9fa5]+/g);
        
        var str="";
        array.forEach(function(item){
            str+='<li>'+item+'</li>';
        });
        showEle.innerHTML=str;
    });

    bindEvent(findEle,'click',function(){
        var text=textEle.value.trim();
        var list=showEle.querySelectorAll('li');

        for(var i=0,len=list.length;i<len;i++){
            var liText=list[i].innerText;
            if(liText.indexOf(text)!==-1){
                list[i].className='active';
            }else{
                list[i].className='';
            }
        }
    });

    function bindEvent(element,type,callback){
        if(element.addEventListener){
            element.addEventListener(type,callback);
        }
        else if(element.attachEvent){
            element.attachEvent('on'+type,callback);
        }
        else{
            element['on'+type]=callback;
        }
    }

})();
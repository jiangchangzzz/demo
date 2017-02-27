'use strict';

window.onload=function(){
    var check=document.getElementById('check');
    var form=document.getElementById('form');
    var message=document.getElementById('message');

    check.onclick=function(event){
        var name=form.elements['name'];
        var value=name.value;
        if(name.value==null || name.value===''){
            message.innerText='姓名不能为空';
            message.style.color='red';
            name.style.borderColor='red';
            return;
        }
        
        var length=0;
        var num=/\w+/g;
        var match=null;
        while((match=num.exec(value))!==null){
            length+=match[0].length;
        }

        var text=/[\u4e00-\u9fa5]/g;
        while((match=text.exec(value))!==null){
            length+=(match[0].length)*2;
        }

        if(length>16 || length<4){
            message.innerText='长度必须为4~16个字符';
            message.style.color='red';
            name.style.borderColor='red';
            name.select();
        }
        else{
            message.innerText='名称格式正确';
            message.style.color='green';
            name.style.borderColor='green';
        }
    }
}
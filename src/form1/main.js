'use strict';

window.onload=function(){
    var check=document.getElementById('check');
    var form=document.getElementById('form');
    var message=document.getElementById('message');

    check.onclick=function(event){
        var name=form.elements['name'];
        var value=name.value;

        //判断输入内容是否为空
        if(name.value.length===0){
            message.innerText='姓名不能为空';
            name.parentNode.className='form-group danger';
            name.select();
            return;
        }
        
        var length=0;
        //匹配出输入内容中字母和数字的个数
        var num=/[A-Za-z0-9]/g;
        var numLen=value.match(num);
        if(numLen){
            length+=numLen.length;
        }

        //匹配出输入结果中汉字的个数
        var text=/[\u4e00-\u9fa5]/g;
        var textLen=value.match(text);
        if(textLen){
            length+=(textLen.length*2);
        }

        //判断字符长度是否符合要求
        if(length>16 || length<4){
            message.innerText='长度必须为4~16个字符';
            name.parentNode.className='form-group danger';
            name.select();
        }
        else{
            message.innerText='名称格式正确';
            name.parentNode.className='form-group success';
        }
    }
}
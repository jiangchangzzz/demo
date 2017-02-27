'use strict';

window.onload=function(){
    var check=document.getElementById('check');
    var form=document.getElementById('form');
    var message=document.getElementById('message');

    check.onclick=function(event){
        var name=form.elements['name'];
        var value=name.value;

        //判断输入内容是否为空
        if(name.value==null || name.value===''){
            message.innerText='姓名不能为空';
            name.parentNode.className='form-group danger';
            return;
        }
        
        //匹配出输入内容中字母和数字的个数
        var length=0;
        var num=/\w+/g;
        var match=null;
        while((match=num.exec(value))!==null){
            length+=match[0].length;
        }

        //匹配出输入结果中汉字的个数
        var text=/[\u4e00-\u9fa5]/g;
        while((match=text.exec(value))!==null){
            length+=(match[0].length)*2;
        }

        //判断字符长度是否符合要求
        if(length>16 || length<4){
            message.innerText='长度必须为4~16个字符';
            name.parentNode.className='form-group danger';
        }
        else{
            message.innerText='名称格式正确';
            name.parentNode.className='form-group success';
        }
    }
}
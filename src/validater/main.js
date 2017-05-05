'use strict';

(function(){

    var validater=new Validater();
    var registerForm=document.getElementById('registerForm');
    var message=document.getElementById('message');

    validater.set(registerForm.userName,[
        {
            strategy: 'required',
            errorMsg: '用户名是必须的'
        },
        {
            strategy: 'minLength:8',
            errorMsg: '用户名至少为8位'
        }
    ]);
    validater.add(registerForm.password,'minLength:8','密码长度至少为8位');

    registerForm.addEventListener('submit',function(event){
        event.preventDefault();
        var msg=validater.start();
        message.innerText=msg;
    });

})();
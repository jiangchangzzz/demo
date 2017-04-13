'use strict';

(function(){

    var phone=document.getElementById('phone');
    var checkPhone=document.getElementById('check-phone');

    checkPhone.addEventListener('click',function(){
        var value=phone.value.trim();

        if(value.search(/^1(3[0-9]|4[57]|5[0-3,5-9]|7[0135678]|8[0-9])\d{8}$/)===-1){
            alert('手机号不符合要求');
        }
        else{
            alert('手机号通过检查')
        }
    });

    var word=document.getElementById('word');
    var checkWord=document.getElementById('check-word');

    checkWord.addEventListener('click',function(){
        var value=word.value.trim();

        if(value.search(/\b(\w+)\b\s+\b\1\b/g)>=0){
            alert('有重复的单词');
        }
        else{
            alert('没有重复的单词');
        }
    });

})();
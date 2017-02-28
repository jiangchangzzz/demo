'use strict';

var form=document.getElementById('form');

//表单数据模型，如果还要增加新的表单项，可直接在此数组中添加，并设置其验证规则
var data=[
    {name: 'name',description: '名称',callback: checkName},
    {name: 'password',description: '密码',callback: checkPassword},
    {name: 'repeat', description: '密码确认',callback: checkRepeat},
    {name: 'email',description: '邮箱',callback: checkEmail},
    {name: 'phone',description: '手机',callback: checkPhone},
];

//使用事件委托，利用事件冒泡，减少绑定的事件处理程序
form.addEventListener('focusout',function(event){
    for(var i=0,len=data.length;i<len;i++){
        if(event.target.name===data[i].name){
            validate(form,data[i].name,data[i].description,data[i].callback);
        }
    }
});

//表单提交时验证所有表单项
form.onsubmit=function (event){
    event.preventDefault();

    var result=true;
    for(var i=0,len=data.length;i<len;i++){
        result&=validate(form,data[i].name,data[i].description,data[i].callback);
    }

    if(result){
        alert('验证成功');
    }
    else{
        alert('输入有误');
    }
}

/**
 * 验证表单项
 * 
 * @param {any} form 表单元素
 * @param {any} name 表单项的name属性
 * @param {any} description 表单提示信息的描述
 * @param {any} callback 验证规则回调函数
 * @returns 是否通过验证
 */
function validate(form,name,description,callback){
    var input=form.elements[name];
    var message=input.parentNode.getElementsByClassName('message')[0];
    var value=input.value.trim();

    if(value.length===0){
        message.innerText=description+'不能为空';
        input.parentNode.className='danger form-group';
        return false;
    }

    if(!callback(value)){
        message.innerText=description+'格式错误';
        input.parentNode.className='danger form-group';
        return false;
    }

    message.innerText=description+'格式正确';
    input.parentNode.className='success form-group';
    return true;   
}


/**
 * 验证名称
 * 
 * @param {any} str 名称字符串
 * @returns 是否通过
 */
function checkName(str){
    var length=getLength(str);
    if(length<4 || length>16){
        return false;
    }
    return true;    
}


/**
 * 验证密码
 * 
 * @param {any} value 密码字符串
 * @returns 是否通过
 */
function checkPassword(value){
    var num=/^[A-Za-z0-9]{5,12}$/;
    return num.test(value);
}


/**
 * 验证密码确认
 * 
 * @param {any} value 
 */
function checkRepeat(value){
    var input=form.elements['password'];
    var password=input.value.trim();
    return value===password;
}


/**
 * 验证邮箱
 * 
 * @param {any} value 邮箱字符串
 * @returns 是否通过
 */
function checkEmail(value){
    var email=/^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/;
    return email.test(value);
}


/**
 * 验证手机号码
 * 
 * @param {any} value 手机字符串
 * @returns 是否通过
 */
function checkPhone(value){
    var phone=/^1[3|4|5|8][0-9]\d{4,8}$/;   //TODO手机正则表达式可能没有更新到最新
    return phone.test(value);
}

/**
 * 计算名称字符个数，辅助函数
 * 
 * @param {any} str 名称字符串
 * @returns 字符个数
 */
function getLength(str){
    var length=0;
    
    //统计数字和字母所占长度
    var num=/[A-Za-z0-9]/g;
    var numRes=str.match(num);
    if(numRes){
        length+=numRes.length;
    }

    //统计汉字所占长度
    var text=/[\u4e00-\u9fa5]/g;
    var textRes=str.match(text);
    if(textRes){
        length+=(textRes.length*2);
    }
    return length;
}

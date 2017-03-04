'use strict';

var form=document.getElementById('form');
var type=document.getElementById('type');

var block=document.getElementById('block');

//学校信息数据
var schoolData=[
    {
        city: '北京',
        school: ['北京大学','清华大学']
    },
    {
        city: '武汉',
        school: ['武汉大学','华中科技大学']
    }
];

function init(){
    type.addEventListener('change',function(event){
        var value=event.target.value;
        if(value==='student'){
            block.className='studentSelected';
        }
        else{
            block.className='workSelected';
        }
    });

    form.elements['city'].addEventListener('change',function(event){
        changeSchool();
    });

    initSchool();
    changeSchool();
}

init();

//初始化城市选择框
function initSchool(){
    schoolData.forEach(function(item){
        var option=new Option(item.city);
        form.elements['city'].add(option);
    });
}

//根据城市选择结果，初始化学校选择框
function changeSchool(){
    //获取城市的学校列表
    var city=form.elements['city'].value;
    var schools=null;
    for(var i=0,len=schoolData.length;i<len;i++){
        if(schoolData[i].city===city){
            schools=schoolData[i].school;
            break;
        }
    }

    //删除学校选择框的内容
    var schoolElement=form.elements['school'];
    for(var i=0,len=schoolElement.options.length;i<len;i++){
        schoolElement.remove(0);
    }

    //增加学校选择框的内容
    schools.forEach(function(item){
        var option=new Option(item);
        schoolElement.add(option);
    });
}

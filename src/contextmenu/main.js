'use strict';

window.onload=function(){
    var main=document.getElementById('main');
    var menu=document.getElementById('menu');

    /*点击窗口中任意位置，隐藏菜单*/
    document.body.onclick=function(){
        menu.style.display='none';
    }

    /*阻止菜单点击冒泡，实现点击菜单时不隐藏菜单*/
    menu.onclick=function(event){
        event.stopPropagation();
    }

    /*点击右键在适当的位置显示菜单*/
    main.oncontextmenu=function(event){
        /*阻止弹出默认菜单*/
        event.preventDefault();

        var right=document.documentElement.clientWidth-event.clientX;
        var bottom=document.documentElement.clientHeight-event.clientY;

        menu.style.display='block';
        var menuWidth=menu.offsetWidth;
        var menuHeight=menu.offsetHeight;

        var showX=null;
        var showY=null;

        /*屏幕右侧空间不够时显示在左侧*/
        if(right<menuWidth){
            showX=event.pageX-menuWidth;
            showY=event.pageY;
        }else{
            showX=event.pageX;
            showY=event.pageY;
        }

        /*屏幕下面空间不够时显示在上面*/
        if(bottom<menuHeight){
            showY=showY-menuHeight;
        }

        /*切记不要忘记加单位*/
        menu.style.left=showX+'px';
        menu.style.top=showY+'px';
    }
}
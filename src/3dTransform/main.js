'use strict';

(function(){

    var bannerGroup=document.querySelector('.banner-group');
    var start=document.getElementById('start');
    var pause=document.getElementById('pause');
    var next=document.getElementById('next');
    var pre=document.getElementById('pre');

    start.addEventListener('click',function(){
        bannerGroup.classList.remove('group-transform');
        bannerGroup.classList.add('group-animation');
        bannerGroup.style.animationPlayState='running';
    });

    pause.addEventListener('click',function(){
        bannerGroup.classList.remove('group-transform');
        bannerGroup.classList.add('group-animation');
        bannerGroup.style.animationPlayState='paused';
    });

    var current=(function(){
        //通过闭包构造私有变量
        var index=0;
        return {
            //下一页
            next: function(){
                index++;
                return index;
            },
            
            //上一页
            pre: function(){
                index--;
                return index;
            }
        };
    })();

    next.addEventListener('click',function(){
        bannerGroup.classList.remove('group-animation');
        bannerGroup.classList.add('group-transform');
        bannerGroup.style.transform='rotateY('+current.next()*72+'deg)';
    });

    pre.addEventListener('click',function(){
        bannerGroup.classList.remove('group-animation');
        bannerGroup.classList.add('group-transform');
        bannerGroup.style.transform='rotateY('+current.pre()*72+'deg)';
    });

})();
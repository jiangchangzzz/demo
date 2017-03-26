'use strict';

(function(){

    var music=$('#music');
    var play=document.getElementById('play');
    var pause=document.getElementById('pause');
    var load=document.getElementById('load');
    var progress=document.getElementById('progress');
    var bar=document.getElementById('bar');
    
    play.addEventListener('click',function(){
        music.play();
        play.style.display='none';
        pause.style.display='block';
    });

    pause.addEventListener('click',function(){
        music.pause();
        play.style.display='block';
        pause.style.display='none';
    });

    music.addEventListener('canplay',function(){
        load.style.display='none';
        if(music.paused){
            play.style.display='block';
        }
    });

    music.addEventListener('timeupdate',function(){
        bar.style.width=Math.round(music.currentTime/music.duration*100)+'%';
    });

    progress.addEventListener('click',function(event){
        var position=(event.pageX-this.offsetLeft)/this.offsetWidth;
        var clickTime=position*music.duration;

        music.currentTime=clickTime;
    });

    function $(ele){
        return document.querySelector(ele);
    }

})()
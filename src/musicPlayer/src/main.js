'use strict';

var musics=[
    {
        name: 'what is love',
        path: 'what is love.mp3',
        artist: 'Rader'
    }
];

(function(){

    var music=document.getElementById('music');
    var source=document.getElementById('music-source');
    var name=document.getElementById('music-name');
    var artist=document.getElementById('music-artist');
    var time=document.getElementById('music-time');

    var volProgress=document.getElementById('vol-progress');
    var musicProgress=document.getElementById('music-progress');
    var volBar=document.getElementById('vol-bar');
    var musicBar=document.getElementById('music-bar');

    var play=document.getElementById('play');
    var next=document.getElementById('next');

    var current=0;   //当前音乐序号

    function loadMusic(index){
        var ready=musics[index];

        music.src='music/'+ready.path;
        name.innerText=ready.name;
        artist.innerText=ready.artist;
    }

    function timeToString(second){
        var m=Math.floor(second/60);
        var s=Math.round(second%60);
        if(m===0){
            return '00:'+s;
        }
        else{
            return m+':'+s; 
        }
    }

    function init(){
        music.addEventListener('loadedmetadata',function(){
            time.innerText=timeToString(music.duration);
        });

        music.addEventListener('timeupdate',function(){
            time.innerText=timeToString(music.currentTime);
            var percent=music.currentTime/music.duration;
            musicBar.style.width=musicBar.parentNode.offsetWidth*percent+'px';
        });

        music.addEventListener('volumechange',function(){
            volBar.style.width=volBar.parentNode.offsetWidth*music.volume+'px';
        });

        play.addEventListener('click',function(){
            if(music.paused || music.ended){
                music.play();
                this.classList.remove('glyphicon-play');
                this.classList.add('glyphicon-pause');
            }
            else{
                music.pause();
                this.classList.remove('glyphicon-pause');
                this.classList.add('glyphicon-play');
            }
        });

        musicProgress.addEventListener('click',function(event){
            var left=this.getBoundingClientRect().left;
            var precent=(event.pageX-left)/this.offsetWidth;
            music.currentTime=precent*music.duration;
        });

        volProgress.addEventListener('click',function(event){
            var left=this.getBoundingClientRect().left;
            var precent=(event.pageX-left)/this.offsetWidth;
            music.volume=Math.round(precent*10)/10;
        });

        next.addEventListener('click',function(){
            current++;
            if(current>=musics.length){
                current=0;
            }
            loadMusic(current);
        });

        loadMusic(0);
    }
    init();

})();
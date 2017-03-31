'use strict';

var musics=[
    {
        name: 'what is love',
        path: 'what is love.mp3',
        artist: 'Haddaway',
        img: 'what is love.png'
    },
    {
        name: 'Mi Mi Mi',
        path: 'Mi Mi Mi.mp3',
        artist: 'Serebro',
        img: 'Mi Mi Mi.jpg'
    }
];

(function(){

    var list=document.getElementById('list');
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
    var status=document.getElementById('status');
    var love=document.getElementById('love');

    var img=document.getElementById('music-img');

    var current=0;   //当前音乐序号

    //加载index序号音乐和封面
    function loadMusic(index){
        var ready=musics[index];

        music.src='music/'+ready.path;
        name.innerText=ready.name;
        artist.innerText=ready.artist;

        img.src='image/'+ready.img;
    }

    //加载下一首音乐
    function nextMusic(){
        current++;
        if(current>=musics.length){
            current=0;
        }
        loadMusic(current);
    }

    //格式化当前时间
    function timeToString(second){
        var m=Math.floor(second/60);
        var s=Math.round(second%60);
        return format(m)+':'+format(s);
    }

    function format(num){
        if(num===0){
            return '00';
        }
        else if(num<10){
            return '0'+num;
        }
        else{
            return num.toString();
        }
    }

    //添加音乐列表
    function addList(){
        var str='';
        musics.forEach(function(item,index){
            str+='<li>'+(index+1)+'. '+item.name+'</li>';
        });
        list.innerHTML=str;
    }

    function init(){
        //改变音乐进度条
        music.addEventListener('timeupdate',function(){
            time.innerText=timeToString(music.currentTime);
            var percent=Math.round(music.currentTime/music.duration*100);
            musicBar.style.width=percent+'%';
        });

        //改变音量进度条
        music.addEventListener('volumechange',function(){
            volBar.style.width=music.volume*100+'%';
        });

        //音乐结束后播放下一首
        music.addEventListener('ended',function(){
           nextMusic();
           music.play();
        });

        //播放或暂停音乐
        play.addEventListener('click',function(){
            if(music.paused || music.ended){
                music.play();
                this.classList.remove('glyphicon-play');
                this.classList.add('glyphicon-pause');
                this.title='暂停';
            }
            else{
                music.pause();
                this.classList.remove('glyphicon-pause');
                this.classList.add('glyphicon-play');
                this.title='播放';
            }
        });

        //点击音乐进度条
        musicProgress.addEventListener('click',function(event){
            var left=this.getBoundingClientRect().left;
            var precent=(event.pageX-left)/this.offsetWidth;
            music.currentTime=precent*music.duration;
        });

        //点击音量进度条
        volProgress.addEventListener('click',function(event){
            var left=this.getBoundingClientRect().left;
            var precent=(event.pageX-left)/this.offsetWidth;
            music.volume=Math.round(precent*10)/10;
        });

        //加载下一曲，并自动播放
        next.addEventListener('click',function(){
            //下一曲时保持音乐的播放和暂停状态
            if(music.paused){
                nextMusic();
            }
            else{
                nextMusic();
                music.play();
            }
        });

        //切换循环播放
        status.addEventListener('click',function(){
            if(music.loop){
                music.loop=false;
                this.classList.remove('glyphicon-refresh');
                this.classList.add('glyphicon-align-justify');
                this.title='列表循环';
            }
            else{
                music.loop=true;
                this.classList.remove('glyphicon-align-justify');
                this.classList.add('glyphicon-refresh');
                this.title='单曲循环';
            }
        });

        //添加喜欢
        love.addEventListener('click',function(){
            this.classList.toggle('active');
        });

        //点击列表切换音乐
        list.addEventListener('click',function(event){
            var child=this.children;
            for(var i=0,len=child.length;i<len;i++){
                if(event.target===child[i]){
                    if(i!==current){
                        current=i;
                        loadMusic(current);
                        music.play();
                        play.classList.remove('glyphicon-play');
                        play.classList.add('glyphicon-pause');
                        play.title='暂停';
                    }
                    break;
                }
            }
        });

        //加载第一首音乐
        loadMusic(0);
        addList();

    }
    init();

})();
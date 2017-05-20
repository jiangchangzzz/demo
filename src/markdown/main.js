'use strict';

(function(){

    var text=document.getElementById('text');
    var view=document.getElementById('view');

    text.addEventListener('input',function(){
        var str=text.value;
        str=parseTitle(str);
        str=parseUl(str);
        str=parseOl(str);
        str=parseStrong(str);
        view.innerHTML=str;
    });

    function parseTitle(src){
        var res=src.replace(/(#{1,6})\s+(.+)/g,function(match,tag,content){
            var num=tag.length;
            return '<h'+num+'>'+content+'</h'+num+'>';
        });
        return res;
    }

    function parseUl(src){
        var res=src.replace(/(-\s+.+\n)+/g,function(match){
            var str='<ul>';
            str+=match.replace(/-\s+(.+)/g,function(match,content){
                return '<li>'+content+'</li>';
            });
            str+='</ul>';
            return str;
        });
        return res;
    }

    function parseOl(src){
        var res=src.replace(/(\d+\.\s+.+\n)+/g,function(match){
            var str='<ol>';
            str+=match.replace(/\d+\.\s+(.+)/g,function(match,content){
                return '<li>'+content+'</li>';
            }); 
            str+='</ol>';
            return str;
        });
        return res;
    }

    function parseStrong(src){
        var res=src.replace(/\*\*(.*\n?.*)\*\*/g,function(match,content){
            return '<strong>'+content+'</strong>';
        });
        return res;
    }   

})();
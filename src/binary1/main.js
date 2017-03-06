'use strict';

(function(){

    var root=document.getElementById('root');
    var pre=document.getElementById('pre');
    var middle=document.getElementById('middle');
    var post=document.getElementById('post');
    var root=document.getElementById('root');

    var index=0;   //任务序列号

    pre.addEventListener('click',function(){
            index=0;
            preTravel(root);
    });

    middle.addEventListener('click',function(){
            index=0;
            middleTravel(root);
    });

    post.addEventListener('click',function(){
            index=0;
            postTravel(root);
    });

    /**
     * 前序遍历
     * 
     * @param {any} node 
     * @returns 
     */
    function preTravel(node){
        if(node==null){
            return;
        }

        changeColor(node);
        preTravel(node.firstElementChild);
        preTravel(node.lastElementChild);
    }

    /**
     * 中序遍历
     * 
     * @param {any} node 
     * @returns 
     */
    function middleTravel(node){
        if(node==null){
            return;
        }

        middleTravel(node.firstElementChild);
        changeColor(node);
        middleTravel(node.lastElementChild);
    }


    /**
     * 后序遍历
     * 
     * @param {any} node 
     * @returns 
     */
    function postTravel(node){
         if(node==null){
            return;
        }

        postTravel(node.firstElementChild);
        postTravel(node.lastElementChild);
        changeColor(node);
    }

     /**
      * 改变当前方块的颜色
      * 
      * @param {any} node 
      */
     function changeColor(node){
        setTimeout(function(){
            node.className='active';
        },index*500);

        setTimeout(function(){
            node.className='';
        },(++index)*500);
    }

})();
'use strict';

(function(){

    var root=document.getElementById('root');
    var text=document.getElementById('text');
    var index=0;

    document.getElementById('firstl').addEventListener('click',function(){
        index=0;
        order=[];
        firstLoop(root);
        ShowOrder();
    });

    document.getElementById('lastl').addEventListener('click',function(){
        index=0;
        order=[];
        lastLoop(root);
        ShowOrder();
    }); 

    
    document.getElementById('firstf').addEventListener('click',function(){
        var value=text.value.trim();
        index=0;
        order=[];
        firstLoop(root);
        checkOrder(value);
    });

    document.getElementById('lastf').addEventListener('click',function(){
        var value=text.value.trim();
        index=0;
        order=[];
        lastLoop(root);
        checkOrder(value);
    })

    /**
     * 先根遍历
     * 
     * @param {any} node 起始节点
     * @param {any} callback 对节点的操作
     * @returns 
     */
    function firstLoop(node){
        if(node == null){
            return;
        }

        addOrder(node);
        var child=node.childNodes;
        for(var i=0,len=child.length;i<len;i++){
            if(child[i].nodeName.toLowerCase()=='div'){
                firstLoop(child[i]);
            }
        }
    }

    /**
     * 后根遍历
     * 
     * @param {any} node 起始节点
     * @param {any} callback 对节点的操作
     * @returns 
     */
    function lastLoop(node){
        if(node == null){
            return;
        }

        var child=node.childNodes;
        for(var i=0,len=child.length;i<len;i++){
            if(child[i].nodeName.toLowerCase()=='div'){
                lastLoop(child[i]);
            }
        }
        addOrder(node);
    }

    
    /**
     * 显示颜色
     * 
     * @param {any} node 要改变背景的元素
     * @param {any} active 是否突出显示元素
     */
    function show(node,active){
        setTimeout(function(){
            node.style.backgroundColor='rgb('+rgbRand()+','+rgbRand()+','+rgbRand()+')';
        },(index++)*500);

        setTimeout(function(){
            node.style.backgroundColor='';
            if(active){
                node.classList.add('active');
            }
        },index*500);
    }

    /**
     * 随机一个颜色数值
     * 
     * @returns 
     */
    function rgbRand(){
        return Math.floor(Math.random()*255);
    }

    var order=[];

    /**
     * 按顺序添加到数组中
     * 
     * @param {any} node 
     */
    function addOrder(node){
        node.classList.remove('active');
        order.push(node);
    }

    /**
     * 检查数组中是否存在所需节点
     * 
     * @param {any} str 
     * @returns 
     */
    function checkOrder(str){
        for(var i=0,len=order.length;i<len;i++){
            if(order[i].firstElementChild.innerText.trim()===str){
                show(order[i],true);
                return;
            }
            else{
                show(order[i],false);
            }
        }
        if(i===len){
            setTimeout(function(){
                alert('没有此节点'+str);
            },index*500);
        }
    }

    /**
     * 显示数组中的节点
     * 
     */
    function ShowOrder(){
       order.forEach(function(node){
            show(node,false);
       });
    }

})();

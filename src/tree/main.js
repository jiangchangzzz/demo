'use strict';

(function(){

    var data=[ {name: "父节点1", children: [ {name: "子节点1"}, {name: "子节点2"} ]}, {name: "父节点2", children: [ {name: "子节点3"}, {name: "子节点4", children:[ {name:"子节点5"} ]} ]} ];
    var treeDom=document.getElementById('tree');
    var btnDom=document.getElementById('btn');

    var tree=new Tree(treeDom,data);
    tree.create();

    btnDom.addEventListener('click',function(){
        if(btnDom.innerText==='展开所有'){
            tree.spread();
            btnDom.innerText='收起所有';
        }
        else if(btnDom.innerText==='收起所有'){
            tree.pack();
            btnDom.innerText='展开所有'
        }
    });

})();
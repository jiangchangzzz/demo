'use strict';

(function () {

    var list = document.querySelector('#list');
    const num = 30; //每次向后端获取数据的数量
    var current = 0; //下次获取数据的起始序号，序号从0开始

    var isAddItem = false; //是否正在添加列表

    //获取数据渲染列表
    function render() {
        if (!isAddItem) {
            isAddItem=true;
            getdata(num, current).then(function (data) {
                //创建一个元素块
                var block = document.createDocumentFragment();
                data.forEach(function (item) {
                    var li = document.createElement('li');
                    li.innerText = item;
                    block.appendChild(li);
                });
                list.appendChild(block);

                current += num;
                isAddItem=false;
            }).catch(function (err) {
                console.log(err);
            });
        }
    }

    //模拟从后端获取数据,返回一个Promise对象
    function getdata(num, curret) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                var data = [];
                for (var i = current; i < current + num; i++) {
                    data.push('item ' + (i + 1));
                }
                resolve(data);
            }, 1000);
        });
    }

    //初始化界面和绑定scoll事件处理程序
    function init() {
        render();

        window.addEventListener('scroll', function () {
            //计算滚动条到底部的距离
            var totalHeight = document.body.scrollHeight;  //元素的总高度
            var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;   //被隐藏上方像素   
            var clientHeight=document.documentElement.clientHeight;   //浏览器视口高度

            var bottom = totalHeight-scrollTop-clientHeight;
            //console.log(bottom);
            //已解决重复渲染问题
            if (bottom < 100) {
                render();
            }
        });
    }

    init();

})();
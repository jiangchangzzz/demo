'use strict';

(function(){

    
    /**
     * 排序表格组件
     * 
     * @param {string} eleSrc 表格容器的css选择器
     * @param {Object} data 表格中显示的数据
     * @param {Object} options 
     *  click：点击按钮后的响应借口，默认使用数字大小排序
     *  show：需要显示的属性，默认为第一组数据的所有属性
     *  sortProperty：需要提供排序功能的属性，默认为第一组数据的所有数据项
     */
    function SortTable(eleSrc,data,options){
        this.eleSrc=eleSrc;
        this.data=data;

        this.table=document.createElement('table');
        this.table.className='sort-table';
        this.head=document.createElement('thead');
        this.body=document.createElement('tbody');

        this.table.appendChild(this.head);
        this.table.appendChild(this.body);

        //默认设置
        var defaultOptions={
            click: null,
            show: [],
            sortProperty: [],
        };
        for(var i in this.data[0]){
            defaultOptions.show.push(i);
            defaultOptions.sortProperty.push(i);
        }
        this.options=Object.assign(defaultOptions,options);
    }

    SortTable.prototype={
        //初始化表格，添加事件处理程序
        init: function(){
            //添加表头
            var str='<thead><tr>';
            for(var i=0,len=this.options.show.length;i<len;i++){
                var show=this.options.show[i];
                if(this.options.sortProperty.indexOf(show)>=0){
                    str+='<th class="sort">'+show+'</th>';
                }
                else{
                    str+='<th>'+show+'</th>';
                }
            }
            str+='</thead></tr>';

            var container=document.querySelector(this.eleSrc);
            container.appendChild(this.table);
            this.head.innerHTML=str;

            //渲染表格内容
            this.render();

            var self=this;
            //使用事件委托添加时间处理程序
            this.head.addEventListener('click',function(event){
                var target=event.target;
                if(target.className.indexOf('sort')>=0){
                    if(target.className.indexOf('asc')>=0){
                        self.clearSign();
                        target.classList.add('desc');

                        self.sort(target.innerText.trim(),false)
                    }
                    else{
                        self.clearSign();
                        target.classList.add('asc');

                        self.sort(target.innerText.trim(),true);
                    }
                    //排序完成后重新渲染表格内容
                    self.render();
                }
            });
        },

        //渲染表格数据
        render: function(){
            var self=this;
            var str='';
            this.data.forEach(function(item){
                str+='<tr>';
                self.options.show.forEach(function(property){
                    if(item[property]){
                        str+='<td>'+item[property]+'</td>';
                    }
                    else{
                        str+='<td></td>';
                    }
                });
                str+='</tr>';
            });
            this.body.innerHTML=str;
        },

        //将数据按property属性进行排序
        sort: function(property,desc){
            if(this.options.sortProperty.indexOf(property)>=0){
                var self=this;
                self.data.sort(function(a,b){
                    if(self.options.click){
                        return self.options.click(a[property],b[property],desc);
                    }
                    else{
                        return self.defaultSort(a[property],b[property],desc);
                    }
                });
            }
        },

        //默认排序方法
        defaultSort: function(a,b,desc){
            if(desc){
                return b-a;
            }
            else{
                return a-b;
            }
        },

        //清除所有排序标记
        clearSign: function(){
            var child=this.head.querySelectorAll('th');
            for(var i=0,len=child.length;i<len;i++){
                child[i].classList.remove('asc');
                child[i].classList.remove('desc');
            }
        }
    };

    //暴露对象接口
    window.SortTable=SortTable;

})();

(function(){

    var data=[
        {
            Name: '小明',
            Chinese: 80,
            Math: 90,
            English: 70,
            Total: 240
        },
        {
            Name: '小红',
            Chinese: 90,
            Math: 60,
            English: 90,
            Total: 240
        },
        {
            Name: '小亮',
            Chinese: 60,
            Math: 100,
            English: 70,
            Total: 230
        }
    ];

    var sortTable=new SortTable('#container',data,{
        sortProperty:['Chinese','Math','English','Total'],
        /*click: function(a,b){
            return a-b;
        }*/
    });
    sortTable.init();

})();




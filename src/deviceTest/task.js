phantom.outputEncoding = "gb2312";

var page=require('webpage').create();
var system=require('system');
var fs=require('fs');

if(system.args.length!==3){
    console.log('usage: task.js <url> <device name>');
    phantom.exit();
}

var word=system.args[1];
var name=system.args[2];

var devices=JSON.parse(fs.read('device.json'));
var device=devices[name];
if(!devices[name]){
    console.log('cannot find device name');
    phantom.exit();
}

//设置用户代理
page.settings.userAgent=device.ua;

//设置浏览器视口大小
page.viewportSize={
    width: device.width,
    height: device.height
};

//设置抓取时窗口位置
page.clipRect={
    top: 0,
    left: 0,
    width: device.width,
    height: device.height
};
//console.log(JSON.stringify(page,undefined,4));
//console.log(JSON.stringify(page.settings,undefined,4));

var time = Date.now();
var url = 'https://www.baidu.com/s?wd=' + encodeURIComponent(word);

//打开搜索页面
page.open(url, function (status) {
    var res;
    if (status !== 'success') {
        res = {
            code: 0,
            msg: '抓取失败',
            word: word,
            time: Date.now() - time,
            dataList: [],
            device: name
        };
    } else {
        var dataList = page.evaluate(function () {
            var dataList = [];
            var containers = document.querySelectorAll('.c-container');
            for (var i = 0, len = containers.length; i < len; i++) {
                var container = containers[i];
                var data = {
                    title: '',
                    info: '',
                    link: '',
                    pic: ''
                };

                var title;
                if (title = container.querySelector('h3')) {
                    data.title = title.innerText;
                }

                var info;
                if (info = container.querySelector('p')) {
                    data.info = info.innerText;
                }

                var link;
                if (link = container.querySelector('a')) {
                    data.link = link.href;
                }

                var pic;
                if (pic = container.querySelector('img')) {
                    data.pic = pic.src;
                }

                dataList.push(data);
            }
            return dataList;
        });

        res = {
            code: 1,
            msg: '抓取成功',
            word: word,
            time: Date.now() - time,
            dataList: dataList,
            device: name
        };
    }

    console.log(JSON.stringify(res,undefined,4));

    phantom.exit();
});

//打开页面异常处理
page.onError=function(msg,trace){
    var msgStack=['Error: '+msg];

    if(trace && trace.length){
        msgStack.push('TRACE:');
        trace.forEach(function(t){
            msgStack.push('->'+t.file+': '+t.line+(t.function?'in function '+t.function:''));
        });
    }

    console.log(msgStack.join('\n'));
    phantom.exit();
}

var page=require('webpage').create();
var system=require('system');

if(system.args.length===1){
    console.log('usage: request.js <url>');
    phantom.exit();
}

var url=system.args[1];

//资源请求事件
page.onResourceRequested=function(request){
    console.log('Request '+JSON.stringify(request,undefined,4));   //第四个参数控制缩进
};

//资源获取事件
page.onResourceReceived=function(response){
    console.log('Receive '+JSON.stringify(response,undefined,4));
};

page.open(url,function(status){
    phantom.exit();
});
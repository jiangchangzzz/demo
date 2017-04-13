var page=require('webpage').create();
var system=require('system');

page.onConsoleMessage=function(msg){
    console.log('Page title is '+msg);
}

var url=system.args[1];
page.open(url,function(status){
    page.evaluate(function(){
        console.log(document.title);
    });
    phantom.exit();
});
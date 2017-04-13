var page=require('webpage').create();
var system=require('system');

if(system.args.length===1){
    console.log('usage: getTitle.js <url>');
    phantom.exit();
}

var url=system.args[1];
page.open(url,function(status){
    var title=page.evaluate(function(){
        return document.title;
    });
    console.log('page title is '+title);
    phantom.exit();
});
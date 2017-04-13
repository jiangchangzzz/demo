var page=require('webpage').create();

page.open('http://phantomjs.org',function(status){
    var content=page.content;
    console.log(content);
    phantom.exit();
});

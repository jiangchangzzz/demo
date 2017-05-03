'use strict';

(function(){

    var block=document.getElementById('block');
    var animation=new Animation(block);
    animation.start('left',1000,5000,'easeIn');

})();
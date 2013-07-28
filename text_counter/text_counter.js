$('html').append('<p class="text-length-counter-tip">0</p>');

$('input[type=text],textarea').each(function(){

    var e = $(this),
        posTop,
        posLeft,
        tip = $('p.text-length-counter-tip');

    chrome.runtime.onMessage.addListener(
        function(request) {
            if (request.status == 'enable'){
                e.on({
                    'focus':function(){
                        if(e.offset().top > 100){
                            posTop = Math.ceil(e.offset().top - 70);
                        }else{
                            posTop = Math.ceil(e.offset().top + e.height() + 10);
                        }
                        posLeft = Math.ceil(e.offset().left);
                        tip.html(e.val().length).show().css({
                            top:posTop,
                            left:posLeft
                        });
                    },
                    'keyup':function(){
                        tip.html(e.val().length);
                    },
                    'blur':function(){
                        tip.hide();
                    }
                });
            }else if(request.status == 'disable'){
                tip.hide();
                e.off();
            }
        }
    );
});
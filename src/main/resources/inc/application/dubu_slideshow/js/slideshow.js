(function(window, $){

    $('.slideshow').each(function(){
        var target = $(this);

        target.carousel({
            autoPlay : parseInt(target.attr('slide-autoplay')),
            items : '> :not(.hidden_slide)',
            animation : target.attr('slide-animation'),
            dots : !!parseInt(target.attr('slide-dots')),
            nav : !!parseInt(target.attr('slide-nav')),
            interval : parseInt(target.attr('slide-interval')),
            duration : parseInt(target.attr('slide-duration')),
        });
    });
    $('.slideshow .slide_items.button[link-href],.slideshow .slide_items.image[link-href], .slideshow .slides[link-href]').unbind("click").bind('click', function( event ){

        event.stopPropagation();
        var $this = $(event.currentTarget),
            href = $this.attr('link-href');

        var pathname = decodeURIComponent(location.pathname),
            regex = new RegExp('(' + pathname + ')(?:[\#]|[\(][\'])(.*)_hash'),
            match = href.match(regex);

        if( !href ){
            return false;
        }
        if( $this.attr('link-target') == '_blank' ){
            window.open( href );
        } else if( match ){
            var anchorTarget = $('#' + match[2]);
            if( anchorTarget.attr('data-anchor-name') == undefined ){
                return false;
            }
            moveAnchor( anchorTarget );
        } else {
            location.href = href;
        }
    });
    $('.slideshow .play-icon').on('click', function(e){
        var target = $(e.currentTarget),
        parent = target.parent();

        parent.children('').not('.video_responsive').addClass('hide');

        var iframeURL = parent.data('src');
        var iframe = '<iframe src="' + iframeURL + '?autoplay=1" frameborder="0" allowfullscreen></iframe>';
        parent.prepend( iframe );
    });

    function moveAnchor( target ){
        var page = $('html, body');
        page.on('scroll wheel DOMMouseScroll mousewheel touchmove', function(){
            page.stop();
        });

        var anchorDuration = parseInt(target.attr('data-anchor-duration')) || 1000,
            anchorDelay = parseInt(target.attr('data-anchor-delay')) || 0,
            anchorTiming = target.attr('data-anchor-timing') || 'linear';

        if( target.length > 0 ){
            event.preventDefault();

            if( isMobile() ) {
                closeMobileMenu();
            }

            page.stop().delay(anchorDelay).animate({
                 scrollTop: target.offset().top
            }, anchorDuration, anchorTiming, function(){
                $('.wrap').removeClass('right_off');
                $('#mobile_mainmenu').removeClass('right_off');
            });
        }
    }

})(window, jQuery);

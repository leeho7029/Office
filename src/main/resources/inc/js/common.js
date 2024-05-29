+function(window, $){ 'use strict';

    window.goURL = function(url){
        location.href = url;
    }

    window.goHome = function(){
        parent.window.location.href = '/';
    }

    window.goAnchor = function( anchor ){
        if(parent.window.location.pathname == "/"){
            var page = $("html, body"),
                target = $('#'+anchor.replace('_hash', '')),
                anchorDuration = parseInt(target.attr('data-anchor-duration')) || 1000,
                anchorDelay = parseInt(target.attr('data-anchor-delay')) || 0,
                anchorTiming = target.attr('data-anchor-timing') || 'linear';

            if( target.length > 0 ){
                page.stop().delay(anchorDelay).animate({
                     scrollTop: target.offset().top
                }, anchorDuration, anchorTiming);
            }
        } else {
            goURL('/#' + anchor);
        }
    }

    window.goLogin = function(ref){
        var param = ref ? '?rurl=' + ref : '';
        goURL('/login' + param);
    }
    window.goLogout = function(){
        goURL('/logout');
    }

    window.isMobile = function(){
        return navigator.userAgent.match(/iPad|iPhone|Android|IEMobile|BlackBerry/i);
    }

    window.isIE = function(){
        var retVal = false;
        if(navigator.appName == 'Microsoft Internet Explorer'){
            if(/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent) != null){
                retVal = parseFloat( RegExp.$1 );
            }
        }
        else if(navigator.appName == 'Netscape'){
            if(/Trident.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent) != null){
                retVal = parseFloat( RegExp.$1 );
            }
        }
        return retVal;
    }

    window.setCookie = function(name, value, expires, path, domain, secure){
        var date = new Date();
        if( typeof expires == 'object' && expires.toGMTString ){
            expires = expires.toGMTString();
        } else if( parseInt(expires, 10) ){
            date.setTime(date.getTime() + parseInt(expires, 10) * 1000);
            expires = date.toGMTString();
        } else {
            expires = '';
        }
        if( !domain ) domain = document.host;

        document.cookie = name + '=' + encodeURIComponent( value ) +
			( expires ? '; expires=' + expires : '' ) +
			( path    ? '; path=' + path       : '' ) +
			( domain  ? '; domain=' + domain   : '' ) +
			( secure  ? '; secure'             : '' );
    }

    window.getCookie = function(name){
        var cookie = document.cookie,
            prefix = name + '=',
            begin, end;

        if( !cookie ) return;

        begin = cookie.indexOf('; ' + prefix);

        if( begin == -1 ){
            begin = cookie.indexOf(prefix);

            if( begin !== 0 ) return null;
        } else {
            begin += 2;
        }

        end = cookie.indexOf(';', begin);

        if( end == -1 ){
            end = cookie.length;
        }
        return decodeURIComponent(cookie.substring(begin + prefix.length, end));
    }

    window.clearHash = function(){
        history.replaceState('_hash', document.title, window.location.pathname+ window.location.search);
    }

    function initMainMenu(){
        var gnb = $('#main_menu .gnb');
        function bindMenuHref( idx, depth ){
            var depth = $(depth);
            var anchor = depth.children('a'),
                href = anchor.attr('href');

            if( href && href != '#' ) return;

            var firstChild = depth.children('ul').find('> li:first > a'),
                firstChildHref = firstChild.attr('href');

            if( firstChildHref && firstChildHref != '#' ){
                anchor.attr({
                    'href' : firstChildHref,
                    'target' : firstChild.attr('target')
                });
            }
        }

        gnb.find('.depth2 li').each(bindMenuHref);
        gnb.find('.depth1').each(bindMenuHref);
    }

    function bindDataLinks(){
        var columns = $('[data-link-href]');
        if( columns.size() == 0 ){
            return;
        }

        columns.each(function(){
            var $this = $(this),
                href = $this.attr('data-link-href') || '',
                target = $this.attr('data-link-target') || '';

            if( !href ) return;
            $this.on('click', function(){
                if( target == '_blank' ){
                    window.open(href);
                } else {
                    location.href = href;
                }
            });
        });
    }

    function bindScrollAnimation(){
        $('[data-animation]').each(function(){
            var target = $(this),
                animationName = target.attr('data-animation'),
                animationDirection = target.attr('data-animation-direction'),
                animationDuration = target.attr('data-animation-duration') || '1000ms',
                animationDelay = target.attr('data-animation-delay') || 0,
                animationTiming = target.attr('data-animation-timing') || 'linear',
                animationClass = animationName + animationDirection;

            target.css({
                'animation-duration' : animationDuration,
                'animation-delay' : animationDelay
            });
            animationTiming.replace('ani-', '');

            target.waypoint(function(){
                if( target.hasClass('animated') ) return;
                target.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function( event ){
                    $(event.currentTarget).removeClass(animationTiming + ' ' + animationClass);
                }).addClass('animated ani-' + animationTiming + ' ' + animationClass);
            }, {
                triggerOnce: true,
                offset: '99%'
            });
        });
    }

    function bindAnchorEvent(){
        var anchors = $('a[href*=#]a[href$=_hash], [data-link-href*=#][data-link-href$=_hash]').not('.depth_arrow');
        anchors.off().on('click', function(event){
            var pathname = decodeURIComponent(location.pathname),
                regex = new RegExp('(' + pathname + ')(?:[\#]|[\(][\'])(.*)_hash'),
                href = $.attr(this, 'href') || $.attr(this, 'data-link-href'),
                match = href.match(regex);

            var target = $(this).attr('data-link-target') || $(this).attr('target') || '';

            if( target == '_blank' ){
                return window.open(href);
            }
            if( !match ){
                return location.href = href;
            }

            var anchorTarget = $('#' + match[2]);
            if( anchorTarget.attr('data-anchor-name') == undefined ){
                return false;
            }
            event.preventDefault();
            moveAnchor( anchorTarget );
        });

        if( window.location.hash.indexOf('_hash') > -1 ) {
            var anchorTarget = $(window.location.hash.replace('_hash', ''));
            if( anchorTarget.attr('data-anchor-name') == undefined ){
                clearHash();
                return false;
            }
            moveAnchor( anchorTarget );
            clearHash();
        }
    }

    function moveAnchor( target ){
        var page = $('html, body');
        page.on('scroll wheel DOMMouseScroll mousewheel touchmove', function(){
            page.stop();
        });

        var anchorDuration = parseInt(target.attr('data-anchor-duration')) || 1000,
            anchorDelay = parseInt(target.attr('data-anchor-delay')) || 0,
            anchorTiming = target.attr('data-anchor-timing') || 'linear';

        if( target.length > 0 ){

            if( isMobile() ) {
                closeMobileMenu();
            }

            var margin = $('#header.fixed_header').outerHeight() || 0;

            page.stop().delay(anchorDelay).animate({
                 scrollTop: target.offset().top - margin
            }, anchorDuration, anchorTiming, function(){
                $('.wrap').removeClass('right_off');
                $('#mobile_mainmenu').removeClass('right_off');
            });
        }
    }

    function closeMobileMenu(){
        $('.wrap').addClass('right_off');
        $('#mobile_mainmenu').addClass('right_off');
        $('.mobile_wrap').removeClass('mo_open');
        $('#mobile_mainmenu').find('.depth_open').removeClass('depth_open');
        $('#mobile_mainmenu').find('.overlay').removeClass('overlay');
    }

    function renderFixedSection(){
        var fixed = $('.fixed_header[data-divide], .fixed_footer[data-divide]');

        if( fixed.size() > 0 ){
            fixed.each(function(){
                var wrap = $('<div>');
                var $this = $(this);
                wrap.addClass(this.className.replace(/(fixed_header|fixed_footer)/, '$1_holder'));
                wrap.css('height', $this.outerHeight());

                if( this.className.indexOf('header') > -1 ){
                    wrap.prependTo('.wrap');
                } else {
                    wrap.appendTo('.wrap');
                }
                $this.data('holder', wrap);
            });

            $(window).on('resize.fixedsection', function(){
                $('.fixed_header[data-divide], .fixed_footer[data-divide]').each(function(){
                    var $this = $(this);
                    $this.data('holder').css('height', $this.outerHeight());
                });

            });
        }
    }

    $(window).load(function(){
        /*window.scrollTo(0,1);*/
        initMainMenu();
        bindDataLinks();
        bindScrollAnimation();

        renderFixedSection();
        bindAnchorEvent();

    });
}(window, jQuery);
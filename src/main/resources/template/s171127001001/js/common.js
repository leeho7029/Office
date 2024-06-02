$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });    
    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
    
    /*우측의 네비 시작 */
    $(".link_mohmenu").click(function() {
        $(".mobile_wrap").addClass("mo_hmenu_open");        
         $(this).css({'border' : 'none'});       
    });
    $(".bth_m_hmenu").click(function() {
        $(".mobile_wrap").removeClass("mo_hmenu_open");
        $(".link_mohmenu").css({'border-left' : 'solid 1px #ccc'});
    });  
    
    /*좌측 라인*/
    $(".link_momenu").click(function() {
        $(".link_momenu").addClass("line");
    }); 
    $(".link_momenu.line").click(function() {
        $(".link_momenu").removeClass("line");    
    });     
    
    /*화면 가리는 영역 클릭시 재설정?*/
    $(".mobile_wrap_overlay").click(function(){
        $(".mobile_wrap").removeClass("mo_hmenu_open");            
        $(".link_mohmenu").css({'border-left' : 'solid 1px #ccc'});   
        $(".mobile_wrap").removeClass("mo_open");      
        $(".link_momenu").removeClass("borderRight");   
    });
    
    /*$(".mo_open #mobile_mainmenu .link_momenu").click(function(){
        $(".mobile_wrap").removeClass("mo_open");      
        $(".link_momenu").removeClass("borderRight"); 
    });  */
    
    
    /* 좌측 버튼 눌렀을때 보더값 넣었다 빼기 */
    $( ".link_momenu" ).click(function() {
        $(this).each(function() {
            $( this ).toggleClass( "borderRight" );
        });
    }); 
    
    /*모바일 좌측버튼 before영역 클릭 이밴트를 영역으로 대처 */
    /*left 230을 준것==네비 0에서부터 230이후 && 높이 45이하를 클릭하면 적용하게끔 영역을 지정 레이아웃이 바뀌면 아래 숫자도 변경되야함.*/    
    $('#mobile_mainmenu').click(function(e) {
        if (e.clientX > $(this).offset().left + 230 && e.clientY < $(this).offset().top + 45) {
            $(".mobile_wrap").removeClass("mo_open");
        }
    }); 

    /********** footer link 18.1.30다연 **********/
    $(document).one('ready', function(){
        $.each($('ul.gnb').find('li.depth1'), function(){
            var href = $(this).find('a').attr('href');
            var title = $(this).find('a').attr('title');
            $('.link').find('ul.link_inner').append('<li class="link_list"><a class="point_hover_txt" href="' + href + '">' + title + '</a></li>');
        });
        /*.gnb li 와 .link li를 대응시켜 depth2 적용*/
        $('.link').find('li.link_list').append('<ul class="depth2">');
        for (var i=0;i<7;i++) {
            $.each($('ul.gnb').find('.depth1_0'+i+ '>.depth2>li'), function(){
                var href = $(this).find('a').attr('href');
                var title = $(this).find('a').attr('title');
                $('.link').find('li:nth-child('+i+') .depth2').append('<li><a class="point_hover_txt" href="' + href + '">' + title + '</a></li>');    
            });
        }
    });
    /*******************************************/
});





$(document).ready(function () {
    $('.rolling-banner').each(function () {
        var $rollingBanner = $(this);
        var $cloneItems = $rollingBanner.find('li.cloned-item');
        var clonedSize = $cloneItems.size();

        if (clonedSize > 0 && clonedSize < $rollingBanner.find('li:not(.cloned-item)').size()) {
            $cloneItems.remove();
            clonedSize = 0;
        }

        if (clonedSize == 0) {
            $cloneItems = $rollingBanner.find('li').clone();
            $cloneItems.addClass('cloned-item').appendTo($rollingBanner.find('ul'));
        }

        $rollingBanner.addClass('rolling-banner--animated');
    })
    
});

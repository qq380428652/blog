require('!style-loader!css-loader!./index.css');
$(window).on('load',function(){
    
    function autoSize() {
        let slide_img_width=$(window).width()
        let slide_img_height=$('.slide-header img').eq(0).height();
        if ($(window).width()>=540) {
            slide_img_width=540;
            slide_img_height=169;
        }
        let slide_ul_width=slide_img_width*$('.slide-header ul li').length;
        $('.slide-header ul li').css('width',slide_img_width)
        $('.slide-header header').css('height',slide_img_height);
        $('#slide-ul').css('width',slide_ul_width);
        console.log(slide_ul_width,slide_img_height)
    }

    function autoPlay(){
        clearInterval(slide_header_timer);
        clearInterval(slide_topLine_timer);
        let slide_img_width=$('.slide-header img').eq(0).width();
        let [n,i]=[0,0];
        $('.slide-header-btn span').eq(0).addClass('active');
        let slide_header_timer=setInterval(function(){
            n++;
            $('.slide-header header ul').stop().animate({
                'left':'-'+slide_img_width*n+'px'
            },1000,function(){
                if (n>=($('.slide-header img').length)/2) {
                    n=0;
                    $('.slide-header header ul').css({
                        'left':'0px'
                    })
                }
                $('.slide-header-btn span').removeClass('active').eq(n).addClass('active')
            });
        },2000);
        let slide_topLine_timer=setInterval(function(){
            i++;
            if (i>=$('.top-line-body dl').length) {
                i=0
            }
            $('.top-line-body dl').eq(0).stop().css({
                'margin-top':'-'+2.3*i+'rem'
            });
        },2000)
    }

    
    autoSize()
    autoPlay();
    $(window).resize(function () { 
        autoSize()
        autoPlay();
    });
    $('.search-placeholder').on('touchstart',function(){
        $('.search-placeholder').hide()
        $('.content').hide();
        $('.search').show()
    });
    $('.search').on('blur',function(){
        $('.search-placeholder').show()
        $('.content').show();
        $('.search').hide();
    })
})
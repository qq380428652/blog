

$(window).on('load', function () {

    function reset() {

        let articles = $('.main-item');
        let content = $('.main-content');
        let article_width_old = 300;
        let content_width = content.width();


        let all_height = [];
        let max_column = parseInt(content_width / article_width_old);
        let article_margin = 12

        let article_width_new = content_width / max_column
        articles.css('width', article_width_new - article_margin);

        let content_height = content.height();
        content.css('height', content_height);

        articles.css({
            'position': 'absolute',
            'left': 0,
            'top': 0
        })
        articles.each(function (index, item) {
            let column = index % max_column;
            let left = article_width_new * column;
            let row = Math.floor(index / max_column);
            all_height.push($(item).outerHeight(true));

            let top = 0;
            while (row > 0) {
                row--;
                top += all_height[row * max_column + column]
            }
            $(item).css({
                'transform': 'translate(' + left + 'px,' + top + 'px)'
            });
        });
    };

    function change() {
        let content_height = $('.main-content').height();
        $('.main-content').css('height', content_height);

        if (location.pathname == '/') {
            $('#entry-bg').css({ 'opacity': 0, 'transition': 'opacity  2s' });
            $('.logo').css({ 'opacity': 1, 'margin-top': 0, 'transition': 'all  1s' });
            $('#form-search').css({ 'height': 20, 'opacity': 1, 'transition': 'all 1s' });
        } else {
            $('#entry-bg').css({ 'opacity': 1, 'transition': 'opacity  2s' });
            $('.logo').css({ 'opacity': 0, 'margin-top': -120, 'transition': 'all  1s' });
            $('#form-search').css({ 'height': 0, 'opacity': 0, 'transition': 'all 1s' });
        }



        let text = '';
        let id = $('input[type="hidden"]').val();
        $('.small-img img').on('click', function (e) {
            e.preventDefault();
            text = $('textarea[name="comment"]').val() + $(this).attr('value');
            $('textarea[name="comment"]').val(text);
        })

        $('.comment-respond').on('submit', function (e) {
            e.preventDefault();
            var user = {
                'username': $('input[name="username"]').val(),
                'usercomment': $('textarea[name="comment"]').val()
            }
            for (var i = 0; i < $('.small-img img').length; i++) {
                if (user.usercomment.search(new RegExp($('.small-img img').eq(i).attr('value'), 'g')) != -1) {
                    user.usercomment = user.usercomment.replace(new RegExp($('.small-img img').eq(i).attr('value'), 'g'), $('.small-img a').eq(i).html());
                    // console.log(user.usercomment)
                }
            }
            $.ajax({
                type: "post",
                url: "/api/comment/add/" + id,
                data: user,
                dataType: "json",
                success: function (resp) {
                    $('.erro-msg').html(resp.message).css('opacity', 1);
                    var erro_msg = setTimeout(function () {
                        $('.erro-msg').css({ 'opacity': 0, 'transition': 'all 1s' });
                        clearTimeout(erro_msg);
                    }, 1000);
                    if (resp.success) {
                        location.reload()
                    }
                }
            });

        })
    };

    reset();
    change();
    $(window).resize(function () {
        reset();
    });


    $(document).pjax('a[data-pjax]', '#main');
    $(document).on('pjax:complete', function () {
        change()

    });
    $(window).on('popstate', function () {
        change()
    });


    $('.input-search').on('blur', function () {
        if (this.value == '') {
            this.value = 'Search';
        }
    }).on('focus', function () {
        if (this.value == 'Search') {
            this.value = '';
        }
    });

    $(document).on('scroll', function () {
        if ($(document).scrollTop() > 400) {
            $('#scroll-top').css({ 'display': 'block', 'opacity': '0.7', 'transition': 'opacity 2s' });
        } else {
            $('#scroll-top').css({ 'opacity': '0', 'transition': 'opacity 2s' });

        }
    })

    $('#scroll-top').on('click', function () {
        let scrollTop = $(document).scrollTop();
        let scroll = setInterval(function () {
            scrollTop -= 500;
            if (scrollTop > 0) {
                $(document).scrollTop(scrollTop);
            } else {
                scrollTop = 0
                $(document).scrollTop(scrollTop);
                clearInterval(scroll)
            }

        }, 60)
    })

    $('.year').eq(0).addClass('map-active');
    $('.month').eq(0).addClass('map-active');
    $('.month').click(function () { 
        $('.month').removeClass('map-active');
        $(this).addClass('map-active');
    });
    $(window).scroll(()=>{
        if ($(window).scrollTop()>200) {
            $('.nav-map').css('top',$(window).scrollTop()-200)
        }
    })
});
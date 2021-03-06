$(function() {

    $('[data-mask]').each(function() {
        input = $(this);
        mask = input.attr('data-mask');
        input.inputmask({"mask": mask});
    });

    $('.toggle-menu').on('click', function () {
        $('.mobile-menu').slideToggle();
    });
    $('[data-toggle]').on('click', function () {

        $(this).toggleClass('active');
        var selector = $(this).attr('data-toggle');
        $(selector).slideToggle();
        //$(this).toggleClass('active');
    });

    $('body').on('click', '[data-goto]', function(e) {
        e.preventDefault();
        $('.mobile-menu').slideUp();
        var hx = 0;
        if ($(window).width()<1000) {
            hx = -70;
        }
        var selector = $(this).attr('data-goto');
        $('html, body').animate({ scrollTop: $(selector).offset().top + hx}, 1200);
    });

    $('[data-tab]').click(function(){
        var xtab = $('.xtab');
        $('[data-tab]').removeClass('active');
        $(this).addClass('active');

        var data_tab = $(this).attr('data-tab');
        xtab.removeClass('active');
        xtab.css({"opacity": 0.1});
        setTimeout(function() {
            xtab.css({"opacity": 1});
        }, 120);
        $(data_tab).addClass('active');

        return false;
    });

    //скрываем блоки на мобильной версии
    closeBlocks();
    initGratefulSlider('.grateful-slider');
    initAdvantagesSlider('.advantages-slider');
    initApplicationSlider('.application-slider');



});

closeBlocks = function() {
    if ($(window).width()>450) {
        return;
    }
    $('[data-toggle]').each(function(){
        if (!$(this).hasClass('active')){
            $(this).trigger('click');
        }
    });
};

var slider_grateful = false;
initGratefulSlider  = function(selector) {
    if (!slider_grateful) {
        $(selector).slick({
            'autoplay': false,
            'arrows': true,
            'dots': false,
            'slidesToShow': 1,
            'slidesToScroll': 1,
            'adaptiveHeight': true
        });
        slider_grateful = true;
    }
};

var slider_advantages = false;
initAdvantagesSlider  = function(selector) {

    if ($(window).width()<1050) {
        if (!slider_advantages) {
            $(selector).slick({
                'autoplay': false,
                'arrows': false,
                'dots': true,
                'slidesToShow': 1,
                'slidesToScroll': 1,
                'infinite': false,
                'adaptiveHeight': true
            });
            $(selector+" .slick-dots").wrap("<div class='slick-dots__wrapper'></div>");
            $(selector+" .slick-dots__wrapper").prepend('<span class="slick-dots-prev"></span>');
            $(selector+" .slick-dots__wrapper").append('<span class="slick-dots-next"></span>');
            $(selector+' .slick-dots-prev').on('click', function(){
                $(selector).slick('slickPrev');
            });
            $(selector+' .slick-dots-next').on('click', function(){
                $(selector).slick('slickNext');
            });

            slider_advantages = true;
        }
    } else {
        if (slider_advantages) {
            $(selector).slick('unslick');
            slider_advantages = false;
        }
    }
};


var slider_application = false;
initApplicationSlider  = function(selector) {

    if ($(window).width()<1000) {
        if (!slider_application) {
            $(selector).slick({
                'autoplay': false,
                'arrows': false,
                'dots': true,
                'slidesToShow': 2,
                'slidesToScroll': 1,
                'infinite': false,
                'adaptiveHeight': true,
                'responsive': [
                    {
                        breakpoint: 450,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            });
            $(selector+" .slick-dots").wrap("<div class='slick-dots__wrapper'></div>");
            $(selector+" .slick-dots__wrapper").prepend('<span class="slick-dots-prev"></span>');
            $(selector+" .slick-dots__wrapper").append('<span class="slick-dots-next"></span>');
            $(selector+' .slick-dots-prev').on('click', function(){
                $(selector).slick('slickPrev');
            });
            $(selector+' .slick-dots-next').on('click', function(){
                $(selector).slick('slickNext');
            });

            slider_application = true;
        }
    } else {
        if (slider_application) {
            $(selector).slick('unslick');
            slider_application = false;
        }
    }
};


var doit;
$(window).resize(function(){
    clearTimeout(doit);
    doit = setTimeout(resizedw, 100);
});

function resizedw(){
    var width = $(window).width();
    closeBlocks();
    initGratefulSlider('.grateful-slider');
    initAdvantagesSlider('.advantages-slider');
    initApplicationSlider('.application-slider');
}



$(document).scroll(function(){
    //setFixedHeader();
});


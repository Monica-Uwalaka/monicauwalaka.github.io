(function($) {
"use strict";

/*------------------------------------------------------------------
[Table of contents]


1.Mazzer FEEDBACK SWIPER SLIDER JS


-------------------------------------------------------------------*/

/*--------------------------------------------------------------
CUSTOM PRE DEFINE FUNCTION
------------------------------------------------------------*/
/* is_exist() */
jQuery.fn.is_exist = function(){
    return this.length;
}


$(function(){

/*--------------------------------------------------------------
    1.Mazzer FEEDBACK SWIPER SLIDER JS
------------------------------------------------------------*/

if($('.feedback-swiper-container').length>0) {
    var swiper = new Swiper('.feedback-swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        // autoplay: 900,
        // speed: 900,
        pagination: {
        el: '.swiper-pagination',
        clickable: true,
        },
        breakpoints: {
        1199: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
            767: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        575: {
            slidesPerView: 1,
            spaceBetween: 5,
        }
        }
    });

}

/*--------------------------------------------------------------
    6.Mazzer V2 FEEDBACK SWIPER SLIDER JS
------------------------------------------------------------*/
if($('.v2-feedback-swiper-container').length>0) {
    var swiper = new Swiper('.v2-feedback-swiper-container', {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        pagination: {
        el: '.swiper-pagination',
        clickable: true,
        },
        breakpoints: {
        1199: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
            767: {
            slidesPerView: 1.5,
            spaceBetween: 10,
        },
        575: {
            slidesPerView: 1,
            spaceBetween: 5,
        }
        }
    });

}

/*--------------------------------------------------------------
    7.Mazzer SCREENSHORT SWIPER SLIDER JS
------------------------------------------------------------*/

if($('.swiper-container').length>0) {

    var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    loop: true,
    // autoplay: 900,
    //    speed: 900,
    centeredSlides: true,
    slidesPerView: 4,
    initialSlide: 4,
    keyboardControl: true,
    mousewheelControl: false,
    lazyLoading: true,
    preventClicks: false,
    preventClicksPropagation: false,
    lazyLoadingInPrevNext: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    coverflow: {
    rotate: 0,
    stretch: 0,
    depth: 250,
    modifier: .5,
    slideShadows : false,
    },
        breakpoints: {
        1199: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
            767: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        575: {
            slidesPerView: 1.5,
            spaceBetween: 0,
        }
        }
});

}


/*--------------------------------------------------------------
    8. FEATURE SLIDER INITI
--------------------------------------------------------------*/
var $featureSlider = $('.mazzer-feature-animate-slider');
if ( $featureSlider.is_exist() ) {
    $featureSlider.owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        // autoplay: true,
        // autoplayTimeout: 2500,
        dots:false,
        items: 1,
        URLhashListener:true,
        autoplayHoverPause:true,
        startPosition: 'URLHash'
    });

    $('.mazzer-feature-single-icon-item').hover(function() {
        var $self = $(this),
            $index = $self.attr('data-index');

        $featureSlider.trigger('to.owl.carousel', $index);
    });
}
    


});/*End document ready*/


    

})(jQuery);

    
(function($) {
  'use strict';


    /**
     * Mazzer.
     * @constructor
     * @property {string}  version      - Build Version.
     * @property {string}  author       - Author.
     * @property {object}  $body        - Cache Body.
     * @property {object}  defaults     - Default settings.
     */
    var Mazzer = function() {
        this.version = "0.1";
        this.author = "pixiefy";
        this.$body = $('body');
        this.defaults = {
            appearAnimation: false,
            singlePageScroll: false,
            enableStickyMenu: false,
            mailchimpUrl: ''
        }
    }

    /** 
     * Mazzer.
     * @function config
     * @description Initialize Pages Loader
     */
    Mazzer.prototype.config = function(options) {

        // Save configs
        $.extend(true, this.defaults, options);

    }


    /** 
     * Mazzer.
     * @function initLoader
     * @description Initialize Pages Loader
     */
    Mazzer.prototype.initLoader = function() {
        
        $(window).on('load', function() {
            
            $("#preloader").fadeOut(500);

            $('.mazzer_animate').each(function(){
                $(this).removeAttr('style');
            });

            // add class to body
            $.Mazzer.bodyClassInit();
            
        });
    }


    /** 
     * Mazzer.
     * @function initMoJs
     * @description Initialize mo.js
     */
    Mazzer.prototype.initMoJs = function() {
        if( typeof mojs === "undefined" )
            return false;

        // taken from mo.js demos
        function isIOSSafari() {
            var userAgent;
            userAgent = window.navigator.userAgent;
            return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
        };

        // taken from mo.js demos
        function isTouch() {
            var isIETouch;
            isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
            return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
        };
        
        // taken from mo.js demos
        var isIOS = isIOSSafari(),
            clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';

        function extend( a, b ) {
            for( var key in b ) { 
                if( b.hasOwnProperty( key ) ) {
                    a[key] = b[key];
                }
            }
            return a;
        }

        function Animocon(el, options) {
            this.el = el;
            this.options = extend( {}, this.options );
            extend( this.options, options );

            this.checked = false;

            this.timeline = new mojs.Timeline();
            
            for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
                this.timeline.add(this.options.tweens[i]);
            }

            var self = this;
            this.el.on('mazzer:explode', function() {
                if( self.checked ) {
                    self.options.onUnCheck();
                }
                else {
                    self.options.onCheck();
                    self.timeline.replay();
                }
                self.checked = !self.checked;
            });
        }

        Animocon.prototype.options = {
            tweens : [
                new mojs.Burst({})
            ],
            onCheck : function() { return false; },
            onUnCheck : function() { return false; }
        };


        $.fn.amEmoji = function() {
    
            return this.each(function() {
                var $self = jQuery(this);
        
                    if ( $self.length === 0 ) {
                    return false;
                    }
                    var getColor = $self.attr('data-color');
                    if (typeof getColor === typeof undefined || getColor === false) {
                    getColor = '#616ce0';
                    }
        
                    new Animocon($self, {
                        tweens : [
                            // burst animation
                            new mojs.Burst({
                                parent: 		$self,
                                count: 			6,
                                radius: 		{ 20 : 80 },
                                timeline:   { delay: 300 },
                                children: {
                                    fill: 		getColor,
                                    radius:     7,
                                    opacity: 	0.6,
                                    duration: 	1500,
                                    easing: 	mojs.easing.bezier(0.1, 1, 0.3, 1)
                                }
                            }),
                            // ring animation
                            new mojs.Shape({
                                parent: 		$self,
                                radius: 		{0: 60},
                                fill: 			'transparent',
                                stroke: 		getColor,
                                strokeWidth: {5:0},
                                scale: 				0.5,
                                opacity: 			0.6,
                                duration: 		600,
                                easing: mojs.easing.ease.inout
                            }),

                            
                            // icon scale animation
                            new mojs.Tween({
                                duration : 1100,
                                onUpdate: function(progress) {
                                    if(progress > 0.3) {
                                        var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
                                        $self.css({
                                            'opacity': 1,
                                            '-webkit-transform' : 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)',
                                            '-moz-transform'    : 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)',
                                            '-ms-transform'     : 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)',
                                            '-o-transform'      : 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)',
                                            'transform'         : 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)'
                                        });
                                    }
                                    else {
                                        $self.css({
                                            '-webkit-transform' : 'scale3d(0,0,1)',
                                            '-moz-transform'    : 'scale3d(0,0,1)',
                                            '-ms-transform'     : 'scale3d(0,0,1)',
                                            '-o-transform'      : 'scale3d(0,0,1)',
                                            'transform'         : 'scale3d(0,0,1)'
                                        });
                        
                                    }
                                },
                                onComplete (isForward, isYoyo) {}
                            })
                        ],
                        
                    });
            });
            
        };

        $.fn.fireEmoji = function() {
            return this.each(function(index) {
                var $self = $(this);
                var t = setTimeout(function() { 
                    $($self).trigger('mazzer:explode'); 
                }, 200 * index); 
            });
        };        
    }


    /** 
     * Mazzer.
     * @function initReady
     * @description Initialize Pages Loader
     */
    Mazzer.prototype.initReady = function() {

        $(document).ready(function() {
            
            // group of functions
            $.Mazzer.initWow();
            $.Mazzer.initMenuScroll();
            $.Mazzer.initAjaxChimp();
            $.Mazzer.initStickyMenu();

            $(document).on('mazzer:icon', function(event, target) {
                var target = $( target.target );
                    target.find('.blast-wrapper').amEmoji().fireEmoji();
            });
            
        });
    }
    
    /** 
     * Mazzer.
     * @function initAjaxChimp
     * @description Initialize Ajax mailchimp plugin
     */
    Mazzer.prototype.initAjaxChimp = function() {

        if( $("#mazzer-subscription-form").length === 0 || this.defaults.mailchimpUrl.length === 0 )
            return;

        var amform = $("#mazzer-subscription-form");
        amform.ajaxChimp({
            url: this.defaults.mailchimpUrl
        });
        
    }

    /** 
     * Mazzer.
     * @function bodyClassInit
     * @description Add Body Class
     */
    Mazzer.prototype.bodyClassInit = function() {

        this.$body.addClass('mazzer_loaded');

    }

    /** 
     * Mazzer.
     * @function initWow
     * @description init wow.js
     */
    Mazzer.prototype.initWow = function() {


        if ( $('.wow').length === 0 || typeof WOW === "undefined" || !this.defaults.appearAnimation || $(window).width() <= 991 ) 
            return false;
        
        var wow = new WOW(
            {
                boxClass:     'wow',      // default
                animateClass: 'animated', // default
                offset:       0,          // default
                mobile:       false,      // default
                live:         true,        // default
                callback: function(box) {
                    if (box.classList.contains('mazzer_animate')) {
                        box.classList.add("mazzer_icon_loaded");
                    }
                },
                complete: function(target) {
                    if (target.target.classList.contains('mazzer-mojs-init')) {
                        $(document).trigger('mazzer:icon', target);
                    }
                }
            }
        )
        wow.init();
    }


    /** 
     * Mazzer.
     * @function initResponsiveMenu
     * @description init meanmenu for responsive menu
     */
    Mazzer.prototype.initResponsiveMenu = function(context) {

        $.fn.meanmenu && $(".mazzer-header-menu", context).meanmenu({
            meanMenuContainer: '.mazzer_nav_wrapper',
            meanScreenWidth: "991"
        });
        
    }

    Mazzer.prototype.validateEmail = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    /** 
     * Mazzer.
     * @function initCForm
     * @description init meanmenu for responsive menu
     */
    Mazzer.prototype.initCForm = function() {
        
        if( $('.mazzer-contact-form').length === 0 )
            return false;
            
        
        $( "#mazzer-cform" ).on( "submit", function( e ) {

            //Stop form submission & check the validation
            e.preventDefault();
            
            
            // Variable declaration
            var error       = false,
                $self       = $(this),
                name          = $('#mazzer-cf-name'),
                email         = $('#mazzer-cf-email'),
                mail_fail     = $('#mail_fail'),
                mail_success  = $('#mail_success');
            
            // Form field validation
            if(name.val().length <= 1){
                var error = true;
                name.parent().addClass('filed_error');
            }else{
                name.parent().removeClass('filed_error');
            }
            if(email.val().length <= 6 || $.Mazzer.validateEmail( email.val() ) == false || email.val().indexOf('@') == '-1'){
                var error = true;
                email.parent().addClass('filed_error');
            }else{
                email.parent().removeClass('filed_error');
            }
            if (error == true) {
                $(mail_success).fadeOut(500);
                $(mail_fail).slideDown(800);
            };
            
            // If there is no validation error, next to process the mail function
            if(error == false){
            
                $(mail_success).slideUp();
                $(mail_fail).slideUp();
                $.ajax({
                url: $(this).attr('action'),
                data: $(this).serialize(),
                type: 'POST',
                beforeSend: function(){
                    $self.find('.form_loader').addClass("mcform_submitting");
                },
                success: function( response ) {
                    if ( response ) {
                        $(mail_fail).fadeOut(500);
                        $(mail_success).slideDown(800);
                        $('.mazzer-input-item input:not([type="submit"]), .mazzer-input-item textarea').val('');
                        $('.filed_error').removeClass('filed_error');
                        $('.filed_ok').removeClass('filed_ok');

                        $self.find('.form_loader').removeClass("mcform_submitting");
                    } else {
                        $(mail_success).fadeOut(500);
                        $(mail_fail).slideDown(800);

                        $self.find('.form_loader').removeClass("mcform_submitting");
                    }
                },
                error: function() {
                    $(mail_success).fadeOut(500);
                    $(mail_fail).slideDown(800);
                    $self.find('.form_loader').removeClass("mcform_submitting");
                }
                });
            
            }
            });
    }

    /** 
     * Mazzer.
     * @function initMenuScroll
     * @description init click smoothscroll on menu item
     */
    Mazzer.prototype.initMenuScroll = function() {
        if( !this.defaults.singlePageScroll )
            return false;
            
        var $header_menu_link = $('.mazzer_nav_wrapper');
        $header_menu_link.on('click', 'a:not(.meanmenu-reveal)', function(e){
            
            var url = $(this).attr("href");
            var href = url.substring(url.indexOf('#')+1),
                href = '#'+href,
                offset = - 72;

            if (/#/.test(this.href)) {
                if ( $(href).length ) {
                    var offsetTop = href === "#" ? 0 : $(href).offset().top;
                    if( href == "#mazzer-video" && $("#mazzer-video").length > 0 ) {
                        offsetTop = offsetTop + 1;
                    } else {
                        offsetTop = offsetTop - 72;
                    }
                    $('body , html').stop().animate({
                        scrollTop: offsetTop,
                    }, 500);

                    if( $('.meanmenu-reveal').length > 0 && $('.meanmenu-reveal').hasClass('meanclose') ) {
                        setTimeout(function(){
                            $('.meanmenu-reveal').trigger('click');
                        }, 500);
                    }
                    e.preventDefault();
                    return false;
                }
            }
        });
    }

    /** 
     * Mazzer.
     * @function initMaginificVideo
     * @description init magnific popup video
     */
    Mazzer.prototype.initMaginificVideo = function(context) {

        $.fn.magnificPopup && $(".popup-youtube", context).magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade'
        });
    }

    /** 
     * Mazzer.
     * @function initCounter
     * @description init counter on scroll
     */
    Mazzer.prototype.initCounter = function() {

        var counter = $('#counter');
        if(counter.length){
            var a = 0;
            $(window).scroll(function() {

                var oTop = $(counter).offset().top - window.innerHeight;
                if (a == 0 && $(window).scrollTop() > oTop) {
                $('.counter-result').each(function() {
                    var $this = $(this),
                        countTo = $this.attr('data-percentage');
                    $({
                    countNum: $this.text()
                    }).animate({
                        countNum: countTo
                    },
                    {
                        duration: 4000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                        }
                    });
                });
                a = 1;
                }

            });
        }
    }

    /** 
     * Mazzer.
     * @function initGeneral
     * @description general event and functionality js initial
     */
    Mazzer.prototype.initGeneral = function(context) {

        $('.mazzer-default-btn').on("click", function(e){
            e.preventDefault();

            var target = $(this.getAttribute('href'));
                
            $('body , html').animate({
                scrollTop: target.offset().top-72,
            }, 700);

            return false;
        });
    }

    /** 
     * Mazzer.
     * @function initStickyMenu
     * @description general event and functionality js initial
     */
    Mazzer.prototype.initStickyMenu = function() {

        if( !this.defaults.enableStickyMenu )
            return false;

        var header_wrap = $('.mazzer-header-area');
        if( header_wrap.length === 0 || $('.mazzer-video-area').length === 0 ) 
            return false;

        var stickyHeaderTop = $('.mazzer-video-area').offset().top,
            menuHeight = header_wrap.outerHeight(),
            lastScrollTop = 0;
        $(window).on('scroll', function(){
            var st = $(this).scrollTop();
            if (st > lastScrollTop){
                header_wrap.removeClass('header-hide');
            }
            if( $(window).scrollTop() > menuHeight ) {
                header_wrap.addClass('header-scroll');
            } else {
                header_wrap.removeClass('header-scroll');
                if (st < lastScrollTop){
                    header_wrap.removeClass('header-hide');
                }
            }
            if( $(window).scrollTop() > stickyHeaderTop ) {
                header_wrap.addClass('header-show');
                if (st < lastScrollTop && st <= (stickyHeaderTop+120)){
                    header_wrap.addClass('header-hide');
                }
            } else {
                header_wrap.removeClass('header-show');
            }
            lastScrollTop = st;
        });
     
    }

    /** 
     * Mazzer.
     * @function initScrollr
     * @description scrollr plugin initialize
     */
    Mazzer.prototype.initScrollr = function() {

        if( typeof skrollr === "undefined" )
            return;

        var mySkrollr = skrollr.init({
            forceHeight: false,
            easings: {
                easeOutBack: function (p, s) {
                    s = 1.70158;
                    p = p - 1;
                    return (p * p * ((s + 1) * p + s) + 1);
                }
            },
            mobileCheck: function() {
                //hack - forces mobile version to be off
                return false;
            }
        });
     
    }

  

  /** 
   * Mazzer.
   * @function init
   * @description initial
   */
  Mazzer.prototype.init = function() {

      this.initMoJs();
      this.initLoader();
      this.initResponsiveMenu();
      this.initMaginificVideo();
      this.initCounter();
      this.initGeneral();
      this.initReady();
      this.initScrollr();
      this.initCForm();

  }

  $.Mazzer = new Mazzer();
  $.Mazzer.Constructor = Mazzer;
  window.Mazzer = $.Mazzer;


})(window.jQuery);



(function($) {
  'use strict';
  $.Mazzer.init();
})(window.jQuery);

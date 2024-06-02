/**
 * Carousel.....
 * @version 0.0.6
 * @author Ji Hoon Kang
 *
 * @note support IE8, IE9
 * @note modify duration, interval logic
 **/
(function( $ ){
    var slice = Array.prototype.slice;

    function Carousel( element, options ){
        this.element = $(element);
        this.settings = $.extend(true, {}, Carousel.Defaults, options);

        this._init();
    };
    var visibilityChangeEvents = ['visibilitychange', 'msvisibilitychange', 'webkitvisibilitychange', 'mozvisibilitychange'];
    var docHidden, visibilityChange;
    $.each(['hidden', 'msHidden', 'webkitHidden', 'mozHidden'], function(i, v){
        if( typeof document[v] !== 'undefined' ){
            docHidden = v;
            visibilityChange = visibilityChangeEvents[i];
            return false;
        }
    });

    $.extend(Carousel, {

        Defaults : {
            animation : 'slide',
            items : false,
            nav : true,
            dots : true,
            autoHeight : false,
            autoPlay : false,
            interval : 3000,
            direction : 'next',

            /* default duration is 1s */
            duration : 1000,
        },
        Animations : {},
        prototype : {
            _init : function(){
                this.cssAnimations = Modernizr.cssanimations || false;
                this.cssTransforms = Modernizr.csstransforms || false;
                this.animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                this.playInterval = null;
                this.paused = false;
                this.stoped = false;
                this.changedDuration = false;
                this.element.addClass('carousel');

                if( this.element.find('>.carousel-inner').size() == 0 ){
                    this.element.wrapInner('<div class="carousel-inner">');
                }
                this.innerElement = this.element.find('>.carousel-inner');

                this.items = this._getItems();
                this.items.addClass('carousel-items');
                this.itemCount = this.items.size();

                this._setDuration();

                var index = this._getActiveIndex();
                index < 0 && (index = 0);

                var active = this.items.eq(index).addClass('active');

                if( this.element.find('.carousel-nav').size() == 0 ){
                    this.element.append('<div class="carousel-nav">');
                    this.element.find('.carousel-nav').html( '<a class="nav-prev"><span>prev</span></a>'
                                                           + '<a class="nav-next"><span>next</span></a>' );
                }
                this._toggleNav();

                if( this.element.find('.carousel-dots').size() == 0 ){
                    this.element.append('<ol class="carousel-dots">');
                    this._createDot();
                }

                var dotsContainer = this.element.find('.carousel-dots');

                this.playButton = dotsContainer.find('.play').addClass('hide');
                this.stopButton = dotsContainer.find('.stop').addClass('hide');
                if( this.settings.autoPlay ){
                    this.stopButton.removeClass('hide');
                } else {
                    //this.playButton.show();
                }

                this._updateDot(index);

                this._toggleDots();

                this._setupEvent();

                this._play();
            },
            _setupEvent : function(){
                if( this.settings.autoPlay ){
                    this.element.hover($.proxy(this._pause, this), $.proxy(this._play, this));
                }

                this.element.find('.carousel-nav').on('click', '.nav-prev', $.proxy(this.prev, this))
                                                  .on('click', '.nav-next', $.proxy(this.next, this));

                this.element.find('.carousel-dots').on('click', 'li', $.proxy(function(event){

                    var target = $(event.currentTarget),
                        dotWrap = target.parent(),
                        index = dotWrap.children().index(target);

                    if( target.hasClass('stop') ){
                        this.stop();
                    } else if( target.hasClass('play') ){
                        this.play();
                    } else {
                        this.current( index );
                    }
                }, this));

                if( docHidden ){
                    $(document).on(visibilityChange, $.proxy(function(){
                        if( document[docHidden] ){
                            this.pause();
                        } else {
                            this.play();
                        }
                    }, this));
                }
            },
            _getItems : function(){
                if( !this.settings.items ){
                    return this.innerElement.children();
                } else if( typeof this.settings.items == 'string' ){
                    return this.innerElement.find(this.settings.items);
                }
                return [];
            },
            _getActive : function(){
                var active = this.items.filter('.active');

                return active.size() == 0 ? false : active;
            },
            _getActiveIndex : function(){
                var active = this._getActive();
                if( !active ){ return -1; }

                return this.items.index(active);
            },
            _createDot : function(){
                var dotsWrap = this.element.find('.carousel-dots'),
                    len = this.itemCount;

                dotsWrap.empty();
                for( var i = 0; i < len; ++i ){
                    dotsWrap.append('<li><span>0' + (i + 1) + '</span></li>');
                }
                dotsWrap.append('<li class="stop"><span>stop</span></li><li class="play"><span>play</span></li>');
            },
            _updateDot : function(index){
                var dots = this.element.find('.carousel-dots > li'),
                    index = index == undefined ? this._getActiveIndex() : index;

                dots.filter('.active').removeClass('active');
                dots.eq(index).addClass('active');
            },
            _refresh : function(){
                this.items = this._getItems();
                this.items.addClass('carousel-items');

                //if( this.itemCount == this.items.size() ) return;
                this.itemCount = this.items.size();

                this._setDuration();
                this._createDot();
                this._updateDot();

                var dotsContainer = this.element.find('.carousel-dots');

                this.playButton = dotsContainer.find('.play').addClass('hide');
                this.stopButton = dotsContainer.find('.stop').addClass('hide');
            },
            refresh : function(){
                this._refresh();

                var index = this._getActiveIndex();
                index < 0 && (index = 0);

                this.items.eq(index).addClass('active');
                this._updateDot( index );
            },
            _prev : function( event ){
                var index = this._getActiveIndex(),
                    target = this.items.eq( (index == 0 ? this.itemCount : index) - 1 );

                this._animate( 'prev', target );
            },
            prev : function( event ){
                this._prev();
                this._resetVideo( this._getActive() );
            },

            _next : function( event ){
                var index = this._getActiveIndex(),
                    target = this.items.eq( (index < this.itemCount - 1 ? index : -1) + 1 );

                this._animate( 'next', target );
            },
            next : function( event ){
                this._next();
                this._resetVideo( this._getActive() );
            },
            _resetVideo : function(activeSlide){
                if(!activeSlide) return;
                activeSlide.find('.video_responsive').children('').not('iframe').removeClass('hide');
                activeSlide.find('.video_responsive').children('iframe').remove();
            },

            current : function( index ){

                this._current( index );
            },

            _current : function( index ){
                var activeIndex = this._getActiveIndex(),
                    target = this.items.eq( index ),
                    direction;

                if( target.size() == 0 || index == activeIndex ){
                    return false;
                } else if( index < activeIndex ){
                    direction = 'prev';
                } else {
                    direction = 'next';
                }
                this._animate( direction, target );
            },

            _animate : function( direction, target ){
                var active = this._getActive(),
                    isPlaying = this.playInterval,
                    direction = direction || 'next',
                    animation = Carousel.Animations[ this.settings.animation ] || 'slide';
                isPlaying && this._pause();

                if( !animation ){
                    throw 'Non-existent animation';
                }
                if( !animation.apply(this, [active, target, direction]) ) return;

                this._updateDot( this.items.index( target ) );
                isPlaying && this._play();
            },
            _play : function( on ){
                var on = on || this.settings.autoPlay;

                if( !on ) return false;

                if( this.changedDuration ){
                    var duration = this.settings.duration;
                    this.cssAnimations && this.items.css('animation-duration', ( duration == 1000 ? '' : duration + 'ms' ));
                    this.changedDuration = false;
                }

                this.playInterval && clearInterval( this.playInterval );

                !this.paused && ( this.playInterval = setInterval( $.proxy(this[ this.settings.direction ], this), this.settings.duration + this.settings.interval  ) )

                //this.settings.interval && !this.paused && ( this.playInterval = setInterval( $.proxy(this[ this.settings.direction ], this), this.settings.interval ) );

            },
            play : function(){
                this.paused = false;
                this.playButton.addClass('hide');
                this.stopButton.removeClass('hide');
                this._play();
            },

            _pause : function(){
                //if( !this.settings.autoPlay ) return false;

                if( this.items.filter('.animated').size() > 0 ){
                    this.element.trigger(this.animationEnd);
                    this._play();
                }

                this.playInterval = clearInterval(this.playInterval);
            },
            pause : function(){
                this._pause();
            },
            option : function( name, val ){
                if( this.settings[name] === undefined ) return false;

                this.settings[name] = val;

                switch( name ){
                    case 'nav'       :   this._toggleNav( val );       break;
                    case 'dots'      :   this._toggleDots( val );      break;
                    case 'autoPlay'  :   this._toggleAutoPlay( val );  break;
                    case 'duration'  :   this._setDuration( val );     break;
                    //case 'autoPlay': this._toggleAutoPlay( bool ); break;
                }
            },
            stop : function(){
                this.playInterval = clearInterval(this.playInterval);
                this.paused = true;

                this.stopButton.addClass('hide');
                this.playButton.removeClass('hide');
            },
            _toggleNav : function( bool ){
                if(bool == undefined) bool = this.settings.nav;

                this.element.find('.carousel-nav').toggle(bool);
            },
            _toggleDots : function( bool ){
                if(bool == undefined) bool = this.settings.dots;

                this.element.find('.carousel-dots').toggle(bool);
            },
            _toggleAutoPlay : function( bool ){
                if(bool == undefined) bool = this.settings.autoPlay;
                var isPlaying = this.playInterval;

                //isPlaying && this._pause();

                if( bool ){
                    this.element.hover($.proxy(this._pause, this), $.proxy(this._play, this));
                    this.stopButton.removeClass('hide');
                    this._play( bool );
                } else {
                    this.playButton.addClass('hide');
                    this.stopButton.addClass('hide');
                    this._pause();
                    this.element.off('hover');
                }
                //this.settings.autoPlay = bool;
            },

            _setDuration : function(){
                var duration = parseInt(this.settings.duration || 1000);
                if( isNaN(duration) ) return false;
                this.changedDuration = true;
            },
            addItem : function( element ){
                !element.jquery && ( element = $(element) );

                this._pause();

                this.innerElement.append( element.addClass('carousel-items') );

                this._refresh();

                this._play();
            },
            removeItem : function( index ){
                if( this.itemCount == 1 ) return false;

                this._pause();
                var target = this.items.eq( index );
                if( target.hasClass('active') ){
                    if( target.prev().size() > 0 ){
                        target.prev().addClass('active');
                    } else {
                        target.next().addClass('active');
                    }
                }
                target.remove();

                this._refresh();

                this._play();

            },
            goAndStop : function(){},
        }
    });


    $.fn.carousel = function( options ){
        var isMethodCall = typeof options === "string",
            args = slice.call( arguments, 1 ),
            returnValue = this;


        this.each(function(){
            var instance = $.data(this, 'Carousel'),
                methodValue;

            if( !instance ){
                instance = $.data( this, 'Carousel', new Carousel(this, options) );
            }
            if( isMethodCall ){
                if ( !$.isFunction(instance[options]) || options.charAt(0) === "_" ) {
                    return $.error("no such method '" + options + "' for Carousel widget instance");
                }
                methodValue = instance[options].apply(instance, args);

                if ( methodValue !== instance && methodValue !== undefined ) {
                    returnValue = methodValue && methodValue.jquery
                                        ? returnValue.pushStack( methodValue.get() )
                                        : methodValue;
                    return false;
                }
            }
        });
        return returnValue;
    };

    $.fn.carousel.Constructor = Carousel;

}( jQuery ));

(function( $, Carousel ){
    /*
    Carousel.Constructor.Animations = {
        'slide' : { prev : 'slideRight', next : 'slideLeft' },
        'vslide' : { prev : 'slideUp', next : 'slideDown' },
        'fadeIn' : { prev : 'fadeIn', next : 'fadeIn', active : 'fadeOut' },
        'flipX' : { prev : 'flipInX', next : 'flipInX', active : 'none' },
        'flipY' : { prev : 'flipInY', next : 'flipInY', active : 'none' },
        'bounceIn' : { prev : 'bounceIn', next : 'bounceIn', active : 'bounceOutDown' },
        'bounce' : { prev : 'bounceRight', next : 'bounceLeft' },
        'vbounce' : { prev : 'bounceUp', next : 'bounceDown', active : 'none' },
        'rotate' : { prev : 'rotateInUpRight', next : 'rotateInDownRight' }, /* 보류
        'zoomIn' : { prev : 'zoomIn', next : 'zoomIn', active : 'none' },
        'zoom' : { prev : 'zoomInRight', next : 'zoomInLeft', active : 'none' },
        'vzoom' : { prev : 'zoomInUp', next : 'zoomInDown', active : 'fadeOut' },
    }
    */

    /**
     * default animation function
     **/
    function defaultAnimation( active, target, animationName, activeAnimationName ){

        /* target display none 일때 ios에서 animation이 실행안됨, 미리 display none 풀고 delay를 줌 */
        target.addClass('target');

        setTimeout( $.proxy(function(){
            active.addClass( ['animated', activeAnimationName].join(' ') )
                  .one(this.animationEnd, function( event ){
                        $(event.currentTarget).removeClass( [activeAnimationName, 'animated', 'active'].join(' ') );
                  });

            target.addClass(['animated', animationName].join(' ') )
                  .one(this.animationEnd, function( event ){
                        $(event.currentTarget).removeClass( [animationName, 'animated', 'target'].join(' ') )
                                              .addClass('active');

                        active.hasClass('none') && active.removeClass( [activeAnimationName, 'animated', 'active'].join(' ') );
                  });
        }, this));

        return true;
    }

    /**
     * Slide Animation
     *
     **/
    Carousel.Constructor.Animations.slide = function( active, target, direction ){
        var animation = { prev : 'slideRight', next : 'slideLeft' },
            animationName = animation[ direction ],
            activeAnimationName = (animation[ direction ] && animation['active']) || animationName
            animationDuration = this.settings.duration || 1000;

        if( this.items.filter('.animated').size() > 0 ) return false;

        if( this.cssAnimations ){
            defaultAnimation.apply(this, [active, target, animationName, activeAnimationName]);
        } else {

            var term = 0;
            var activeTerm = animationName == 'slideLeft' ? '-100%' : '100%';

            target.addClass('target');
            active.addClass(['animated', activeAnimationName].join(' '));//.css({'border-spacing' : 0});
            active.animate({ 'left' : activeTerm }, {
                duration : animationDuration,
                complete : function(){
                    $(this).removeClass( [activeAnimationName, 'animated', 'active'].join(' ') )
                           .removeAttr('style');
                }
            });

            target.addClass(['animated', animationName].join(' '));//.css({'border-spacing' : 0 });
            target.animate({ 'left' : 0 }, {
                duration : animationDuration,
                complete : function(){
                     $(this).removeClass( [animationName, 'animated', 'target'].join(' ') )
                            .removeAttr('style')
                            .addClass('active');

                     active.hasClass('none') && active.removeClass( [activeAnimationName, 'animated', 'active'].join(' ') );
                }
            });
        }
        return true;
    };

    /**
     * Verical Slide Animation
     *
     **/
    Carousel.Constructor.Animations.vslide = function( active, target, direction ){
        var animation = { prev : 'slideUp', next : 'slideDown' },
            animationName = animation[ direction ],
            activeAnimationName = (animation[ direction ] && animation['active']) || animationName,
            animationDuration = this.settings.duration || 1000;

        if( this.items.filter('.animated').size() > 0 ) return false;

        if( this.cssAnimations ){
            defaultAnimation.apply(this, [active, target, animationName, activeAnimationName]);
        } else {
            var activeTerm = animationName == 'slideUp' ? '-100%' : '100%';

            target.addClass('target');
            active.addClass(['animated', activeAnimationName].join(' '));
            active.animate({ 'top' : activeTerm }, {
                duration : animationDuration,
                complete : function(){
                    $(this).removeClass( [activeAnimationName, 'animated', 'active'].join(' ') )
                           .removeAttr('style');
                }
            });

            target.addClass(['animated', animationName].join(' '));
            target.animate({ 'top' : 0 }, {
                duration : animationDuration,
                complete : function(){
                     $(this).removeClass( [animationName, 'animated', 'target'].join(' ') )
                            .removeAttr('style')
                            .addClass('active');

                     active.hasClass('none') && active.removeClass( [activeAnimationName, 'animated', 'active'].join(' ') );
                }
            });
        }
        return true;
    };


    /**
     * Fade In Animation
     *
     **/
    Carousel.Constructor.Animations.fadeIn = function( active, target, direction ){
        var animation = { prev : 'fadeIn', next : 'fadeIn', active : 'fadeOut' },
            animationName = animation[ direction ],
            activeAnimationName = (animation[ direction ] && animation['active']) || animationName,
            animationDuration = this.settings.duration || 1000;

        if( this.items.filter('.animated').size() > 0 ) return false;

        if( this.cssAnimations ){
            defaultAnimation.apply(this, [active, target, animationName, activeAnimationName]);
        } else {
            var term = animationName == 'fadeIn' ? 1 : 0;
            var activeTerm = activeAnimationName == 'fadeIn' ? 1 : 0;

            target.addClass('target');
            active.addClass(['animated', activeAnimationName].join(' '));
            active.animate({ opacity : activeTerm }, {
                duration : animationDuration,
                complete : function(){
                    $(this).removeClass( [activeAnimationName, 'animated', 'active'].join(' ') )
                           .removeAttr('style');
                }
            });
            target.addClass(['animated', animationName].join(' '));
            target.animate({ opacity : term }, {
                duration : animationDuration,
                complete : function(){
                     $(this).removeClass( [animationName, 'animated', 'target'].join(' ') )
                            .removeAttr('style')
                            .addClass('active');

                     active.hasClass('none') && active.removeClass( [activeAnimationName, 'animated', 'active'].join(' ') );
                }
            });
        }
        return true;
    };

    /**
     * Flip X Animation
     *
     **/
    Carousel.Constructor.Animations.flipX = function( active, target, direction ){
        var animation = { prev : 'flipInX', next : 'flipInX', active : 'none' },
            animationName = animation[ direction ],
            activeAnimationName = (animation[ direction ] && animation['active']) || animationName,
            animationDuration = this.settings.duration || 1000;

        if( this.items.filter('.animated').size() > 0 ) return false;

        if( this.cssAnimations ){
            defaultAnimation.apply(this, [active, target, animationName, activeAnimationName]);
        } else {
            Carousel.Constructor.Animations.slide.apply(this, [active, target, direction]);
        }
        return true;
    };

    /**
     * Flip Y Animation
     *
     **/
    Carousel.Constructor.Animations.flipY = function( active, target, direction ){
        var animation = { prev : 'flipInY', next : 'flipInY', active : 'none' },
            animationName = animation[ direction ],
            activeAnimationName = (animation[ direction ] && animation['active']) || animationName,
            animationDuration = this.settings.duration || 1000;

        if( this.items.filter('.animated').size() > 0 ) return false;

        if( this.cssAnimations ){
            defaultAnimation.apply(this, [active, target, animationName, activeAnimationName]);
        } else {
            Carousel.Constructor.Animations.vslide.apply(this, [active, target, direction]);
        }
        return true;
    };

    /**
     * Bounce In Animation
     *
     **/
    Carousel.Constructor.Animations.bounceIn = function( active, target, direction ){
        var animation = { prev : 'bounceIn', next : 'bounceIn', active : 'bounceOutDown' },
            animationName = animation[ direction ],
            activeAnimationName = (animation[ direction ] && animation['active']) || animationName,
            animationDuration = this.settings.duration || 1000;

        if( this.items.filter('.animated').size() > 0 ) return false;

        if( this.cssAnimations ){
            defaultAnimation.apply(this, [active, target, animationName, activeAnimationName]);
        } else {

            target.addClass('target');
            active.addClass(['animated', activeAnimationName].join(' '));
            active.animate({ top : '100%' }, {
                duration : animationDuration,
                easing : 'easeOutBounce',
                complete : function(){
                    $(this).removeClass( [activeAnimationName, 'animated', 'active'].join(' ') )
                           .removeAttr('style');
                }
            });

            target.addClass(['animated', animationName].join(' ')).css('opacity', 0.9);
            target.animate({ opacity : 1 }, {
                step : function( now, fx ){
                    $(this).css('transform', 'scale(' + now + ')');
                },
                duration : animationDuration,
                easing : 'easeOutBounce',
                complete : function(){
                     $(this).removeClass( [animationName, 'animated', 'target'].join(' ') )
                            .removeAttr('style')
                            .addClass('active');

                     active.hasClass('none') && active.removeClass( [activeAnimationName, 'animated', 'active'].join(' ') );
                }
            });
        }
        return true;
    };

    /**
     * Bounce Animation
     *
     **/
    Carousel.Constructor.Animations.bounce = function( active, target, direction ){
        var animation = { prev : 'bounceRight', next : 'bounceLeft' },
            animationName = animation[ direction ],
            activeAnimationName = (animation[ direction ] && animation['active']) || animationName,
            animationDuration = this.settings.duration || 1000;

        if( this.items.filter('.animated').size() > 0 ) return false;

        if( this.cssAnimations ){
            defaultAnimation.apply(this, [active, target, animationName, activeAnimationName]);
        } else {
            //Carousel.Constructor.Animations.slide.apply(this, [active, target, direction]);


            var term = animationName == 'bounceLeft' ? '-100%' : '100%';

            target.addClass('target');
            active.addClass(['animated', activeAnimationName].join(' '));
            active.animate({ left : term }, {
                duration : animationDuration,
                    easing : 'easeInOutBack',
                complete : function(){
                    $(this).removeClass( [activeAnimationName, 'animated', 'active'].join(' ') )
                           .removeAttr('style');
                }
            });

            target.addClass(['animated', animationName].join(' '));
            target.animate({ left : 0 }, {
                duration : animationDuration,
                    easing : 'easeInOutBack',
                complete : function(){
                     $(this).removeClass( [animationName, 'animated', 'target'].join(' ') )
                            .removeAttr('style')
                            .addClass('active');

                     active.hasClass('none') && active.removeClass( [activeAnimationName, 'animated', 'active'].join(' ') );
                }
            });
        }
        return true;
    };


    /**
     * Vertical Bounce Animation
     *
     **/
    Carousel.Constructor.Animations.vbounce = function( active, target, direction ){
        var animation = { prev : 'bounceUp', next : 'bounceDown', active : 'none'  },
            animationName = animation[ direction ],
            activeAnimationName = (animation[ direction ] && animation['active']) || animationName,
            animationDuration = this.settings.duration || 1000;

        if( this.items.filter('.animated').size() > 0 ) return false;

        if( this.cssAnimations ){
            defaultAnimation.apply(this, [active, target, animationName, activeAnimationName]);
        } else if( !this.cssTransforms ){
            Carousel.Constructor.Animations.vslide.apply(this, [active, target, direction]);
        } else {

            var term = animationName == 'bounceUp' ? -100 : 100;

            target.addClass('target');
            active.addClass(['animated', activeAnimationName].join(' '));
            target.addClass(['animated', animationName].join(' ')).css({'opacity' : 0 });
            target.animate({ borderSpacing : term }, {
                step : function( now, fx ){
                    $(this).css({
                        'transform' : 'translate(0, ' + now + '%)',
                        'opacity' : Math.min(1, Math.max(0, Math.abs(now)/100))
                    });
                },
                duration : animationDuration,
                    easing : 'easeInOutBack',
                complete : function(){
                     $(this).removeClass( [animationName, 'animated', 'target'].join(' ') )
                            .removeAttr('style')
                            .addClass('active');

                     active.hasClass('none') && active.removeClass( [activeAnimationName, 'animated', 'active'].join(' ') );
                }
            });
        }
        return true;
    };

    /**
     * Zoom In Animation
     *
     **/
    Carousel.Constructor.Animations.zoomIn = function( active, target, direction ){
        var animation = { prev : 'zoomIn', next : 'zoomIn', active : 'none' },
            animationName = animation[ direction ],
            activeAnimationName = (animation[ direction ] && animation['active']) || animationName,
            animationDuration = this.settings.duration || 1000;

        if( this.items.filter('.animated').size() > 0 ) return false;

        if( this.cssAnimations ){
            defaultAnimation.apply(this, [active, target, animationName, activeAnimationName]);
        } else if( !this.cssTransforms ){
            Carousel.Constructor.Animations.fadeIn.apply(this, [active, target, direction]);
        } else {

            target.addClass('target');
            active.addClass(['animated', activeAnimationName].join(' '));

            target.addClass(['animated', animationName].join(' ')).css({'opacity' : 0 });
            target.animate({ opacity : 1 }, {
                step : function( now, fx ){
                    $(this).css('transform', 'scale(' + now + ')');
                },
                duration : animationDuration,
                /*easing : 'easeOutBounce',*/
                complete : function(){
                     $(this).removeClass( [animationName, 'animated', 'target'].join(' ') )
                            .removeAttr('style')
                            .addClass('active');

                     active.hasClass('none') && active.removeClass( [activeAnimationName, 'animated', 'active'].join(' ') );
                }
            });
        }
        return true;
    };

    /**
     * Zoom Animation
     *
     **/
    Carousel.Constructor.Animations.zoom = function( active, target, direction ){
        var animation = { prev : 'zoomInRight', next : 'zoomInLeft', active : 'none' },
            animationName = animation[ direction ],
            activeAnimationName = (animation[ direction ] && animation['active']) || animationName,
            animationDuration = this.settings.duration || 1000;

        if( this.items.filter('.animated').size() > 0 ) return false;

        if( this.cssAnimations ){
            defaultAnimation.apply(this, [active, target, animationName, activeAnimationName]);
        } else {
            //Carousel.Constructor.Animations.zoomIn.apply(this, [active, target, direction]);

            target.addClass('target');
            active.addClass(['animated', activeAnimationName].join(' '));

            target.addClass(['animated', animationName].join(' ')).css({'opacity' : 0});
            target.animate({ opacity : 1 }, {
                step : function( now, fx ){
                    $(this).css('transform', 'scale(' + now + ')');
                },
                duration : animationDuration,
                /*easing : 'easeOutBounce',*/
                complete : function(){
                     $(this).removeClass( [animationName, 'animated', 'target'].join(' ') )
                            .removeAttr('style')
                            .addClass('active');

                     active.hasClass('none') && active.removeClass( [activeAnimationName, 'animated', 'active'].join(' ') );
                }
            });
        }
        return true;
    };

    /**
     * Vertical Zoom Animation
     *
     **/
    Carousel.Constructor.Animations.vzoom = function( active, target, direction ){
        var animation = { prev : 'zoomInUp', next : 'zoomInDown', active : 'fadeOut' },
            animationName = animation[ direction ],
            activeAnimationName = (animation[ direction ] && animation['active']) || animationName,
            animationDuration = this.settings.duration || 1000;

        if( this.items.filter('.animated').size() > 0 ) return false;

        if( this.cssAnimations ){
            defaultAnimation.apply(this, [active, target, animationName, activeAnimationName]);
        } else {
            Carousel.Constructor.Animations.zoomIn.apply(this, [active, target, direction]);
        }
        return true;
    };
}( jQuery, jQuery.fn.carousel ));

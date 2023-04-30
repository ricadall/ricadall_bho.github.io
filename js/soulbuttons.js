var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

// initalize tracking of buttons
jQuery(document).on('soulsections2.readyOnce', function (e) {
    jQuery('.soulbuttons.soulbuttons-track').click(function (e) {
        // detect if ga is present
        if (typeof( ga ) == 'undefined' && typeof( __gaTracker ) == 'undefined') {
            return true;
        }
        // choose between ga and __gaTracker
        var tracker_var = 'ga';
        if (typeof( __gaTracker ) !== 'undefined') {
            tracker_var = '__gaTracker';
        }
        // get button name
        var button = jQuery(this).attr('data-ga');
        // send event to GAs
        window[tracker_var]('send', 'event', 'button', button);
    });
});

jQuery(window).load(function () {
    // preventDefault for hash links
    // jQuery('.soulbuttons.soulbuttons-prevent-default').off('click');
    jQuery('.soulbuttons.soulbuttons-prevent-default').each(function () {
        jQuery(this).click(function (e) {
            e.preventDefault();
        });
    });

    // unwrap
    jQuery('.soulbuttons.soulbuttons-unwrap').each(function () {
        if (jQuery(this).parent().is('p')) {
            jQuery(this).unwrap();
        }
    });

    // lightbox
    if (jQuery('.soulbuttons.video-lightbox').length > 0) {
        jQuery('.soulbuttons.video-lightbox').fancybox({

            width: '1920',
            height: '1080',
            closeClick: false,
            openEffect: 'none',
            closeEffect: 'none',
            smallBtn: true

        });
    }


    jQuery('.soulbuttons.soulbuttons-scrollto').off('click');

    // initalize scrollTo
    jQuery('.soulbuttons.soulbuttons-scrollto').click(function (e) {
        e.preventDefault();
        var el = jQuery(this);
        var dest = el.attr('href');
        if (jQuery(dest).length > 0) {
            TweenMax.to(window, el.data('scrollto-speed'), {
                scrollTo: {
                    y: dest,
                    offsetY: window.offsetByElementHeight,
                    //offsetY: window.offsetByElementHeight || el.data('scrollto-offset'),
                    autoKill: false
                },
                ease: Power4.easeOut
            });
            return false;
        } else {
            //console.log('Scroll Destination not found. Make sure you have an element with an ID that matches this link\'s href attribute.')
        }


    });

});

// initalize target effects for buttons
jQuery(document).on('soulsections2.readyOnce', function (e) {

    if ('undefined' === typeof( TweenMax )) {
        return false;
    }

    /* do not tween animations on builder */
    if (jQuery('.fl-builder-edit').length > 0) {
        return;
    }

    window.tweenspeed = .3;
    var soulbuttons_count = -1;
    jQuery('.soulbuttons[data-target]').each(function () {
        soulbuttons_count++;
        //console.log( 'offcanvas-count:' + soulbuttons_count );
        var data = {
            target: jQuery(jQuery(this).data('target')),
            effect: jQuery(this).data('effect'),
            no: soulbuttons_count,
        }
        SoulButtonTargetEffects[data.effect].init(data);
        jQuery(document).on('soulsections2.readyFront', null, data, SoulButtonTargetEffects[data.effect].start);
        jQuery(document).on('soulsections2.readyBuilder', null, data, SoulButtonTargetEffects[data.effect].end);
        jQuery(this).on('click', null, data, SoulButtonTargetEffects[data.effect].click);
    });
});

var SoulButtonTargetEffects = {
    'reveal': {
        init: function (data) {
	        //jQuery(data.target).appendTo('body');
            soulbuttons_backdrop_init();
            //soulbuttons_append_close_button(data.target, data.no, 'fadeInFromCenter');
            // set target clone CSS
            TweenMax.set(data.target, {
                //position: 'fixed',
                //top: '50%',
                //left: '50%',
                //x: '-50%',
                //y: '-50%',
                //zIndex: 993,
                autoAlpha: 0,
                height:0,
                force3D: true,
                backfaceVisibility: 'hidden'
            });
                        
            
        },
        end: function (e) {
            var data = e.data;
            jQuery('.soulbuttons-target-original-' + data.no).show();
        },
        start: function (e) {
            var data = e.data;
            jQuery('.soulbuttons-target-original-' + data.no).hide();
        },
        click: function (e) {
            var data = e.data;
            e.preventDefault();
            
            //if the target is closed
            if( !jQuery(data.target).hasClass('soulbuttons-open') ){
	            	            
	            //alert('target is closed.');
	            
	            soulbuttons_classes_add(data.no);
	            jQuery(data.target).addClass('soulbuttons-open');
	            
	            TweenMax.to(data.target, window.tweenspeed, {
	                autoAlpha: 1,
	                height: 'auto',
	                ease: Power4.easeOut,
	                force3D: true
	            });
	            
	        TweenMax.to(window, 1, {
                scrollTo: {
                    y: data.target,
                    offsetY: window.offsetByElementHeight,
                    //offsetY: window.offsetByElementHeight || el.data('scrollto-offset'),
                    autoKill: false
                },
                ease: Power4.easeOut
            });

	            
		            
	            /* fire soulmagic animations if they exist */
	            var soulsection = jQuery(data.target.selector).find('.ss-container');
	            var soulsection_class = soulsection.attr('class');
	            var class_match = soulsection_class.match(/soulmagic-timeline-.*/);
	            if (class_match != null) {
	                var class_name = class_match[0];
	                var timeline_slug = class_name.replace('soulmagic-timeline-', '');
	                var timeline_index = soulMagicFindTimelineFromSlug(timeline_slug);
	
	                if (timeline_index != null) {
	                    SoulMagics[timeline_index].timeline.play();
	                }
	            }
	            
            }else{
	            
           		//if the target is open
                soulbuttons_classes_remove(data.no);
	            jQuery(data.target).removeClass('soulbuttons-open');
	            
                TweenMax.to(data.target, window.tweenspeed, {
                    autoAlpha: 0,
                    height:0,
                    force3D: true,
                    onComplete:function(){
						jQuery(data.target).find('.ss-subsection').scrollTop(0);
                    }
                });
                
                
                /* reverse soulmagic tween if exists */
                if (class_match != null) {
                    if (timeline_index != null) {
                        SoulMagics[timeline_index].timeline.reverse();
                    }
                }
                
            }
            

        }
    },
    'fadeInFromCenter': {
        init: function (data) {
	        jQuery(data.target).appendTo('body').addClass('wost-parent');
            soulbuttons_backdrop_init();
            soulbuttons_append_close_button(data.target, data.no, 'fadeInFromCenter');
            // set target clone CSS
            TweenMax.set(data.target, {
                position: 'fixed',
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                zIndex: 993,
                autoAlpha: 0,
                force3D: true,
                backfaceVisibility: 'hidden'
            });
        },
        end: function (e) {
            var data = e.data;
            jQuery('.soulbuttons-target-original-' + data.no).show();
        },
        start: function (e) {
            var data = e.data;
            jQuery('.soulbuttons-target-original-' + data.no).hide();
        },
        click: function (e) {
            var data = e.data;
            e.preventDefault();
            soulbuttons_classes_add(data.no);
            soulbuttons_classes_noscroll();
            TweenMax.to('#soulbuttons-backdrop', window.tweenspeed, {
                autoAlpha: 1,
                force3D: true
            });

            TweenMax.to(data.target, window.tweenspeed, {
                autoAlpha: 1,
                ease: Power4.easeOut,
                force3D: true
            });

            /* fire soulmagic animations if they exist */
            var soulsection = jQuery(data.target.selector).find('.ss-container');
            var soulsection_class = soulsection.attr('class');
            var class_match = soulsection_class.match(/soulmagic-timeline-.*/);
            if (class_match != null) {
                var class_name = class_match[0];
                var timeline_slug = class_name.replace('soulmagic-timeline-', '');
                var timeline_index = soulMagicFindTimelineFromSlug(timeline_slug);

                if (timeline_index != null) {
                    SoulMagics[timeline_index].timeline.play();
                }
            }


            //make clicks on the overlay close everything
            jQuery('#soulbuttons-backdrop').click(function () {
                soulbuttons_classes_remove(data.no);
                soulbuttons_classes_allowscroll();
                TweenMax.to(jQuery(this), window.tweenspeed, {
                    autoAlpha: 0,
                    force3D: true
                });

                TweenMax.to(data.target, window.tweenspeed, {
                    autoAlpha: 0,
                    force3D: true,
                    onComplete:function(){
						jQuery(data.target).find('.ss-subsection').scrollTop(0);
                    }
                });
                

                /* reverse soulmagic tween if exists */
                if (class_match != null) {
                    if (timeline_index != null) {
                        SoulMagics[timeline_index].timeline.reverse();
                    }
                }
            });
        }
    },
    'fadeInAndScaleFromCenter': {
        init: function (data) {
	        jQuery(data.target).appendTo('body').addClass('wost-parent');

            soulbuttons_backdrop_init();
            soulbuttons_append_close_button(data.target, data.no, 'fadeInAndScaleFromCenter');
            // set target clone CSS
            TweenMax.set(data.target, {
                position: 'fixed',
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                zIndex: 993,
                autoAlpha: 0,
                scale: .8,
                force3D: true,
                backfaceVisibility: 'hidden'
            });
        },
        end: function (e) {
            var data = e.data;
            jQuery('.soulbuttons-target-original-' + data.no).show();
        },
        start: function (e) {
            var data = e.data;
            jQuery('.soulbuttons-target-original-' + data.no).hide();
        },
        click: function (e) {
            var data = e.data;
            e.preventDefault();
            soulbuttons_classes_add(data.no);
            soulbuttons_classes_noscroll();

            TweenMax.to('#soulbuttons-backdrop', window.tweenspeed, {
                autoAlpha: 1,
                force3D: true
            });
            TweenMax.to(data.target, window.tweenspeed, {
                autoAlpha: 1,
                scale: 1,
                ease: Power4.easeOut,
                force3D: true
            });

            /* fire soulmagic animations if they exist */
            var soulsection = jQuery(data.target.selector).find('.ss-container');
            var soulsection_class = soulsection.attr('class');
            var class_match = soulsection_class.match(/soulmagic-timeline-.*/);
            if (class_match != null) {
                var class_name = class_match[0];
                var timeline_slug = class_name.replace('soulmagic-timeline-', '');
                var timeline_index = soulMagicFindTimelineFromSlug(timeline_slug);

                if (timeline_index != null) {
                    SoulMagics[timeline_index].timeline.play();
                }
            }


            //make clicks on the overlay close everything
            jQuery('#soulbuttons-backdrop').click(function () {
                soulbuttons_classes_remove(data.no);
                soulbuttons_classes_allowscroll();
                TweenMax.to(jQuery(this), window.tweenspeed, {
                    autoAlpha: 0,
                    force3D: true
                });

                TweenMax.to(data.target, window.tweenspeed, {
                    autoAlpha: 0,
                    scale: .8,
                    force3D: true,
                    onComplete:function(){
						jQuery(data.target).find('.ss-subsection').scrollTop(0);
                    }
                });
                

                /* reverse soulmagic tween if exists */
                if (class_match != null) {
                    if (timeline_index != null) {
                        SoulMagics[timeline_index].timeline.reverse();
                    }
                }
            });
        }
    },
    
    'fadeInFromBottom': {
        init: function (data) {
	        jQuery(data.target).appendTo('body').addClass('wost-parent');

            soulbuttons_backdrop_init();
            soulbuttons_append_close_button(data.target, data.no, 'fadeInFromBottom');
            // set target clone CSS
            TweenMax.set(data.target, {
                position: 'fixed',
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-25%',
                zIndex: 993,
                autoAlpha: 0,
                force3D: true,
                backfaceVisibility: 'hidden'
            });
        },
        end: function (e) {
            var data = e.data;
            jQuery('.soulbuttons-target-original-' + data.no).show();
        },
        start: function (e) {
            var data = e.data;
            jQuery('.soulbuttons-target-original-' + data.no).hide();
        },
        click: function (e) {
            var data = e.data;
            e.preventDefault();
            soulbuttons_classes_add(data.no);
            soulbuttons_classes_noscroll();
            var sbtl = new TimelineMax({delay: 0});

            //banner animation code (only 11 lines)

            sbtl.to('#soulbuttons-backdrop', window.tweenspeed, {
                    autoAlpha: 1,
                    force3D: true
                })
                .to('.soulbuttons-target-' + data.no, window.tweenspeed, {
                    autoAlpha: 1,
                    y: '-50%',
                    ease: Power4.easeOut,
                    force3D: true
                }, 0);


            /* fire soulmagic animations if they exist */
            var soulsection = jQuery(data.target.selector).find('.ss-container');
            var soulsection_class = soulsection.attr('class');
            var class_match = soulsection_class.match(/soulmagic-timeline-.*/);
            if (class_match != null) {
                var class_name = class_match[0];
                var timeline_slug = class_name.replace('soulmagic-timeline-', '');
                var timeline_index = soulMagicFindTimelineFromSlug(timeline_slug);

                if (timeline_index != null) {
                    SoulMagics[timeline_index].timeline.play();
                }
            }

            //make clicks on the overlay close everything
            jQuery('#soulbuttons-backdrop').click(function () {
                soulbuttons_classes_remove(data.no);
                soulbuttons_classes_allowscroll();
                TweenMax.to(jQuery(this), window.tweenspeed, {
                    autoAlpha: 0,
                    force3D: true
                });

                TweenMax.to(data.target, window.tweenspeed, {
                    autoAlpha: 0,
                    y: '-25%',
                    force3D: true
                });

                /* reverse soulmagic tween if exists */
                if (class_match != null) {
                    if (timeline_index != null) {
                        SoulMagics[timeline_index].timeline.reverse();
                    }
                }
            });
        }
    },
    'slideOverFromRight': {
        init: function (data) {
	        jQuery(data.target).appendTo('body').addClass('wost-parent');
            soulbuttons_backdrop_init();
            //console.log(data.target);
            soulbuttons_append_close_button(data.target, data.no, 'slideOverFromRight');
            // set target CSS
            TweenMax.set(data.target, {
                position: 'fixed',
                top: 0,
                right: 0,
                x: '100vw',
                zIndex: 993,
                autoAlpha: 0,
            });
        },
        end: function (e) {
            var data = e.data;
            //console.log( 'trigger effect end' );
            jQuery('.soulbuttons-target-original-' + data.no).show();
        },
        start: function (e) {
            var data = e.data;
            //console.log( 'trigger effect start' );
            jQuery('.soulbuttons-target-original-' + data.no).hide();
        },
        click: function (e) {
            var data = e.data;
            //console.log( data.no );
            e.preventDefault();
            soulbuttons_classes_add(data.no);
            soulbuttons_classes_noscroll();
            var soulbuttonstl = new TimelineMax();
            //fade the target and overlay in
            soulbuttonstl
                .to('#soulbuttons-backdrop', window.tweenspeed, {
                    autoAlpha: 1
                })
                .to(data.target, window.tweenspeed, {
                    autoAlpha: 1,
                    x: '0vw'
                }, '0');



            /* fire soulmagic animations if they exist */
            var soulsection = jQuery(data.target.selector).find('.ss-container');
            var soulsection_class = soulsection.attr('class');
            var class_match = soulsection_class.match(/soulmagic-timeline-.*/);
            if (class_match != null) {
                var class_name = class_match[0];
                var timeline_slug = class_name.replace('soulmagic-timeline-', '');
                var timeline_index = soulMagicFindTimelineFromSlug(timeline_slug);

                if (timeline_index != null) {
                    SoulMagics[timeline_index].timeline.play();
                }
            }

            jQuery('#soulbuttons-backdrop').click(function () {

                soulbuttons_classes_remove(data.no);
                soulbuttons_classes_allowscroll();

                TweenMax.to(jQuery(this), window.tweenspeed, {
                    autoAlpha: 0,
                    force3D: true
                });

                TweenMax.to(data.target, window.tweenspeed, {
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    x: '100vw',
                    zIndex: 993,
                    autoAlpha: 0,
                });

                /* reverse soulmagic tween if exists */
                if (class_match != null) {
                    if (timeline_index != null) {
                        SoulMagics[timeline_index].timeline.reverse();
                    }
                }
            });
        }
    },
};

var soulbuttons_classes_noscroll = function (no) {
    jQuery('html').addClass('soulbuttons-modal-open');
}

var soulbuttons_classes_allowscroll = function (no) {
    jQuery('html').removeClass('soulbuttons-modal-open');
}
var soulbuttons_classes_add = function (no) {
    jQuery('.soulbuttons-target-' + no).addClass('soulbuttons-open');
}
var soulbuttons_classes_remove = function (no) {
    jQuery('.soulbuttons-target-' + no).removeClass('soulbuttons-open');
}
var soulbuttons_append_close_button = function (target, no, effect) {


    target.prepend('<div class="closebutton soulbuttons-closebutton soulbuttons-closebutton-no-' + no + '" data-no="' + no + '">×</div>');

    jQuery('.soulbuttons-closebutton-no-' + no).click(function () {
        jQuery('#soulbuttons-backdrop').click();
    });

}
var soulbuttons_backdrop_init = function () {
    // if there aren't any overlays, add one.
    if (1 > jQuery('#soulbuttons-backdrop').size()) {
        //append the overlay to the body
        jQuery('body').append('<div id="soulbuttons-backdrop"></div>');
        //set overlay CSS
        TweenMax.set('#soulbuttons-backdrop', {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 992,
            backgroundColor: 'rgba(0,0,0,0.75)',
            autoAlpha: 0
        });
    }
    
    
    
}

function soulMagicFindTimelineFromSlug(slug) {

    var timeline_index = null;
    for (var index in SoulMagics) {
        if (SoulMagics[index].timeline_slug == slug) {
            var timeline_index = index;
        }
    }

    return timeline_index;

}


}
/*
     FILE ARCHIVED ON 03:38:12 Apr 18, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 06:00:21 Apr 17, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 493.874
  exclusion.robots: 0.107
  exclusion.robots.policy: 0.098
  cdx.remote: 0.048
  esindex: 0.007
  LoadShardBlock: 453.141 (3)
  PetaboxLoader3.datanode: 494.172 (5)
  load_resource: 133.506
  PetaboxLoader3.resolve: 44.869
  loaddict: 50.314
*/
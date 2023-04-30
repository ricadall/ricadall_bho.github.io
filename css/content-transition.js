
            jQuery(document).on("ready" ,function() {
                _soulmagic.trigger("smready" , SoulMagics);
            });
            jQuery(window).on("load" ,function() {
                _soulmagic.trigger("smload" , SoulMagics);
            });

            
                document.write("<style>body { opacity:0 } </style>");

                _soulmagic.add_action( "smload", function() {
                        jQuery("body").css("opacity", 1);
                }, 10 );

                
    /* create new scroll magic controller */
    var ScrollMagicController = new ScrollMagic.Controller();

    /* hook actions */
    _soulmagic.add_action( "smready", _soulmagic.revertSplitText , 10 );
    _soulmagic.add_action( "smload", _soulmagic.loadWaypoints , 50 );

    function SoulMagic_Waypoints( obj, no, args ) {
		SoulMagic_Base.call(this, obj, no, args);
	}

	function SoulMagic_Hover( obj, no, args ) {
		SoulMagic_Base.call(this, obj, no, args);

		jQuery( obj ).hover(
			function(){
				var no = jQuery( obj ).data( "soulmagic_no" );
				var timeline = SoulMagics[ no ].timeline;

				timeline.delay( parseFloat( SoulMagics[ no ].args.delay || 0 ) ).play().timeScale(1);

			}, function(){
				var no = jQuery( obj ).data( "soulmagic_no" );
				var timeline = SoulMagics[ no ].timeline;

				if( "1" !== SoulMagics[ no ].args.direction ) {
				    return;
				}

				timeline.reverse();

			}
		);
	}


	function SoulMagic_Waypoints( obj, no, args ) {
		SoulMagic_Base.call(this, obj, no, args);
	}

	function SoulMagic_ScrollMagic_Position_Calculator(position) {
	    /* get current viewport height */
	    var height = jQuery(window).height()

	    /* get pixel equivalence of percentage of viewport height */
	    var pixels = height*(position/100)

	    return pixels;
	}

	function SoulMagic_ScrollMagic( obj, no, args ) {


		SoulMagic_Base.call(this, obj, no, args);

        this.loadScrollMagic = function() {

            var no = jQuery( this.obj ).data( "soulmagic_no" );

            /* prepare offset */
            var offset = parseInt(this.args.scrollmagic_offset) / 100;

            /* setup scene params */
            var scene_options = {}
            scene_options.triggerElement = this.obj;
            scene_options.reverse = this.args.direction;
            scene_options.triggerHook = offset;

            /* calculate duration */
            var duration = this.args.scrollmagic_duration;
            switch(this.args.scrollmagic_spread_units) {
                case "percentage":
                    duration = SoulMagic_ScrollMagic_Position_Calculator(duration)
                    break
            }
            scene_options.duration = duration;

            /* initiate scene */
            var scene = new ScrollMagic.Scene(scene_options);

            /* set scene timeline */
            scene.setTween(SoulMagics[ this.no ].timeline);

            /* inititate debug mode */
            if (this.args.scrollmagic_debug) {
                scene.addIndicators({name: "ScrollMagic Target"})
            }

            /* add scene to controller */
            scene.addTo(ScrollMagicController);

            SoulMagics[ this.no ].timeline.delay( parseFloat( this.args.delay || 0 ) ).play();
        }

        _soulmagic.add_action( "smload", this.loadScrollMagic , 20 , this);
	}

    function SoulMagic_Flickity_Get_State( timeline, slide ) {
        return SoulMagics[timeline].flickityIsTransitioning[slide];
    }

	function SoulMagic_Flickity( obj, no, args, ev ) {

		args.load_base = false;
        this.obj = obj;
        this.args = args;
        this.steps = args.steps;
        this.no = no;
        this.timeline_slug = args.timeline_slug;
        this.flickityIsTransitioning = [];

		SoulMagic_Base.call(this, obj, no, args);

		this.load_flickity = function() {
            var timeline = this;

			SoulMagics[ timeline.no ].flickity = Flickity.data( timeline.obj );

            /* skip flickity when element notpresent */
            if (typeof SoulMagics[ timeline.no ].flickity == "undefined") {
                return;
            }

			SoulMagics[ timeline.no ].timeline = [];

			var count_slides = SoulMagics[ timeline.no ].flickity.slides.length;

			for ( var n = 0; n < count_slides; ++n ) {
				SoulMagics[ timeline.no ].timeline[ n ] = new TimelineMax( timeline.args.options );
				SoulMagics[ timeline.no ].timeline[ n ].stop();
				for ( var i in SoulMagics[ timeline.no ].steps ) {
					var step = SoulMagics[ timeline.no ].steps[ i ];
					var selector = jQuery( timeline.obj ).find( step.selector ).eq( n );

					if ( step.parent ) { selector = selector.parent(); }
					if ( step.advanced_effects == "stagger" ) {
						SoulMagics[ timeline.no ].timeline[ n ].staggerTo(
							selector,
							step.duration,
							step.to,
							step.stagger_interval,
							step.position
						);
					} else {
						SoulMagics[ timeline.no ].timeline[ n ].to(
							selector,
							step.duration,
							step.to,
							step.position
						);
					}
				}
			}

            /* create promise check for transition state */
            function checkState( no , slide ) {
                var promise = new Promise(function (resolve,reject) {
                    if (!SoulMagics[ no ].flickityIsTransitioning[slide] ) {
                        var data = {
                            timeline : no,
                            slide : slide
                        }
                        resolve(data)
                    } else {
                        reject();
                    }
                });
                return promise;
            }

            var present_slide = 0;
			jQuery( timeline.obj ).on( ev, function() {

				var current = SoulMagics[ timeline.no ].flickity.selectedIndex;
                present_slide = current;

				/* pull delay from SS if available else set reset delay to 1 */
                var reset_delay = jQuery(this).data("flickityfadespeed");
                reset_delay = (reset_delay) ? parseFloat(reset_delay) : 1;

                /* greensock delays not working after slide reset - work around here */
				setTimeout(function(no, current){
                    SoulMagics[ no ].flickityIsTransitioning[current] = true;
					SoulMagics[ no ].timeline[ current ].delay( parseFloat( SoulMagics[ no ].args.delay || 0 ) ).play().timeScale(1);

                    setTimeout(function( t_no , s_current) {

                        SoulMagics[ t_no ].flickityIsTransitioning[s_current] = false;

                    } , SoulMagics[ no ].timeline[ current ].duration() * 1000 ,  no, current);


				}, (SoulMagics[ timeline.no ].args.delay || 0), timeline.no, current);


				var count_slides = SoulMagics[ timeline.no ].flickity.slides.length;

				for ( var n = 0; n < count_slides; ++n ) {

					if ( current === n ) {
						continue;
					}

					setTimeout(function(no, n){
                        var i = 0;

                        if (present_slide != n) {
                            SoulMagics[ no ].timeline[ n ].restart(true, false).pause();
                        }

					}, reset_delay*1000 ,timeline.no, n);

				}
			})
			//jQuery( timeline.obj ).trigger( ev );
		}
		_soulmagic.add_action( "smload", this.load_flickity , 20 , this  );
	}

	function SoulMagic_Base( obj, no, args ) {
		this.obj = obj;
		this.args = args;
		this.steps = args.steps;
		this.no = no;
		this.timeline_slug = args.timeline_slug;
		this.split = [];

		if ( undefined === this.args.load_base ) {
			this.args.load_base = true;
		}
		if ( undefined === this.args.ready_base ) {
			this.args.ready_base = true;
		}

		jQuery( obj ).data( "soulmagic_no", this.no );

		/* set a special timeline indicator for waypoints */
		if (this.args.event == "waypoints") {
		    jQuery( obj ).data( "soulmagic_waypoint_no", this.no );
        }

        this.timeline = new TimelineMax( args.options );

		this.ready = function() {

			for ( var i in SoulMagics[ this.no ].steps ) {
				var step = SoulMagics[ this.no ].steps[ i ];

				var target = jQuery( this.obj ).find( step.selector );
				var target_parent = target.parent();

                /* set target for hover event with breakout enabled */
                if ( this.args.event == "hover" && this.args.hover_breakout == true ) {
                    target = step.selector_raw
                }

                /*check to make sure target exists */
                if (jQuery(target).length === 0) {
                    /**
                    console.log("event:" + this.args.event);
                    console.log("ready: step "+i+" target not detected");
                    console.log("args:");
                    console.log(this.args);
                    /**/

                    /* case 1 - no first step target found */
                    if (i==0) {
                        var next_step = parseInt(i)+parseInt(1);
                        if (typeof SoulMagics[ this.no ].steps[ next_step ] != "undefined") {
                            SoulMagics[ this.no ].steps[ next_step ].position = "0";
                        }
                    }

                    continue;
                }

                /* do nothing if splittext enabled  */
                if ( step.advanced_effects == "splittext" && typeof target != "undefined" ) {

				   //do nothing
				}
				/* set tween for everything else */
				else {
				    TweenMax.set( target, step.from );
				    TweenMax.set( target_parent, step.from_parent );
				}

			}
			SoulMagics[ this.no ].timeline.stop();
			return;
		}

		this.load = function() {

			for ( var i in SoulMagics[ this.no ].steps ) {
				var step = SoulMagics[ this.no ].steps[ i ];
				var selector = jQuery( this.obj ).find( step.selector );

				if ( step.parent ) { selector = selector.parent(); }

                 /* set new step target for hover event with breakout enabled */
                if ( this.args.event == "hover" && this.args.hover_breakout == true ) {
                    selector = step.selector_raw
                }

                 /*check to make sure target exists */
                if (jQuery(selector).length === 0) {
                    continue;
                }

                /* set timeline goal for splittext enabled effects */
				if ( step.advanced_effects == "splittext" ) {

                    var parse = step.splittext_parsing;
                    var splittext_stagger_default = (step.stagger_interval) ? step.stagger_interval : ".1";
                    var splittext_stagger = (step.splittext_stagger_interval) ? step.splittext_stagger_interval : splittext_stagger_default;

                    SoulMagics[ this.no ].split[i] = new SplitText(
                        selector,
                        {
                            type:parse ,
                            linesClass:"sm_split sm_line",
                            charsClass:"sm_split sm_char",
                            wordsClass:"sm_split sm_word"
                         }
                     );

                    if (SoulMagics[ this.no ].split[i].chars.length>0) {
                        TweenMax.set( selector.find(".sm_char"), step.from );
                        selector = selector.find( ".sm_char" );
                        SoulMagics[ this.no ].timeline.staggerTo(
                            selector,
                            step.duration,
                            step.to,
                            splittext_stagger,
                            step.position
                        );
                    }

                    if (SoulMagics[ this.no ].split[i].words.length>0) {
                        TweenMax.set( selector.find(".sm_word"), step.from );
                        selector = selector.find( ".sm_word" );
                        SoulMagics[ this.no ].timeline.staggerTo(
                            selector,
                            step.duration,
                            step.to,
                            splittext_stagger,
                            step.position
                        );
                    }

                    if (SoulMagics[ this.no ].split[i].lines.length>0) {
                        TweenMax.set( selector.find(".sm_line"), step.from );

                        /* Apply special CSS rule to target to help with inconsistent linebreaks */
                        //jQuery(target).css({ "white-space" : "nowrap"});

                        selector = selector.find( ".sm_line" );
                        SoulMagics[ this.no ].timeline.staggerTo(
                            selector,
                            step.duration,
                            step.to,
                            splittext_stagger,
                            step.position
                        );
                    }
				}
				/* play animation with stagger effects activated - checks for legacy stagger implementation */
				else if ( step.advanced_effects == "stagger" || ( !step.advanced_effects && step.stagger_legacy === "1") ) {

                    SoulMagics[ this.no ].timeline.staggerTo(
                        selector,
                        step.duration,
                        step.to,
                        step.stagger_interval,
                        step.position
                    );

				} else {
                    /* if BATS enabled set multiple duration by 100 to ensure it animates of the entire scroll course */
                    if (this.args.scrollmagic_spread_enable === "1") {
                        step.duration = parseInt(step.duration) * 100;
                    }

                    /* set to tween for timeline */
                    var tween = TweenMax.to(
                        selector,
                        step.duration,
                        step.to,
                        step.stagger_interval
                    );

                    SoulMagics[ this.no ].timeline.add(tween , step.position);

				}

			}
		}
		if ( args.ready_base ) {
		    _soulmagic.add_action( "smready", this.ready , 20 , this );
		}
		if ( args.load_base ) {
			_soulmagic.add_action( "smload", this.load , 20 ,  this );
		}
	}


	var SoulMagics = [];
	var SoulMagic_Count = 0;
	jQuery(function($){
		// timeline #3222
		jQuery('.soulmagic-timeline-3222,.soulmagic-timeline-home-px2').each(function(){
			SoulMagics[ SoulMagic_Count ] = new SoulMagic_ScrollMagic( this, SoulMagic_Count, {"id":3222,"timeline_slug":"home-px2","steps":[{"selector":".soulmagic-timeline-3222-step-1,.ss-foreground-image-container,.soulmagic-timeline-home-px2-step-1,.ss-foreground-image-container","selector_raw":".ss-foreground-image-container","from":[],"from_parent":[],"to":{"force3D":true,"ease":Power0.easeNone,"autoRound":false},"parent":false,"position":"=0","duration":"100","advanced_effects":"none","splittext_parsing":"lines","stagger_legacy":false,"stagger_interval":"","splittext_stagger_interval":".1"}],"event":"scrollmagic","trigger":".soulmagic-timeline-3222,.soulmagic-timeline-home-px2","direction":"1","offset":"100%","delay":"","hover_breakout":false,"options":[],"scrollmagic_debug":"","scrollmagic_offset":"100","scrollmagic_duration":"200","scrollmagic_spread_units":"percentage"} );
			SoulMagic_Count++;
		});
		// timeline #3178
		jQuery('.soulmagic-timeline-3178,.soulmagic-timeline-overlay-reveal').each(function(){
			SoulMagics[ SoulMagic_Count ] = new SoulMagic_ScrollMagic( this, SoulMagic_Count, {"id":3178,"timeline_slug":"overlay-reveal","steps":[{"selector":".soulmagic-timeline-3178-step-1,.ss-foreground-image-container,.soulmagic-timeline-overlay-reveal-step-1,.ss-foreground-image-container","selector_raw":".ss-foreground-image-container","from":[],"from_parent":[],"to":{"force3D":true,"ease":Power0.easeNone,"autoRound":false},"parent":false,"position":"=0","duration":"100","advanced_effects":"none","splittext_parsing":"lines","stagger_legacy":false,"stagger_interval":"","splittext_stagger_interval":".1"}],"event":"scrollmagic","trigger":".soulmagic-timeline-3178,.soulmagic-timeline-overlay-reveal","direction":"1","offset":"100%","delay":"","hover_breakout":false,"options":[],"scrollmagic_debug":"","scrollmagic_offset":"100","scrollmagic_duration":"200","scrollmagic_spread_units":"percentage"} );
			SoulMagic_Count++;
		});
		// timeline #3145
		jQuery('.soulmagic-timeline-3145,.soulmagic-timeline-carousel-changes').each(function(){
			SoulMagics[ SoulMagic_Count ] = new SoulMagic_Flickity( this, SoulMagic_Count, {"id":3145,"timeline_slug":"carousel-changes","steps":[{"selector":".soulmagic-timeline-3145-step-1,.ss-tagline-container,.soulmagic-timeline-carousel-changes-step-1,.ss-tagline-container","selector_raw":".ss-tagline-container","from":{"autoAlpha":0,"y":"25px","autoRound":false},"from_parent":[],"to":{"autoAlpha":1,"y":"0px","force3D":true,"ease":Power4.easeOut,"autoRound":false},"parent":false,"position":"=0","duration":"1","advanced_effects":"none","splittext_parsing":"lines","stagger_legacy":false,"stagger_interval":"","splittext_stagger_interval":".1"},{"selector":".soulmagic-timeline-3145-step-2,.ss-text-container,.soulmagic-timeline-carousel-changes-step-2,.ss-text-container","selector_raw":".ss-text-container","from":{"autoAlpha":0,"y":"25px","autoRound":false},"from_parent":[],"to":{"autoAlpha":1,"y":"0px","force3D":true,"ease":Power4.easeOut,"autoRound":false},"parent":false,"position":"-=0.8","duration":"1","advanced_effects":"none","splittext_parsing":"lines","stagger_legacy":false,"stagger_interval":"","splittext_stagger_interval":".1"}],"event":"flickity-select","trigger":".soulmagic-timeline-3145,.soulmagic-timeline-carousel-changes","direction":"","offset":"100%","delay":"","hover_breakout":false,"options":[]}, "select.flickity" );
			SoulMagic_Count++;
		});
		// timeline #3144
		jQuery('.soulmagic-timeline-3144,.soulmagic-timeline-four-fades-with-background-scale').each(function(){
			SoulMagics[ SoulMagic_Count ] = new SoulMagic_Waypoints( this, SoulMagic_Count, {"id":3144,"timeline_slug":"four-fades-with-background-scale","steps":[{"selector":".soulmagic-timeline-3144-step-1,.ss-title-container,.soulmagic-timeline-four-fades-with-background-scale-step-1,.ss-title-container","selector_raw":".ss-title-container","from":{"autoAlpha":0,"y":"25px","autoRound":false},"from_parent":[],"to":{"autoAlpha":1,"y":"0px","force3D":true,"ease":Power4.easeOut,"autoRound":false},"parent":false,"position":"0","duration":"1","advanced_effects":"none","splittext_parsing":"lines","stagger_legacy":false,"stagger_interval":"","splittext_stagger_interval":".1"},{"selector":".soulmagic-timeline-3144-step-2,.ss-tagline-container h2,.soulmagic-timeline-four-fades-with-background-scale-step-2,.ss-tagline-container h2","selector_raw":".ss-tagline-container h2","from":{"autoAlpha":0,"y":"25px","autoRound":false},"from_parent":[],"to":{"autoAlpha":1,"y":"0px","force3D":true,"ease":Power4.easeOut,"autoRound":false},"parent":false,"position":"-=0.8","duration":"1","advanced_effects":"splittext","splittext_parsing":"lines","stagger_legacy":false,"stagger_interval":"","splittext_stagger_interval":".1"},{"selector":".soulmagic-timeline-3144-step-3,.ss-text-container p,.soulmagic-timeline-four-fades-with-background-scale-step-3,.ss-text-container p","selector_raw":".ss-text-container p","from":{"autoAlpha":0,"y":"25px","autoRound":false},"from_parent":[],"to":{"autoAlpha":1,"y":"0px","force3D":true,"ease":Power4.easeOut,"autoRound":false},"parent":false,"position":"-=0.8","duration":"1","advanced_effects":"splittext","splittext_parsing":"lines","stagger_legacy":false,"stagger_interval":"","splittext_stagger_interval":".1"},{"selector":".soulmagic-timeline-3144-step-4,.ss-cta-container,.soulmagic-timeline-four-fades-with-background-scale-step-4,.ss-cta-container","selector_raw":".ss-cta-container","from":{"autoAlpha":0,"y":"25px","autoRound":false},"from_parent":[],"to":{"autoAlpha":1,"y":"0px","force3D":true,"ease":Power4.easeOut,"autoRound":false},"parent":false,"position":"-=0.8","duration":"1","advanced_effects":"none","splittext_parsing":"lines","stagger_legacy":false,"stagger_interval":"","splittext_stagger_interval":".1"},{"selector":".soulmagic-timeline-3144-step-5,.ss-background-container-inner,.soulmagic-timeline-four-fades-with-background-scale-step-5,.ss-background-container-inner","selector_raw":".ss-background-container-inner","from":{"scale":1.1,"autoRound":false},"from_parent":[],"to":{"scale":1,"force3D":true,"ease":Sine.easeOut,"autoRound":false},"parent":false,"position":"0","duration":"10","advanced_effects":"none","splittext_parsing":"lines","stagger_legacy":false,"stagger_interval":"","splittext_stagger_interval":".1"}],"event":"waypoints","trigger":".soulmagic-timeline-3144,.soulmagic-timeline-four-fades-with-background-scale","direction":"1","offset":"80%","delay":"","hover_breakout":false,"options":[]} );
			SoulMagic_Count++;
		});
		// timeline #3142
		jQuery('.soulmagic-timeline-3142,.soulmagic-timeline-partner-logos').each(function(){
			SoulMagics[ SoulMagic_Count ] = new SoulMagic_Waypoints( this, SoulMagic_Count, {"id":3142,"timeline_slug":"partner-logos","steps":[{"selector":".soulmagic-timeline-3142-step-1,.ss-subsection,.soulmagic-timeline-partner-logos-step-1,.ss-subsection","selector_raw":".ss-subsection","from":{"autoAlpha":0,"scale":0.95,"autoRound":false},"from_parent":[],"to":{"autoAlpha":1,"scale":1,"force3D":true,"ease":Power4.easeOut,"autoRound":false},"parent":false,"position":"=0","duration":"1.5","advanced_effects":"stagger","splittext_parsing":"lines","stagger_legacy":false,"stagger_interval":".1","splittext_stagger_interval":".1"}],"event":"waypoints","trigger":".soulmagic-timeline-3142,.soulmagic-timeline-partner-logos","direction":"1","offset":"80%","delay":".25","hover_breakout":false,"options":[]} );
			SoulMagic_Count++;
		});
		// timeline #3141
		jQuery('.soulmagic-timeline-3141,.soulmagic-timeline-pillars-text,.pillaz .ss-text-container').each(function(){
			SoulMagics[ SoulMagic_Count ] = new SoulMagic_Waypoints( this, SoulMagic_Count, {"id":3141,"timeline_slug":"pillars-text","steps":[{"selector":".soulmagic-timeline-3141-step-1,p,.soulmagic-timeline-pillars-text-step-1,p","selector_raw":"p","from":{"autoAlpha":0,"y":"25px","autoRound":false},"from_parent":[],"to":{"autoAlpha":1,"y":"0px","force3D":true,"ease":Power4.easeOut,"autoRound":false},"parent":false,"position":"=0","duration":"1","advanced_effects":"splittext","splittext_parsing":"lines","stagger_legacy":false,"stagger_interval":"","splittext_stagger_interval":".2"}],"event":"waypoints","trigger":".soulmagic-timeline-3141,.soulmagic-timeline-pillars-text,.pillaz .ss-text-container","direction":"1","offset":"110%","delay":"","hover_breakout":false,"options":[]} );
			SoulMagic_Count++;
		});
		// timeline #3138
		jQuery('.soulmagic-timeline-3138,.soulmagic-timeline-pillars-hover,.pillaz .ss-subsection').each(function(){
			SoulMagics[ SoulMagic_Count ] = new SoulMagic_Hover( this, SoulMagic_Count, {"id":3138,"timeline_slug":"pillars-hover","steps":[{"selector":".soulmagic-timeline-3138-step-1,.ss-background-container-inner,.soulmagic-timeline-pillars-hover-step-1,.ss-background-container-inner","selector_raw":".ss-background-container-inner","from":[],"from_parent":[],"to":{"force3D":true,"ease":Power4.easeOut,"autoRound":false},"parent":false,"position":"=0","duration":"2","advanced_effects":"none","splittext_parsing":"lines","stagger_legacy":false,"stagger_interval":"","splittext_stagger_interval":".1"},{"selector":".soulmagic-timeline-3138-step-2,.ss-background-overlay-container,.soulmagic-timeline-pillars-hover-step-2,.ss-background-overlay-container","selector_raw":".ss-background-overlay-container","from":[],"from_parent":[],"to":{"force3D":true,"ease":Power0.easeNone,"autoRound":false},"parent":false,"position":"0","duration":"1","advanced_effects":"none","splittext_parsing":"lines","stagger_legacy":false,"stagger_interval":"","splittext_stagger_interval":".1"}],"event":"hover","trigger":".soulmagic-timeline-3138,.soulmagic-timeline-pillars-hover,.pillaz .ss-subsection","direction":"1","offset":"100%","delay":"","hover_breakout":"","options":[]} );
			SoulMagic_Count++;
		});
		// timeline #3137
		jQuery('.soulmagic-timeline-3137,.soulmagic-timeline-pillars').each(function(){
			SoulMagics[ SoulMagic_Count ] = new SoulMagic_ScrollMagic( this, SoulMagic_Count, {"id":3137,"timeline_slug":"pillars","steps":[{"selector":".soulmagic-timeline-3137-step-1,.ss-subsection,.soulmagic-timeline-pillars-step-1,.ss-subsection","selector_raw":".ss-subsection","from":[],"from_parent":[],"to":{"force3D":true,"ease":Power0.easeNone,"autoRound":false},"parent":false,"position":"=0","duration":"200","advanced_effects":"stagger","splittext_parsing":"lines","stagger_legacy":false,"stagger_interval":"40","splittext_stagger_interval":".1"}],"event":"scrollmagic","trigger":".soulmagic-timeline-3137,.soulmagic-timeline-pillars","direction":"1","offset":"100%","delay":"","hover_breakout":false,"options":[],"scrollmagic_debug":"","scrollmagic_offset":"85","scrollmagic_duration":"60","scrollmagic_spread_units":"percentage"} );
			SoulMagic_Count++;
		});
	});

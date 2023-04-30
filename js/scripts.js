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

	jQuery.fn.reverse = [].reverse;

	jQuery(document).ready(function(){
		
	   
		//remove empty paragraphs
		jQuery('p:empty, br').remove();

		 
		 //jQuery('.soulscroller').appendTo('body');   


	});
		 
	
	jQuery(window).load(function(){
		
		jQuery('.person-popup').appendTo('body');
		
/*
		jQuery('a.popup-link').click(function(e){
			e.preventDefault();
			window.popupOpen = true;
			$this = jQuery(this);
			$thisSlug = $this.attr('data-slug');
			console.log($thisSlug);
			TweenMax.to('#soulbuttons-backdrop', 0, {autoAlpha:1});
			TweenMax.to($thisSlug, .25, {autoAlpha:1});
			jQuery('body').css('overflow-y','hidden');
		});
*/
		
/*
		jQuery('a.popup-link').one('click',function(e){
			e.preventDefault();
			window.popupOpen = true;
			$this = jQuery(this);
			$thisSlug = $this.attr('data-slug');
			console.log($thisSlug);
			TweenMax.to('#soulbuttons-backdrop', 0, {autoAlpha:1});
			TweenMax.to($thisSlug, .25, {autoAlpha:1});
			jQuery('body').css('overflow-y','hidden');
		});
*/

		
		jQuery('#soulbuttons-backdrop').click(function(){
			if(window.popupOpen == true){
			 TweenMax.to('#soulbuttons-backdrop', 0, {autoAlpha:0});
			 TweenMax.to($thisSlug, .25, {autoAlpha:0});
			}
			window.popupOpen = false;
			jQuery('body').css('overflow-y','visible');
		});
		
		jQuery('.closediv span').click(function(){
			jQuery('#soulbuttons-backdrop').trigger('click');
		});
		
/*
		jQuery('.person').on('click',function(){
			jQuery(this).find('a').trigger('click');
		});
*/
		
		jQuery('.person, .case-study').on('click',function(e){
			//jQuery(this).find('a').trigger('click');
			e.preventDefault();
			window.popupOpen = true;
			$this = jQuery(this);
			$thisSlug = $this.find('a').attr('data-slug');
			console.log($thisSlug);
			TweenMax.to('#soulbuttons-backdrop', 0, {autoAlpha:1});
			TweenMax.to($thisSlug, .25, {autoAlpha:1});
			jQuery('body').css('overflow-y','hidden');
			
		});

		

			
		
		
/*
		jQuery('.person').click(function(){
			jQuery(this).find('a').trigger('click');
		});
*/
		
		if(jQuery('.page-id-3293, .page-id-3342, .page-id-3275, .page-id-3208, .single-project').length > 0){
			jQuery('.header-row > div').addClass('scrolled');
		}
		
		jQuery('[data-href], [data-external-href]').click(function(e){
			e.preventDefault();
		    $thisHREF = jQuery(this).attr('data-href');
		    $thisExtHREF = jQuery(this).attr('data-external-href');
		    //console.log($thisHREF);
		    
		    if( jQuery(this).hasClass('press-releases') || jQuery(this).hasClass('in-the-news')){
			   window.open($thisExtHREF);
		    }else{
		 	   window.location.href = $thisHREF;
		    }
		    
		   
		});
		
			
	if(jQuery('.case-grid').length > 0){
		var mixer = mixitup('.case-grid .ss-container', {
		    animation: {
		        animateResizeTargets: true,
		        clampHeight: false,
		        effects: 'fade stagger(100ms)'
		    },
		    callbacks: {
		        onMixStart: function(state, futureState) {
		             TweenMax.to('.case-grid',.5, {autoAlpha:.9} );
		        },
		        onMixEnd: function(state, futureState) {
		             TweenMax.to('.case-grid',.5, {autoAlpha:1} );
		        }
		    }
		});	
	}
	

	
jQuery('.case-grid button').click(function(e){
    e.preventDefault();
    e.stopPropagation();
    $this = jQuery(this);
    $thisParentSub = $this.parents('.ss-subsection');
    $thisTextContainer = $thisParentSub.find('.ss-text-container');
    
    if($thisTextContainer.css('display') == 'none'){
        $this.text('Less')
    }else{
        $this.text('More ↓')
    }
    
    $thisTextContainer.slideToggle();

});		

jQuery('.case-grid .ss-subsection').click(function(){
	jQuery(this).find('button').click();
});	
			
			
			
					

	var scrollSelector = jQuery('.fl-row').filter(function(){
		return jQuery(this).outerHeight() != 0;
	});
	
	//console.log(scrollSelector);

	window.scrollSections = [];
	window.reverseScrollSections = [];

	scrollSelector.each(function(i){
		
		//cache this and assign vars
		$this = jQuery(this);		
        offsetTop = $this.offset().top;
        node = $this[0].dataset.node;
        height = $this.outerHeight();
	        
		//populate array	        
	    window.scrollSections[i] = {
	        offsetTop: Math.round(offsetTop),
	        node: node,
	        height: height
	    };
	})
	
	scrollSelector.reverse().each(function(i){
		
		//cache this and assign vars
		$this = jQuery(this);		
        offsetTop = $this.offset().top;
        node = $this[0].dataset.node;
        height = $this.outerHeight();
	        
		//populate array	        
	    window.reverseScrollSections[i] = {
	        offsetTop: Math.round(offsetTop),
	        node: node,
	        height: height
	    };
	})
	
	
	//console.log(window.reverseScrollSections);

	var scrollTween = function scrollTweenFunction(theIndex){
				TweenMax.to( window, .5, {
					
					scrollTo: {
						y: window.scrollSections[theIndex].offsetTop,
						offsetY: window.offsetByElementHeight,
						autoKill:false,
					},
					ease:Power4.easeOut
					
				});
	} 
	
	var reverseScrollTween = function reverseScrollTweenFunction(theIndex){
				TweenMax.to( window, .5, {
					
					scrollTo: {
						y: window.reverseScrollSections[theIndex].offsetTop,
						offsetY: window.offsetByElementHeight,
						autoKill:false,
					},
					ease:Power4.easeOut
					
				});
	} 
	
	window.onCanvasHeight = jQuery('.oncanvas .ss-container').outerHeight();
	
	
	jQuery('.soulscroller-down').click(function(e){
		
		e.preventDefault();
		
		
		
		//get the current scroll position		
		var windowScrollTop = Math.round(jQuery(window).scrollTop());
		//console.log(windowScrollTop);
		
		//loop through scrollSections and find the next section index
		jQuery(window.scrollSections).each(function(i){
			
/*
			console.log(this.offsetTop);
			console.log(windowScrollTop);
*/
			
			//if the scroll position matches a section, scroll the window to the following section (note the i+1)
			if(this.offsetTop == windowScrollTop || this.offsetTop == (windowScrollTop+window.onCanvasHeight)){
				console.log('match, scrolling to next section, index = '+(i+1));
				console.log('offsetTop ='+this.offsetTop);
				console.log('window scroll ='+windowScrollTop);
				
				scrollTween(i+1);
	
				return false;

				
			//if the scroll position is less than a section, scroll the window to that section.	
			}else if(this.offsetTop > windowScrollTop ){
				console.log('no match, scrolling to next section down, index = '+i);
				console.log('offsetTop ='+this.offsetTop);
				console.log('window scroll ='+windowScrollTop);
				
				scrollTween(i);

				return false;


			}
		});
		
	});
	
	jQuery('.soulscroller-up').click(function(e){
		
		e.preventDefault();
		
		//get the current scroll position
		var windowScrollTop = Math.round(jQuery(window).scrollTop());
		//console.log(windowScrollTop);
		
		if(windowScrollTop == 0){
			return false;
		}
		
		//loop through scrollSections and find the next section index
		jQuery(window.reverseScrollSections).each(function(i){
			
/*
			console.log(this.offsetTop);
			console.log(windowScrollTop);
*/
			
			//if the scroll position matches a section, scroll the window to the previous section (note the i-1)
			if(this.offsetTop == windowScrollTop || this.offsetTop == (windowScrollTop+window.onCanvasHeight)){
				console.log('match, scrolling to previous section, index = '+i);
				console.log('offsetTop ='+this.offsetTop);
				console.log('window scroll ='+windowScrollTop);
				
				reverseScrollTween(i+1);
	
				return false;

				
			//if the scroll position is more than a section, scroll the window to that section.	
			}else if(this.offsetTop < windowScrollTop ){
				console.log('no match, scrolling to next section up, index = '+i);
				console.log('offsetTop ='+this.offsetTop);
				console.log('window scroll ='+windowScrollTop);
				
				reverseScrollTween(i);

				return false;


			}
		});
		
	});







		
		

	
	});
	

	
	
	
	
	
	


}
/*
     FILE ARCHIVED ON 03:38:06 Apr 18, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 06:00:20 Apr 17, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 178.032
  exclusion.robots: 0.236
  exclusion.robots.policy: 0.223
  cdx.remote: 0.084
  esindex: 0.011
  LoadShardBlock: 146.516 (3)
  PetaboxLoader3.datanode: 88.63 (5)
  PetaboxLoader3.resolve: 112.104 (3)
  load_resource: 83.604
  loaddict: 37.805
*/
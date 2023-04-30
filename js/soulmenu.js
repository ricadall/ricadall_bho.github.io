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

jQuery(function($){



$(document).ready(function() {


	$('.soulmenu-style-horizontal').each(function(){

		$this = $(this);

		//make containers overflow visible
		if($this.find('.menu-item-has-children').length > 0){
			$this.parents('.ss-subsection, .ss-container').css('overflow','visible');
		}

	    // Add Submenu Toggle
	    $this.find('li.menu-item-has-children').each(function(i, el) {

	      var $li = $(el),
	          $a = $li.children('a');
	          //$submenuToggle = $('<span class="soulmenu-submenu-toggle"> <i class="fa fa-angle-down" aria-hidden="true"></i> </span>');
		      //$submenuToggle.appendTo( $a );

		  $a.click(function(e){
			  if('ontouchstart' in window){
				  e.preventDefault();

				  if($(this).parents('li').find('.sub-menu').hasClass('opened')){

					 $(this).parents('li').find('.sub-menu').removeClass('opened');

				  }else{

					 $(this).parents('li').find('.sub-menu').addClass('opened');

				  }
			  }
		  });
	    });
	});






  });

  	//delete FLBuilderLayout['_scrollToElementOnLinkClick'];


  $(window).load(function(){


	$window = $(window);



	$('.soulmenu a[href*="#"], .scrolltohref').off('click');
	
	$('.soulmenu a[href*="#"], .scrolltohref, .soulmenu-style-vertical a').click(function(e){

		

		if($(this).parent('li').hasClass('menu-item-has-children')){
 			  
				  e.preventDefault();

				  if($(this).parents('li').find('.sub-menu').hasClass('opened')){

					 $(this).parents('li').find('.sub-menu').removeClass('opened');

				  }else{

					 $(this).parents('li').find('.sub-menu').addClass('opened');

				  }
		    return false;
		}else{
			
			//kill/scrollto or visit
			
			console.log( $(this).attr('href').indexOf('#') );
			
			if($(this).attr('href').indexOf('#') >= 0){
				//href has hash, kill/scrollto
				if($(this).attr("href") == "#"){
					//kill
					//alert(2);
					return false;
				}else{
					//scroll
					//alert(3);
					e.preventDefault();
					$('#soulbuttons-backdrop').click();
					$('.soulmenu-style-horizontal ul').removeClass('opened');
			
				        var el = jQuery(this);
						var dest = el.attr( 'href' );
				
						if(jQuery(dest).length > 0){
							TweenMax.to( window, 1, {
								scrollTo: {
									y: dest,
									offsetY: window.offsetByElementHeight || el.data('scrollto-offset'),
									autoKill:false
								},
								ease:Power4.easeOut
							} );
							return false;
						}else{
							console.log('Scroll Destination not found. Make sure you have an element with an ID that matches this link\'s href attribute.')
						}
			
					return false;
				}
			}else{
				//go to link
			}
		}
	
	
	});

	jQuery(window).resize(function(){
		$firstToggleHeight = $('.soulmenu-style-vertical .menu-item-has-children:first').outerHeight();
		$('.soulmenu-style-vertical .soulmenu-submenu-toggle').css('height',$firstToggleHeight);

	});

  });


});


}
/*
     FILE ARCHIVED ON 03:39:11 Apr 18, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 06:00:24 Apr 17, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 64.436
  exclusion.robots: 0.11
  exclusion.robots.policy: 0.1
  RedisCDXSource: 0.518
  esindex: 0.006
  LoadShardBlock: 40.211 (3)
  PetaboxLoader3.datanode: 186.483 (7)
  load_resource: 3748.18 (2)
  PetaboxLoader3.resolve: 3513.859 (2)
  loaddict: 118.396 (2)
*/
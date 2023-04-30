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


jQuery(function($){jQuery(document).ready(function(){jQuery('a:empty').remove();jQuery('[data-lazyload-foreground-image="true"] .ss-foreground-image-container').addClass('set-to-lazyload');window.controller=new ScrollMagic.Controller({refreshInterval:0});jQuery('[data-parent-column-override="true"]').parents('.fl-col').addClass('column-override');window.$soulsectionsVideos=jQuery('.ss-background-container video, .ss-foreground-image-container video');window.startingYBGvalue="-75%";window.endingYBGvalue="-25%";window.scaleBGValue=1.25;if(jQuery('.fl-builder-edit').length===0){jQuery('body').addClass('notinbuilder');jQuery('.soulcontainer').each(function(){$this=jQuery(this);$thisTarget=jQuery(this).attr('data-target');jQuery($thisTarget).appendTo($this);});TweenMax.set('[data-background-parallax="true"] > .ss-background-container, [data-background-parallax="true"] > .ss-subsection > .ss-background-container, [data-background-parallax="true"] > .ss-subsection > .ss-foreground-image-container > .ss-background-container',{"x":"-50%","y":window.startingYBGvalue,"scale":window.scaleBGValue});}});jQuery(window).load(function(){window.loadcps=function(){jQuery('[name="module_background_color"], [name="module_background_color"], [name="module_scrolled_background_color"], [name="soulmenu_link_color"], [name="soulmenu_sub_menu_background_color"]').spectrum({color:"rgba(0,0,0,0)",color:jQuery(this).attr('value'),showAlpha:true,preferredFormat:"rgb",showInput:true,showPalette:true,localStorageKey:"spectrum.homepage",allowEmpty:true});}
if(jQuery('.fl-builder-edit').length==0){jQuery('[data-pinfgic="true"]').each(function(){$this=jQuery(this);$thisFGIC=$this.find('.ss-foreground-image-container');$thisFGIC.css('top',window.offsetByElementHeight);})
jQuery('[data-subsection-url]').off().click(function(){$thisHREF=jQuery(this).attr('data-subsection-url');if(jQuery(this).attr('data-subsection-open-link-new-tab')=='true'){console.log($thisHREF);window.open($thisHREF);}else{window.location.href=$thisHREF;}
return false;});jQuery('[data-used-for-localnav="true"] .sub-menu a').click(function(){jQuery('.sub-menu').trigger('mouseleave').removeClass('opened');});jQuery('[data-subsection-url]').click(function(){if(jQuery(this).attr('data-subsection-open-link-new-tab')=='true'){window.open(jQuery(this).attr('data-subsection-url'),'_blank');}else{window.location.href=jQuery(this).attr('data-subsection-url');}});jQuery('[data-background-parallax="true"]').each(function(i){$triggerElement=jQuery(this);$parallaxElement=jQuery(this).find('.ss-background-container')||jQuery(this).children('.ss-background-container');console.log('offsettop = '+$triggerElement.offset().top);$parallaxDuration=jQuery(window).height()+$triggerElement.outerHeight();var tween=new TimelineMax();tween.to($parallaxElement,.0001,{"delay":0,"force3D":true,"ease":"Power0.easeNone","y":window.endingYBGvalue,"scale":window.scaleBGValue,});if($triggerElement.offset().top==0){$triggerHook='onCenter';console.log('onCenter');}else{$triggerHook='onEnter';}
new ScrollMagic.Scene({triggerElement:$triggerElement,triggerHook:$triggerHook,duration:$parallaxDuration+'px',reverse:true}).setTween(tween).addTo(window.controller)});jQuery('[data-foreground-parallax="true"] > .ss-subsection').each(function(i){$triggerElement=jQuery(this);$parallaxElement=jQuery('[data-foreground-parallax="true"] .ss-foreground-image-container').eq(i);$parallaxDuration=jQuery(window).height()+$triggerElement.outerHeight();var tween=new TimelineMax();tween.to($parallaxElement,.0001,{"delay":0,"force3D":true,"ease":"Power0.easeNone","y":window.endingYFGvalue,});if($triggerElement.offset().top==0){$triggerHook='onLeave';}else{$triggerHook='onEnter';}
new ScrollMagic.Scene({triggerElement:$triggerElement,triggerHook:'onEnter',duration:$parallaxDuration+'px',reverse:true}).setTween(tween).addTo(window.controller)});jQuery('[data-lazyload-background-image="true"] .ss-background-container-inner, [data-lazyload-foreground-image="true"] .ss-foreground-image-container img, .lazyloadme').addClass('lazied').Lazy({effect:'fadeIn',threshold:500,effectTime:500,scrollDirection:'vertical',afterLoad:function(element){element.parents('.ss-foreground-image-container').removeClass('set-to-lazyload');if(element.parents('.ss-container').attr('data-tabletfixed')=='true'){element.parents('.ss-foreground-image-container').css('background-image','url('+element.attr("src")+')');}},});}
jQuery(window).resize();if(window.$soulsectionsVideos.length>0){window.$soulsectionsVideos.each(function(i){video=window.$soulsectionsVideos.get(i);var isPlaying=video.currentTime>0&&!video.paused&&!video.ended&&video.readyState>2;if(!isPlaying){video.play();}});}});});jQuery(document).ready(function(){jQuery('.fl-node-5c9be92234180 .ss-container').addClass('');jQuery('.fl-node-5c9be92234180 .ss-core').addClass('');jQuery('.fl-node-5c9be92234180 .ss-foreground-image-container').addClass('');if(jQuery('.fl-builder-edit').length==0){jQuery('.fl-node-5c9be92234180').parents('.fl-row').css({'position':'fixed','width':'100%','z-index':'991','top':'0','left':'0','transition':'all .5s ease'});}
window.$carousel5c9be92234180=jQuery('.fl-node-5c9be92234180 [data-flickityme="true"]').flickity({selector:'.ss-subsection',wrapAround:true,cellAlign:'center',groupCells:1,draggable:false,freeScroll:false,prevNextButtons:true,pageDots:true,contain:true,pauseAutoPlayOnHover:false,selectedAttraction:0.2,friction:0.8});window.$carousel5c9be92234180.on('change.flickity',function(event,index){});window.$carousel5c9be92234180.on('settle.flickity',function(event,index){});jQuery('.fl-node-5c9be92234180').parents('.fl-row').css('background-color','rgb(255, 255, 255)');var waypoints=jQuery('body').waypoint(function(direction){if(direction=='up'){jQuery('.fl-node-5c9be92234180').parents('.fl-row').removeClass('scrolled');}else{jQuery('.fl-node-5c9be92234180').parents('.fl-row').addClass('scrolled');}},{offset:'-50px'})});jQuery(window).load(function(){if(!window.offsetByElementSelector){window.offsetByElementSelector='.offset-element';window.offsetByElementHeight=Math.max(jQuery(window.offsetByElementSelector).outerHeight(),jQuery(window.offsetByElementSelector).find('.fl-module-content').outerHeight());}
if(jQuery('.fl-builder-edit').length==0){jQuery(window).resize(function(){jQuery('').css('margin-top',jQuery('.fl-node-5c9be92234180 .ss-container').outerHeight());});}});jQuery(document).ready(function(){jQuery('.fl-node-5c9be92234181 .ss-container').addClass('');jQuery('.fl-node-5c9be92234181 .ss-core').addClass('');jQuery('.fl-node-5c9be92234181 .ss-foreground-image-container').addClass('');window.$carousel5c9be92234181=jQuery('.fl-node-5c9be92234181 [data-flickityme="true"]').flickity({selector:'.ss-subsection',wrapAround:true,cellAlign:'center',groupCells:1,draggable:false,freeScroll:false,prevNextButtons:true,pageDots:true,contain:true,pauseAutoPlayOnHover:false,selectedAttraction:0.2,friction:0.8});window.$carousel5c9be92234181.on('change.flickity',function(event,index){});window.$carousel5c9be92234181.on('settle.flickity',function(event,index){});});jQuery(window).load(function(){if(!window.offsetByElementSelector){window.offsetByElementSelector='.offset-element';window.offsetByElementHeight=Math.max(jQuery(window.offsetByElementSelector).outerHeight(),jQuery(window.offsetByElementSelector).find('.fl-module-content').outerHeight());}
if(jQuery('.fl-builder-edit').length==0){jQuery(window).resize(function(){jQuery('').css('margin-top',jQuery('.fl-node-5c9be92234181 .ss-container').outerHeight());});}});

}
/*
     FILE ARCHIVED ON 03:38:23 Apr 18, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 06:15:56 Apr 17, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 928.363
  exclusion.robots: 0.104
  exclusion.robots.policy: 0.092
  cdx.remote: 0.078
  esindex: 0.01
  LoadShardBlock: 884.242 (3)
  PetaboxLoader3.resolve: 1138.933 (4)
  PetaboxLoader3.datanode: 127.549 (5)
  load_resource: 394.031
  loaddict: 68.656
*/
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
	
	if( typeof FLBuilder != 'undefined' ){
		function compare(a,b) {
		  if(a.handle == 'columns')
		   	return -1;
		  if(a.type == 'separator')
		    return 1;
		  if (a.handle < b.handle)
		    return -1;
		  if (a.handle > b.handle)
		    return 1;
		  return 0;
		}
	
		if(FLBuilderConfig.panelData.tabs){
			FLBuilderConfig.panelData.tabs.rows.views.sort(compare);
		}
	
	}

	

	
	//console.log('trigger document.ready');
  jQuery(document).trigger('soulsections2.ready', jQuery );
  jQuery(document).trigger('soulsections2.readyOnce', jQuery );
  if( typeof FLBuilder != 'undefined' ){
		//console.log('trigger builder');
		jQuery(document).trigger( 'soulsections2.readyBuilder', jQuery );
    FLBuilder.addHook('endEditingSession', function(){
        //console.log('trigger frontend');
				jQuery(document).trigger( 'soulsections2.ready', jQuery );
        jQuery(document).trigger( 'soulsections2.readyFront', jQuery );
    });
    FLBuilder.addHook('restartEditingSession', function(){
        //console.log('trigger builder');
        jQuery(document).trigger( 'soulsections2.ready', jQuery );
        jQuery(document).trigger( 'soulsections2.readyBuilder', jQuery );
    });
  } else {
		//console.log('trigger frontend');
		jQuery(document).trigger( 'soulsections2.readyFront', jQuery );
	}
});


//BB1
// ONLY BUILDER
jQuery(function($){
		//PRESET REORDERING
		jQuery('.fl-builder-blocks-section-title:contains(.)').parents('.fl-builder-blocks-section').wrapAll('<div class="ss" style="display:none;"></div>');
		jQuery('.fl-builder-blocks-section-title:contains(.)').each(function(i){
			var text = jQuery(this).text();
			var number = parseInt(text, 10);
			jQuery(this).parents('.fl-builder-blocks-section').attr('data-number',number);
		});

		jQuery('.fl-builder-blocks-section-title:contains(.)').parents('.fl-builder-blocks-section').sort(function(a, b) {
		    return +a.dataset.number - +b.dataset.number;
		})
		.appendTo('.ss');

		jQuery('<div class="fl-builder-blocks-section" data-number="0"><span class="fl-builder-blocks-section-title fl-builder-blocks-section-gradiented">SoulSections Presets<i class="fa fa-chevron-down"></i></span></div>').insertBefore('.ss').click(function(){
			jQuery('.ss').toggle();
		});
		window.presetsReordered = true;
});


// GLOBAL SETTINGS
// BB1/BB2 mixed
// ONLY Builder



jQuery(window).load(function(){

jQuery('[data-tab="rows"]').click(function(){
    //alert(jQuery('[data-view="columns"]').length);
    
/*
    jQuery('[data-view*="2"]').insertAfter('[data-view*="1"]');
    jQuery('[data-view*="3"]').insertAfter('[data-view*="2"]');
    jQuery('[data-view*="3"]').insertAfter('[data-view*="2"]');
*/
    
/*
    		
		$builderHR = jQuery('[data-view="columns"]').next('hr');

		var $ssButtons = $builderHR.nextUntil('hr');
		$ssButtons.wrapAll('<div class="ss"/>');
	    	

    	setTimeout(function(){
			alert(1);
	    	$wrapper = jQuery('.ss');
	
			$wrapper.find('.fl-builder--menu-item').sort(function(a, b) {
			    return $(a).attr('data-view') - $(b).attr('data-view');
			}).appendTo($wrapper);
		
		},1000);
*/


    
});
    
    
		//PRESET REORDERING
		//jQuery('.fl-builder-blocks-section-title:contains(.)').parents('.fl-builder-blocks-section').wrapAll('<div class="ss" style="display:none;"></div>');
		

		
/*
		jQuery('.fl-builder-blocks-section-title:contains(.)').each(function(i){
			var text = jQuery(this).text();
			var number = parseInt(text, 10);
			jQuery(this).parents('.fl-builder-blocks-section').attr('data-number',number);
		});

		jQuery('.fl-builder-blocks-section-title:contains(.)').parents('.fl-builder-blocks-section').sort(function(a, b) {
		    return +a.dataset.number - +b.dataset.number;
		});
*/
		
		//.appendTo('.ss');    
    
    
});









jQuery(document).on( 'soulsections2.readyBuilder', soulsections2_global_settings_init );
function soulsections2_global_settings_init( e, $ ) {
	if(jQuery('.fl-builder-edit').length > 0){
	  SoulSections2Global = {
	      /**
	       * UABB Init Method for global setting
	       **/
	      _init: function()
	      {
	        SoulSections2Global._initGlobalButton();
	        SoulSections2Global._bindButtonEvents();
	      },

	      _initGlobalButton: function()
	      {
	        /* Global Setting */
	        FLBuilder.addHook( 'actions-lightbox-settings', function( e, settings ){

	          if ( 'fl-builder-tools-actions' == settings.className ) {
	            settings.buttons[ 46 ] = {
	              'key': 'soulsections2-global-settings',
	              'label': FLBuilderStrings.soulsectionsGlobalSettings
	            };
	          }

	        } );
	      },

	      _bindButtonEvents: function()
	      {
	        $('body').delegate('.fl-builder-soulsections2-global-settings-button', 'click', SoulSections2Global._globalSettingsClicked);
	        $('body').delegate('.fl-builder-soulsections2-global-settings .fl-builder-settings-save', 'click', SoulSections2Global._saveGlobalSettingsClicked);
	        //$('body').delegate('.fl-builder-soulsections2-global-settings .fl-builder-settings-cancel', 'click', SoulSections2Global._cancelGlobalSettingsClicked);
	      },

	      _globalSettingsClicked: function(){
	        FLBuilder._actionsLightbox.close();
	        FLBuilder._showLightbox();

	        FLBuilder.ajax({
	          action: 'render_soulsections2_global_settings'
	        }, SoulSections2Global._globalSettingsLoaded);
	      },
	      _globalSettingsLoaded: function(response)
	      {
	        var data = JSON.parse(response);
	        FLBuilder._setSettingsFormContent(data.html);
	      },

	      _saveGlobalSettingsClicked: function()
	      {
	        var form     = $(this).closest('.fl-builder-settings'),
	          valid    = form.validate().form(),
	          data     = form.serializeArray(),
	          settings = {},
	          i        = 0;

	        if(valid) {

	          for( ; i < data.length; i++) {
	            settings[data[i].name] = data[i].value;
	          }

	          FLBuilder.showAjaxLoader();
	          FLBuilder._layoutSettingsCSSCache = null;

	          FLBuilder.ajax({
	            action: 'save_soulsections2_global_settings',
	            settings: settings
	          }, function(){ soulsections2_global_settings_refresh(); FLBuilder._updateLayout; } );

	          FLBuilder._lightbox.close();
	        }
	      },

	      /*_cancelLayoutSettingsClicked: function()
	      {
	        var form = $( '.fl-builder-settings' );
	      }, */
	    }

    }


    if( typeof SoulSections2Global != 'undefined' ){
      //console.log('globalsettings');
      SoulSections2Global._init();
    }

		if( typeof FLBuilder != 'undefined' ){
			soulsections2_global_settings_refresh();
			FLBuilder.addHook('soulsectionsGlobalSettings', function(){
				var a = FLBuilderSettingsForms.render( {
					id        : 'soulsections2-global',
					className : 'fl-builder-soulsections2-global-settings',
					settings  : soulsections2_global_settings_data,
				}, function() {
					// FLBuilder._layoutSettingsInitCSS();
				} );
				FLBuilder.MainMenu.hide();
			});
		}
};
var soulsections2_global_settings_data = false;
var soulsections2_global_settings_refresh = function() {
	jQuery.get(
		ajaxurl,
		{action:'ss_get_global'},
		function(response){
			soulsections2_global_settings_data = response.data;
		}
	)
}


}
/*
     FILE ARCHIVED ON 03:38:16 Apr 18, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 06:00:20 Apr 17, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 62.703
  exclusion.robots: 0.117
  exclusion.robots.policy: 0.108
  RedisCDXSource: 0.549
  esindex: 0.008
  LoadShardBlock: 41.531 (3)
  PetaboxLoader3.datanode: 71.423 (5)
  load_resource: 246.044
  PetaboxLoader3.resolve: 200.559
  loaddict: 25.551
*/
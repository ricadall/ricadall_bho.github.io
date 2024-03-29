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

var wptDate = (function ($) {
    var _tempConditions,
		_tempField,
		is_datepicker_style_loaded = false;
    function init(parent, options) {
        if ($.isFunction($.fn.datepicker)) {
            $('input.js-wpt-date', $(parent)).each(function (index) {
                if (!$(this).hasClass('hasDatepicker')) {
                    if($(this).attr('id').indexOf('cred_form') != -1){
                        if(typeof(options) !== 'undefined' && options.hasOwnProperty('source') && options.source == 'cred_form_ready_init'){
                            wptDate.add($(this));
                        }
                    }else{
                        wptDate.add($(this));
                    }
                }else{
                    //Load the datepicker stylesheet if the field is already initialized
                    wptDate.maybeLoadDatepickerStyle();
                }
            });
        }

        $(document).on('click', '.js-wpt-date-clear', function () {
            var thiz = $(this), thiz_close, el, el_aux, el_select;
            if (thiz.closest('.js-wpt-field-item').length > 0) {
                thiz_close = thiz.closest('.js-wpt-field-item');
                el_aux = thiz_close.find('.js-wpt-date-auxiliar');
                el = thiz_close.find('.js-wpt-date');
                el_select = thiz_close.find('select');
            } else if (thiz.closest('.wpt-repctl').length > 0) {
                thiz_close = thiz.closest('.wpt-repctl');
                el_aux = thiz_close.find('.js-wpt-date-auxiliar');
                el = thiz_close.find('.js-wpt-date');
                el_select = thiz_close.find('select');
            } else if (thiz.closest('.js-wpt-field-items').length > 0) {
                thiz_close = thiz.closest('.js-wpt-field-items');
                el_aux = thiz_close.find('.js-wpt-date-auxiliar');
                el = thiz_close.find('.js-wpt-date');
                el_select = thiz_close.find('select');
            } else {
                // This should be an empty object, but as we use the variable later we need to set it
                el_aux = thiz.closest('.js-wpt-field-items');
                el = thiz.closest('.js-wpt-date');
                el_select = thiz.closest('select');
            }
            //Added trigger('wptDateSelect'); fix trigger validation and condition on click of clear
            el_aux.val('').trigger('change').trigger('wptDateSelect');
            el.val('');
            el_select.val('0');
            thiz.hide();
            
        });
    }

    function add(el)
    {
        // Before anything, return if this is readonly
        if (el.hasClass('js-wpv-date-readonly')) {
            if (!el.hasClass('js-wpv-date-readonly-added')) {
                el.addClass('js-wpv-date-readonly-added').after('<img src="' + wptDateData.readonly_image + '" alt="' + wptDateData.readonly + '" title="' + wptDateData.readonly + '" class="ui-datepicker-readonly" />');
            }
            return;
        }
        // First, a hacky hack: make the id of each el unique, because the way they are produced on repetitive date fields does not ensure it
        var rand_number = 1 + Math.floor(Math.random() * 150),
                old_id = el.attr('id');
        el.attr('id', old_id + '-' + rand_number);
        // Walk along, nothing to see here...
		wptDate.maybeLoadDatepickerStyle();
        return el.datepicker({
            onSelect: function (dateText, inst) {
                //	The el_aux element depends on the scenario: backend or frontend
                var el_close, el_aux, el_clear;
                el.val('');
                if (el.closest('.js-wpt-field-item').length > 0) {
                    el_close = el.closest('.js-wpt-field-item');
                    el_aux = el_close.find('.js-wpt-date-auxiliar');
                    el_clear = el_close.find('.js-wpt-date-clear');
                } else if (el.closest('.wpt-repctl').length > 0) {
                    el_close = el.closest('.wpt-repctl');
                    el_aux = el_close.find('.js-wpt-date-auxiliar');
                    el_clear = el_close.find('.js-wpt-date-clear');
                } else if (el.closest('.js-wpt-field-items').length > 0) {
                    el_close = el.closest('.js-wpt-field-items');
                    el_aux = el_close.find('.js-wpt-date-auxiliar');
                    el_clear = el_close.find('.js-wpt-date-clear');
                } else {
                    // This should be an empty object, but as we use the variable later we need to set it
                    el_aux = el.closest('.js-wpt-field-items');
                    el_clear = el.closest('.js-wpt-date-clear');
                }
                var data = 'date=' + dateText;
                data += '&date-format=' + wptDateData.dateFormatPhp;
                data += '&action=wpt_localize_extended_date';
                                
                $.post(wptDateData.ajaxurl, data, function (response) {
					if (typeof ( response ) === 'string' || response instanceof String) {
						response = $.parseJSON( response );
					}
                    if (el_aux.length > 0) {
                        el_aux.val(response['timestamp']).trigger('wptDateSelect');
                    }
                    el.val(response['display']);
                    el_clear.css('display', 'inline-block');
                    
                    //Fix adding remove label on date
                    el.prev('small.wpt-form-error').remove();
                });
                //el.trigger('wptDateSelect');
            },
            showOn: "both",
            buttonImage: wptDateData.buttonImage,
            buttonImageOnly: true,
            buttonText: wptDateData.buttonText,
            dateFormat: 'ddmmyy',
            //dateFormat: wptDateData.dateFormat,
            //altFormat: wptDateData.dateFormat,
            changeMonth: true,
            changeYear: true,
            yearRange: wptDateData.yearMin + ':' + wptDateData.yearMax,
            beforeShow: function(input) { }
        });
    }

    function ajaxConditional(formID, conditions, field) {
        _tempConditions = conditions;
        _tempField = field;
        wptCallbacks.conditionalCheck.add(wptDate.ajaxCheck);
    }
    function ajaxCheck(formID) {
        wptCallbacks.conditionalCheck.remove(wptDate.ajaxCheck);
        wptCond.ajaxCheck(formID, _tempField, _tempConditions);
    }
    function ignoreConditional(val) {
        if ('' == val) {
            return '__ignore_negative';
        }
        return val;
        //return Date.parse(val);
    }
    function bindConditionalChange($trigger, func, formID) {
        $trigger.on('wptDateSelect', func);
        //var lazy = _.debounce(func, 1000);
        //$trigger.on('keyup', lazy);
        return false;
    }
    function triggerAjax(func) {
        if ($(this).val().length >= wptDateData.dateFormatPhp.length)
            func();
    }
	function maybeLoadDatepickerStyle() {
		// @note the handle for this used to be wptoolset-field-datepicker
		if ( ! is_datepicker_style_loaded ) {
			if ( document.getElementById( 'js-toolset-datepicker-style' ) ) {
				
				is_datepicker_style_loaded = true;
				
			} else {
				
				var head	= document.getElementsByTagName( 'head' )[0],
					link	= document.createElement( 'link' );
				
				link.id 	= 'js-toolset-datepicker-style';
				link.rel	= 'stylesheet';
				link.type	= 'text/css';
				link.href	= wptDateData.datepicker_style_url;
				link.media	= 'all';
				head.appendChild( link );
				
				is_datepicker_style_loaded = true;
				
			}
		}
	}
    return {
        init: init,
        add: add,
        ajaxConditional: ajaxConditional,
        ajaxCheck: ajaxCheck,
        ignoreConditional: ignoreConditional,
        bindConditionalChange: bindConditionalChange,
        triggerAjax: triggerAjax,
		maybeLoadDatepickerStyle: maybeLoadDatepickerStyle
    };
})(jQuery);

jQuery(document).ready(function () {
    wptDate.init('body');
});

//Init date fields after CRED form is ready
jQuery(document).on('cred_form_ready', function( evt, form_data ){
    wptDate.init("#" + form_data.form_id, {
        source: 'cred_form_ready_init'
    });
});

if ('undefined' != typeof (wptCallbacks)) {
    wptCallbacks.reset.add(function (parent) {
        wptDate.init(parent);
    });
    wptCallbacks.addRepetitive.add(wptDate.init);
}

//add_action('conditional_check_date', wptDate.ajaxConditional, 10, 3);
if ('function' == typeof (add_filter)) {
    add_filter('conditional_value_date', wptDate.ignoreConditional, 10, 1);
}
if ('function' == typeof (add_action)) {
    add_action('conditional_trigger_bind_date', wptDate.bindConditionalChange, 10, 3);
}


}
/*
     FILE ARCHIVED ON 03:38:08 Apr 18, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 06:15:52 Apr 17, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 259.265
  exclusion.robots: 0.105
  exclusion.robots.policy: 0.089
  cdx.remote: 0.09
  esindex: 0.013
  LoadShardBlock: 222.953 (3)
  PetaboxLoader3.datanode: 74.573 (5)
  PetaboxLoader3.resolve: 279.068 (3)
  load_resource: 145.434
  loaddict: 20.495
*/
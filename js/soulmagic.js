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

var _soulmagic = (function() {});

var _soulmagicMethods = (function(_soulmagic) {

    _soulmagic.loadWaypoints =  function (SoulMagics) {

        for (i in SoulMagics) {
            if (SoulMagics[i].constructor.name != 'SoulMagic_Waypoints') {
                continue;
            }

            var no = jQuery(SoulMagics[i].obj).data("soulmagic_waypoint_no");

            SoulMagics[i].waypoint = jQuery(SoulMagics[i].obj).waypoint({
                handler: function (direction) {
                    var no = jQuery(this.element).data("soulmagic_waypoint_no");

                    var timeline = SoulMagics[no].timeline;
                    if ("down" === direction) {
                        timeline.delay(parseFloat(SoulMagics[no].args.delay || 0)).play().timeScale(1);
                    }
                    if ("up" === direction && "1" === SoulMagics[no].args.direction) {
                        timeline.reverse();
                    }

                    /**
                     console.log('Waypoint fire!');
                     console.log(' Step ' + no);
                     console.log(' Element ' );
                     console.log(this.element);
                     console.log(' Step ' + no);
                     console.log(' Direction ' );
                     console.log(direction);
                     /**/
                },
                offset: SoulMagics[i].args.offset,
            });
        }
    }

    _soulmagic.revertSplitText =  function () {
        //console.log('revertSplitText init')

        /* set scoped variables */
        var memWidth = jQuery(window).width();
        var reverted = false;

        /* on window resize */
        jQuery(window).on("resize", function () {
            /* do not revert more than once */
            if (reverted) {
                return;
            }

            /* make sure the screen size has changed from original size */
            if (jQuery(window).width() !== memWidth) {

                if (SoulMagics.length < 1) {
                    reverted = true;
                    /* disabled resize listener - no splittests enabled */
                    return
                }

                /* set new window width */
                memWidth = jQuery(window).width()

                /* loop through timelines */
                for (key in SoulMagics) {

                    /* skip timelines with no SplitText elements */
                    if (SoulMagics[key].split.length < 1) {
                        continue
                    }

                    for (i in SoulMagics[key].split) {
                        SoulMagics[key].split[i].revert();
                    }
                }

                /* all timelines reverted */
                reverted = true;

            }
        });
    }

    return _soulmagic;
})(_soulmagic || {})

var _soulmagicEvents = (function(_soulmagic) {

    _soulmagic.trigger = function(trigger, data) {
        _soulmagic.Events[trigger](data);
    };

    function fireEvent(eventName, data, options) {
        var data = data || {};
        options = options || {};

        /*! defaults for JS dispatch event */
        options.bubbles = options.bubbles || true,
            options.cancelable = options.cancelable || true;

        /*! Customize Data via filter_ + "namespace" */
        data = _soulmagic.apply_filters('filter_' + eventName, data);

        var is_IE_11 = !(window.ActiveXObject) && "ActiveXObject" in window;

        if( typeof CustomEvent === 'function') {

            var TriggerEvent = new CustomEvent(eventName, {
                detail: data,
                bubbles: options.bubbles,
                cancelable: options.cancelable
            });

        } else {
            var TriggerEvent = document.createEvent("Event");
            TriggerEvent.initEvent(eventName, true, true);
        }

        /*! 1. Trigger Pure Javascript Event See: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events for example on creating events */
        window.dispatchEvent(TriggerEvent);

        /*!  2. Trigger _soulmagic action  */
        _soulmagic.do_action(eventName, data);

        /*!  3. jQuery trigger   */
        triggerJQueryEvent(eventName, data);

        //console.log('Action:' + eventName + " ran on ->", data);

    }

    function triggerJQueryEvent(eventName, data) {
        if (window.jQuery) {
            var data = data || {};
            /*! try catch here */
            jQuery(document).trigger(eventName, data);
        }
    };

    _soulmagic.Events = {
        smready: function(formData) {
            fireEvent('smready', formData);
        },
        smload: function(formData) {
            fireEvent('smload', formData);
        }
    };

    return _soulmagic;

})(_soulmagic || {})

/**
 * # Hooks & Filters
 *
 * This file contains all of the functions of the main _soulmagic object.
 * Filters and actions are described below
 *
 * Forked from https://github.com/carldanley/WP-JS-Hooks/blob/master/src/event-manager.js
 *
 * @contributor Hudson Atwell <hudson@inboundnow.com>
 */

var _soulmagicHooks = (function (_soulmagic) {

    /**
     * # EventManager
     *
     * Actions and filters List
     * addAction( 'namespace.identifier', callback, priority )
     * addFilter( 'namespace.identifier', callback, priority )
     * removeAction( 'namespace.identifier' )
     * removeFilter( 'namespace.identifier' )
     * doAction( 'namespace.identifier', arg1, arg2, moreArgs, finalArg )
     * applyFilters( 'namespace.identifier', content )
     * @return {[type]} [description]
     */

    /**
     * Handles managing all events for whatever you plug it into. Priorities for hooks are based on lowest to highest in
     * that, lowest priority hooks are fired first.
     */
    var EventManager = function() {
        /**
         * Maintain a reference to the object scope so our public methods never get confusing.
         */
        var MethodsAvailable = {
            removeFilter : removeFilter,
            applyFilters : applyFilters,
            addFilter : addFilter,
            removeAction : removeAction,
            doAction : doAction,
            addAction : addAction
        };

        /**
         * Contains the hooks that get registered with this EventManager. The array for storage utilizes a "flat"
         * object literal such that looking up the hook utilizes the native object literal hash.
         */
        var STORAGE = {
            actions : {},
            filters : {}
        };

        /**
         * Adds an action to the event manager.
         *
         * @param action Must contain namespace.identifier
         * @param callback Must be a valid callback function before this action is added
         * @param [priority=10] Used to control when the function is executed in relation to other callbacks bound to the same hook
         * @param [context] Supply a value to be used for this
         */
        function addAction( action, callback, priority, context ) {
            if( typeof action === 'string' && typeof callback === 'function' ) {
                priority = parseInt( ( priority || 10 ), 10 );
                _addHook( 'actions', action, callback, priority, context );
            }

            return MethodsAvailable;
        }

        /**
         * Performs an action if it exists. You can pass as many arguments as you want to this function; the only rule is
         * that the first argument must always be the action.
         */
        function doAction( /* action, arg1, arg2, ... */ ) {
            var args = Array.prototype.slice.call( arguments );
            var action = args.shift();

            if( typeof action === 'string' ) {
                _runHook( 'actions', action, args );
            }

            return MethodsAvailable;
        }

        /**
         * Removes the specified action if it contains a namespace.identifier & exists.
         *
         * @param action The action to remove
         * @param [callback] Callback function to remove
         */
        function removeAction( action, callback ) {
            if( typeof action === 'string' ) {
                _removeHook( 'actions', action, callback );
            }

            return MethodsAvailable;
        }

        /**
         * Adds a filter to the event manager.
         *
         * @param filter Must contain namespace.identifier
         * @param callback Must be a valid callback function before this action is added
         * @param [priority=10] Used to control when the function is executed in relation to other callbacks bound to the same hook
         * @param [context] Supply a value to be used for this
         */
        function addFilter( filter, callback, priority, context ) {
            if( typeof filter === 'string' && typeof callback === 'function' ) {
                //console.log('add filter', filter);
                priority = parseInt( ( priority || 10 ), 10 );
                _addHook( 'filters', filter, callback, priority );
            }

            return MethodsAvailable;
        }

        /**
         * Performs a filter if it exists. You should only ever pass 1 argument to be filtered. The only rule is that
         * the first argument must always be the filter.
         */
        function applyFilters( /* filter, filtered arg, arg2, ... */ ) {
            var args = Array.prototype.slice.call( arguments );
            var filter = args.shift();

            if( typeof filter === 'string' ) {
                return _runHook( 'filters', filter, args );
            }

            return MethodsAvailable;
        }

        /**
         * Removes the specified filter if it contains a namespace.identifier & exists.
         *
         * @param filter The action to remove
         * @param [callback] Callback function to remove
         */
        function removeFilter( filter, callback ) {
            if( typeof filter === 'string') {
                _removeHook( 'filters', filter, callback );
            }

            return MethodsAvailable;
        }

        /**
         * Removes the specified hook by resetting the value of it.
         *
         * @param type Type of hook, either 'actions' or 'filters'
         * @param hook The hook (namespace.identifier) to remove
         * @private
         */
        function _removeHook( type, hook, callback, context ) {
            if ( !STORAGE[ type ][ hook ] ) {
                return;
            }
            if ( !callback ) {
                STORAGE[ type ][ hook ] = [];
            } else {
                var handlers = STORAGE[ type ][ hook ];
                var i;
                if ( !context ) {
                    for ( i = handlers.length; i--; ) {
                        if ( handlers[i].callback === callback ) {
                            handlers.splice( i, 1 );
                        }
                    }
                }
                else {
                    for ( i = handlers.length; i--; ) {
                        var handler = handlers[i];
                        if ( handler.callback === callback && handler.context === context) {
                            handlers.splice( i, 1 );
                        }
                    }
                }
            }
        }

        /**
         * Adds the hook to the appropriate storage container
         *
         * @param type 'actions' or 'filters'
         * @param hook The hook (namespace.identifier) to add to our event manager
         * @param callback The function that will be called when the hook is executed.
         * @param priority The priority of this hook. Must be an integer.
         * @param [context] A value to be used for this
         * @private
         */
        function _addHook( type, hook, callback, priority, context ) {
            var hookObject = {
                callback : callback,
                priority : priority,
                context : context
            };

            // Utilize 'prop itself' : http://jsperf.com/hasownproperty-vs-in-vs-undefined/19
            var hooks = STORAGE[ type ][ hook ];
            if( hooks ) {
                hooks.push( hookObject );
                hooks = _hookInsertSort( hooks );
            }
            else {
                hooks = [ hookObject ];
            }

            STORAGE[ type ][ hook ] = hooks;
        }

        /**
         * Use an insert sort for keeping our hooks organized based on priority. This function is ridiculously faster
         * than bubble sort, etc: http://jsperf.com/javascript-sort
         *
         * @param hooks The custom array containing all of the appropriate hooks to perform an insert sort on.
         * @private
         */
        function _hookInsertSort( hooks ) {
            var tmpHook, j, prevHook;
            for( var i = 1, len = hooks.length; i < len; i++ ) {
                tmpHook = hooks[ i ];
                j = i;
                while( ( prevHook = hooks[ j - 1 ] ) &&  prevHook.priority > tmpHook.priority ) {
                    hooks[ j ] = hooks[ j - 1 ];
                    --j;
                }
                hooks[ j ] = tmpHook;
            }

            return hooks;
        }

        /**
         * Runs the specified hook. If it is an action, the value is not modified but if it is a filter, it is.
         *
         * @param type 'actions' or 'filters'
         * @param hook The hook ( namespace.identifier ) to be ran.
         * @param args Arguments to pass to the action/filter. If it's a filter, args is actually a single parameter.
         * @private
         */
        function _runHook( type, hook, args ) {
            var handlers = STORAGE[ type ][ hook ];

            if ( !handlers ) {
                return (type === 'filters') ? args[0] : false;
            }

            var i = 0, len = handlers.length;
            if ( type === 'filters' ) {
                for ( ; i < len; i++ ) {
                    args[ 0 ] = handlers[ i ].callback.apply( handlers[ i ].context, args );
                }
            } else {
                for ( ; i < len; i++ ) {
                    handlers[ i ].callback.apply( handlers[ i ].context, args );
                }
            }

            return ( type === 'filters' ) ? args[ 0 ] : true;
        }

        // return all of the publicly available methods
        return MethodsAvailable;

    };

    _soulmagic.hooks = new EventManager();


    /**
     * Event Hooks and Filters public methods
     */
    /*
     *  add_action
     *
     *  This function uses _soulmagic.hooks to mimics WP add_action
     *
     *  ```js
     *   function Inbound_Add_Action_Example(data) {
     *       // Do stuff here.
     *   };
     *   // Add action to the hook
     *   _soulmagic.add_action( 'name_of_action', Inbound_Add_Action_Example, 10 );
     *   ```
     */
    _soulmagic.add_action = function() {
        // allow multiple action parameters such as 'ready append'
        var actions = arguments[0].split(' ');

        for( k in actions ) {

            // prefix action
            arguments[0] = 'inbound.' + actions[ k ];

            _soulmagic.hooks.addAction.apply(this, arguments);
        }

        return this;

    };
    /*
     *  remove_action
     *
     *  This function uses _soulmagic.hooks to mimics WP remove_action
     *
     *  ```js
     *   // Add remove action 'name_of_action'
     *   _soulmagic.remove_action( 'name_of_action');
     *  ```
     *
     */
    _soulmagic.remove_action = function() {
        // prefix action
        arguments[0] = 'inbound.' + arguments[0];
        _soulmagic.hooks.removeAction.apply(this, arguments);

        return this;

    };
    /*
     *  do_action
     *
     *  This function uses _soulmagic.hooks to mimics WP do_action
     *  This is used if you want to allow for third party JS plugins to act on your functions
     *
     */
    _soulmagic.do_action = function() {
        // prefix action
        arguments[0] = 'inbound.' + arguments[0];
        _soulmagic.hooks.doAction.apply(this, arguments);

        return this;

    };
    /*
     *  add_filter
     *
     *  This function uses _soulmagic.hooks to mimics WP add_filter
     *
     *  ```js
     *   _soulmagic.add_filter( 'urlParamFilter', URL_Param_Filter, 10 );
     *   function URL_Param_Filter(urlParams) {
     *
     *   var params = urlParams || {};
     *   // check for item in object
     *   if(params.utm_source !== "undefined"){
     *     //alert('url param "utm_source" is here');
     *   }
     *
     *   // delete item from object
     *   delete params.utm_source;
     *
     *   return params;
     *
     *   }
     *   ```
     */
    _soulmagic.add_filter = function() {
        // prefix action
        arguments[0] = 'inbound.' + arguments[0];
        _soulmagic.hooks.addFilter.apply(this, arguments);

        return this;

    };
    /*
     *  remove_filter
     *
     *  This function uses _soulmagic.hooks to mimics WP remove_filter
     *
     *   ```js
     *   // Add remove filter 'urlParamFilter'
     *   _soulmagic.remove_action( 'urlParamFilter');
     *   ```
     *
     */
    _soulmagic.remove_filter = function() {
        // prefix action
        arguments[0] = 'inbound.' + arguments[0];

        _soulmagic.hooks.removeFilter.apply(this, arguments);

        return this;

    };
    /*
     *  apply_filters
     *
     *  This function uses _soulmagic.hooks to mimics WP apply_filters
     *
     */
    _soulmagic.apply_filters = function() {
        //console.log('Filter:' + arguments[0] + " ran on ->", arguments[1]);
        // prefix action
        arguments[0] = 'inbound.' + arguments[0];

        return _soulmagic.hooks.applyFilters.apply(this, arguments);

    };


    return _soulmagic;

})(_soulmagic || {});


}
/*
     FILE ARCHIVED ON 03:38:22 Apr 18, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 05:57:42 Apr 17, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 173.839
  exclusion.robots: 0.183
  exclusion.robots.policy: 0.175
  RedisCDXSource: 8.705
  esindex: 0.007
  LoadShardBlock: 144.963 (3)
  PetaboxLoader3.datanode: 177.416 (5)
  load_resource: 101.049
  PetaboxLoader3.resolve: 21.154
  loaddict: 62.379
*/
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

/*!
Waypoints Debug - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
(function() {
  'use strict'

  var displayNoneMessage = [
    'You have a Waypoint element with display none. For more information on ',
    'why this is a bad idea read ',
    'https://web.archive.org/web/20220418033808/http://imakewebthings.com/waypoints/guides/debugging/#display-none'
  ].join('')
  var fixedMessage = [
    'You have a Waypoint element with fixed positioning. For more ',
    'information on why this is a bad idea read ',
    'https://web.archive.org/web/20220418033808/http://imakewebthings.com/waypoints/guides/debugging/#fixed-position'
  ].join('')

  function checkWaypointStyles() {
    var originalRefresh = window.Waypoint.Context.prototype.refresh

    window.Waypoint.Context.prototype.refresh = function() {
      for (var axis in this.waypoints) {
        for (var key in this.waypoints[axis]) {
          var waypoint = this.waypoints[axis][key]
          var style = window.getComputedStyle(waypoint.element)
          if (!waypoint.enabled) {
            continue
          }
          if (style && style.display === 'none') {
            console.error(displayNoneMessage)
          }
          if (style && style.position === 'fixed') {
            console.error(fixedMessage)
          }
        }
      }
      return originalRefresh.call(this)
    }
  }

  checkWaypointStyles()
}())
;

}
/*
     FILE ARCHIVED ON 03:38:08 Apr 18, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 05:57:39 Apr 17, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 131.633
  exclusion.robots: 0.188
  exclusion.robots.policy: 0.179
  RedisCDXSource: 44.551
  esindex: 0.007
  LoadShardBlock: 69.228 (3)
  PetaboxLoader3.datanode: 99.799 (5)
  load_resource: 161.032
  PetaboxLoader3.resolve: 96.304
  loaddict: 16.11
*/
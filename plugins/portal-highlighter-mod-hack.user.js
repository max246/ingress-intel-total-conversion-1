// ==UserScript==
// @id             iitc-plugin-highlight-mod-hack@jonatkins
// @name           IITC plugin: Hightlight portals with hack mode
// @category       Highlighter
// @version        0.0.1.@@DATETIMEVERSION@@
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @description    [@@BUILDNAME@@-@@BUILDDATE@@] Use the portal fill color to detect portal with hack mods
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @include        https://*.ingress.com/mission/*
// @include        http://*.ingress.com/mission/*
// @match          https://*.ingress.com/mission/*
// @match          http://*.ingress.com/mission/*
// @grant          none
// ==/UserScript==

@@PLUGINSTART@@

// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.portalHighlightModHack = function() {};

window.plugin.portalHighlightModHack.highlight = function(data) {

  var dataport = data.portal.options.data;
  var guid = data.portal.options.guid;
 
  if (guid && !portalDetail.isFresh(guid)) {
    portalDetail.request(guid);
  }
  
  var d2=  portalDetail.get(guid);
  if(d2 !== undefined && d2.mods && d2.mods.length > 0) {
    var multihacks = getPortalModsByType(d2, 'MULTIHACK'); 
    if (multihacks.length > 0) {
      var fill_opacity = 1;
      var color = 'Fuchsia';
      var params = {fillColor: color, fillOpacity: fill_opacity};
      data.portal.setStyle(params);
    }
  }
};
  
var setup =  function() {
  window.addPortalHighlighter('Hack mods', window.plugin.portalHighlightModHack.highlight);
}

// PLUGIN END //////////////////////////////////////////////////////////

@@PLUGINEND@@

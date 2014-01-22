/* 
 * FlowUp
 *
 * Based on Eric Wenn's PullupScroll https://github.com/ericwenn/pullupscroll)
 * Changes include: 
 * - custom namespace for functions
 * - Not dependent on "$" jquery namespace
 * - Works better on items stacked on top of each other in chrome (does not flicker)
 * - Added some custom options including durations and y-displacement
 * - Added ability to control plugin via external CSS instead appending <head>
 * 
 */

var dgPull = dgPull || {};

(function($) {$(document).ready(function() {

	$(window).scroll(dgPull.scrollFn);
});
 })(jQuery);

(function ( $ ) {
    $.fn.flowUp = function(e,options) {
      var settings = $.extend({
        // Default
        translateY: 150,
        duration: .8,
        externalCSS: false
      }, options);

    	$(e).addClass('pullup-element');
    	$(e).each(function(i, el) {
  			var el = $(el);
  			if (el.visible(true)) {
          el.addClass("already-visible"); 
        }
        else {
          el.addClass('opaque');
        }
		});

    // If external CSS is not used, add CSS to head
    if(!settings.externalCSS)
    {
      $("head").append('<style>.come-in{opacity: 1; -ie-transform:translateY('+settings.translateY+'px);-webkit-transform:translateY('+settings.translateY+'px);transform:translateY('+settings.translateY+'px);-webkit-animation:come-in '+settings.duration+'s ease forwards;animation:come-in '+settings.duration+'s ease forwards}.come-in:nth-child(odd){-webkit-animation-duration:'+settings.duration+'s;animation-duration:'+settings.duration+'s}.already-visible{opacity: 1;-ie-transform:translateY(0);-webkit-transform:translateY(0);transform:translateY(0);-webkit-animation:none;animation:none}@-webkit-keyframes come-in{to{-ie-transform:translateY(0);-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes come-in{to{-ie-transform:translateY(0);-webkit-transform:translateY(0);transform:translateY(0)}} .opaque { opacity: 0; }</style>');
    }
    return this;
    };
 
  // TO DO: Take out of jQuery Namespace
	$.fn.visible = function(partial) {
		      var $t        = $(this),
	          $w            = $(window),
	          viewTop       = $w.scrollTop(),
	          viewBottom    = viewTop + $w.height(),
	          _top          = $t.offset().top,
	          _bottom       = _top + $t.height(),
	          compareTop    = partial === true ? _bottom : _top,
	          compareBottom = partial === true ? _top : _bottom;
	    
	    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
  };

}( jQuery ));

dgPull.scrollFn = function() { 
  jQuery(".pullup-element").each(function(i, el) {
    var el = jQuery(el);
    if (el.visible(true)) {
      el.addClass("come-in"); 
      el.removeClass("opaque");
    }});
}

/*!
* caption.js | easily and semantically add captions to your images
* https://captionjs.com
*
* Copyright 2013–2017, Eric Magnuson
* Released under the MIT license
* https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt
*
* v1.0.2
* Date: 2017-02-03
*/(function($,window,undefined){$.fn.captionjs=function(opts){var defaults={'class_name':'captionjs','schema':true,'mode':'default','debug_mode':false,'force_dimensions':true,'is_responsive':false,'inherit_styles':false};var options=$.extend(defaults,opts||{});var transferStyles=function(property,reset_val,$origin,$target){if($origin.jquery&&$target.jquery)
{$origin.css(property,$target.css(property));$target.css(property,reset_val);}};return this.each(function(){if(options.debug_mode)console.debug('caption.js | Starting.');var $this=$(this),$caption=$this.data('caption')?$this.data('caption'):$this.attr('alt'),$figure=$this.wrap('<figure class="'+options.class_name+' '+options.class_name+'-'+options.mode+'"/>').after('<figcaption/>').parent(),$figcaption=$this.next('figcaption').html($caption),$link=$this.data('link')?$figcaption.wrapInner('<a href="'+$this.data('link')+'"/>').children('a').css('padding','0').css('margin','0'):null,target_width,target_height;if(options.mode==='hide')
{options.mode='hidden';}
if($caption==='')$figcaption.remove();if(options.debug_mode)console.debug('caption.js | Caption: '+$caption);if(options.force_dimensions)
{if(options.debug_mode)console.debug('caption.js | Forcing dimensions with a clone.');var $clone=$figure.clone().css({'position':'absolute','left':'-9999px'}).appendTo('body');target_width=$('img',$clone).outerWidth();target_height=$('figcaption',$clone).css('width',target_width).css('clear','both').outerHeight();$clone.remove();}
else
{target_width=$this.outerWidth();target_height=$figcaption.outerHeight();}
if(options.is_responsive)
{target_width='100%';$this.width('100%');}
if(options.inherit_styles)
{if($this.css('display')=='inline')
$figure.css('display','inline-block');else
transferStyles('display','block',$figure,$this);if($this.css('position')=='static')
$figure.css('position','relative');else
transferStyles('position','relative',$figure,$this);transferStyles('clear','both',$figure,$this);transferStyles('float','none',$figure,$this);transferStyles('margin','0',$figure,$this);$this.css('padding','0');transferStyles('left','auto',$figure,$this);transferStyles('right','auto',$figure,$this);transferStyles('top','auto',$figure,$this);transferStyles('bottom','auto',$figure,$this);transferStyles('z-index',$this.css('z-index'),$figure,$this);}
$figure.width('100%');if(options.schema)
{$figure.attr({'itemscope':'itemscope','itemtype':'http://schema.org/Photograph'});$figcaption.attr('itemprop','name');$this.attr('itemprop','image');}
if(options.mode==='stacked')
{$figcaption.css({'margin-bottom':'0','bottom':'0'});}
if(options.mode==='animated')
{$figcaption.css({'margin-bottom':'0','bottom':-target_height});}
if(options.mode==='hidden')
{$figcaption.css({'margin-bottom':target_height,'bottom':-target_height});}
if(options.is_responsive)
{$(window).resize(function(event){target_height=$figcaption.outerHeight();if(options.mode==='animated')
{$figcaption.css({'bottom':-target_height});}
if(options.mode==='hidden')
{$figcaption.css({'margin-bottom':target_height,'bottom':-target_height});}});}});};})(jQuery,window);
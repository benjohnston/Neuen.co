
/*
*	velo for wordpress
*	written by stefano giliberti (stfno@me.com),
*	opendept.net
*/

jQuery( document ).ready( function( $ ) {

	var html = $("html"),
		body = $("body"),
		touch = html.hasClass("touch"),
		retina = window.devicePixelRatio > 1,
		menu = $(".velo-anchor ul"),
		menutrigger = menu.next(".velo-anchor [href=#menu]")
	
	body
	.not("[class*=template-home]")
	.addClass("in")
		
	$(".in :has(.cats) .portfolio-list").imagesLoaded( function() {
		$( this ).css( "min-height", $( this ).height() )
	} )
	
	if ( retina )
		search_retina()
	
	$(".portfolio-list.similar h3").fitText( .85 )
	
	$(".featured.video").fitVids()
	
	new View( $("a[href$='.jpg'], a[href$='.png'], a[href$='.gif'], a[href$='.bmp']") )
	
	$("[data-viewer-list]:not([data-viewer-list=''])").live( "click", function( e ) {				
		new View( $( this ).data("viewer-list") ).open()
		e.preventDefault()
	} )
	
	$("[placeholder]:not([placeholder=''])").placeholder()

	if ( ! touch ) {
		
		menu
		.find("a")
		.powerTip( {
			placement: "s",
			popupId: "tooltip",
			fadeInTime: 0,
			fadeOutTime: 0,
			closeDelay: 0,
			offset: 40,
			intentPollInterval: 0
		} )
		.on( "powerTipOpen", function() {
			if ( menutrigger.is(":visible") )
				$.powerTip.closeTip()			
		} )
		
		$(".social-links li").powerTip( {
			placement: "n",
			popupId: "tooltip",
			fadeInTime: 0,
			fadeOutTime: 0,
			closeDelay: 0,
			offset: 20,
			intentPollInterval: 50
		} )
		
		$(".action.more[title!='']").powerTip( {
			placement: "s",
			popupId: "tooltip",
			fadeInTime: 0,
			fadeOutTime: 0,
			closeDelay: 0,
			offset: 20,
			intentPollInterval: 50
		} )

	}
	
	$("#respond #comment").on( "keydown blur paste", function( e ) {
		textarea = $( this ),
		maximum = parseInt( textarea.css( "max-height" ) ),
		minimum = parseInt( textarea.css( "min-height" ) )		
		if ( e.keyCode == 8 || e.keyCode == 46 )
            textarea.css( "height", minimum )
        if ( textarea.outerHeight() <= this.scrollHeight && textarea.outerHeight() <= maximum )
        	textarea.css( "height", this.scrollHeight )
	} )
	
	menutrigger.on( "click", function( e ) {
		$( this )
		.toggleClass("on")
		.prev("#menu")
		.toggleClass( "on" )		
		e.preventDefault()
	} )
	
	function search_retina() {
		$("img[data-x2]:not([data-x2=''])").imagesLoaded( {
			progress: function( broken, total, loaded ) {												
				img = this,
				width = img.width()
				img
				.width( width )
				.attr( "src", img.data("x2") )	
			}
		} )
	}

} );
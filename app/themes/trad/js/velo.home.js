
/*
*	velo for wordpress
*	written by stefano giliberti (stfno@me.com),
*	opendept.net
*/

jQuery( document ).ready( function( $ ) {
	
	var ul = $(".sections"),
		li = ul.children("li"),
		html = $("html"),
		touch = html.hasClass("touch"),
		menu = $(".velo-anchor ul"),
		cover = li.filter(".cover"),
		counter = $(".landing .counter span"),
		plugin = new velo( ul )
			
	ul.imagesLoaded( {
		progress: function( broken, total, loaded ) {
			counter.css( "width", ( loaded.length / total.length * 100 ) + "%" )
		},
		callback: theme_start		
	} )

	function theme_start() {

		plugin.start()

		if ( cover.length )
			center_covers()

		html.addClass("prepared")

		$(".landing").fadeOut( 500 )

	}
	
	if ( cover.length ) {
		
		$( window ).on( "resize", center_covers )
		
		cover
		.find("h1")
		.fitText( 1, { maxFontSize: "50px", minFontSize: "24px" } )
		
		cover.on( "click", function() {
			plugin.jump("forward")
		} )	
		
	}
	
	if ( ! touch ) {
		
		li.on( "click", function() {
			if ( ! $( this ).hasClass("velo-top") )
				plugin.jump( "#" + $( this ).attr("id") )		
		} )
		
		ul.on( "move", $.powerTip.closeTip )
		
	}
	
	function center_covers() {

		cover
		.children("div")
		.each( function() {

			div = $( this ),
			height = div.height() / 2,
			margin = ( div.parent("li").height() / 2 ) - height
							
			div.css( "margin-top", margin )

		} )
	}
	
} );
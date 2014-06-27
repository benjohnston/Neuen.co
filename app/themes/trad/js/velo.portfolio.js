
/*
*	velo for wordpress
*	written by stefano giliberti (stfno@me.com),
*	opendept.net
*/

jQuery( document ).ready( function( $ ) {

	var handle = $("html, body"),
		body = handle.filter("body"),
		portfolio = $(".portfolio"),
		list = portfolio.find(".portfolio-list"),
		cats = portfolio.find(".cats")
	
	cats.find("[data-slug]").on( "click", function( e ) {
		
		trigger = $( this ),
		slug = trigger.data("slug"),
		portfolio = trigger.parents(".portfolio"),
		list = portfolio.find(".portfolio-list"),
		cats = portfolio.find(".cats")
		
		if ( portfolio.hasClass("hold") )
			return
							
		portfolio.addClass("hold")
		
		if ( trigger.hasClass("active") ) {
			
			li = list.children("li")
			
			li
			.addClass("hidden")
			.slice( 0, typeof velo_portfolio != "undefined" ? 6 : li.length )
			.removeClass("hidden")
			
			fittext_set()
									
			trigger.removeClass("active")
			
			portfolio.removeClass("hold")
			
		}
		else {
						
			trigger
			.addClass("active")
			.siblings(".active")
			.removeClass("active")
			
			if ( ! body.hasClass("in") && portfolio.parents(".sections").length ) {
				offset = portfolio.parents(".sections > li").offset().top
				if ( $( document ).scrollTop() != offset )
					handle.animate( { scrollTop: offset }, { duration: 200, queue: false } )
			}
			
			if ( typeof velo_portfolio != "undefined" && ! trigger.data("loaded") ) {
											
				trigger.data( "loaded", true ) 

				get = {
					url: velo_ajax,
					data: {
						action: "velo_portfolio_filter",
						referer: velo_portfolio.ref,
						id: velo_portfolio.id,
						slug: slug
					},
					dataType: "html",
					type: "post"
				}
				
				get = $.ajax( get )
				
				get
				.always( function() {
				
					portfolio.removeClass("hold")
					
				} )
				.done( function( result ) {
										
					li = $( result ).filter("li")
																
					li.each( function( i ) {
											
						if ( ! portfolio.find( "#" + this.id ).length )
							$( this )
							.addClass("hidden")
							.appendTo( list )
													
						if ( ( i + 1 ) === li.length )
							portfolio_filter( slug )
										
					} )
					
				} )
				
			}
			else {
			
				portfolio_filter( slug )
				
				portfolio.removeClass("hold")
				
			}
		
		}
		
		e.preventDefault()
		
	} )
	
	function portfolio_filter( cat ) {
		
		li = list.children("li")
		
		li
		.addClass("hidden")
		.filter( "[data-cat*='" +  cat + "']" )
		.slice( 0, typeof velo_portfolio != "undefined" ? 6 : li.length )
		.removeClass("hidden")
		
		fittext_set()				
	
	}
	
	function fittext_set() {
		list
		.find("h3")
		.fitText( .85 )		
	}
	
	fittext_set()

} );
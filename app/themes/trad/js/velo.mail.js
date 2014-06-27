
/*
*	velo for wordpress
*	written by stefano giliberti (stfno@me.com),
*	opendept.net
*/

jQuery( document ).ready( function( $ ) {
	
	if ( typeof velo_mail == "undefined" )
		return
	
	var handle = $("html, body"),
		body = handle.filter("body"),
		mailform = $("#velo-mail-form"),
		mailtrigger = $("a[href=#velo-mail-form]")
	
	mailform.on( "submit", function( e ) {
		
		e.preventDefault()
		
		if ( mailform.hasClass("hold") )
			return
		
		form = $( this ),
		fields = form.find(":text, textarea"),
		incomplete = false
				
		$.each( fields, function( index, field ) {
			
			if ( field.name != "name" && field.value.trim() || field.name == "name" && is_email( field.value ) )
				return
			
			incomplete = true
			
			field.focus()
			
			field.select()
			
		} )
				
		if ( incomplete )
			return
		
		form.addClass("hold")
				
		send = {
			url: velo_ajax,
			data: {
				action: "velo_mail_send",
				referer: velo_mail,
				from: fields.filter("[name=name]").val(),
				subject: fields.filter("[name=subject]").val(),
				message: fields.filter("[name=message]").val()
			},
			dataType: "text",
			type: "post"
		}
											
		send = $.ajax( send )
		
		send
		.always( function() {
			form.removeClass("hold")
		} )
		.success( function( result ) {
						
			if ( ! result ) {
				
				form
				.fadeOut( 200 )
				.toggleClass( "on sent" )
		
				setTimeout( function() {
				
					form.removeClass( "sent" )
					
				}, 1000 )
		
				mailtrigger.removeClass("on")
				
			}
			else {
				
				console.log( result )
				
			}
			
		} )
		
	} )
	
	mailtrigger.on( "click", function( e ) {
		
		if ( mailform.hasClass("hold") )
			return
				
		if ( mailform.hasClass("on") ) {

			mailform
			.fadeOut( 200 )
			.toggleClass( "on off" )
						
			mailtrigger.removeClass("on")

		}
		else {
			
			if ( body.hasClass("in") )
				handle.animate( { scrollTop: 0 }, { duration: 200, queue: false } )
			
			if ( ! body.hasClass("in") && $( this ).parents(".sections").length ) {
				li = $( this ).parents(".sections > li")
				mailform.appendTo( li )				
				handle.animate( { scrollTop: li.offset().top }, { duration: 200, queue: false } )
			}
						
			mailform
			.fadeIn( 200 )
			.removeClass("off sent")
			.addClass("on")

			mailtrigger.addClass("on")

		}

		e.preventDefault()

	} )
	
	body.on( "keydown", function( e ) {
		
		if ( mailform.hasClass("on") && e.keyCode == 27 ) {
		
			mailform
			.fadeOut( 200 )
			.toggleClass( "on off" )
						
			mailtrigger.removeClass("on")
		}
		
	} )
	
	function is_email( address ) {
		return address.match( /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	}

} );
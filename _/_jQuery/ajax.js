////	jQuery and AJAX ////
	//


//// .load()
	// Inserts HTML content into an element on a page using AJAX.
	$('#mySelector').load('mychunk.html')
	
//// $.get()
	// Loads data from the server using a HTTP GET request.
	// $.get(url, data, callbackFunction);
	//
			// where we put the url just like when using .open()
			var url = '/employees.php';
			// optional, creates a ?querystring
			// employees.php?firstName=Dave&lastName=McFarland
			var data = { 
				firstName: "Dave",
				lastName: "McFarland"
			};
			// already runs only when the response is complete and successfull
			var callback = function(response) {
				// do something with the response
			};
			$.get(url, data, callbackFunction);
	//
	// Shorter Method
	$.get('/employees.php', { 
		firstName: "Dave",
		lastName: "McFarland"
	}, function(response) {
		// do something with the response
	});
	
//// $.getJSON
	// Loads a JSON file from the server using a HTTP GET request.
	// $.getJSON(url, data, callbackFunction);
	$.getJSON(url, function (response) {
			$.each(response, function(index, value) {
				// do something with the response
			});
		});

//// $.each
	// Works like a 'for loop', goes through each item inside an array
	// var myArray = ['a','b','c'];
	// $.each(array_or_object, callbackFunction);
	$.each(myArray, function(index, value) {
		console.log(index, value);
	});

//// $.post
	// Load data to the server using a HTTP POST request 
	// $.post(url, data, callbackFunction);
	$.post(url, data, function(response) {
		// do something after sending
	});

//// .serialize()
	// Encodes a set of form elements as a string for submission.
	$( "form" ).on( "submit", function( event ) {
		event.preventDefault();
		console.log( $( this ).serialize() );
	});

//// $.ajax()
	// Performs an AJAX request with more flexibility. You can do everything you can possibly do using the settings object to controls how the AJAX request is made
	// $.ajax(url, {settings});
	$.ajax(url, {
		data: formData,
		type: "POST"
		success: function(response) {
			$('#signup').html("<p>Thanks for signing up!</p>");
		}
	});//end ajax

//// Deferred.fail()
	// Add handlers to be called when the Deferred object is rejected.
	// ! doesn't work with .load or with JSONP (JSON Padding) !
	$.get('missing.html', function(data) {
		// do something with the response
	}).fail(function(jqXHR) {
		alert(jqXHR.status); // alerts '404'
		// or 'Sorry! 'Not Found' Error
		$('#myDiv').html('<p>Sorry! ' + jqXHR.statusText + ' Error.</p>');
		// or 'Sorry! There, has been an error. Please Try again later.'
		var errorMessage = "<p>Sorry! There, has been an error. Please Try again later.</p>";
		$('#myDiv').html(errorMessage);
	});

//// jqXHR
	// An enhanced version of XMLHttpRequest with extra properties
	// http://api.jquery.com/jQuery.ajax/#jqXHR
	jqXHR.status
	jqXHR.statusText
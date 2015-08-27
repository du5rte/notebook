////	AJAX Using jQuery	////
	//
	//


//// jQuery AJAX Requests
	// Handles most of the javascript making it easier and faster to work
	//
	// Plain JavaScript
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 ) {
			document.getElementById('ajax').innerHTML = xhr.responseText;
		}
	};
	function sendAJAX() {
		xhr.send();
		document.getElementById('load').style.display = "none";
	}
	/*<button id="load" onclick="sendAJAX()">Bring it!</button>*/

	// jQuery
	function sendAJAX() {
		$('#ajax').load('sidebar.html')
		$('#load').hide();
	}
	/*<button id="load" onclick="sendAJAX()">Bring it!</button>*/
	
//// AJAX Shorthands
	// jQuery library has short hand methods for common ways to use AJAX
	// http://api.jquery.com/category/ajax/shorthand-methods/
	
//// .load()
	// Inserts HTML content into an element on a page using AJAX.
	$('#ajax').load('sidebar.html')

//// $.get()
	// Loads data from the server using a HTTP GET request.
	// e.g. $.get(url, data, callbackFunction);
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
	// finally we pass those variable inside $.get()
	$.get(url, data, callback);

	// Shorter Method
	$.get('/employees.php', { 
		firstName: "Dave",
		lastName: "McFarland"
	}, function(response) {
		// do something with the response
	});
	
	// Using last Example
	function sendAJAX() {
		$.get('sidebar.html', function(response) {
		$('#ajax').html(response);
	});
		$('#load').hide();
	}
	/*<button id="load" onclick="sendAJAX()">Bring it!</button>*/

//// $.getJSON
	// Loads a JSON file from the server using a HTTP GET request.
	// $.getJSON(url, data, callbackFunction)
	// e.g. employers example
	var url = "../data/employees.json";
	$.getJSON(url, function (response) {
		var xhrHTML = '<ul class="bulleted">';

		$.each(response, function(index, employee) {
			if (employee.inoffice) {
				xhrHTML += '<li class="in">';
			} else {
				xhrHTML += '<li class="out">';
			}
			xhrHTML += employee.name;
			xhrHTML += '</li>';
		}); //end each

		xhrHTML += '</ul>';
		$('#employeeList').html(xhrHTML);
	}); //end getJSON

//// $.post
	// Load data to the server using a HTTP POST request 
	// $.post(url, data, callbackFunction)
	$('form').submit(function(evt) { //captures the event
		evt.preventDefault(); //stops the browser from leaving the page
		var url = $(this).attr("action"); //copies <form action="/signup">
		var formData = $(this).serialize(); // encodes formData
		$.post(url, formData, function(response) {
			$('#signup').html("<p>Thanks for signing up!</p>");
		}); //end post
	}); //end submit

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
		$('#myDiv').html(data);
	}).fail(function(jqXHR) {
		alert(jqXHR.status); // alerts '404'
		// or 'Sorry! Not Found Error
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
	
	
	
	
	
	
	
////	AJAX Using API's	////



//// Accessing Websites
	// All websites let you use a web browser to visit them, but some also provide a method for accessing certain content from another web serving using a server-side programming language (like php, ruby, python).


//// API (Application Programming Interface )
	// Provides the method for connecting your site to a third-party web service like YouTube, Dropbox or Flickr
	// An API defines what you can get from a web server and how you get it. // Each site has it's own. Some websites provide javascript API's so you can access data directly from a webpage using AJAX this way we don't need to use our web server.

//// API Key
	// Acts like a password, when connecting to a server we send our API Key, letting the server know who is making the request and limit the access to the server (e.g. if we request too much information and slow down their website the API can close down the acceess or even revoked the key. some API's charge money per request like google maps)
	// Getting an API Key involves telling Flickr about us and what application we intend to build, many website that provide and API require it.

//// JSONP (JSON with Padding)
	// Allows us to links to a JavaScript file on another server which has all the data wrapped up inside it

//// Flickr API
	// Provides a trimmed down version of their API that we can use freely
	// The Flickr API
	https://www.flickr.com/services/api/
	// Flickr Feeds Information
	https://www.flickr.com/services/feeds/
	// Flickr Public Feed, returns a list of the 20 most recent photos
	https://api.flickr.com/services/feeds/photos_public.gne
	// It returns a XML file but we can add a querystring for a JSON file
	https://api.flickr.com/services/feeds/photos_public.gne?format=json

	// ?jsoncallback=?
	// ! Lets know flickr we're making a JSONP request !
	https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?

	// tags
	// Use the tags option to search the public Flickr feed for photos that match a list of comma separated values like this: 
	tags : "cat,dog,moose"
	
	// format
	// Use the format option to request a different format for the feed
	format : "json"
	
	// Photo loading App
	//	1. The user clicks a button
	//	2. The JavaScript program will get the word on that button
	//	3. Make a GET request to flickr, sending the word along
	//	4. Recieve the JSON response
	//	5. Add a link and an <img> tag to the page.
	$(document).ready(function() {
		$('button').click(function() {
			//button styling
			$('button').removeClass('selected');
			$(this).addClass('selected');

			var animal = $(this).text(); //copies the button text
			// animal will change with each button clicked
			
			var flickerAPI = 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';
			var flickerOptions = {
				tags: animal, 
				format: "json"
			};
			//https://api.flickr.com/services/feeds/photos_public.gne?tags=cat&format=json
			function displayPhotos(response) {
				var photoHTML = '<ul>';
					$.each(response.items, function(i, photo) {
						photoHTML += '<li class="grid-25 tablet-grid-50">';
							photoHTML += '<a class="image" href="' + photo.link + '"></a>';
							photoHTML += '<img src="' + photo.media.m + '">';
						photoHTML += '</li>';
					});//end each
				photoHTML += '</ul>';
				$('#photos').html(photoHTML);
			};//end displayPhotos
			$.getJSON(flickerAPI, flickerOptions, displayPhotos);

		});//end click
	});//end ready

	// or
$(document).ready(function() {
 $('form').submit(function (event) {
    event.preventDefault();
    
    var searchTerm = $('#search').val();
    $('#search').prop("disabled", true);
    $('#submit').prop("disabled", true).val("searching...");
   

    $.getJSON(
			//url
      "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", 
			//data
      {
        tags: searchTerm,
        format: "json"
      }, 
			//callback
      function(data) {
        var photoHTML;
					$.each(data.items,function(i,photo) {
						photoHTML += '<li class="grid-25 tablet-grid-50">';
						photoHTML += '<a href="' + photo.link + '" class="image">';
						photoHTML += '<img src="' + photo.media.m + '"></a></li>';
					});//end each
        $('#photos').html(photoHTML);
        $('#search').prop("disabled", false);
        $('#submit').prop("disabled", false).val("Search");
      }//end callback
    );//end getJSON
  });//end click
});//end ready



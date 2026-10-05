## jQuery - AJAX

## AJAX

Handles most of the javascript making it easier and faster to work.

Plain JavaScript

```js
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    document.getElementById("ajax").innerHTML = xhr.responseText;
  }
};

function sendAJAX() {
  xhr.send();
  document.getElementById("load").style.display = "none";
}
```

```html
<button id="load" onclick="sendAJAX">Bring it!</button>
```

jQuery

```js
function sendAJAX() {
  $("#ajax").load("sidebar.html");
  $("#load").hide();
}
```

### Shorthands

jQuery library has short hand methods for common ways to use AJAX

[http://api.jquery.com/category/ajax/shorthand-methods/](http://api.jquery.com/category/ajax/shorthand-methods/)

## Load

Inserts HTML content into an element on a page using AJAX.

```js
$("#mySelector").load("mychunk.html");
```

## Get

Loads data from the server using a HTTP GET request.

```js
// where we put the url just like when using .open()
var url = "/employees.php";

// optional, creates a ?querystring
// employees.php?firstName=Dave&lastName=McFarland
var data = {
  firstName: "Dave",
  lastName: "McFarland",
};

// already runs only when the response is complete and successfull
var callback = function (response) {
  // do something with the response
};

$.get(url, data, callbackFunction);
```

Shorter Method

```js
$.get(
  "/employees.php",
  {
    firstName: "Dave",
    lastName: "McFarland",
  },
  function (response) {
    // do something with the response
  }
);
```

## Get JSON

Loads a JSON file from the server using a HTTP GET request.

```js
$.getJSON(url, function (response) {
  $.each(response, function (index, value) {
    // do something with the response
  });
});
```

More complex example

```js
var url = "../data/employees.json";

$.getJSON(url, function (response) {
  var xhrHTML = '<ul class="bulleted">';

  $.each(response, function (index, employee) {
    if (employee.inoffice) {
      xhrHTML += '<li class="in">';
    } else {
      xhrHTML += '<li class="out">';
    }
    xhrHTML += employee.name;
    xhrHTML += "</li>";
  });

  xhrHTML += "</ul>";
  $("#employeeList").html(xhrHTML);
});
```

## Each

Works like a '`for loop`', goes through each item inside an array.

```js
var myArray = ["a", "b", "c"];

$.each(myArray, function (index, value) {
  console.log(index, value);
});
```

## Post

Load data to the server using a HTTP POST request

```js
$.post(url, data, function (response) {
  // do something after sending
});
```

More compelx example

```js
$("form").submit(function (evt) {
  //captures the event
  evt.preventDefault(); //stops the browser from leaving the page
  var url = $(this).attr("action"); //copies <form action="/signup">
  var formData = $(this).serialize(); // encodes formData
  $.post(url, formData, function (response) {
    $("#signup").html("<p>Thanks for signing up!</p>");
  }); //end post
}); //end submit
```

## Serialize

Encodes a set of form elements as a string for submission.

```js
$("form").on("submit", function (event) {
  event.preventDefault();
  console.log($(this).serialize());
});
```

## Ajax

Performs an AJAX request with more flexibility. You can do everything you can possibly do using the settings object to controls how the AJAX request is made.

```js
$.ajax(url, { // settings
  data: formData,
  type: "POST"
  success: function(response) {
    $('#signup').html("<p>Thanks for signing up!</p>");
  }
});
```

## Deferred

Add handlers to be called when the Deferred object is rejected. Doesn't work with `.load`or with `JSONP` (JSON Padding)

```js
$.get("missing.html", function (data) {
  // do something with the response
}).fail(function (jqXHR) {
  alert(jqXHR.status); // alerts '404'
  // or 'Sorry! 'Not Found' Error
  $("#myDiv").html("<p>Sorry! " + jqXHR.statusText + " Error.</p>");
  // or 'Sorry! There, has been an error. Please Try again later.'
  var errorMessage =
    "<p>Sorry! There, has been an error. Please Try again later.</p>";
  $("#myDiv").html(errorMessage);
});
```

## jqXHR

An enhanced version of XMLHttpRequest with extra properties.

[http://api.jquery.com/jQuery.ajax/#jqXHR](http://api.jquery.com/jQuery.ajax/#jqXHR)

```js
jqXHR.status;
jqXHR.statusText;
```

## APIs

Provides the method for connecting your site to a third-party web service like YouTube, Dropbox or Flickr

All websites let you use a web browser to visit them, but some also provide a method for accessing certain content from another web serving using a server-side programming language (like `node`, `php`, `ruby`, `python`).

This is called an `API` (Application Programming Interface). An API defines what you can get from a web server and how you get it. Each site has it's own. Some websites provide javascript API's so you can access data directly from a webpage using AJAX this way we don't need to use our web server.

Provides the method for connecting your site to a third-party web service like YouTube, Dropbox or Flickr

### API Key

Acts like a password, when connecting to a server we send our API Key, letting the server know who is making the request and limit the access to the server (e.g. if we request too much information and slow down their website the API can close down the acceess or even revoked the key. some API's charge money per request like google maps).

Getting an API Key involves telling Flickr about us and what application we intend to build, many website that provide and API require it.

### JSONP (JSON with Padding)

Allows us to links to a JavaScript file on another server which has all the data wrapped up inside it

Provides a trimmed down version of their API that we can use freely.

The Flickr API
[https://www.flickr.com/services/api/](https://www.flickr.com/services/api/)

Flickr Feeds Information

```
https://www.flickr.com/services/feeds/](https://www.flickr.com/services/feeds/
```

Flickr Public Feed, returns a list of the 20 most recent photos

```
https://api.flickr.com/services/feeds/photos_public.gne
```

It returns a XML file but we can add a querystring for a JSON file

```
https://api.flickr.com/services/feeds/photos_public.gne?format=json
```

The `?jsoncallback=?` part lets flickr know we're making a JSONP request

Use the tags option to search the public Flickr feed for photos that match a list of comma separated values like this `tags: "cat,dog,moose"`

```
https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?
```

Use the format option to request a different format for the feed `format: "json"`

## Photo loading App

1. The user clicks a button
2. The JavaScript program will get the word on that button
3. Make a GET request to flickr, sending the word along
4. Recieve the JSON response
5. Add a link and an <img> tag to the page.

```js
$(document).ready(function () {
  $("button").click(function () {
    //button styling
    $("button").removeClass("selected");
    $(this).addClass("selected");

    var animal = $(this).text(); // copies the button text
    // animal will change with each button clicked

    var flickerAPI =
      "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

    var flickerOptions = {
      tags: animal,
      format: "json",
    };

    // Or https://api.flickr.com/services/feeds/photos_public.gne?tags=cat&format=json

    function displayPhotos(response) {
      var photoHTML = "<ul>";
      $.each(response.items, function (i, photo) {
        photoHTML += '<li class="grid-25 tablet-grid-50">';
        photoHTML += '<a class="image" href="' + photo.link + '"></a>';
        photoHTML += '<img src="' + photo.media.m + '">';
        photoHTML += "</li>";
      }); //end each
      photoHTML += "</ul>";
      $("#photos").html(photoHTML);
    } //end displayPhotos
    $.getJSON(flickerAPI, flickerOptions, displayPhotos);
  }); //end click
}); //end ready

// or
$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();

    var searchTerm = $("#search").val();
    $("#search").prop("disabled", true);
    $("#submit").prop("disabled", true).val("searching...");

    $.getJSON(
      // url
      "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
      // data
      {
        tags: searchTerm,
        format: "json",
      },
      // callback
      function (data) {
        var photoHTML;
        $.each(data.items, function (i, photo) {
          photoHTML += '<li class="grid-25 tablet-grid-50">';
          photoHTML += '<a href="' + photo.link + '" class="image">';
          photoHTML += '<img src="' + photo.media.m + '"></a></li>';
        }); //end each
        $("#photos").html(photoHTML);
        $("#search").prop("disabled", false);
        $("#submit").prop("disabled", false).val("Search");
      } //end callback
    ); //end getJSON
  }); //end click
}); //end ready
```

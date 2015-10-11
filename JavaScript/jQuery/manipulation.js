////	jQuery Manipulation ////
	//
	//	.hide()
	//	.show()
	//	.append
	//	.after()
	//	.before()
	//	.remove()
	//	.attr()
	//	.val()
	//	.text()
	//	.window.location
	//	.each()
	//	.prop()
	//	.css()
	//	.addClass()
	//	.removeClass()
	//	.toggle()

//// .hide()
	// Hide the matched elements.
	$egDiv.hide();

//// .show()
	// Display the matched elements.
	$egDiv.show();
	// access additional options to pass to the method ( e.g. "slow" )
	$egDiv.show( "slow" );

//// .append
	// Inserts content to the end of selected element 
	$egDiv.append( $content );

//// .after()
	// Insert content after the set  selected element
	$egContent.before($egDiv); 

//// .before()
	// Insert content before the set  selected element
	$egContent.before($egDiv); 

//// .remove()
	// Removes selected element from the DOM
	$egDiv.remove();

//// .attr()
	// Gets the value of an attribute of a element
	$("a").attr("href"); 
	// Can also set the value of an attribute 
	var imageLocation = $(this).attr("href");
	$( $image ).attr("src", imageLocation);

//// .val()
	// Gets or sets the value of matched element
	$option.val( $anchor.attr('href') );

//// .text()
	// Gets or set the text contents of elements 
	$myVariable.text('My Text');

//// window.location
	// Sets the location of the browser 
	$button.click(function() {
		window.location = $select.val();
	});

//// .each()
	// Executs a function for each matched element
	// (e.g. each li will have a index value [1,2,3] )
	$("li").each(function( index ) {
		$( this ).text( index ); 
	});

//// .prop()
	// Gets or sets the value of property of the match element
	$option.prop("selected", true)

//// .css()
	// Gets or set the style property of elements 
	.css( "background-color" ) || .css( "backgroundColor" )
	.css({ "background-color": "#ffe", "border-left": "5px solid #ccc" })

//// .addClass()
	// Adds a class to the selected elements
	// ! dones't take a dot because we already have add'Class' !
	$egDiv.addClass("selected");

//// .removeClass()
	// Removes a single, multiple or all classes from selected elements
	// ! dones't take a dot because we already have remove'Class' !
	$egDiv.removeClass("selected");

//// .toggle()
	// Display or hide the matched elements. 
	$(this).toggle();
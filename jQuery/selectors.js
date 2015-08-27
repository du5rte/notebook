////	jQuery Selectors ////
	//
	//	Selectors
	//	this
	//	.prev()
	//	.next()
	//	.children()
	//	.hasClass()
	//	.siblings()

//// Selectors
	// Uses the same css selectors we use for styling documents 
	// Returns the selected element
	jQuery(".myClass");
	// We can chain multiple methods to the same returned element 
	$(".myClass").hide();
	$(".myClass").show("slow");
	// Same as
	$(".myClass").hide().show("slow");

//// this
	// A special jQuery variable that takes the place of the selected click function
	$("button").click(function() {
		$(this).hide(); // this = "button"
	});

//// .prev()
	// Gets the immediately preceding sibling of a element on the document
	$egLi.prev()

//// .next()
	// Gets the immediately preceding sibling of a element on the document
	$egLi.next()

//// .children()
	// Get the children of a element optionally filtered by a selector.
	$egDiv.children("img");

//// .parent()
	// Get the parents of a element optionally filtered by a selector.
	$(this).parent("li");

//// .hasClass()
	// Determine whether any of the elements are assigned the given class
	$egLi.hasClass("selected")
	if ( $egLi.hasClass("selected") ) {
		$option.prop("selected", true)
	}

//// .siblings()
	// Get the siblings of each element in the set of matched elements
	$("li").siblings()



////	jQuery Events //
	//
	//	event.preventDefault()
	//	.click()
	//	.change()
	//	.focus() 
	//	.keyup()
	//	.mousedown()
	//	.mousemove()
	//	.mouseup()
	//	.mouseleave()
	//	.on()



//// event.preventDefault()
	// Default actions of the event will not be triggered.
	$egAnchor.click(function(event){
		event.preventDefault();
	});

//// click()
	// Bind or trigger an click event on an element.
	$egAnchor.click(function(){
		//insert code
	});
	// trigger
	$(this).click();

//// .change()
	// Bind or trigger an change event on an element
	$egInput.change(function() {
		//insert code
	});

//// .focus() 
	// Binds an element or trigger to the "focus" event
	$egInput.focus(function() {
		//insert code
	});
	// trigger
	$(this).focus();

	
//// .keyup()
	// Binds an element or trigger to the "keyup" event
	$egInput.keyup(function() {
		//insert code
	});

//// .mousedown()
	// Binds an element or trigger to the "mousedown" event
	$egCanvas.mousedown(function() {
		//insert code
	});

//// .mousemove()
	// Binds an element or trigger to the "mousemove" event
	$egCanvas.mousemove(function() {
		//insert code
	});

//// .mouseup()
	// Binds an element or trigger to the "mouseup" event
	$egCanvas.mouseup(function() {
		//insert code
	});

//// .mouseleave()
	// Binds an element or trigger to the "mouseleave" event
	$egCanvas.mouseleave(function() {
		//insert code
	});

//// .on()
	// Attach an event handler to the selected elements.
	// !! When we bind an event handler jQuery only listens for those elements so when we add new new elements we need to use .on() !!
	$(".parent").on("click", "childen", function() {
		//insert code
	});






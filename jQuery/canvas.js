////	Using the Canvas	////
	//
	//	Select the HTML vs jQuery representation
	//	Controling lines
	//	Drawing lines

//// Select the HTML vs jQuery representation
	// Plain old JavaScript representation of a DOM element
	// Equivalent to document.getElementsByTagName("canvas")[0]
	// It has a special method we can call on the element
	$("canvas")[0]
	$("canvas")[0].getContext("2d")

//// Controling lines
		// We can controls the line with coordinates
		context.beginPath(); //beging the path
		context.moveTo(10, 10); //starts it at 10X 10Y
		context.lineTo(20, 10); // moved to the right 20X 10Y
		context.lineTo(20, 30);
		context.closePath(); // closes the path
		context.stroke(); // adds a stroke

//// Drawing lines
	// We can set the line coordinates to cursor location on the window
	$canvas.mousedown(function(e) {
		// get's the x, y location of the pointer
		lastEvent = e; 
		mouseDown = true;
	}).mousemove(function(e) {
		// only draw if the mouse if down
		if (mouseDown) { 
			context.beginPath();
			// starts the path where we first click
			context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
			// moves the line to the location of mousemove
			context.lineTo(e.offsetX, e.offsetY);
			// sets the stroke color to the cached color
			context.strokeStyle = color;
			context.stroke();
			lastEvent = e; //
		}
	}).mouseup(function() {
		mouseDown = false;
	}).mouseleave(function() {
		mouseDown = false;
		// $canvas.mouseup(); // trigger
	});
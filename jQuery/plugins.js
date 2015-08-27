//// jQuery - plugins ////


//// Examples
	// Vide - http://vodkabears.github.io/vide/
	// jCalculator - http://codepen.io/mariusbalaj/pen/bGqhI
	// Lightbox 2 - http://lokeshdhakar.com/projects/lightbox2/
	// jQuery UI - https://jqueryui.com/
	// Animsition - http://git.blivesta.com/animsition/

//// jQuery UI
	// Provides a full framework of user interface widgets, interations

//// Finding Plugins
	// http://www.sitepoint.com/jquery-popular-plugins-list/
	// http://www.unheap.com/

//// What to Look for?
	//	 A plugin that does what you need
	//	 Good documentation
	//	 Actively developed
	//	 Responsive friendly
	//	 Mobile friendly

//// Plugin Files Structure
	// Most jQery have the same file structure:
	//	 A CSS file
	//	 A JavaScript file
	//	 Images (icons)

//// Adding a Plugin
	// 1. Attach the CSS file before our own CSS styles
	// <link rel="stylesheet" href="js/animsition/animsition.min.css">
	// <link rel="stylesheet" href="css/main.css">
	// 2. Attach jQuery
	<script src="js/jquery-1.11.2.min.js"></script>
	// 3. Attach the plugin JavaScript file before our own JavaScript
	<script src="js/animsition/jquery.animsition.min.js"></script>
	// 4. Structure the HTML
	<div class="animsition"></div>
		<a href="work.html" class="animsition-link">Work</a>
	// 5. Add our own JavaScript
	<script src="js/main.js"></script>
	// 6. Select an element on the page using jQuery
	$(".animsition")
	// 7. Call the plugin function
	$(".animsition").animsition();

//// Plugin Options
	// Most plugin let you pass and object literal to customize it
	$(".animsition").animsition({
		// We can set which animations to run
		inClass               :   'fade-in-right-lg',
		outClass              :   'fade-out-right-lg',
		// We can set which elements to select
		linkElement           :   'header a',
		// We can set the speed
		inDuration            :    1500,
		outDuration           :    800,
	});

//// Plugin Classes
	// Often plugin add classes which we can use to style our elements
	.header {
		bacground-color: white;
		transition: 1s;
	}
	.is-sticky .header  {
		bacground-color: black;
	}
	// Sass
	.is-sticky .header {
		& { bacground-color: black; }
		& a { color: blue; }
	}

//// Plugin Events
	// Many plugin creators will add "events" to their plugins. You can add your own programming to respond to these events
	$('.header').sticky();
	// We use jQuery event handling feacture .on(), we then pass a string and an anonymous function
	$('.header').on('sticky-start', function() {
		//run code when header sticks to the window top

		// Changes the text
		$('.discription').html('we build <strong>great</strong> apps');
	}).on('sticky-end', function() {
		// Changes the text back to it's original
		$('.discription').html('we build apps');
	});

//// Debugging
	// When you add more than one plugin to a site, you may run into problems, developers tools can be a great tool for debugging

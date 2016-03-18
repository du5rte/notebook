////	Node.js - Express ////
	//
	//	framework
	//	Express.js
	//	Installing
	//	Using it
	//	Twitter callout
	//	Parsing Data



//// FrameWork
	// NodeJS it self is not a framework, it's very low level for designing server we might want to create a framework on top of it or use someone elses like express

//// Express.js
	// Is a small framework that sits on top of NodeJS, with a lot of code ready out the box to start building big Web Apps
	// "Sinatra inspired web development framework for NodeJS, insanely fast, flexible and simple"
	//			Easy route URLs to callbacks
	//			Middleware (from Connect)
	//			Environment based configuration
	//			Redirection helpers
	//			File Uploads

//// Installing
	// By using --save not only it installs express it also adds to our depedency
	$ npm install --save express
	
//// Useful Dependacies
	// express-generator will create the scaffolds for our application
	npm install -g express-generator
	express /*appName (optional)*/
	// Or we can give a few more properties like hogan (mustache templating) and sass with compass
	express sandbox --hogan -c compass
	// the generator won't download all the dependencies instead will put them in package.json we just need to run install
	npm install
	
	// Restaring node everytime we make a change can get annoying, 'There's an App for that', monitors node files
	npm install -g nodemon
	// We need to let to watch for changes
	nodemon
	
//// Using it
	// We need to require express in our app
	var express = require('express');
	// We create a instance of express by evoking express
	var app = express();
	// Now we can create our first end point, if someone doesn't submit a request (just '/'), we're going to give them index.html
	// __dirname = current directory
	app.get('/', function(request, response) {
		response.sendFile(__dirname + "/index.html");
	});
	app.listen(8080);


//// Twitter callout
  // We want to create a endpoint where we can submit an username and display their lastest 10 tweets
	// $ curl -s http://localhost:8080/tweets/eallam
	var express = require('express');
	var app = express();
  var request = require('request');
  var url = require('url');

  //tweets is the route definition, the collan means we have a dynamic username
  app.get('/tweets/:username', function(request, response) {
    //here's we take the username from the request parameters
    var username = req.params.username;
    
    //connecting to twitter's API and getting the 10 tweets from his timeline
    options = {
      protocol: "http:",
      host: 'api.twitter.com',
      pathname: '/1/statuses/user_timeline.json',
      query: {
        screen_name: username, 
        count: 10
      }
    }
    //we call our request with url.
    var twitterUrl = url.format(options);
    // the request will come back and we'll pipe it into the response
    request(twitterUrl).pipe(response);
  });

//// Parsing Data
	// The data won't be very pretty, so there's some work that needs to be done
	$ npm install prettyjson -g //will gives an executable
	// $ curl -s http://localhost:8080/tweets/eallam | prettyjson
	// Now we want to pass that data into our browser for that we'll need a templating library
	 // ejs = Embedded JavaScript, by default it will look for templates on views directory
	$ npm install --save ejs
	// back in our application instead of using pipe we're gonna give it a callback function so we can have access to the error, response and body
  app.get('/tweets/:username', function(request, response) {
    //here's we take the username from the request parameters
    var username = req.params.username;
    
    //connecting to twitter's API and getting the 10 tweets from his timeline
    options = {
      protocol: "http:",
      host: 'api.twitter.com',
      pathname: '/1/statuses/user_timeline.json',
      query: {
        screen_name: username, 
        count: 10
      }
    }
    //we call our request with url.
    var twitterUrl = url.format(options);
    //callback function so we can have access to the error, response and body
    request(twitterUrl, function(error, response, body){
			//parsing our data and storing it in tweets
			var tweets = JSON.parse(body);
			//we need to choose what we want to go into our template by setting a locals property
			response.locals = {tweets: tweets, name: username};
			//lastely we tell it which template we want it to render out
			response.render('tweets.ejs');
		});
  });
	// In /views/tweets.ejs
	<h1>Tweets for @<%= name %></h1>
	<ul>
		<%= tweets.forEach(function(tweet){ %>
			<li><%= tweet.text %></li>
		<% }); %>
	</ul>

	
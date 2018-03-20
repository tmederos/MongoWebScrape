// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
// Requiring our Note and Article models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");
var router = require( "./routes/router");

var PORT = 3000;

// Initialize Express
var app = express();
// Make public a static dir
// app.use(express.static(process.cwd() + "/public"));
// Serve static content for the app from the "public" directory in the application directory.
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// Use body parser with our app
app.use(bodyParser.urlencoded({
   extended: false
}));

// set up database
var db = process.env.MONGODB_URI || "mongodb://localhost/MongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(db, function(error) {
	if (error) {
		console.log(error);
	} else {
		console.log("mongoose connection is sucessful");
	}
});


//set engine and default for handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Have every request go through router middlewar
app.use(router);

//set port
var port = process.env.PORT || 3000;

//setup listener
app.listen(port, function() {
  console.log("app running on port " + port);
});

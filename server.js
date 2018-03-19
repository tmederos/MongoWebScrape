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

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/scraped_news");

var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection sucessful.");
});

//set engine and default for handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
console.log( "Default layout set to main.");
app.set("view engine", "handlebars");


// Have every request go through router middlewar
app.use(router);

//set port
var port = process.env.PORT || 3000;

//setup listener
app.listen(port, function() {
  console.log("app running on port " + port);
});

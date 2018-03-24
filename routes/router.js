var fetchController = require( "../controllers/fetch")
var notesController = require( "../controllers/notes")
var articlesController = require( "../controllers/articles")

// Import routes and give the server access to them.
var express = require("express");
var router = express.Router();   

  router.get("/", function(req, res) {
    res.render("index");
  });

  router.get("/saved", function(req, res) {
    res.render("saved");
  });

  router.get("/articles", function(req, res) {
		var query = {};
		if (req.query.saved) {
			query = req.query;
		}
    articlesController.getArticles(query)
      .then (function (data){
			res.json(data);
		});
	});

  // A GET request to scrape the NHL/Lightning website
  router.get("/scrape", function(req, res) {
    console.log( "In get /scrape");
    fetchController.scrapeHeadlines().then(function( articles ){
      res.json(articles)
    });
  });

	router.get("/notes/:article_id?", function(req, res) {
    var query = {};
  console.log( "In get Notes - " + req.params.article_id);  
		if (req.params.article_id) {
			query._id = req.params.article_id;
    }
    notesController.getNotes(query)
      .then (function (data){
      console.log("The Data - " + JSON.stringify(data, null,2 ) );  
      res.json(data);
		});
	});

  router.post("/notes/:article_id", function (req, res) {
    console.log( "New Note - ", req.body);
    notesController.insertNote(req.body, req.params.article_id )
    .then (function (data){
      console.log("Data - ", data );  
      res.json(data);
		}).catch(function(err){
      console.log(err);
    });
  });

  router.post("/articles", function (req, res) {
    articlesController.insertArticle(req.body)
    .then(function( article ){
      res.sendStatus(200);
    }).catch(function (err) {
      res.status(500).send('Couldn\'t save the article')
    });
  });

	router.delete("/articles/:id", function(req, res) {
		var query = {};
    query._id = req.params.id;
    articlesController.deleteArticle(query)
    .then (function (data){
      console.log("Data - ", data );  
      res.json(data);
		});
	});

module.exports = router;

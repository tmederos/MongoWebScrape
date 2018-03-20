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

  // A GET request to scrape the NHL/Lightning website
  router.get("/scrape", function(req, res) {
    console.log( "In get /scrape");
    fetchController.scrapeHeadlines().then(function( articles ){
      res.json(articles)
    });
  });

  router.get("/articles", function(req, res) {
		var query = {};
		if (req.query.saved) {
			query = req.query;
		}
		articlesController.getArticles(false)
    .then(function (error, data) {
      console.log("In Get Articles it worked !!!!!!!!!!!!!!!!!!");
      res.json(data);
    });
	});

  router.post("/notes", function (req, res) {
    console.log( "New Note - ", newNote);
    noteController.insertNote(req.body).then(function( note ){
      res.redirect("/notes/" + req.params.id);
    }).catch(function (err) {
      res.status(500).send('Couldn\'t create the note')
    });
  });

  router.post("/articles", function (req, res) {
    console.log("Data check of saved - " + req.saved);
    articlesController.insertArticle(req.body).then(function( article ){
      res.sendStatus(200);
    }).catch(function (err) {
      res.status(500).send('Couldn\'t save the article')
    });
  });


  // router.get("/notes/:id", function (req, res) {
  //   console.log("This is the req.params: " + req.params.id);
  //   Article.find({
  //           "_id": req.params.id
  //         })
  //   .populate("note")
  //   .exec(function (error, doc) {
  //       if (error) {
  //         console.log(error);
  //       }
  //       else {
  //         var notesObj = {
  //           Article: doc
  //         };
  //         console.log(notesObj);
  //         res.render("notes", notesObj);
  //       }
  //     });
  // });

  // router.get("/delete/:id", function (req, res) {
  //   Note
  //   .remove({
  //             "_id":req.params.id
  //           })
  //   .exec(function (error, doc) {
  //     if (error) {
  //       console.log(error);
  //     }
  //     else {
  //       console.log("note deleted");
  //       res.redirect("/" );
  //     }
  //   });
  // });

module.exports = router;

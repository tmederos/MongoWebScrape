var Article = require("../models/Article");
var scrape = require("../scripts/scrape");

function getArticles(query) {
  return Article.find(query);
 }

//  function getallArticles(cb) {
//   scrape(function(data) {
//     var articles = data;
//     for (var i=0; i<articles.length; i++) {
//       articles[i].saved = false;
//     }
//     Articles.collection.insertMany(articles, {ordered: false}, function(err, docs) {
//       cb(err, docs);
//     });
//   });
// }

function getOneArticle(){
  return Article.findOne({_id: req.params.id})
     //Populate all of the notes associated with it
    .populate("note")
    .exec(function (error, doc) {
        //execute the query
        if (error) console.log(error);
        // Otherwise, send the doc to the browser as a json object
        else {
          res.json(doc);
        }
    });
}


function deleteArticle(body) {
  return Article.remove({"_id": body.id})   
  .then(function (doc) {
    return(doc);
  });
}

function insertArticle( body ){
  return Article.create({ title: body.title, link: body.link, saved: true })
  .then(function (doc) {
    return(doc);
  });
}

// function insertArticle( body ){
//   var newArticle = new Article(body);
//   return Article.update({ _id: query.id }, {$set: {saved: query.saved}}, {})
//   .then(function (doc) {
//     console.log("In new Article, this is the DOC " + doc);
//     console.log("Article saved: " + doc);
//   });
// }

module.exports = {
    // getallArticles: getallArticles,
    getOneArticle: getOneArticle,
    getArticles: getArticles,
    deleteArticle: deleteArticle,
    insertArticle: insertArticle
}

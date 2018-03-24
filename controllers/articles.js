var Article = require("../models/Article");
var scrape = require("../scripts/scrape");

function getArticles(query) {
  return Article.find(query);
 }

function getOneArticle(query){
  return Article.findOne({_id: query.params.id})
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
  return Article.remove({"_id": body._id})   
  .then(function (err) {
    return(err);
  });
}

function insertArticle( body ){
  return Article.create({ title: body.title, link: body.link, saved: true })
  .then(function (doc) {
    return(doc);
  });
}

module.exports = {
    getOneArticle: getOneArticle,
    getArticles: getArticles,
    deleteArticle: deleteArticle,
    insertArticle: insertArticle
}

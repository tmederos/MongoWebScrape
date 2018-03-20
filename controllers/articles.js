var Article = require("../models/Article");

function getArticles(saved=false) {
  console.log( "In getArticles, saved - " + saved );
  return Article.find({saved:saved?true:false});
 }

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


function deleteArticle(_id) {
  return Article.remove({"_id": req.params.id}, function(err, newdoc){
    if(err) console.log(err);
    //redirect to reload the page
    res.redirect('/index');
  });
}

function insertArticle( body ){
  console.log("Body in Insert ", body);
  return Article.create({ title: body.title, link: body.link, saved: true }).then(function (doc) {
 

    console.log("In new Article, this is the DOC " + doc);
    // console.log("Article saved: " + doc);
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
    getOneArticle: getOneArticle,
    getArticles: getArticles,
    deleteArticle: deleteArticle,
    insertArticle: insertArticle
}

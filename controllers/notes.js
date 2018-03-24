var Note = require("../models/Note");
var Article = require("../models/Article");

function getNotes(query) {
  return Article.findOne({"_id": query._id}).populate('notes').
  then(function(doc){
    console.log( "In notes, doc ", doc );
    return(doc.notes);
  });
 }

function insertNote( body, article_id ){
  var newNote = new Note(body);
  return newNote.save()
  .then(function (doc) {
    console.log("this is the DOC " + doc);
  return Article.findOneAndUpdate({"_id": article_id},
      { $push: { "notes": doc._id } }, {new: true})
  }).then(function (doc) {
          console.log("note saved: " + doc);
     return(doc);     
  });
}

module.exports = {
    getNotes: getNotes,
    insertNote: insertNote
}

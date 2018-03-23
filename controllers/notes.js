var Note = require("../models/Note");
var Article = require("../models/Article");

function getNotes(query) {
  return Note.find(query);
 }

function getOneNote (_id) {
  return Note.findOne({_id: req.params.id})
          .populate("note") //Populate all of the notes associated with it
          .exec(function (error, doc) { //execute the query
              if (error) console.log(error);
              // Otherwise, send the doc to the browser as a json object
              else {
                 res.json(doc);
              }
          });
  };

// function insertNote(body) {
//   console.log("Body in Insert Note", body);
//   return Note.create({ body: body.body}).then(function (doc) {
//      console.log("In new Note, this is the DOC " + doc);
//     return(doc);
//   });
// }

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
    getOneNote: getOneNote,
    getNotes: getNotes,
    // deleteOneNote: deleteOneNote,
    insertNote: insertNote
}

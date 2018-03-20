var Note = require("../models/Note");

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

function getAllNotes () {
  return Note.find({});
}

function insertNote( body ){
  var newNote = new Note(body);
  return newNote.save().then(function (doc) {
    console.log("this is the DOC " + doc);
  return Article.findOneAndUpdate({"_id": req.params.id},
      { $push: { "note": doc._id } }, {new: true})
  }).then(function (doc) {
          console.log("note saved: " + doc);
  });
}



module.exports = {
    getOneNote: getOneNote,
    getAllNotes: getAllNotes,
    // deleteOneNote: deleteOneNote,
    insertNote: insertNote
}

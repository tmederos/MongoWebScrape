$(document).ready(function() {

	var articleContainer = $(".article-container");
	$(document).on("click", ".btn.delete", handleArticleDelete);
	$(document).on("click", ".btn.notes", handleArticleNotes);
	$(document).on("click", ".btn.save", handleNoteSave);
	$(document).on("click", ".btn.note-delete", handleNoteDelete);
	
	initPage();

	function initPage() {
		articleContainer.empty();
		$.get("/articles?saved=true").then(function(data) {
				if (data && data.length) {
					renderArticles(data);
				} else {
					renderEmpty();
				}
			}).fail(function(err){
				console.log(err);
			});
	}

	function renderArticles(articles) {
		var articlePanels = [];
		for (var i = 0; i < articles.length; i++) {
			articlePanels.push(createPanel(articles[i]));
		}
		articleContainer.append(articlePanels);
	}

	function createPanel(article) {
		var panel = 
		$(["<div class='panel panel-primary'>",
			"<div class='panel-heading'>",
			"<h3>",
			article.title,
			"<a class='btn btn-danger delete'>",
			"Delete from Saved",
			"</a>",
			"<a class='btn btn-info notes'>Article Notes</a>",
			"</h3>",
			"</div>",
			"<div class='panel-body'>",
			article.link,
			"</div>",
			"</div>"
			].join(""));
		panel.data("_id", article._id);
		return panel;
	}

	function renderEmpty() {
		var emptyAlert =
		$(["<div class='alert alert-warning text-center'>",
			"<h4>No saved articles.<h4>",
			"</div>",
			"<div class='panel panel-default'>",
			"<div class='panel-heading text-center'>",
			"<h3>View available articles?</h3>",
			"</div>",
			"<div class='panel-body text-center'>",
			"<h4><a href='/'>Browse Articles</a></h4>",
			"</div>",
			"</div>"
			].join(""));
		articleContainer.append(emptyAlert);
	}


	function renderNotesList (data) {
console.log("In Render Notes - ");				
		var notesToRender = [];
		var currentNote;
		if (!data.notes.length) {
console.log("No Notes - ");			
			currentNote = [
			"<li class='list-group=item'>",
			"No notes for this article yet.",
			"</li>"
			].join("");
			notesToRender.push(currentNote);
		} else {
			for (var i = 0; i < data.notes.length; i++) {
				currentNote = $([
					"<li class='list-group-item note'>",
					data.notes[i].noteText,
					"<button class='btn btn-danger note-delete'>x</button>",
					"</li>"
					].join(""));
				currentNote.children("button").data("_id", data.notes[i]._id);
				notesToRender.push(currentNote);
			}
		}
		$(".note-container").append(notesToRender);
	}


	function handleArticleDelete() {
		var articleToDelete = $(this).parents(".panel").data();
		articleToDelete.saved = true;
		$.ajax({
			method: "DELETE",
			url: "/articles/" + articleToDelete._id
		}).then(function(data){
			if (data.ok) {
				initPage();
			}
		});
	}

	function handleArticleNotes() {
		console.log("Top of Handle Notes - ");				
		var currentArticle = $(this).parents(".panel").data();
		$.get("/notes/" + currentArticle._id).then(function(data) {
				var modalText = [
			"<div class='container-fluid text-center'>",
			"<h4>Notes for Article: ",
			currentArticle._id,
			"</h4>",
			"<hr />",
			"<ul class='list-group note-container'>",
			"</ul>",
			"<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
			"<button class='btn btn-success save'>Save Note</button>",
			"</div>"
			].join("");
			bootbox.dialog({
				message: modalText,
				closeButton: true
			});
			var noteData = {
				_id: currentArticle._id,
				notes: data || []
			};
			$(".btn.save").data("article", noteData);
			renderNotesList(noteData);
		});
	}

	function handleNoteSave() {
		var noteData;
		var newNote = $(".bootbox-body textarea").val().trim();
		if (newNote) {
			var _id = $(this).data("article")._id;
			noteData = {
				body: newNote
			};
			$.post("/notes/" + _id, noteData).then(function(){
				bootbox.hideAll();
			});
		}
	}

	function handleNoteDelete() {
		var noteToDelete = $(this).data("_id");
		$ajax({
			url: "/notes/" + noteToDelete,
			method: "DELETE",
		}).then(function() {
			bootbox.hideAll();
		});
	}

});
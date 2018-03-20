$(document).ready(function() {
  console.log("top of app.js");

	var articleContainer = $(".article-container");

  initPage();

	function initPage() {
		articleContainer.empty();
		$.get("/articles")
			.then(function(data) {
				if (data && data.length) {
					renderArticles(data);
				} else {
					renderEmpty();
				}
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
			"<a class='btn btn-success save'>",
			"Save Article",
			"</a>",
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
			"<h4>No new articles.<h4>",
			"</div>",
			"<div class='panel-body text-center'>",
			"<h4><a class='scrape-new'>Scrape new articles</a></h4>",
			"<h4><a href='/saved'>Saved articles</a></h4>",
			"</div>"
			].join(""));
		articleContainer.append(emptyAlert);
	}

	function handleArticleSave() {
		var articleToSave = $(this).parents(".panel").data();
		articleToSave.saved = true;
		$.ajax({
			method: "PATCH",
			url: "/article",
			data: articleToSave
		})
		.then(function(data){
			if (data.ok) {
				initPage();
			}
		});
  }

$(".scrape").click(function(event) {
  event.preventDefault();
  $.get("/scrape").then(function(data) {
    bootbox.alert("<h3 class='text-center m-top-80'>" + "Scraped " + data.length + " Lightning Hockey articles!" + "<h3>"
      , function(result) {
    });
    data.forEach(function( article ){
      var row = $(`<div class="row">`)
      var panel = $(`<div class="panel panel-primary">`)
      var panelHead = $(`<div class="panel-heading">${article.title}</div>`)
      var panelBody = $(`<div class="panel-body">`)
      var link = $(`<a href= "https://www.nhl.com/${article.link}" target="_blank" id="link"> ${article.link}</a>`)
      // Populate buttons for scraped articles
      var button = $("<button type=\"button\" class=\"btn btn-secondary save-article\" >Save Article</button>")
      .click(function(){
            $.ajax({
                method: "POST",
                url: "/articles",
                data: article
            }).then(function(data) {
              console.log( "Article saved in app.js")
            });
      })
      row.append(panel);
      panel.append(panelHead).append(panelBody);
      panelHead.append(button);
      panelBody.append(link);
      $('.article-container').append(row);
    })
  }).fail(function (err) {
    console.log('failed get /scrape', err)
  });
});
  
//When the button "Save Article"is clicked
  $(".save-article").click(function() {
    console.log( "In save article")
      var articleToSave = {};
      articleToSave.id = $(this).data("id");
      articleToSave.saved = true;
      $.ajax({
          method: "POST",
          url: "/articles",
          data: articleToSave
      }).then(function(data) {
        console.log( "AHHHHHHHH##############################################" )
      });
      console.log( "YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY" )
  });

});

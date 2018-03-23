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

    $(document).on("click", ".btn.save", handleArticleSave);

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
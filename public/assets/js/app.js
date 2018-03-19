  console.log('file is loaded');

  $(".scrape").click(function(event) {
    console.log( "In Scrape");
      event.preventDefault();
      $.get("/scrape").then(function(data) {
        console.log(data);
        bootbox.alert("<h3 class='text-center m-top-80'>" + "Scraped " + data.length + " articles!" + "<h3>"
          , function(result) {
        });
        data.forEach(function( article ){
          var row = $(`<div class="row">`)
          var panel = $(`<div class="panel panel-primary">`)
          var panelHead = $(`<div class="panel-heading">${article.title}</div>`)
          var panelBody = $(`<div class="panel-body">`)
          var link = $(`<a href= "https://www.nhl.com/${article.link}" target="_blank" id="video"> ${article.link}</a>`)
          // Populate buttons for scraped articles
          var button = $("<button type=\"button\" class=\"btn btn-warning save-article\" >Save Article</button>")
          .click(function(){
                console.log( "In save article")
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
        console.log('failed get /scrape')
        console.log(err)
      });
  });

// When the button "See Notes"is clicked
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
        console.log( "Article saved in app.js")
          // location.reload();
      });
  });


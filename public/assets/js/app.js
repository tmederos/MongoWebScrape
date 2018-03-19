$(document).ready(function() {

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

// When the button "Save Article"is clicked
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
  });

});

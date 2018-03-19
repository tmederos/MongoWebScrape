var request = require("request-promise");
var cheerio = require("cheerio");

function scrape(){
    // First, we grab the body of the html with request
    return request("https://www.nhl.com/lightning/")
     .then(function( html ){
      const resultsArr = [];
     // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(html);
      // Now, we grab every h2 within an article tag, and do the following:
      $("h4.headline-link").each(function(i, element) {
        // Save an empty result object
        var result = {};
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this).text();
        result.link = $(this).parent("a").attr("href");
        resultsArr.push(result);
      });
      console.log("Successfully Scraped");
      return resultsArr;
    });
}

module.exports = scrape;


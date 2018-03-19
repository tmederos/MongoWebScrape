const Article = require("../models/Article.js");
const scrape = require("../scripts/scrape")


module.exports = {
  scrapeHeadlines: function() {
     return scrape()
  }
}

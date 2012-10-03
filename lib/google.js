var request = require('request')
  , cheerio = require('cheerio')
  , fs = require('fs')
  , querystring = require('querystring')
  , util = require('util');


var linkSel = 'h3.r a'
  , descSel = 'div.s'
  , itemSel = 'li.g'
  , nextSel = 'td.b a span';

var URL = 'http://www.google.com/search?hl=en&q=%s&start=%s&sa=N&num=%s';

function google(query, callback) {  
    igoogle(query, 0, callback);  
}

google.resultsPerPage = 10;

var igoogle = function(query, start, callback) {
  if (google.resultsPerPage > 100) google.resultsPerPage = 100; //Google won't allow greater than 100 anyway

  var newUrl = util.format(URL, querystring.escape(query), start, google.resultsPerPage);
  request(newUrl, function(err, resp, body) {
    if ((err == null) && resp.statusCode === 200) {
      var $ = cheerio.load(body)
        , links = []
        , text = [];
      
      $(itemSel).each(function(i, elem) {
        var linkElem = $(elem).children(linkSel).first()
          , descElem = $(elem).children(descSel).first()
          , item = {title: $(linkElem).text(), link: null, description: null}
          , qsObj = querystring.parse($(linkElem).attr('href'));
        
        if (qsObj['/url?q']) item.link = qsObj['/url?q'];
        
        $(descElem).remove('div');
        item.description = $(descElem).text();
        
        links.push(item);
      });

      var nextFunc = null;
      if ($(nextSel).last().text() === 'Next'){
        nextFunc = function() {
          igoogle(query, start + google.resultsPerPage, callback); 
        }
      }
      
      callback(null, nextFunc, links);
    } else {
      callback(new Error('Error on response.'), null, null);
    }
  });
}

module.exports = google;



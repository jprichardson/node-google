var request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs'),
    querystring = require('querystring'),
    util = require('util');

var linkCSSSel = 'h3.r a', descCSSSel = 'div.s';
var itemCSSSel = 'li.g', nextCSSSel = 'td.b a span';

var URL = 'http://www.google.com/search?hl=en&q=%s&start=%s&sa=N';

var google = function(query, start, callback) {
  var newUrl = util.format(URL, querystring.escape(query), start);
  request(newUrl, function(err, resp, body) {
    if ((err == null) && resp.statusCode === 200) {
      //fs.writeFile('/tmp/google.html', body, function(){});
      var $ = cheerio.load(body);
      var links = []; var text = [];
      $(itemCSSSel).each(function(i, elem) {
        var item = {title: null, link: null, description: null};
        var linkElem = $(elem).children(linkCSSSel).first();
        item.title = $(linkElem).text();
        var qsObj = querystring.parse($(linkElem).attr('href'));
        if (qsObj['/url?q']) {
          item.link = qsObj['/url?q'];
        }
        var descElem = $(elem).children(descCSSSel).first();
        $(descElem).remove('div');
        item.description = $(descElem).text();
        links.push(item);
      });

      var nextFunc = null;
      //console.log('S: ' + start);
      if ($(nextCSSSel).last().text() === 'Next'){
        nextFunc = function() {
          google(query, start + 10, callback); 
        }
      }
      callback(null, nextFunc, links);
    } else {
      callback(new Error('Error on response.'), null, null);
    }
  });
}


module.exports = function(query, callback) {  
  google(query, 0, callback);  
};



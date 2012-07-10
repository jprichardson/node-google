var google = require('../lib/google');
var assert = require('assert');

var T = function(expr){ assert(expr); };
var F = function(expr){ assert(!expr); };

describe('+ google()', function(){
  it('should return search results', function(done){
    var nextCounter = 0;
    var allLinks = [];
    var query = "Microsoft";

    var finished = function(){
      //console.log(allLinks.length);
      T(allLinks.length >= 30);
      var flags = 0x0;
      for (var i = 0; i < allLinks.length; ++i) {
        var link = allLinks[i];
        if (link.title && link.link) {
          if (link.title.indexOf('Wikipedia')) {
            flags |= 0x1;
          }
          if (link.link.indexOf('microsoft.com')){
            flags |= 0x2;
          }
          if (link.link.indexOf('twitter.com/Microsoft')){
            flags |= 0x4;
          }
          if (link.title.indexOf('Microsoft Corporation')){
            flags |= 0x8;
          }
          if (link.title.indexOf('Microsoft Store')){
            flags |= 0x10;
          }
        }
      }

      T(flags === 31); //all flags above set properly

      done();
    }


    google(query, function(err, next, links){
      //console.log('L: ' + links.length);
      allLinks = allLinks.concat(links);
      /*
      for (var i = 0; i < links.length; ++i) {
        var link = links[i];
        console.log(link.title + ' - ' + link.link);
        console.log(link.description)
        console.log('')
      }*/
      if (nextCounter < 2) {
        if (next) {
          nextCounter += 1;
          next();
        } else {
          finished();
        }
      } else {
        finished();
      }
    });
  });
}); 

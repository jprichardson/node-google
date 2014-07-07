Node.js - google
=====================

[![build status](https://secure.travis-ci.org/jprichardson/node-google.png)](http://travis-ci.org/jprichardson/node-google)

This module allows you to search google by scraping the results. It does NOT use the Google Search API. PLEASE DO NOT ABUSE THIS. The intent of using this is convenience vs the cruft that exists in the Google Search API.

This is not sponsored, supported, or affiliated with Google Inc.



Installation
------------

    npm install [-g] google



API Example
-------

This prints out the first 50 search results of the query `node.js best practices`.

```javascript
var google = require('google');

google.resultsPerPage = 25;
var nextCounter = 0;

google('node.js best practices', function(err, next, links){
  if (err) console.error(err);
  	
  for (var i = 0; i < links.length; ++i) {
    console.log(links[i].title + ' - ' + links[i].link); //link.href is an alias for link.link
    console.log(links[i].description + "\n");
  }

  if (nextCounter < 4) {
    nextCounter += 1;
    if (next) next();
  }

});
```



CLI
---

You can use the `google` package as a command line program as well. Just specify the `-g` flag when installing. The command line version outputs CSV data in the following format:

    "{{HREF}}","{{TITLE}}","{{DESCRIPTION}}"

### Usage

    
    Usage: google [options]

    Options:

      -h, --help                    output usage information
      -V, --version                 output the version number
      -q, --query <query>           Search query.
      -p, --pages [num]             Number of pages to search. defaults to 5
      -n, --results-per-page [num]  Number of results per page. defaults to 100


### Example

    google -q "node.js best practices" -p 1 -n 10

outputs...

    "http://www.slideshare.net/the_undefined/nodejs-best-practices-10428790","Node.js - Best practices","Dec 2, 2011 ... Second talk given at the munich node.js user group meeting on Dec 1, 2011."
    "http://www.quora.com/Node-js/What-are-the-best-practices-for-node-js","Node.js: What are the best practices for node.js? - Quora","Node Express Boilerplate (https://github.com/mape/node-exp...) combines a lot of   the best practices for asset-packing, authentication, error handling, etc. If I were ..."
    "http://news.ycombinator.com/item?id=3169240","Ask N: node.js best practices? | Hacker News","Oct 28, 2011 ... Database migrations and testing are a few of the areas where Rails has a clearly   defined best practice, but things seem murkier on the node.js ..."
    "http://www.wilcoxd.com/whitepapers/node_js/","Node.js best practices - Wilcox Development Solutions","So, when evaluating node.js for use in a potential project, I asked around for the   node.js best practices. I didn't get as much discussion as I was hoping for."
    "http://stackoverflow.com/questions/10869108/node-js-best-frameworks-and-best-practices","mvc - Node Js best Frameworks and best practices - Stack Overflow","Check out Express, it's popular. High performance, high class web development   for Node.js. And express-mvc-bootstrap can help too. Application ..."
    "http://stackoverflow.com/questions/11922773/node-js-boilerplate-best-practices","javascript - node.js boilerplate + best practices - Stack Overflow","IMHO, for a project skeleton, more important than which modules to include (  those are easy to install with npm, anyway) is how to structure your ..."
    "http://stackoverflow.com/questions/11311672/building-a-website-using-node-js-best-practice","php - Building a website using node.js - best practice - Stack Overflow","To start with the bad news: As node.js is a pretty young technique, I think you'll   find that the proces of creating a full fledged website and ..."
    "http://www.tumblr.com/ZGeLvx3Kjwh6","Best Practice - nodeJS: an experience","nodeJS: an experience I just spent about 4 hours diving into node seriously for   the first time. It is very cool, very slick, and very fast � but it has poor ..."
    "http://serverfault.com/questions/274857/how-to-use-node-js-as-a-production-web-server","How to use node.js as a production web server? - Server Fault","May 28, 2011 ... I'm currently developing a project using node, and as I'm approaching ... The   gurus of node.js best practice are Ryan Dahl and Isaac Schlueter."
    "http://joyent.com/blog/how-to-create-your-own-node-js-module","How To: Create Your Own Node.js Module - Blog - Joyent","Feb 28, 2011... thorough primer on how to get started coding up a module for Node.js. ... IRC   and the Node.js Google Group, and best practices including the ..."




Test
----

    npm test


Contributors
------------

* [JP Richardson](https://github.com/jprichardson)
* [Antonio Cancio](https://github.com/cancio)
* [Mike Anderson](https://github.com/cambridgemike)
* [ithil](https://github.com/ithil)


License
-------

Licensed under MIT. See `LICENSE` for more details.

Copyright (c) 2012-2013 JP Richardson


Node.js - google
=====================

This module allows you to search google by scraping the results. It does NOT use the Google Search API. PLEASE DO NOT ABUSE THIS. The intent of using this is convenience vs the cruft that exists in the Google Search API.

This is not sponsored, supported, or affiliated with Google Inc.


Installation
------------

    npm install google



Example
-------

This prints out the first 50 search results of the query `node.js best practices`.

```javascript
var google = require('google');

var nextCounter = 0;

google('node.js best practices', function(err, next, links){
  if (err) {
  	console.error(err);
  } else {
  	for (var i = 0; i < links.length; ++i) {
  	  console.log(links[i].title + ' - ' + links[i].link);
  	  console.log(links[i].description + "\n");
  	}

  	if (nextCounter < 4){
      nextCounter += 1;
      if (next) {
        next();
      }
  	}

  }
});
```

Test
----

    npm test

or...

    mocha test

License
-------

Licensed under MIT. See `LICENSE` for more details.

Copyright (c) 2012 JP Richardson
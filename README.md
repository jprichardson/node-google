Node.js - google
=====================

[![build status](https://secure.travis-ci.org/jprichardson/node-google.png)](http://travis-ci.org/jprichardson/node-google)

This module allows you to search google by scraping the results. It does NOT use the Google Search API. **PLEASE DO NOT ABUSE THIS.** The intent of using this is convenience vs the cruft that exists in the Google Search API.

This is not sponsored, supported, or affiliated with Google Inc.

Please **do not** post an issue, email me, tweet me, or in anyway contact me about getting around Google blocking
your automated search requests. These sorts of requests are outside the scope of this module. **Google has every
right to block consumers of their service for any reason.** See: [#27](https://github.com/jprichardson/node-google/issues/27),
[#20](https://github.com/jprichardson/node-google/issues/20#issuecomment-74289023).

[![js-standard-style](https://raw.githubusercontent.com/feross/standard/master/badge.png)](https://github.com/feross/standard)


Installation
------------

    npm install --save google



API Example
-------

This prints out the first 50 search results of the query `node.js best practices`.

```js
var google = require('google')

google.resultsPerPage = 25
var nextCounter = 0

google('node.js best practices', function (err, res){
  if (err) console.error(err)

  for (var i = 0; i < res.links.length; ++i) {
    var link = res.links[i];
    console.log(link.title + ' - ' + link.href)
    console.log(link.description + "\n")
  }

  if (nextCounter < 4) {
    nextCounter += 1
    if (res.next) res.next()
  }
})
```


### Search Within a Time Span

You can specify results in a specific timeframe. Working values listed below:

```js
var google = require('google')

// assign one of the values below. Nothing is set by default.
google.timeSpan = 'h' // information indexed in the past hour
google.timeSpan = 'd' // information indexed in the past day
google.timeSpan = 'w' // information indexed in the past week
google.timeSpan = 'm' // information indexed in the past month
google.timeSpan = 'y' // information indexed in the past year
```


### Search Within Different Languages

You can also specify the TLD of the Google search page and the language.
If you change the language you must translate the next page results text to detect the corresponding link.

```js
var google = require('google')

google.lang = 'de'
google.tld = 'de'
google.nextText = 'Weiter'

google('node.js best practices', function (err, res){
  …
})
```


### Set Request Options

You can specify the options to be passed to request, see the [request module](https://github.com/request/request) for all available options.

```js
var google = require('google')

google.requestOptions = {
  proxy: 'http://user:password@192.168.5.4:80',
  timeout: 30000,
  localAddress: '127.0.0.1',
  jar: true,
  headers: {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'en;q=0.5',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'DNT': 1
  }
}

google('node.js best practices', function (err, res){
  …
})
```

### Setting the protocol

A 'http' or 'https' protocol can be specified after the google object has been created for queries. For example specifying 'http' will search google using the a http://www.google.com query where 'https' will use a https://www.google.com query. If no protocol is specified or any other protocol other then 'http' or 'https' is explicitly passed then this will be set to 'https' by default.

```js
var google = require('google')

google.protocol = 'http'  // searches google using http://www.google.com
google.protocol = 'https' // searches google using https://www.google.com

google('node.js best practices', function (err, res){
  …
})
```

The response object
-------

The provided callback will receive a response object as second argument, it has these properties:

- `url`: The URL requested from Google for this search and page
- `query`: The search provided on this call
- `start`: The index of the first link across the links of all pages
- `links`: An array with all the link objects
- `body`: The HTML of the loaded page
- `$`: A cheerio instance of the loaded page

Updating from 1.x
-------

The only backwards-incompatible change from 1.x is that the callback received 3 arguments:
```js
google('...', function (err, next, links) {
  links.forEach(function(link) { ... })
  if (next) next()
})
```

And it now receives a single `res` object. The above code should be rewritten to:
```js
google('...', function (err, res) {
  res.links.forEach(function(link) { ... })
  if (res.next) res.next()
})
```

License
-------

Licensed under MIT. See `LICENSE` for more details.

Copyright (c) 2012-2015 JP Richardson

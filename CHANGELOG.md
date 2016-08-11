2.1.0 / 2016-08-11
------------------
### Added
- `https` support

2.0.0 / 2016-03-09
------------------
- provide links, next and more attributes as a single response object, see: https://github.com/jprichardson/node-google/pull/38

1.5.0 / 2016-02-22
------------------
- use https, see: https://github.com/jprichardson/node-google/pull/35

1.4.0 / 2015-01-12
-----------------
- updated for new Google HTMl

1.3.0 / 2015-07-03
------------------
- allowed start parameter now, see: https://github.com/jprichardson/node-google/pull/29

1.2.0 / 2015-05-14
------------------
- added `timeSpan` option: https://github.com/jprichardson/node-google/pull/26#issuecomment-101983266

1.1.0 / 2015-04-05
------------------
- added option `nextText` for languages other than English https://github.com/jprichardson/node-google/pull/25

1.0.0 / 2015-03-24
------------------
- exposed all of `request` options https://github.com/jprichardson/node-google/pull/21
- extracted out CLI interface
- using [JavaScript Standard Style](https://github.com/feross/standard)
- upgrade `request` from `2.12.x` to `^2.54.0`
- upgrade `cheerio` from `0.10.8` to `^0.19.0`

0.6.0 / 2014-10-23
------------------
- added `proxy` field https://github.com/jprichardson/node-google/pull/16

0.5.0 / 2014-09-30
------------------
- bugfix: CSV quoting in the command line program. https://github.com/jprichardson/node-google/pull/12

0.4.0 / 2014-09-29
------------------
- add `tld` and `language` selection. https://github.com/jprichardson/node-google/pull/11

0.3.4 / 2014-07-28
------------------
* bugix: when `resp` is `undefined/null` calling `resp.statuCode` is another error [#9](https://github.com/jprichardson/node-google/pull/9)

0.3.3 / 2014-07-07
------------------
* bugfix: search result titles [#8](https://github.com/jprichardson/node-google/pull/8)

0.3.2 / 2013-08-14
------------------
* add debugging for errors

0.3.1 / 2013-06-21
------------------
* Fixed bug that had the descriptions showing "Cached" at the start. @cancio [#4]

0.3.0 / 2013-03-29
------------------
* upgrade to `cheerio 0.10.8`
* fixed element traversal bug: see https://github.com/MatthewMueller/cheerio/issues/167

0.2.0 / 2013-01-22
------------------
* Fixed Cheerio dependency bug. Stuck at version 0.10.4
* Aliased `link.link` to `link.href`.
* Made command line `google` program.

0.1.0 / 2012-10-03
------------------
* Added `resultsPerPage`.
* Upgraded `cheerio` dep.

0.0.1 / 2012-07-10
------------------
* Inital release.

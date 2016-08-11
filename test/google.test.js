var assert = require('assert')
var google = require('../lib/google')

/* global describe, it */

describe('+ google()', function () {
  it('should return search results', function (done) {
    var nextCounter = 0
    var allLinks = []
    var query = 'Microsoft'

    var finished = function () {
      assert(allLinks.length > 20)
      var flags = 0x0
      for (var i = 0; i < allLinks.length; ++i) {
        var link = allLinks[i]
        // console.dir(link)
        if (link.title && link.link) {
          if (link.title.indexOf('Wikipedia')) {
            flags |= 0x1
          }
          if (link.link.indexOf('microsoft.com')) {
            flags |= 0x2
          }
          if (link.link.indexOf('twitter.com/Microsoft')) {
            flags |= 0x4
          }
          if (link.title.indexOf('Microsoft Corporation')) {
            flags |= 0x8
          }
          if (link.title.indexOf('Microsoft Store')) {
            flags |= 0x10
          }
        }

        assert.equal(link.description.indexOf('Cached'), -1)
      }

      // console.log(flags)
      assert.equal(flags, 31) // all flags above set properly

      done()
    }

    google(query, function (err, res) {
      assert.ifError(err)
      assert.equal(res.query, 'Microsoft')
      assert.equal(typeof res.$, 'function')
      assert.equal(typeof res.body, 'string')
      assert.equal(typeof res.url, 'string')
      assert.equal(res.start, nextCounter * google.resultsPerPage)
      assert.equal(typeof res.links, 'object')
      assert.ok(res.links.length <= google.resultsPerPage)
      // console.log('L: ' + links.length)
      allLinks = allLinks.concat(res.links)
      if (nextCounter < 2) {
        if (res.next) {
          nextCounter += 1
          res.next()
        } else {
          finished()
        }
      } else {
        finished()
      }
    })
  })

  describe('when resultsPerPage is set', function () {
    it('should return search results', function (done) {
      var allLinks = []
      var query = 'Microsoft'

      var finished = function () {
        assert(allLinks.length > 90)
        done()
      }

      google.resultsPerPage = 100
      google(query, function (err, res) {
        assert.ifError(err)
        assert.equal(res.query, 'Microsoft')
        assert.equal(typeof res.$, 'function')
        assert.equal(typeof res.body, 'string')
        assert.equal(typeof res.url, 'string')
        assert.equal(res.start, 0)
        assert.equal(typeof res.links, 'object')
        assert.ok(res.links.length <= google.resultsPerPage)
        allLinks = allLinks.concat(res.links)
        // console.log(allLinks.length)
        finished()
      })
    })
  })

  describe('when timeSpan is set', function () {
    it('each time-based query should return search results', function (done) {
      var allLinks = []
      var query = 'Microsoft'
      var timeFrame = 'm'

      var finished = function () {
        // TODO: investigate why it's only 8 and not 10 here
        assert(allLinks.length === 8)
        done()
      }

      google.resultsPerPage = 10
      google.timeSpan = timeFrame
      google(query, function (err, res) {
        assert.ifError(err)
        assert.equal(res.query, 'Microsoft')
        assert.equal(typeof res.$, 'function')
        assert.equal(typeof res.body, 'string')
        assert.equal(typeof res.url, 'string')
        assert.equal(res.start, 0)
        assert.equal(typeof res.links, 'object')
        assert.ok(res.links.length <= google.resultsPerPage)
        allLinks = allLinks.concat(res.links)
        finished()
      })
    })
  })

  describe('when nextText and lang are set', function () {
    it('should return next page search results', function (done) {
      var nextCounter = 0
      var allLinks = []
      var query = 'Microsoft'

      var finished = function () {
        assert(allLinks.length > 25)
        done()
      }

      google.resultsPerPage = 25
      google.lang = 'it'
      google.nextText = 'Avanti'
      google(query, function (err, res) {
        assert.ifError(err)
        allLinks = allLinks.concat(res.links)
        if (nextCounter < 2) {
          if (res.next) {
            nextCounter += 1
            res.next()
          } else {
            finished()
          }
        } else {
          finished()
        }
      })
    })
  })

  describe('when start is set', function () {
    it('optional start parameter should return search results', function (done) {
      var allLinks = []
      var query = 'Microsoft'
      var timeFrame = 'm'

      var finished = function () {
        assert(allLinks.length === 10)
        done()
      }

      google.resultsPerPage = 10
      google.timeSpan = timeFrame
      google(query, 2, function (err, res) {
        assert.ifError(err)
        assert.equal(res.query, 'Microsoft')
        assert.equal(typeof res.$, 'function')
        assert.equal(typeof res.body, 'string')
        assert.equal(typeof res.url, 'string')
        assert.equal(res.start, 2)
        assert.equal(typeof res.links, 'object')
        assert.ok(res.links.length <= google.resultsPerPage)
        allLinks = allLinks.concat(res.links)
        finished()
      })
    })
  })
})

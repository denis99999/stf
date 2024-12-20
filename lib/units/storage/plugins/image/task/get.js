/**
* Copyright © 2024 contains code contributed by Orange SA, authors: Denis Barbaron - Licensed under the Apache license 2.0
**/

var util = require('util')
var stream = require('stream')
var url = require('url')

var Promise = require('bluebird')
var request = require('@cypress/request')

module.exports = function(path, options) {
  return new Promise(function(resolve, reject) {
    var res = request.get(url.resolve(options.storageUrl, path))
    var ret = new stream.Readable().wrap(res) // Wrap old-style stream

    res.on('response', function(res) {
        if (res.statusCode !== 200) {
          reject(new Error(util.format('HTTP %d', res.statusCode)))
        }
        else {
          resolve(ret)
        }
      })
      .on('error', reject)
  })
}

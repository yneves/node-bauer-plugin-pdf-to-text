// - -------------------------------------------------------------------- - //

"use strict";

var fs = require("fs");
var assert = require("assert");
var Crawler = require("bauer-crawler");

var crawler = new Crawler();

crawler.loadPlugin(__dirname + "/../../");

crawler.ready(function() {
  
  this.promise()
    .pdfToText(__dirname + "/sample.pdf")
    .then(function(file) {
      var output = fs.readFileSync(file).toString();
      var compare = fs.readFileSync(__dirname + "/sample-compare.txt").toString();
      assert.deepEqual(output,compare);
      fs.unlinkSync(file);
    })
    .exit();
  
  
});

crawler.start();

// - -------------------------------------------------------------------- - //

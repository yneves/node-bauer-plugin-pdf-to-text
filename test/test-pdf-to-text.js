// - -------------------------------------------------------------------- - //

"use strict";

var cp = require("child_process");
var assert = require("assert");

// - -------------------------------------------------------------------- - //

describe("pdf-to-text",function() {

  it("require",function() {
    require(__dirname + "/../lib/promise.js");
    require(__dirname + "/../lib/master.js");
    require(__dirname + "/../lib/worker.js");
    require(__dirname + "/../lib/index.js");
  });
  
  it("pdftotext",function(done) {
    var proc = cp.spawn("node",[__dirname + "/sample/sample.js"],{ stdio: "pipe" });
    var output = "";
    proc.stdout.on("data",function(data) {
      output += data.toString("utf8");
    });
    var error = "";
    proc.stderr.on("data",function(data) {
      error += data.toString("utf8");
    });
    proc.on("exit",function() {
      assert.equal(error,"");
      done();
    });
  });
  
});

// - -------------------------------------------------------------------- - //

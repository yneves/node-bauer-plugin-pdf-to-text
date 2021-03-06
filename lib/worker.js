/*!
**  bauer-plugin-pdf-to-text -- Plugin for bauer-crawler to convert pdf into text.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-plugin-pdf-to-text>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var factory = require("bauer-factory");
var path = require("path");
var Cache = require("bauer-cache");
var Exec = require("bauer-exec");

// - -------------------------------------------------------------------- - //

module.exports = function(worker,config) {
  
  var exec = new Exec(config.exec);
  
  worker.on("request",function(options,response) {
    
    var input = new Cache({ file: options.source });
    var source = input.getFile();
    
    var outputFile = {
      file: {
        dir: path.dirname(source),
        name: path.basename(source,path.extname(source))
      }
    };
    var outputOptions = factory.merge(options.cache,outputFile,config.cache);
    var output = new Cache(outputOptions);
    
    output.validate(function(error,valid) {
      if (error) {
        response.sendError(error);
      } else if (valid) {
        response.sendOk({ file: output.getFile() });
      } else {
        
        input.exists(function(error,exists) {
          if (error) {
            response.sendError(error);
            
          } else if (exists) {
            
            var params = {
              input: input.getFile(),
              output: output.getFile()
            };
            
            exec.exec(params,function(error,stdout,stderr) {
              if (error) {
                response.sendError(error);
              } else {
                console.log(stdout,stderr);
                response.sendOk({ file: output.getFile() });
              }
            });
            
          } else {
            response.sendError(new Error("input not found"));
          }
        });
      }
    });
    
  });
  
  worker.sendReady();
  
};

// - -------------------------------------------------------------------- - //

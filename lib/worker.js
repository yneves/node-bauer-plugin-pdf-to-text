/*!
**  bauer-crawler-pdf-to-text -- Plugin for bauer-crawler to convert pdf into text.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-crawler-pdf-to-text>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var cp = require("child_process");
var path = require("path");
var Cache = require("bauer-cache");
var Exec = require("bauer-exec");
var merge = require("lodash/object/merge");

// - -------------------------------------------------------------------- - //

module.exports = function(worker,config) {
  
  var exec = new Exec(config.exec);
  
  worker.on("request",function(options,response) {
    
    var input = new Cache({
      file: options.source
    });
    var source = input.getFile();
    
    var output = new Cache(merge(config.cache,options.cache,{
      file: {
        dir: path.dirname(source),
        name: path.basename(source,path.extname(source))
      }
    }));
    
    output.exists(function(error,exists) {
      if (error) {
        response.sendError(error);
        
      } else if (exists) {
        
        output.expired(function(error,expired) {
          if (error) {
            response.sendError(error);
            
          // cache expired, make http request
          } else if (expired) {
            
            doConvert(exec,input,output,options,response);
            
          // reuse cache
          } else {
            response.sendOk({
              file: output.getFile()
            });
          }
        });
          
      // cache does not exists, make http request
      } else {
        
        doConvert(exec,input,output,options,response);
        
      }
    });
    
  });
  
  worker.send({ ready: true });
  
};

// - -------------------------------------------------------------------- - //

function doConvert(exec,input,output,options,response) {

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
          
          response.sendOk({
            file: output.getFile()
          });
        }
      });
      
    } else {
      response.sendError(new Error("input not found"));
    }
  });
}

/*!
**  bauer-crawler-pdf-to-text -- Plugin for bauer-crawler to convert pdf into text.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-crawler-pdf-to-text>
*/
// - -------------------------------------------------------------------- - //

"use strict";

module.exports = {
  
  name: "pdfToText",
  
  config: {
    workers: 1,
    exec: {
      cmd: {
        linux: {
          ia32: __dirname + "/../bin/pdftotext-linux-ia32",
          x64: __dirname + "/../bin/pdftotext-linux-x64"
        },
        darwin: {
          ia32: __dirname + "/../bin/pdftotext-darwin-ia32",
          x64: __dirname + "/../bin/pdftotext-darwin-x64"
        },
        win32: {
          ia32: __dirname + "/../bin/pdftotext-win32-ia32",
          x64: __dirname + "/../bin/pdftotext-win32-x64"
        }
      },
      args: ["$input$","$output$"],
      opts: {
        timeout: 2000
      }
    },
    cache: {
      json: false,
      expires: "10y",
      file: {
        dir: ".",
        ext: "txt"
      }
    }
  },
  
  worker: __dirname + "/worker.js",
  master: __dirname + "/master.js",
  promise: __dirname + "/promise.js"
  
};

// - -------------------------------------------------------------------- - //

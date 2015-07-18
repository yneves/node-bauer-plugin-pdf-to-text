/*!
**  bauer-crawler-pdf-to-text -- Plugin for bauer-crawler to convert pdf into text.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-crawler-pdf-to-text>
*/
// - -------------------------------------------------------------------- - //

"use strict";

module.exports = {
  
  pdfToText: {
    
    // .pdfToText() :Promise
    0: function() {
      return this.then(function(source) {
        return this.promise().pdfToText(source);
      });
    },
    
    // .pdfToText(source String) :Promise
    s: function(source) {
      return this.then(function() {
        return this.promise().pdfToText({
          source: source
        });
      });
    },
    
    // .pdfToText(options Object) :Promise
    o: function(options) {
      return this.then(function() {
        return this.requestWorker("pdfToText",options).get('file');
      });
    }
    
  }
      
};

// - -------------------------------------------------------------------- - //

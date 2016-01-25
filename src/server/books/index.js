'use strict';

/**
 * books module
 */

 module.exports = function (app) {
	  var booksModel = require('./models');
	  var routes = require('./routes')(app);
}
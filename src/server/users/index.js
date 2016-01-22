'use strict';

/**
 * Module dependencies
 */

 module.exports = function (app) {
  // User Routes
  var userModel = require('./models');
  var routes = require('./routes')(app);
}
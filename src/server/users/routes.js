'use strict';


module.exports = function (app) {
  // User Routes
  var users = require('./controller');

  // Setting up the users password api
  app.route('/api/auth/signup').post(users.signup);
  app.route('/api/auth/signin').post(users.signin);
  app.route('/api/auth/signout').get(users.signout);
  app.route('/api/auth/session').get(users.session);

  // app.route('/api/auth/books').get(users.);
}
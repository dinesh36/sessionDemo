'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

/**
 * Signup
 */
exports.signup = function (req, res,next) {
  // Init user and add missing fields
  var user = new User(req.body);

  // Then save the user
  user.save(function (err) {
    if (err) {
      res.status(400);
      res.json(err);
    } else {
        req.session.isLogin = 'Y';
        res.json(user);
    }
  });
};

/**
 * Signin after passport authentication
 */
exports.signin = function (req, res, next) {
    var user = req.body;
    User.findOne({email:user.email,password:user.password})
    .exec(function(err,user){
      if(err){
          res.status(404);
          res.json(err);
      } else {
          if(!user){
              res.status(404);
              res.json({message:'user not found'});
              return;
          }
          req.session.isLogin = 'Y';
          res.json(user);
      }
    });
};

exports.session = function (req, res, next) {
    if(req.session.isLogin=='Y'){
        console.log('logged in');
        res.status(200);
    } else {
        res.status(401);
        res.send({message:'not authorized'});
    }
};



/**
 * Signout
 */
exports.signout = function (req, res) {
    req.session.destroy();
    res.json({message:'signout success'});
};
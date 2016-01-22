/*jshint node:true*/
'use strict';


//default modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compress = require('compression');
var session = require('express-session')
var cors = require('cors');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 7200;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/loginTest');

app.use(session({
    secret: 'Tr3s@t@2o14',
    name: 'TRESATASESSIONID',
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: false,
        maxAge: 900000
    },
    rolling: true,
    unset: 'destroy',
    // store: new mongoStore({ mongooseConnection: mongoose.connection })
}));

var environment = process.env.NODE_ENV;
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(compress());            // Compress response data with gzip
app.use(logger('dev'));
app.use(favicon(__dirname + '/favicon.ico'));

//user defined modules
var users = require('./users')(app);

//authentication middleware
app.use(function(req,res,next){
    console.log('inside the auth middleware')
    console.log(req.session.isLogin);
    if(req.session.isLogin){
        next();
    } else {
        res.status(401);
        res.send({message:'unauthorized'});
    }
});

//temp middleware
app.route('/api/books').get(function(req,res){
    res.send([{book1:'1'},{book2:'2'},{book3:'3'}]);
});



app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname  +
        '\nprocess.cwd = ' + process.cwd());
});

var express = require('express');
var app = express();
var cors = require('cors');
var http = require('http');
var bodyParser = require('body-parser');
var request = require('request');

app.use(express.static('.'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = 8889;
app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname  +
        '\nprocess.cwd = ' + process.cwd());
});

app.all('/api/*',function(req,res,next){
	console.log('this is the api call');
	console.log(req.body);
	CallTreeWrapperAPI(req,res);
})

function CallTreeWrapperAPI(req,res){
    var options={ method:req.method, qs:req.query, params:req.params };
    if(req.method!='GET' && req.body!=undefined){
        options['json']=req.body;
    }

    if(req.header('Cookie')){
    	options['headers']={'Cookie':req.header('Cookie')};
    }
    
    // var url = Utils.checkSSL();
    var url = 'http://192.168.0.13:7200';
    console.log('calling api for the path :: ' +   url+req.path);
    console.log('with options :: '+ JSON.stringify(options));

    request(url+req.path,options,function(err,response,body){
        if(err){
        	res.status(500);
            res.send(err);
        }
        console.log(response.headers);
        res.header('set-cookie',response.headers['set-cookie']);
        res.status(response.statusCode);
        res.send(body);
    });
}
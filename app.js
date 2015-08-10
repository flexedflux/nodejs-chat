var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
app.set('port', 3000);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.use(function (req, res, next) {
	if (req.url === '/') {
		res.end('hello');
	} else {
		next();
	}
});
app.use(function (req, res, next) {
	if (req.url === '/test') {
		res.end('Test');
	} else {
		next();
	}
});
app.use(function (req, res, next) {
	if (req.url === '/forbidden') {
		next(new Error('Access denied!'));
	} else {
		next();
	}
});
app.use(function (req, res) {
	res.send(404, 'Page Not Found');
});
app.use(function (err, req, res, next) {
	if (app.get('env') === 'development') {
		var errorHandler = express.errorHandler();
		errorHandler(err, req, res, next);
	} else {
		res.send(500, 'Internal Server Error!');
	}
});
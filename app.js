var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');
var log = require('./libs/log')(module);
var HttpError = require('./error').HttpError;

var app = express();

app.engine('ejs', require('ejs-locals'));
app.set('port', config.get('port'));
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');

app.use(express.favicon());
if (app.get('env') === 'development') {
	app.use(express.logger('dev'));
} else {
	app.use(express.logger('default'));
}

app.use(express.bodyParser());

app.use(express.cookieParser());

app.use(require('./middleware/sendHttpError'));

app.use(app.router);

require('./routes')(app);

app.use(express.static(path.join(__dirname, 'public')));

http
	.createServer(app)
	.listen(config.get('port'), function(){
  	log.info('Express server listening on port ' + config.get('port'));
});
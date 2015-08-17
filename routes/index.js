var User = require('../models/user').User;
var HttpError = require('../error').HttpError;

module.exports = function (app) {
	app.get('/', function (req, res, next) {
		res.render('index');
	});

	
	app.get('/users', function (req, res, next) {
		User.find({}, function (err, users) {
			if (err) return next(err);
			res.json(users);
		});
	});

	app.get('/users/:id', function (req, res, next) {
		User.findById(req.params.id, function (err, user) {
			if (err) return next(err);
			if (!user) next(new HttpError(404, 'User not found'));
			res.json(user);
		});
	});

	app.use(function (err, req, res, next) {
		if (typeof err == 'number') {
			err = new HttpError(err);
		}

		if (err instanceof HttpError) {
			res.sendHttpError(err);
		} else {
			if (app.get('env') === 'development') {
				express.errorHandler()(err, req, res, next);
			} else {
				log.error(err);
				err = new HttpError(500);
				res.sendHttpError(err);
			}
		}
	});
		
};
var models = require('./models');
var Category = models.Category;
var categorys;

module.exports = function(req, res, next) {
	if (categorys) {
		req.categorys = categorys;
		next();
		return;
	}
	Category
		.find()
		.exec(function(err, cs) {
			if (err) {
				err.status = 500;
				next(err);
				return;
			}
			req.categorys = categorys = cs;
			next();
		});
};
var models = require('./models');
var Category = models.Category;

exports.setter = function() {
  return function(req, res, next) {
    if (exports.categorys) {
      req.categorys = exports.categorys;
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
        req.categorys = exports.categorys = cs;
        next();
      });
  };
};

exports.updateCategory = function(cb) {
  Category
    .find()
    .exec(function(err, cs) {
      if (err) {
        cb(err);
        return;
      }
      exports.categorys = cs;
      cb(null, cs);
    });
};

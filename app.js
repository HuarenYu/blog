var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var nunjucksFilters = require('./lib/nunjucksfilters');

var globalVariables = require('./lib/globalvariables');
var routes = require('./routes/index');
var post = require('./routes/post');
var category = require('./routes/category');

var app = express();

// view engine setup
var nunjucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader('views'), {
  autoescape: true
});
nunjucksFilters(nunjucksEnv);
nunjucksEnv.express(app);

// set cookie and session middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'static')));

// set global variables
app.use('*', globalVariables.setter());

// set routes
app.use('/', routes);
app.use('/post', post);
app.use('/category', category);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.html', {
    message: err.message,
    error: {}
  });
});

// set port
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

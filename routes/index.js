var express = require('express');
var router = express.Router();
var models = require('../libs/models');

var Post = models.Post;

router.get('/', function(req, res, next) {
	Post.findByPage(req, function(err, pageObj) {
		if (err) {
			next(err);
			return;
		}
		req.title = '博客首页';
		req.index = true;
		req.pageObj = pageObj;
		res.render('post/list.html', req);
	});
});

router.get('/about', function(req, res, next) {
	Post.findOne({
		_id: 2
	}, function(err, p) {
		if (err) {
			err.status = 500;
			next(err);
			return;
		}
		if (!p) {
			var e = new Error();
			e.status = 404;
			next(e);
			return;
		}
		req.title = p.title;
		req.post = p;
		req.about = true;
		res.render('post/post.html', req);
	});
});

module.exports = router;
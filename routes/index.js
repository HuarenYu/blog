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
		req.pageObj = pageObj;
		res.render('post/list.html', req);
	});
});

module.exports = router;
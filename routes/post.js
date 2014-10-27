var express = require('express');
var router = express.Router();
var auth = require('../libs/auth');
var models = require('../libs/models');
var async = require('async');
var marked = require('marked');

var Category = models.Category;
var Post = models.Post;

router.get('/list', function(req, res, next) {
	Post.findByPage(req, function(err, pageObj) {
		if (err) {
			next(err);
			return;
		}
		req.title = '文章列表';
        req.pageObj = pageObj;
        res.render('post/list.html', req);
	});
});

router.get('/detail/:id', function(req, res, next) {
	var postId = req.params.id;
	Post.findOne({
		_id: postId
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
		res.render('post/post.html', req);
	});
});

router.get('/create', auth, function(req, res, next) {
	req.title = '发布文章';
	res.render('post/create.html', req);
});

router.post('/create', auth, function(req, res, next) {
	var post = new Post({
		title: req.body.title,
		content: req.body.content,
		contentCompiled: marked(req.body.content),
		excerpt: req.body.excerpt,
		createDate: new Date(),
		category: req.body.category,
		tags: []
	});

	async.waterfall([

		function(cb) {
			models.genId('posts', function(err, id) {
				if (err) {
					cb(err);
					return;
				}
				cb(null, id);
			});
		},
		function(id, cb) {
			post._id = id.id;
			post.save(function(err, p) {
				if (err) {
					cb(err);
					return;
				}
				cb(null, p);
			});
		}
	], function(err, p) {
		if (err) {
			err.status = 500;
			next(err);
			return;
		}
		res.redirect('/post/detail/' + p._id);
	});
});

router.get('/admin', auth, function(req, res, next) {
	Post.findByPage(req, function(err, pageObj) {
		if (err) {
			next(err);
			return;
		}
		req.title = '文章管理';
        req.pageObj = pageObj;
        res.render('post/admin.html', req);
	});
});

module.exports = router;
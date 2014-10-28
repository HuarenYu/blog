var express = require('express');
var async = require('async');
var router = express.Router();
var auth = require('../libs/auth');
var models = require('../libs/models');
var globalVariables = require('../libs/globalvariables');

var Category = models.Category;

router.get('/admin', auth, function(req, res, next) {
	Category.find().exec(function(err, cs) {
		req.title = '分类管理';
		req.cs = cs;
		res.render('category/admin.html', req);
	});
});

router.post('/create.json', auth, function(req, res, next) {
	async.waterfall([

		function(cb) {
			models.genId('categorys', function(err, idObj) {
				if (err) {
					cb(err);
					return;
				}
				cb(null, idObj);
			});
		},
		function(idObj, cb) {
			var category = new Category({
				_id: idObj.id,
				name: req.body.name
			});
			category.save(function(err, c) {
				if (err) {
					cb(err);
					return;
				}
				cb(null, c);
			});
		},
		function(c, cb) {
			globalVariables.update(function(err, cs) {
				if (err) {
					cb(err);
					return;
				}
				cb(null, c, cs);
			});
		}
	], function(err, c, cs) {
		if (err) {
			err.status = 500;
			next(err);
			return;
		}
		res.json({
			status: 'ok',
			message: '创建成功',
			response: c
		});
	});
});

router.post('/edit.json', auth, function(req, res, next) {
	var categoryId = req.body._id;
	Category.findOneAndUpdate({
		_id: categoryId
	}, {
		name: req.body.name
	}, function(err, c) {
		if (err) {
			err.status = 500;
			next(err);
			return;
		}
		res.json({
			status: 'ok',
			message: '编辑成功！',
			response: c
		});
	});
});

router.get('/remove.json', auth, function(req, res, next) {
	var categoryId = req.query.id;
	Category.findOneAndRemove({
		_id: categoryId
	}, function(err, c) {
		if (err) {
			err.status = 500;
			next(err);
			return;
		}
		res.json({
			status: 'ok',
			message: '删除成功！',
			response: c
		});
	});
});

module.exports = router;
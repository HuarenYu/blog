var model = require('./models');
var async = require('async');

var Category = model.Category;
var Post = model.Post;
var Id = model.Id;

var c1 = new Category({
	_id: 1,
	name: 'Javascript&Node.js'
});

var c2 = new Category({
	_id: 2,
	name: 'HTML&CSS'
});

var c3 = new Category({
	_id: 3,
	name: 'HTTP'
});

var c4 = new Category({
	_id: 4,
	name: '后端技术'
});

var c5 = new Category({
	_id: 5,
	name: '前端构建'
});

var c6 = new Category({
	_id: 6,
	name: '随笔'
});

async.map([c1, c2, c3, c4, c5, c6],
	function(c, cb) {
		c.save(function(err, result) {
			if (err) {
				cb(err);
				return;
			}
			cb(null, result);
		});
	},
	function(err, results) {
		results.forEach(function(c) {
			console.log(c);
		});
	});

var cid = new Id({
	_id: 1,
	collectionName: 'categorys',
	id: 6
});
var pid = new Id({
	_id: 2,
	collectionName: 'posts',
	id: 0
});

async.map([cid, pid], function(id, cb) {
	id.save(function(err, result) {
		if (err) {
			cb(err);
			return;
		}
		cb(null, result);
	});
}, function(err, results) {
	results.forEach(function(c) {
		console.log(c);
	});
});
var model = require('./models');
var async = require('async');

var Category = model.Category;
var Post = model.Post;
var Id = model.Id;


var cid = new Id({
	_id: 1,
	collectionName: 'categorys',
	id: 0
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
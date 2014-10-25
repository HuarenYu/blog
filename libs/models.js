var async = require('async');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');

var models = {};

//类型
models.Category = mongoose.model('Category', {
    _id: Number,
    name: String
});

//标签
models.Tag = mongoose.model('Tag', {
    _id: Number,
    name: String
});

//帖子
var Post = models.Post = mongoose.model('Post', {
    _id: Number,
    title: {
        type: String,
        required: '文章标题不能为空！'
    },
    content: {
        type: String,
        required: '文章内容不能为空！'
    },
    contentCompiled: String,
    excerpt: String,
    createDate: Date,
    category: {
        type: Number,
        ref: 'Category'
    },
    tags: [{
        type: Number,
        ref: 'Tag'
    }]
});

Post.findByPage = function(req, callback) {
    var size = 5;
    var page = parseInt(req.query.page || 1);
    var category = req.query.category;

    async.waterfall([

        function(cb) {
            //查询帖子总数
            var count = Post.where();
            if (category) {
                count.where('category').equals(category);
            }
            count.count(function(err, total) {
                if (err) {
                    cb(err);
                    return;
                }
                cb(null, total);
            });
        },
        function(total, cb) {
            if (total < 1) {
                cb(null, {
                    total: total,
                    posts: [],
                    totalPage: 1,
                    page: page,
                    category: category
                });
                return;
            }
            //总页数
            var totalPage = Math.ceil(total / size);
            if (page < 1) {
                page = 1;
            } else if (page > totalPage) {
                page = totalPage;
            }
            //查询当前页的帖子
            var query = Post.find();
            if (category) {
                query.where('category').equals(category);
            }
            query
                .skip((page - 1) * size).limit(size)
                .sort('-createDate')
                .exec(function(err, posts) {
                    if (err) {
                        cb(err);
                        return;
                    }
                    cb(null, {
                        total: total,
                        posts: posts,
                        totalPage: totalPage,
                        page: page,
                        category: category
                    });
                });
        }
    ], function(err, pageObj) {
        if (err) {
            err.status = 500;
            callback(err);
            return;
        }
        callback(null, pageObj);
    });
}

//集合id维护
models.Id = mongoose.model('Id', {
    _id: Number,
    collectionName: String,
    id: Number
});

//id生成函数
models.genId = function(collectionName, callback) {
    models.Id.findOneAndUpdate({
        collectionName: collectionName
    }, {
        $inc: {
            id: 1
        }
    }, callback);
}

module.exports = models;
var mongoose = require('mongoose');
var Blog = mongoose.model('Post');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.PostListById = function(req,res){
    Blog
        .find()
        .exec(function(err, blog) {
            if (!blog) {
                sendJsonResponse(res, 404, {
                    "message": "posts not found"}
                    );
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, blog);
        });
}


module.exports.PostReadOne = function(req, res) {
    if (req.params && req.params.postid) {
        Blog
            .findById(req.params.postid)
            .exec(function(err, blog) {
                console.log("where is");
                if (!blog) {
                    sendJsonResponse(res, 404, {
                        "message": "postid not found"}
                        );
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, blog);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No postid in request"}
            );
    }
};

module.exports.PostCreate = function(req, res) {

    Blog.create({

        author_name : req.body.author_name,
	      title : req.body.title,
	      postBlog : req.body.postBlog,

    }, function(err,postB){
        if(err){
            console.log(err);
            sendJsonResponse(res,400,err);
        }else {
            console.log(postB);
            sendJsonResponse(res,201,postB);
        }
    });
};

module.exports.PostUpdateOne = function(req, res) {
    if (!req.params.postid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, postid is required"}
            );
        return;
    }

   Blog
        .findById(req.params.postid)
        .select('-comments')
        .exec(
            function(err, postB) {
                if (!postB) {
                    sendJsonResponse(res, 404, {
                        "message": "publishid not found"}
                        );
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }

                post.author_name = req.body.author_name;
		            post.title = req.body.title;
		            post.postBlog = req.body.postBlog;


                post.save(function(err, postB) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, postB);
                    }
                });
        }
    );
};


module.exports.PostDeleteOne = function(req, res) {
    var postid = req.params.postid;

    if (postid) {
       Blog
            .findByIdAndRemove(postid)
            .exec(
                function(err, postB) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    sendJsonResponse(res, 204, null);
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "No postid"}
            );
    }
};

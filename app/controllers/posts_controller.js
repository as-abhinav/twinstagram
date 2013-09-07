load('application');

before(loadPost, {
    only: ['show', 'edit', 'update', 'destroy']
    });

action(function create() {
    Post.create(req.body.Post, function (err, post) {
        respondTo(function (format) {
            if (err) {
                send({code: 500, error: post && post.errors || err});
            } else {
                send({code: 200, data: post.toObject()});
            }
        });
    });
});

action(function index() {
    this.title = 'Posts index';
    Post.all(function (err, posts) {
        send({code: 200, data: posts});
    });
});

action(function show() {
    this.title = 'Post show';
    send({code: 200, data: this.post});
});

action(function update() {
    var post = this.post;
    this.title = 'Edit post details';
    this.post.updateAttributes(body.Post, function (err) {
        if (err) {
            send({code: 500, error: post && post.errors || err});
        } else {
            send({code: 200, data: post});
        }
    });
});

action(function destroy() {
    this.post.destroy(function (error) {
        if (error) {
            send({code: 500, error: error});
        } else {
            send({code: 200});
        }
    });
});

function loadPost() {
    Post.find(params.id, function (err, post) {
        if (err || !post) {
            if (!err && !post) {
                return send({code: 404, error: 'Not found'});
            }
            redirect(path_to.posts);
        } else {
            this.post = post;
            next();
        }
    }.bind(this));
}

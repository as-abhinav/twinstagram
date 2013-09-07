module.exports = function (compound, Post) {
	Post.validatesPresenceOf("image");

	Post.beforeCreate = function(next, post) {
		post.published_on = new Date();
		next();
	};
};
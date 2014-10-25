module.exports = function(req, res, next) {
	var authToken = req.get('Authorization');
	if (!authToken) {
		res
			.status(401)
			.set('WWW-authenticate', 'Basic realm="Login required"')
			.end();
		return;
	}
	var tmp = new Buffer(authToken.substring(6), 'base64').toString();
	if (!tmp) {
		res
			.status(401)
			.send('Permission denided.')
			.end();
	}
	var userInfo = tmp.toString().split(':');
	var name = userInfo[0];
	var pwd = userInfo[1];
	if (name === 'admin' && pwd === 'admin') {
		next();
		return;
	}
	res
		.status(401)
		.send('Permission denided.')
		.end();
};
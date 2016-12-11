var bcrypt = require('bcrypt');
var Promise = require('promise');

exports.cryptPassword = function (password) {
	return new Promise((resolve, reject) => {

		bcrypt.genSalt(10, (err, salt) => {

			if (err) { reject(err); return; }

			bcrypt.hash(password, salt, (err, hash) => {
				if (err) { reject(err); return }

				resolve(hash);
			});
		});
	});
};

exports.comparePassword = function (password, userPassword) {
	return new Promise((resolve, reject) => {
	
		bcrypt.compare(password, userPassword, (err, isPasswordMatch) => {

			if (err || !isPasswordMatch) { reject(err || isPasswordMatch); return; }

			resolve(true);
		});
	});
};
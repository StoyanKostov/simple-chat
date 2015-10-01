const mysql = require('mysql'),
	bcrypt = require('bcrypt'), // https://github.com/ncb000gt/node.bcrypt.js/
	validation = require.main.require('./validation'),
	db = require.main.require('./data/db');

function registerUser(newUser){
	return new Promise(function(resolve, reject){
		// validation goes here
		if (!validation.user.isValidString(newUser.username)) {
			reject('Please type username!');
		}

		if (!validation.user.isValidString(newUser.password)) {
			reject('Please type password!');
		}

		if (!validation.user.isValidString(newUser.passwordRe)) {
			reject('Please confirm your password!');
		}

		if (newUser.password !== newUser.passwordRe) {
			reject('Your password confirmation does not match!');
		}

		// hash pass
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(newUser.password, salt, function(err, hash) {
				// Store hash in DB.
				db.getConnection("INSERT INTO users (username, password) VALUES ('"+ newUser.username + "','" + hash + "')", function(result){
					resolve(result.insertId);
				});
			});
		});
	});
};

function getUserByName(user){

	return new Promise(function(resolve, reject){
		// validation goes here
		if (!validation.user.isValidString(user.username)) {
			reject('Please type username!');
		}

		if (!validation.user.isValidString(user.password)) {
			reject('Please type password!');
		}

		// get user from DB
		db.getConnection("SELECT * FROM users WHERE username LIKE '" + user.username + "' LIMIT 1", function(result){
				var dbUser = result[0];

				if (!validation.user.isDefined(dbUser)) {
					var reason = "Hello, " + user.username + "! You don't have registration!";
					reject(reason);
				} else {
					// Compare hashed pass from DB with inputed password
					bcrypt.compare(user.password, dbUser.password, function(err, res) {
						if (res) {
							resolve(dbUser);
						} else {
							var reason = "Hello, "+ user.username +"! You have typed wrong password!";
							reject(reason);
						}
					});
				}
		});
	});
};

module.exports = {
	registerUser: registerUser,
	getUserByName: getUserByName
};
var Joi = require('joi'),
	bcrypt = require('bcrypt');

function UserModel(name, pass, email){
	this.name = name;
	this.pass = pass;
	this.email = email;
};

UserModel.prototype = {
	encryptPass: function(user) {
		var hashedPass;
		// hash pass
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(user.password, salt, function(err, hash) {
				hashedPass = hash;
			});
		});

		return hashedPass;
	}
};

module.exports = UserModel;
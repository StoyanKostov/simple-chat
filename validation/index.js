userValidation = {
	isDefined: function(val){
		if (typeof val !== 'undefined') {
			return true;
		}

		return false;
	},
	hasLength: function(val, len){
		if (val.length >= len) {
			return true;
		}

		return false;
	}
}


module.exports = {
	user: userValidation
};
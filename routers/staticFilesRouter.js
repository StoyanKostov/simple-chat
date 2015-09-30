const Path = require('path');

// Serve static files
module.exports = [
	{
		method: 'GET',
		path: '/node_modules/{param*}',
		handler: {
			directory: {
				path: Path.normalize(__dirname + '/node_modules')
			}
		}
	},
	{
		method: 'GET',
		path: '/public/{param*}',
		handler: {
			directory: {
				path: Path.normalize(__dirname + '/public')
			}
		}
	}
];
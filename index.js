const hapi = require('hapi'),
	server = new hapi.Server(),
	Path = require('path');

server.connection({
	host: 'localhost',
	port: 8123
});

module.exports = server;

server.register([
		{
			register: require('inert')
		},
		{
			register: require('hapi-marko'),
			options: {
				templatesDir: __dirname + '/templates'
			}
		},
		{
			register: require('hapi-auth-cookie')
		}
	],
	function (err) {
		if (err) {
			console.log('Failed loading plugin: ', err);
		}

		server.auth.strategy('session-strategy', 'cookie', {
			password: 'my-secret',
			cookie: 'chat-cookie',
			redirectTo: '/login',
			isSecure: false
		});
});

// User routes
server.route(require('./routers/usersRouter.js'));

// Serve static files
server.route([
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
]);

// Start server
server.start(function(){
	console.log('Server running at: ', server.info.uri);
});
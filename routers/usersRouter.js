const io = require.main.require( './socketio' ),
	userController = require.main.require( './controllers/user' );

module.exports = [
	{
		method: 'GET',
		path:'/',
		handler: function (request, reply) {
			//request.auth.session.clear();
			return reply.redirect('/home');
		}
	},
	{
		method: '*',
		path:'/logout',
		handler: function (request, reply) {
			request.auth.session.clear();
			return reply.redirect('/login');
		}
	},
	{
		method: 'GET',
		path:'/home',
		handler: function (request, reply) {
			return reply.marko('index', {title: 'home'});
		},
		config: {
			auth: 'session-strategy',		
		}
	},
	{
		method: 'GET',
		path:'/register',
		handler: function (request, reply) {
			return reply.marko('register', {title: 'Register'});
		}
	},
	{
		method: 'POST',
		path:'/register-user',
		handler: function (request, reply) {
			userController.registerUser(request.payload)
				.then(function(){
					return reply.redirect('/chat');
				})
				.catch(
					function(reason) {
						reply.marko('register', {title: 'Register', notification: reason});
				});
		}
	},
	{
		method: 'GET',
		path:'/login',
		handler: function (request, reply) {
			if (request.auth.isAuthenticated) {
				return reply.redirect('/chat');
			}

			return reply.marko('login', {title: 'Log In'});
		}
	},
	{
		method: 'POST',
		path:'/login-user',
		handler: function (request, reply) {
			if (request.auth.isAuthenticated) {
				return reply.redirect('/chat');
			}

			userController.getUserByName(request.payload)
				.then(function(account){
					request.auth.session.set(account);
					return reply.redirect('/chat');
				})
				.catch(
					// Rejected promises are passed on by Promise.prototype.then(onFulfilled)
					function(reason) {
						reply.marko('login', {title: 'Log In', notification: reason});
						//console.log('Handle rejected promise (' + JSON.stringify(reason) + ') here.');
				});
		}
	},
	{
		method: 'GET',
		path:'/chat',
		handler: function (request, reply) {
			var username = request.auth.credentials.username;
			io.use(function (socket, next) {
				if (request.auth.isAuthenticated) {
					socket.userName = username;
					next();
				} else {
					next('Authentication Failed');
				}
			});

			return reply.marko('chat-main', {title: 'Chat started', username: username});
		},
		config: {
			auth: 'session-strategy',
		}
	}
];
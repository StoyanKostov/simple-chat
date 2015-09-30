const io = require.main.require( './socketio' ),
	data = require.main.require( './data' ),
	validation = require.main.require( './validation' );

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
		config: {
			auth: 'session-strategy',		
			handler: function (request, reply) {
				return reply.marko('index', {title: 'home'});
			}
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
			const payloadUsername = request.payload.username,
				payloadPassword = request.payload.password;
				payloadPasswordRe = request.payload.passwordRe;

			data.registerUser({username: payloadUsername, password: payloadPassword})
				.then(function(){
					return reply.redirect('/chat');
				})
				.catch(
					// Rejected promises are passed on by Promise.prototype.then(onFulfilled)
					function(reason) {
						console.log('Handle rejected promise (' + reason + ') here.');
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

			const payloadUsername = request.payload.username,
				payloadPassword = request.payload.password;

			if (!validation.user.isDefined(payloadUsername)) {
				return reply.marko('login', {title: 'Log In', notification: 'Missing username'});
			}

			if (!validation.user.isDefined(payloadPassword)) {
				return reply.marko('login', {title: 'Log In', notification: 'Missing password'});
			}

			data.getUserByName(payloadUsername)
				.then(function(user){
					if (!validation.user.isDefined(user)) {
						return reply.marko('login', {title: 'Log In', notification: 'Invalid user'});
					}

					if (user.password !== payloadPassword) {
						return reply.marko('login', {title: 'Log In', notification: 'Invalid password'});
					}

					return {
						id: user.id,
						username: user.username,
						password: user.password,
					};
				})
				.then(function(account){
					request.auth.session.set(account);
					return reply.redirect('/chat');
				})
				.catch(
					// Rejected promises are passed on by Promise.prototype.then(onFulfilled)
					function(reason) {
						console.log('Handle rejected promise (' + JSON.stringify(reason) + ') here.');
				});
		}
	},
	{
		method: 'GET',
		path:'/chat',
		config: {
			auth: 'session-strategy',
			handler: function (request, reply) {
				const username = request.auth.credentials.username;

				io.use(function (socket, next) {
					if (request.auth.isAuthenticated) {
						socket.userName = username;
						next();
					} else {
						next('Authentication Failed');
					}
				});

				return reply.marko('chat-main', {title: 'Chat started', username: username});
			}
		}
	}
];
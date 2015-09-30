const server = require('../index'),
	io = require('socket.io')(server.listener);

io.on('connection', function(socket){
	const USER_NAME = socket.userName;
	//socket.user = account;
	var message = {};
	message.msg = "I have connected...";
	message.userName = USER_NAME;
	socket.broadcast.emit('message', message);

	socket.on('message', function(chatMessage){
		var message = {};
		message.msg = chatMessage;
		message.userName = USER_NAME;
		io.emit('message', message);
	});

	socket.on('disconnect', function(){
		var message = {};
		message.msg = "I have disconnected...";
		message.userName = USER_NAME;
		socket.broadcast.emit('message', message);
	});
});

module.exports = io;
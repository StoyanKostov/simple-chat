(function (argument) {
    var socket = io(),
		chatMessage = document.getElementById('chat-message'),
		chatMessageSend = document.getElementById('chat-message-send');
		messages = document.getElementById('messages');

	// Send message to the others
	chatMessageSend.addEventListener('click', function(){
		socket.emit('message', chatMessage.value);
		chatMessage.value = '';
	});

	// Add message to the DOM
	socket.on('message', function(message){
		console.log('msg', message);
		var node = document.createElement('li');
		node.innerHTML = '<span><b>'+ message.userName +' <small>said:</small></b> </span>' + message.msg;
		messages.appendChild(node);
	});
}());
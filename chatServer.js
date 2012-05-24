var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);

app.use(express.static(__dirname));
app.listen(3000);

io.sockets.on('connection', function(socket){
	
	//when the server gets a new chat message from the client
	socket.on('sendchat', function(data){
		//it tells all clients to update their chats
		io.sockets.emit('updatechat', data);
	});

});
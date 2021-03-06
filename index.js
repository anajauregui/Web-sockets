var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  io.emit('loggedIn', 'user is connected')

  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });

  socket.on('disconnect', () => {
    io.emit('loggedOut', 'user disconnected')
  });

  socket.on('user-typing',  (message) => {
    io.emit('currently-typing', message)
  })

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

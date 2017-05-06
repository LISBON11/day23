var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/in', function(req, res){
  res.sendFile(__dirname + '/in.html');
});

app.get('/out', function(req, res){
  res.sendFile(__dirname + '/out.html');
});

app.get('/day21', function(req, res){
  res.sendFile(__dirname + '/days/day21.html');
});


var y = 0;

io.on('connection', function(client) {
  
  client.emit('user connected', client.id, y);

  client.on('haloy', function(userId, yVal){
    client.emit('haloy', client.id, yVal);
  });


  client.on('button clicked', function(value){
    client.emit('button clicked', client.id, value);
  });

  y += 50;
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

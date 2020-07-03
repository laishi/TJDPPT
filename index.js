var express = require('express'),
    http = require('http'),
    path = require('path'),
    ioServer = require('socket.io'),
    app = express(),
    port = process.env.PORT || 3000;




app.use(express.static(path.join(__dirname, 'public')));



app.get('/', function (req, res) {
    res.sendfile(__dirname + '/views/index.html');
});

app.get('/client', function (req, res) {
    res.sendfile(__dirname + '/views/client.html');
});

var server = http.createServer(app).listen(port, function () {
    console.log("Express server listening on port " + port);
});

var io = ioServer.listen(server);
io.sockets.on('connection', function (socket) {
    socket.emit("message", "Welcome to Revealer");
    socket.on("slidechanged", function (data) {
        socket.broadcast.emit("slidechanged", data);
    });
});

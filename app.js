var express = require('express');

var io = require('socket.io')(http);
var http = require('http');

var app = express();
var errorMessage = " ";
// view engine setup

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
var app = http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        //res.end('It Works!! Path Hit: ' + req.url);
        var data = " ";
        req.on("data", function (chunk) {
            data = chunk.toString();


            var splitData = data.split(",");

            io.emit('lightOnOff', splitData[0]);
            io.emit("color", splitData[1]);
            console.log( splitData);
            res.end();
            data = " ";


        });


    })
    , io = io.listen(app);

app.listen(3000);
console.log("listening on *:3000")

io.on('connection', function (socket) {


    socket.on('lightOnOff', function (msg) {

        io.emit('lightOnOff', msg);

        // console.log(msg);
    });


    socket.on('color', function (msg) {
        io.emit('color', msg);

    });


});



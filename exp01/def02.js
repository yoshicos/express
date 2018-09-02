var http = require('http');
var url = require('url');
var fs = require('fs');

var port = (process.env.PORT || 3000);
//Webサーバーの設定
var server = http.createServer(function (req, res) {
}).listen(port);

server.on('request', function(req, res) {
    var uri = url.parse(req.url).pathname;
    console.log(uri);
    if(uri) {
        fs.readFile('.' + uri, 'utf-8', function (err, data) {
            if(!err) {
                res.writeHead(200, {'content-Type': 'text/html'});
                res.write(data);
                res.end();
            } else {
                console.log(err);
                res.end('No File!');
            }
        });
        return;
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World!\n');
    }
});

console.log('Node is running on port ' + port);

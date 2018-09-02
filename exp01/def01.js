var http = require('http');

var port = (process.env.PORT || 3000);
//Webサーバーの設定
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!\n');
}).listen(port);

console.log('Node is running on port ' + port);


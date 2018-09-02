var express = require('express');
var app = express();

var port = (process.env.PORT || 3000);
var server = app.listen(port, function() {
    console.log('Node is running on port ' + port);
});

app.get('/', function(req, res, next){
    res.send('Hello World!');
});

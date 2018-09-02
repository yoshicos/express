var express = require('express');
var app = express();

var port = (process.env.PORT || 3000);
var server = app.listen(port, function() {
    console.log('Node is running on port ' + port);
});

app.use(express.static('.'));

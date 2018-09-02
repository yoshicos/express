function socketio(server) {
  var io = require('socket.io')(server);
  // クライアントが接続してきたときの処理
  io.sockets.on('connect', function(socket) {
    console.log("connection:" + socket.id );
    // 接続時初期応答
    socket.emit('message', 'hello socket.io' , function(ret){ console.log(ret);} );

    // 受信
    socket.on('message', function(data, fn) {
      console.log("message:" + JSON.stringify(data,undefined,1));
      fn('OK');
      // 送り返す
      socket.emit('message', data , function(ret){ console.log(ret);} );
    });

    // クライアントが切断したときの処理
    socket.on('disconnect', function(){
      console.log("disconnect");
    });
  });

}

module.exports = socketio;

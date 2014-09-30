var socketIO = require('socket.io');

module.exports = function (server) {
    var io = socketIO.listen(server, {
         // log: false,
         origins: '*:*' //解决同源策略
    }, function() {
        console.log('start socket server');
    });
    
    io.of('/ad-screen/socket.io')
    .on('connection', function(socket){
        socket.on('socket:register', function(data){
            console.log(data.sn);
            socket.emit(['socket', 'push', data.sn].join(':'), {
                msg: 'ok'
            })
        });
        socket.on('disconnect', function(){});
    });
};


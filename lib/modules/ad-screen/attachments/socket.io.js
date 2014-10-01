var io = require('socket.io');

module.exports = function (server) {
    io.listen(server)
    .of('/ad-screen/socket.io')
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


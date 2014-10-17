var io = require('socket.io');
var observer = require('../lib/models/observer.js');

module.exports = function (server) {
    io.listen(server)
    //.of('/ad-screen/socket.io')
    .on('connection', function(socket){
        socket.on('socket:register', function(data){
            observer.listen(data.sn, function(items){
                var evt = ['socket', 'push', data.sn].join(':');
                socket.emit(evt, items);
            });
            observer.emitPush(data.sn);
        });
        socket.on('disconnect', function(){});
    });
};


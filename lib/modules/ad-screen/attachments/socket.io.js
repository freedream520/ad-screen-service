var io = require('socket.io');
var observer = require('../lib/models/observer.js'),

function getPushEvent(sn){
    return ['socket', 'push', sn].join(':');
}

module.exports = function (server) {
    io.listen(server)
    .of('/ad-screen/socket.io')
    .on('connection', function(socket){
        socket.on('socket:register', function(data){
            var evt = getPushEvent(data.sn);
            observer.listen(data.sn, function(items){
                socket.emit(evt, items);
            });
            observer.emitPush(data.sn);
        });
        socket.on('disconnect', function(){});
    });
};


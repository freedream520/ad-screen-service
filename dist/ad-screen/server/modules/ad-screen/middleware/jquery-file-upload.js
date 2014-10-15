var path = require('path'),
    mkdirp = require('mkdirp'),
    moment = require('moment'),
    upload = require('jquery-file-upload-middleware');

var uploadUrl = '/ad-screen/api/upload';

module.exports = function (app) {
    var configDir = app.get('configDir'),
        tmpDir = path.resolve(configDir, '..', 'tmp'),
        uploads = 'uploads',
        uploadDir = path.resolve(configDir, '..', 'static', uploads);
    console.log(uploadDir);        
    // configure upload middleware
    upload.configure({
        tmpDir: tmpDir,
        uploadUrl: uploadUrl,
        uploadDir: function () {
            var dir = path.resolve(uploadDir, moment().format('YYYY/MM/DD'));
            mkdirp(dir);
            return dir;
        },
        maxPostSize: 11000000000, // 11 GB
        minFileSize: 1,
        maxFileSize: 10000000000, // 10 GB
        acceptFileTypes: /.+/i,
        imageTypes: /\.(gif|jpe?g|png)$/i,
        accessControl: {
            allowOrigin: '*',
            allowMethods: 'OPTIONS, HEAD, GET, POST, PUT, DELETE'
        }
    });
    upload.on('begin', function (fileInfo, req, res) {
        var time = (new Date()).getTime(),
            extname = path.extname(fileInfo.name),
            filename = time + extname;

        fileInfo.name = filename;
        fileInfo.path = [uploads, moment().format('YYYY/MM/DD'), filename].join('/');
    });
    app.use(uploadUrl, upload.fileHandler());
};


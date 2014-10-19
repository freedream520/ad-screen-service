var path = require('path'),
    mkdirp = require('mkdirp'),
    moment = require('moment'),
    upload = require('jquery-file-upload-middleware');

var uploadUrl = '/ad-screen/api/upload';
var config = require('../lib').config;
    //privatePath = require('../lib').path;

module.exports = function (app) {
    var uploadDir,
        configDir = app.get('configDir'),
        tmpDir = path.resolve(configDir, '..', 'tmp'),
        uploads = 'uploads';
        
    // configure upload middleware
    upload.configure({
        tmpDir: tmpDir,
        uploadUrl: uploadUrl,
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
    app.use(uploadUrl, function (req, res, next) {
        // imageVersions are taken from upload.configure()
        upload.fileHandler({
            uploadDir: function () {
                if(!uploadDir){
                    var settings = config.getSettings('app');
                    uploadDir = settings.uploadDir;
                    if(!uploadDir){
                        uploadDir = path.resolve(configDir, '..', 'static', uploads);
                    }else{// if(!privatePath.isAbsolute(uploadDir)){
                        uploadDir = path.resolve(configDir, '..', 'server', uploadDir);
                    }
                }
                var dir = path.resolve(uploadDir, moment().format('YYYY/MM/DD'));
                mkdirp(dir);
                return dir;
            }
        })(req, res, next);
    });
};


var path = require('path'),
    upload = require('jquery-file-upload-middleware'),
    uploadUrl = '/ad-screen/api/upload';

module.exports = function (app) {
    var configDir = app.get('configDir'),
        tmpDir = path.resolve(configDir, '..', 'tmp'),
        uploadDir = path.resolve(configDir, '..', 'static/uploads');
        
    // configure upload middleware
    upload.configure({
        tmpDir: tmpDir,
        uploadDir: uploadDir,
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
    app.use(uploadUrl, upload.fileHandler());
};


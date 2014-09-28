var upload = require('jquery-file-upload-middleware'),
    uploadUrl = '/ad-screen/api/upload';

module.exports = function (app) {
    var dir = app.get('configDir');
    // configure upload middleware
    upload.configure({
        tmpDir: '/tmp',
        uploadDir: __dirname + '/public/uploads',
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


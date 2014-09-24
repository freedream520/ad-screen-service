module.exports = function (app) {
    app.post('/ad-screen/api/upload', function (req, res) {
        var org = 'stbm';
        var data = { };
        return res.jsonp(data);
    });
};


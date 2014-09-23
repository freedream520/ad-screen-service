module.exports = function (app) {
    app.get('/ad-screen', function (req, res) {
        var ok = { name: 'ad-screen' };
        return res.json(ok, 200);
    });
};


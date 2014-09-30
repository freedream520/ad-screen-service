module.exports = function (app) {
    app.get('/ad-screen/socket.io', function (req, res) {
        return res.send(204);
    });
};


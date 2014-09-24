module.exports = function (app) {
    app.get('/ad-screen/api/screen_ads', function (req, res) {
        var org = 'stbm';
        var page = req.query.page || 1,
            rows = req.query.rows || 20;
        var data = [
          { id: '1', title: '广告屏终端1', description: '广告屏终端1是第1个广告屏终端', group: '' },
          { id: '2', title: '广告屏终端2', description: '广告屏终端2是第2个广告屏终端', group: '' },
          { id: '3', title: '广告屏终端3', description: '广告屏终端3是第3个广告屏终端', group: '' },
          { id: '4', title: '广告屏终端4', description: '广告屏终端4是第4个广告屏终端', group: '' },
          { id: '5', title: '广告屏终端5', description: '广告屏终端5是第5个广告屏终端', group: '' }
        ];
        return res.jsonp(data);
    });
    app.get('/ad-screen/api/screen_ads/:id', function (req, res) {
        var org = 'stbm';
        var data = { id: '1', title: '广告屏终端1', description: '广告屏终端1是第1个广告屏终端', group: '' };
        return res.jsonp(data);
    });
    app.post('/ad-screen/api/screen_ads', function (req, res) {
        var org = 'stbm';
        var data = { id: '1', title: '广告屏终端1', description: '广告屏终端1是第1个广告屏终端', group: '' };
        return res.jsonp(data);
    });
    app.put('/ad-screen/api/screen_ads', function (req, res) {
        var org = 'stbm';
        var data = { id: '1', title: '广告屏终端1', description: '广告屏终端1是第1个广告屏终端', group: '' };
        return res.jsonp(data);
    });
};


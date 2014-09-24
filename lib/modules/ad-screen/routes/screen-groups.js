module.exports = function (app) {
    app.get('/ad-screen/api/screen-groups', function (req, res) {
        var org = 'stbm';
        var data = [
          { id: '1', title: '广告屏终端组1', description: '广告屏终端组1是第1个广告屏终端组' },
          { id: '2', title: '广告屏终端组2', description: '广告屏终端组2是第2个广告屏终端组' },
          { id: '3', title: '广告屏终端组3', description: '广告屏终端组3是第3个广告屏终端组' },
          { id: '4', title: '广告屏终端组4', description: '广告屏终端组4是第4个广告屏终端组' },
          { id: '5', title: '广告屏终端组5', description: '广告屏终端组5是第5个广告屏终端组' }
        ];
        return res.jsonp(data);
    });
    app.get('/ad-screen/api/screen-groups/:id', function (req, res) {
        var org = 'stbm';
        var data = { id: '1', title: '广告屏终端组1', description: '广告屏终端组1是第1个广告屏终端组' };
        return res.jsonp(data);
    });
    app.post('/ad-screen/api/screen-groups', function (req, res) {
        var org = 'stbm';
        var data = { id: '1', title: '广告屏终端组1', description: '广告屏终端组1是第1个广告屏终端组' };
        return res.jsonp(data);
    });
    app.put('/ad-screen/api/screen-groups', function (req, res) {
        var org = 'stbm';
        var data = { id: '1', title: '广告屏终端组1', description: '广告屏终端组1是第1个广告屏终端组' };
        return res.jsonp(data);
    });
};


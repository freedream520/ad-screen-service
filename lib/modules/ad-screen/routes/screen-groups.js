var errorhandler = require('../lib').errorhandler,
    Group = require('../lib').Group,
    GroupCollection = require('../lib').GroupCollection;

var org = 'stbm';

module.exports = function (app) {
    app.get('/ad-screen/api/screen-groups', function (req, res) {
        GroupCollection.getList(org)
        .then(function (list) {
            res.jsonp(list);
        })
        .catch(errorhandler.bind(null, res));
    });
    app.get('/ad-screen/api/screen-groups/:id', function (req, res) {
        var data = { id: '1', title: '广告屏终端组1', description: '广告屏终端组1是第1个广告屏终端组' };
        return res.jsonp(data);
    });

    function save(req, res, model){
        model.update(req.body)
        .then(function(model){
            model.save()        
            .then(function (model) {
                res.jsonp({ id: model.id });
            })
            .catch(errorhandler.bind(null, res));
        })
        .catch(errorhandler.bind(null, res));
    }
    app.post('/ad-screen/api/screen-groups', function (req, res) {
        var group = new Group(org);
        save(req, res, group);
    });
    app.put('/ad-screen/api/screen-groups', function (req, res) {
        var id = req.query.id || '';
        var group = new Group(org, id);
        save(req, res, group);
    });
};


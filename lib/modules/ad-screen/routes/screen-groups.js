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
        var id = req.params.id || '';
        var group = new Group(org, id);
        group.getDetailedInfo()
        .then(function (data) {
            res.jsonp(data);
        })
        .catch(errorhandler.bind(null, res));
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
    app.put('/ad-screen/api/screen-groups/:id', function (req, res) {
        var id = req.params.id || '';
        if(id){
            var group = new Group(org, id);
            save(req, res, group);
        }else{
            errorhandler(res, {});
        }
    });
};


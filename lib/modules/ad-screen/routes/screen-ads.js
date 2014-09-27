var errorhandler = require('../lib').errorhandler,
    Ad = require('../lib').Ad,
    AdCollection = require('../lib').AdCollection;

var org = 'stbm';

module.exports = function (app) {
    app.get('/ad-screen/api/screen-ads', function (req, res) {
        var page = req.query.page || 1,
            rows = req.query.rows || 20;

        AdCollection.getList({ page: page, rows: rows})
        .then(function (collection) {
            var total = 10, records = total * rows;
            res.jsonp(toClientGrid(page, total, records, collection));
        })
        .catch(errorhandler.bind(null, res));
    });
    app.get('/ad-screen/api/screen-ads/:id', function (req, res) {
        var id = req.params.id || '';
        var ad = new Ad(org, id);
        ad.getDetailedInfo()
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
    app.post('/ad-screen/api/screen-ads', function (req, res) {
        var ad = new Ad(org);
        save(req, res, ad);
    });
    app.put('/ad-screen/api/screen-ads/:id', function (req, res) {
        var id = req.params.id || '';
        if(id){
            var ad = new Ad(org, id);
            save(req, res, ad);
        }else{
            errorhandler(res, {});
        }
    });
};


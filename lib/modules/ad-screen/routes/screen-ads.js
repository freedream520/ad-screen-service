var moment = require('moment');

var toClientGrid = require('../lib').toClientGrid,
    errorhandler = require('../lib').errorhandler,
    Ad = require('../lib').Ad,
    AdCollection = require('../lib').AdCollection,
    Controller = require('../lib').Controller;

var org = 'stbm';

module.exports = function (app) {
    app.get('/ad-screen/api/ads', function (req, res) {
        var options = { page: 1, rows: 1e4, active: '1'};
        options.screen = req.query.screen || '';
        if('a0b1c2d3e4f5g6h7i8j9' === options.screen){
            options.screen = '';
        }
        AdCollection.getList(options)
        .then(function (items) {
            var results = [];
            items.map(function(item){
                if(item.start && item.end){
                    var now = moment();
                    if(now.isAfter(moment(item.start)) && now.isBefore(moment(item.end))){
                        results.push(item);
                    }
                }
            });
            res.jsonp(results);
        })
        .catch(errorhandler.bind(null, res));
    });
    app.get('/ad-screen/api/screen-ads', function (req, res) {
        var options = {};
        var page = options.page = req.query.page || 1;
        var rows = options.rows = req.query.rows || 20;
        options.screen = req.query.screen || '';
        options.active = req.query.active || '';

        AdCollection.getList(options)
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
    app.post('/ad-screen/api/screen-ads/:id/start', function (req, res) {
        var id = req.params.id || '';
        Controller.execute('start', id)
        .then(function (data) {
            res.jsonp(data);
        })
        .catch(errorhandler.bind(null, res));
    });
    app.post('/ad-screen/api/screen-ads/:id/pause', function (req, res) {
        var id = req.params.id || '';
        Controller.execute('pause', id)
        .then(function (data) {
            res.jsonp(data);
        })
        .catch(errorhandler.bind(null, res));
    });
};


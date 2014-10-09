var fs = require('fs'),
    path = require('path');

var constants = require('../lib').constants,
    errorhandler = require('../lib').errorhandler,
    Screen = require('../lib').Screen,
    ScreenCollection = require('../lib').ScreenCollection;

var org = 'stbm';

module.exports = function (app) {
    var configDir = app.get('configDir'),
        templateFilename = path.resolve(configDir, '..', 'templates/index.html');
    app.get('/ad-screen/:sn', function (req, res) {
        var sn = req.params.sn || '';
        var content = fs.readFileSync(templateFilename, 'utf-8');
        if(sn){
            content = content.replace(constants.sn, sn);
        }
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.send(content);
    });
    
    app.get('/ad-screen/api/ad-screens', function (req, res) {
        ScreenCollection.getList(org)
        .then(function (list) {
            res.jsonp(list);
        })
        .catch(errorhandler.bind(null, res));
    });
    app.get('/ad-screen/api/ad-screens/:id', function (req, res) {
        var id = req.params.id || '';
        var scree = new Screen(org, id);
        scree.getDetailedInfo()
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
    app.post('/ad-screen/api/ad-screens', function (req, res) {
        var scree = new Screen(org);
        save(req, res, scree);
    });
    app.put('/ad-screen/api/ad-screens/:id', function (req, res) {
        var id = req.params.id || '';
        if(id){
            var scree = new Screen(org, id);
            save(req, res, scree);
        }else{
            errorhandler(res, {});
        }
    });
};


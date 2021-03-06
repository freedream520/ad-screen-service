var Q = require('q');
var config = require('../config.js');
var mongodb,
    createMongoDb = require('server-helpers').mongodb;

var dbname = 'basic';

var keeper = {
    release: function(db){
        mongodb.release(dbname, db);
    }
};

function getMongoDb(){
    if(!mongodb){
        var settings = config.getSettings('mongodb');
        mongodb = createMongoDb(settings)
    }
    return mongodb;
}

function save(data){
    var deferred = Q.defer(), mongodb = getMongoDb();
    mongodb.connect(dbname)
    .then(function(db){
        var collection = db.collection('screen_groups');
        if(data.hasOwnProperty('_id')){
            delete data._id;
        }
        collection.update({ id: data.id }, { '$set': data }, { upsert: true, multi: true }, function(err, result) {
            if(err){
                keeper.release(db);
                deferred.reject(err);
            }
            keeper.release(db);
            deferred.resolve(result);
        });
    })
    .catch(function(err){
        deferred.reject(err);
    });
    return deferred.promise;
}

function getList(){
    var deferred = Q.defer(), mongodb = getMongoDb();
    mongodb.connect(dbname)
    .then(function(db){
        var collection = db.collection('screen_groups');
        collection.find({}).sort({ modified: -1 }).toArray(function(err, results) {
            if(err){
                keeper.release(db);
                deferred.reject(err);
            }
            keeper.release(db);
            deferred.resolve(results);
        });
    })
    .catch(function(err){
        deferred.reject(err);
    });
    return deferred.promise;
}

function load(id, fields){
    fields = fields || {};
    fields._id = 0;
    var deferred = Q.defer(), mongodb = getMongoDb();
    mongodb.connect(dbname)
    .then(function(db){
        var collection = db.collection('screen_groups');
        collection.findOne({ id: id }, fields, function(err, result) {
            if(err){
                keeper.release(db);
                deferred.reject(err);
            }
            keeper.release(db);
            deferred.resolve(result);
        });
    })
    .catch(function(err){
        deferred.reject(err);
    });
    return deferred.promise;
}


module.exports = {
    save: save,
    getList: getList,
    load: load
};
var util = require('util'),
    Q = require('q'),
    mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var config = require('./config.js').getConfig(),
    pool = require('../../pool.js');

var factory = pool.create('mongodb'),
    factories = {};

function create(settings, callback){
    var uri = util.format('mongodb://%s:%s/%s%s', settings.host, settings.port, settings.prefix, settings.dbname);
    MongoClient.connect(uri, { server: { 'poolSize': 1 } }, callback);
}

function destroy(db){
    if(db && db.close){
        db.close();
    }
}

function connect(dbname){
    var deferred = Q.defer();
    if(config && config.host && config.port && config.prefix){
        var max = config.max || 1,
            min = config.min || 0;
        if(!factories.hasOwnProperty(dbname)){
            var settings = { 
                dbname: dbname,
                host: config.host,
                port: config.port,
                prefix: config.prefix
            };
            factories[dbname] = factory.create(dbname, create, destroy, settings, max, min);
        }
        factories[dbname].acquire(function(err, db) {
          if(err){
            deferred.reject(err);
          }
          deferred.resolve(db);
        });
    }else{
        deferred.reject(new Error('db config err'));
    }
    return deferred.promise;
}

function release(dbname, db){
    if(factories.hasOwnProperty(dbname) && factories[dbname]){
        var pool = factories[dbname];
        if(pool && pool.release){
            pool.release(db);
        }
    }
}

module.exports = {
    connect: connect,
    release: release
};
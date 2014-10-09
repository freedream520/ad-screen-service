var Q = require('q');

var observer = require('./observer.js'),
    dao = require('../dao/ad.js'),
    util = require('../helpers/util.js');

function Ad(org, id){
    org = org || '';
    this.id = !!id ? id.trim() : util.createGUID();
    this.data = { org: org };
}

Ad.prototype.update = function(data){
    var deferred = Q.defer(), key;
    if (data.id && this.id && data.id !== this.id) {
        deferred.reject(new Error('Cannot rename a ad id'));
    }
    this.data.id = this.id || data.id;
    if(this.data.id){
        for(key in data){
            if(data.hasOwnProperty(key)){
                this.data[key] = data[key];
            }
        }
        this.data.modified = data.modified || (new Date()).getTime();
        deferred.resolve(this);
    }else{
        deferred.reject('data id not exixts');
    }
    return deferred.promise;
};

Ad.prototype.save = function(){
    var that = this;
    var deferred = Q.defer();
    that.data.id = !!that.data.id ? that.data.id.trim() : '';
    if(that.data.id){
        dao.save(that.data)
        .then(function(data){
            observer.emitSave(that.data.id);
            deferred.resolve(that);
        })
        .catch(function(err){
            deferred.reject(err);
        });
    }else{
        deferred.reject(new Error('The id is empty'));
    }

    return deferred.promise;
}

Ad.prototype.getDetailedInfo = function(){
    var deferred = Q.defer();
    if(this.id){
        dao.load(this.id, {})
        .then(function(data){
            deferred.resolve(data);
        })
        .catch(function(err){
            deferred.reject(err);
        })
    }else{
        deferred.reject(new Error('id not exists'));
    }
    return deferred.promise;
};
module.exports = Ad;
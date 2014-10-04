/**
* 商品数据缓存的观察者对象。
*/
var moment = require('moment'),
    EventEmitter = require('events').EventEmitter;

var util = require('../util.js'),
    StrategyType = require('../../enum.js').StrategyType,
    redis = require('../../dao/redis/redis.js'),
    RedisGoods = require('../../dao/redis/goods.js'),
    RedisStrategy = require('../../dao/redis/strategy.js'),
    mongodb = require('../../dao/mongodb/goods.js');

var observer = new EventEmitter();
var redis_db_name = 'basic';

var keeper = {
    release: function(client){
        redis.release(redis_db_name, client);
    }
};

function updateGoodsTagCache(expires, id, goods, tag){
    var strategy = util.getTagStrategy(goods, tag);
    if(strategy && strategy.end){
        var end = strategy.end ? moment(strategy.end) : moment();
        if(end.isAfter(expires)){
            expires = end;
        }
        var isExpire = moment().isAfter(end);
        redis.createClient(redis_db_name)
        .then(function(client){
            var redisStrategy = new RedisStrategy(keeper, client);
            if(isExpire){
                redisStrategy.removeSku(StrategyType.Tag, tag, id);
            }else{
                redisStrategy.setSpus(StrategyType.Tag, tag, [ id ]);
            }
        });
    }
    return expires;
}

function updateGoodsCache(goods){
    var id = goods.id, expires = moment('1970-01-01');
    expires = updateGoodsTagCache(expires, id, goods, 'basic');
    if(goods.tags){
        for(var tag in goods.tags){
            if(goods.tags.hasOwnProperty(tag)){
                expires = updateGoodsTagCache(expires, id, goods, tag);
            }
        }
    }
    if(moment().isAfter(expires)){
        observer.emit('expired', id);
    }else{
        observer.emit('change', id, goods);
    }
}

observer.on('save', function(id){
    mongodb.load(id)
    .then(function(goods){
        if(goods && goods.id){
            updateGoodsCache(goods);
        }
    });
});

function emitAdSave(id){
    observer.emit('save', id);
}

observer.on('expired', function(id){
    //删除商品详细信息缓存
    redis.createClient(redis_db_name)
    .then(function(client){
        var redisGoods = new RedisGoods(keeper, client);
        redisGoods.delDetailedInfo(id);
    });
});

observer.on('change', function(id, goods){
    //更新商品详细信息缓存
    redis.createClient(redis_db_name)
    .then(function(client){
        var redisGoods = new RedisGoods(keeper, client);
        redisGoods.setDetailedInfo(id, goods);
    });
});

module.exports = {
    emitAdSave: emitAdSave
};
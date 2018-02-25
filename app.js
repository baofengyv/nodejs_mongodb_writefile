var fs = require('fs');
var async = require('async');
var winston = require('winston');
var m = require('./mongo');

async.waterfall([
    // init数据库
    next => {
        m.init(next);
    },
    // 获取数据
    next => {
        const collection = m.client.db('test').collection('people');
        collection.find({}).toArray(next);
    },
    // 写入文件
    (docs, next) => {
        docs.forEach(d => {
            fs.writeFile("./f1/" + d.name, d, err => {
                if (err)  throw err;
            });
        });
        next();
    }
], function (err) {
    if (err) 
        winston.error(err);

    // 关闭db连接
     m.close()
    
    winston.info("END");
});

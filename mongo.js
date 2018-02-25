'use strict';

var winston = require('winston');
var db;

var mongoModule = module.exports;


const DB = {
    url: 'mongodb://localhost:27017',
    dbName: 'test',
    collectionName: "people"
};

mongoModule.init = function (callback) {
    callback = callback || function () { };

    var mongoClient = require('mongodb').MongoClient;

    winston.warn('You have no mongo username/password setup!');

    var connString = DB.url +'/' + DB.dbName;

    var connOptions = {
        poolSize: 10,
        reconnectTries: 3600,
        reconnectInterval: 1000,
        autoReconnect: true,
    };

    mongoClient.connect(connString, connOptions, function (err, _db) {
        if (err) {
            winston.error('Could not connect to your Mongo database. Mongo returned the following error', err);
            return callback(err);
        }

        db = _db;

        mongoModule.client = db;
        callback();
    });
};

mongoModule.close = function (callback) {
    callback = callback || function () { };
    db.close(callback);
};



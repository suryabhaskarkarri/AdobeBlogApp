var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

const dbUrl = require('./constants.js').dbUrl;

module.exports = {
    addPost: function(username, title, description, callback) {
        MongoClient.connect(dbUrl, function(err, db) {
            db.collection('post').insertOne(
                {
                    title: title,
                    description: description,
                    username: username,
                },
                function(err, result) {
                    assert.equal(err, null);
                    console.log('Saved the blog post details.');
                    if (err == null) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                }
            );
        });
    },
    updatePost: function(id, title, description, callback) {
        MongoClient.connect(dbUrl, function(err, db) {
            db.collection('post').updateOne(
                { _id: new mongodb.ObjectID(id) },
                { $set: { title: title, description: description } },
                function(err, result) {
                    assert.equal(err, null);
                    console.log('Updated the blog post details.');
                    if (err == null) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                }
            );
        });
    },
    getPost: function(username, callback) {
        MongoClient.connect(dbUrl, function(err, db) {
            db.collection('post', function(err, collection) {
                collection
                    .find({ username: username })
                    .toArray(function(err, list) {
                        console.log('list', list);
                        callback(list);
                    });
            });
        });
    },
    getAllPosts: function(callback) {
        MongoClient.connect(dbUrl, function(err, db) {
            db.collection('post', function(err, collection) {
                collection.find().toArray(function(err, list) {
                    callback(list);
                });
            });
        });
    },
    deletePost: function(id, callback) {
        MongoClient.connect(dbUrl, function(err, db) {
            db.collection('post').deleteOne(
                {
                    _id: new mongodb.ObjectID(id),
                },
                function(err, result) {
                    assert.equal(err, null);
                    console.log('Deleted the post.');
                    if (err == null) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                }
            );
        });
    },
    getPostWithId: function(id, callback) {
        MongoClient.connect(dbUrl, function(err, db) {
            db.collection('post').findOne(
                {
                    _id: new mongodb.ObjectID(id),
                },
                function(err, result) {
                    assert.equal(err, null);
                    console.log('Retrived the entry.');
                    if (err == null) {
                        callback(result);
                    } else {
                        callback(false);
                    }
                }
            );
        });
    },
};

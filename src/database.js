var Mongoose = require('mongoose');
var Config = require('./config');

// Loads environment variables
// Used only in development
require('dotenv').config({silent: true});

//load database
// Mongoose.connect('mongodb://localhost/test');
//Mongoose.connect('mongodb://' + Config.mongo.username + ':' + Config.mongo.password + '@' + Config.mongo.url + '/' + Config.mongo.database);
//Mongoose.connect(Config.mongo.url);
Mongoose.connect(process.env.MONGO_HOST + '/api');
var db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
	console.log("Connection with database succeeded.");
});

exports.Mongoose = Mongoose;
exports.db = db;

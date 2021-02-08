// -----------------------------------------------------------------------------
// -- Generic NodeJS Application: MVC Design
// -- File: status.js
// -- Description:
// -- Author:
// -- Date:
// -- Version: 
// -----------------------------------------------------------------------------



var config = require('../dbconfig');
var mongoose = require('mongoose');
var connectionString = 'mongodb://' + config[config.environment].database.credentials + config[config.environment].database.host + ':' + config[config.environment].database.port  + '/'+ config[config.environment].database.name;

var db = mongoose.connection;

db.on('error', function(){
    console.log('There was an error connecting to the database')
    console.log("connectionString = " + connectionString);
});

db.once('open', function() {
    console.log('Successfully connected to database');
    console.log("connectionString = " + connectionString);
});

// Database
mongoose.connect(connectionString);

var Status = new mongoose.Schema({
  serverstatus: String,
  networkstatus: String,
  testmanagerstatus: String,
  testframeworkstatus: String,
  databasestatus: String,
  target1status: String,
  target2status: String,
  target3status: String,
  target4status: String,
  target5status: String,
  placeholder1status: String,
  placeholder2status: String,
  placeholder3status: String,
  placeholder4status: String,
  placeholder5status: String
});

// collection name is 3rd param
var StatusModel = mongoose.model('Status', Status, 'status');

module.exports = {
    StatusModel: StatusModel,
 };

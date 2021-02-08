// -----------------------------------------------------------------------------
// -- Generic NodeJS Application: MVC Design
// -- File: Table.js
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

var Table = new mongoose.Schema({
  GENERICID: String,
  RUNID: String,
  DATE: String,
  PRODUCT: String,
  SUITENAME: String,
  RESULTS: String,
  ET: String,
  CODEVERSION: String,
  PRINTER: String,
  TESTCODE: String,
  REPORT: String,
  LOG: String
  });

// collection name is 3rd param
var TableModel = mongoose.model('Table', Table, 'table');

module.exports = {
    TableModel: TableModel,
 };

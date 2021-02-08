// -----------------------------------------------------------------------------
// -- Generic NodeJS Application: MVC Design
// -- File: Config.js
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

var Config = new mongoose.Schema({
  testmanager: String,
  testmgrenable: Boolean,
  testmgrshutdown: Boolean,
  testmgrmode: String,
  testmgrversion: String,
  builddirectory: String,
  integrationtest: Boolean,
  developmenttest: Boolean,
  testdirectory: String,
  testframeworkjar: String,
  testtemplatexml: String,
  platformtemplatexml: String,
  codeloadtemplatexml: String,
  codeloadxml: String,
  disablecodeload: Boolean,
  uselatestbuild: Boolean,
  buildrange: String,
  testruntime: String,
  tmgrloopdelay: String,
  disabletest: Boolean,
  disabletestframeworkDB: Boolean,
  exeserver1: String,
  exeserver2: String,
  exeserver3: String,
  exeserver4: String,
  server1enable: Boolean,
  server2enable: Boolean,
  server3enable: Boolean,
  server4enable: Boolean,
});

// collection name is 3rd param
var ConfigModel = mongoose.model('Config', Config, 'generic-config');

module.exports = {
    ConfigModel: ConfigModel,
 };

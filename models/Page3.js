// -----------------------------------------------------------------------------
// -- Generic NodeJS Application: MVC Design
// -- File: Page3.js
// -- Description:
// -- Author:
// -- Date:
// -- Version: 
// -- Credit: Based on Web Development with Node and Express: 
// --         Leveraging the JavaScript Stack by Ethan Brown
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

mongoose.connect(connectionString);

var Page3 = new mongoose.Schema({
    VAR1: String,
    VAR2: String,
    VAR3: String,
    ENABLE: Boolean
});

// collection name is 3rd param
var Page3Model = mongoose.model('Page3', Page3, 'page3');

module.exports = {
    Page3Model: Page3Model,
 };

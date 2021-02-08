/**
// -----------------------------------------------------------------------------
// -- Generic NodeJS Application: MVC Design
// -- File: router.js
// -- Description:
// -- Author:
// -- Date:
// -- Version: 
// -----------------------------------------------------------------------------

 */

var HomeController = require('./controllers/HomeController');
var ReportController = require('./controllers/ReportController');
var ConfigController = require('./controllers/ConfigController');
var HelpController = require('./controllers/HelpController');
var TableController = require('./controllers/TableController');
var StatusController = require('./controllers/StatusController');


// Routes
module.exports = function(app){
    
    // Main Routes
    app.get('/', HomeController.Index);
    
    // Config
    app.get('/config', ConfigController.Index); 
    app.get('/config/edit/:id', ConfigController.ConfigEdit);
    app.post('/config/edit', ConfigController.ConfigUpdate); 
    
    // Report
    //app.get('/report', ReportController.Index);

    // Table
    app.get('/table', TableController.Index); 
    app.get('/table/delete/:id', TableController.TableDelete); 

    // Status
    app.get('/status', StatusController.Index);

    // Help
    app.get('/help', HelpController.Index);
};


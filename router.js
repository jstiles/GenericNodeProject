/**
// -----------------------------------------------------------------------------
// -- Generic NodeJS Application: MVC Design
// -- File: router.js
// -- Description:
// -- Author:
// -- Date:
// -- Version: 
// -- Credit: Based on Web Development with Node and Express: 
// --         Leveraging the JavaScript Stack by Ethan Brown
// -----------------------------------------------------------------------------
 */

var HomeController = require('./controllers/HomeController');
var Page1Controller = require('./controllers/Page1Controller');
var Page2Controller = require('./controllers/Page2Controller');
var Page3Controller = require('./controllers/Page3Controller');
var HelpController = require('./controllers/HelpController');

// Routes
module.exports = function(app){
    
    // Main Routes
    app.get('/', HomeController.Index);
    
    // Page2
    app.get('/Page2', Page2Controller.Index); 
    app.get('/Page2/edit/:id', Page2Controller.Page2Edit);
    app.post('/Page2/edit', Page2Controller.Page2Update); 
    
    // Page1
    app.get('/Page1', Page1Controller.Index);
    app.get('/Page1/add', Page1Controller.Page1Add);
    app.post('/Page1/add', Page1Controller.Page1Create);
    app.get('/Page1/edit/:id', Page1Controller.Page1Edit);
    app.post('/Page1/edit', Page1Controller.Page1Update); 
    app.get('/Page1/delete/:id', Page1Controller.Page1Delete);   

    // Page3
    app.get('/Page3', Page3Controller.Index); 
    app.get('/Page3/delete/:id', Page3Controller.Page3Delete); 
    app.get('/Page3/edit/:id', Page3Controller.Page3Edit);
    app.post('/Page3/edit', Page3Controller.Page3Update); 
    app.get('/Page3/add', Page3Controller.Page3Add);
    app.post('/Page3/add', Page3Controller.Page3Create);

    // Help
    app.get('/help', HelpController.Index);
};


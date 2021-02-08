// -----------------------------------------------------------------------------
// -- Generic NodeJS Application: MVC Design
// -- File: app.js
// -- Description:
// -- Author:
// -- Date:
// -- Version: 
// -----------------------------------------------------------------------------


var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var http = require('http');
var path = require('path');
var handlebars  = require('express-handlebars'), hbs;
var config = require('./dbconfig');
var Middleware = require('./utilities/Middleware');
var app = express();

app.set('port', config[config.environment].application.port);
app.set('views', path.join(__dirname, 'views'));

// static path
app.use(express.static(__dirname + '/static'));
// app.use(express.static(__dirname + '/../Reports'));
// app.use(express.static(__dirname + '/../Log'));
app.use(express.static(__dirname + '/../'));


/* express-handlebars - https://github.com/ericf/express-handlebars
A Handlebars view engine for Express. */
hbs = handlebars.create({
   helpers: {
        incIndex: function(value) {
          return parseInt(value) + 1;
        },

        getStatusColor: function(status){
            switch (status) {
                case "PASS" : 
                    return '#004d00';  // green
                    break;
                case "FAIL" : 
                    return '#990000';  // red
                    break;
                case "RUNNING" : 
                    return 'blue';   // blue
                    break;
                default : 
                    return 'black';    
            }
        },
        getStatusColorTable: function(status){
            switch (status) {
                case "pass" : 
                    return '#004d00';  // green
                    break;
                case "fail" : 
                    return '#990000';  // red
                    break;
                case "RUNNING" : 
                    return 'blue';   // blue
                    break;
                default : 
                    return 'black';    
            }
        },

        
    },
  defaultLayout: 'main'
});


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

/* Morgan - https://github.com/expressjs/morgan
 HTTP request logger middleware for node.js */
app.use(logger({ format: 'dev', immediate: true }));

app.use(express.static(path.join(__dirname, 'static')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(Middleware.AppendNotifications);

/* errorhandler - https://github.com/expressjs/errorhandler
 Show errors in development. */
app.use(errorHandler({ dumpExceptions: true, showStack: true }));

// send app to router
require('./router')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

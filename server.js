// -----------------------------------------------------------------------------
// -- Generic NodeJS Application: MVC Design
// -- File: server.js
// -- Description:
// -- Author:
// -- Date:
// -- Version: 
// -- Credit: Based on Web Development with Node and Express: 
// --         Leveraging the JavaScript Stack by Ethan Brown
// -----------------------------------------------------------------------------

// -- external libs
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var http = require('http');
var path = require('path');
var handlebars  = require('express-handlebars'), hbs;
var Middleware = require('./utilities/Middleware');

// -- local
var config = require('./dbconfig');
var app = express();

app.set('port', config[config.environment].application.port);
app.set('views', path.join(__dirname, 'views'));

// static path
app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/../'));

/* express-handlebars - https://github.com/ericf/express-handlebars
A Handlebars view engine for Express. */
hbs = handlebars.create({
   helpers: {
        incIndex: function(value) {
          return parseInt(value) + 1;
        },
        
    },
  defaultLayout: 'main'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// TODO: Issues with Morgan security.  Can we replace or update?
app.use(logger({ format: 'dev', immediate: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(Middleware.AppendNotifications);
app.use(errorHandler({ dumpExceptions: true, showStack: true }));

// send app to router
require('./router')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

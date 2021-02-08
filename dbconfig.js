// -----------------------------------------------------------------------------
// -- Generic NodeJS Application: MVC Design
// -- File: dbconfig.js
// -- Description:
// -- Author:
// -- Date:
// -- Version: 
// -----------------------------------------------------------------------------

// -- Object to hold configuration data
var config = {};

// --------------------------------------------------------------
// -- Development Configuration
config.development = {

    database: {
	name: 'Generic',
	host: 'localhost',
	port: '27017',
	credentials: ''
    },
    application: {
	//port: 1337
	port: 3000
    }
    
};

// --------------------------------------------------------------
// -- Production Configuration
config.production = {

    database: {
	name: 'Generic',
	host: 'localhost',
	port: '8080',
	credentials: 'admin:password@' // username:password@
    },
    application: {
	port: 80
    }    
    
};

// --------------------------------------------------------------
// -- Set environment & export
config.environment = 'development';
module.exports = config;

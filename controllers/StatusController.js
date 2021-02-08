// -----------------------------------------------------------------------------
// -- Generic NodeJS Application: MVC Design
// -- File: StatusController.js
// -- Description:
// -- Author:
// -- Date:
// -- Version: 
// -----------------------------------------------------------------------------


var Status = require('../models/Status');
var Validation = require('../utilities/Validation');

exports.Index = function(request, response){
    Status.StatusModel.find(function(error, result){
        if (error) {
            console.log('Error');
            Validation.ErrorRedirect(response, '/', 'There was an error finding status in the database');
        } else {
            response.pageInfo.title = 'Status';
            response.pageInfo.status = result;
            response.render('status/Index', response.pageInfo);
        }
    });
};
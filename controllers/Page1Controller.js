// -----------------------------------------------------------------------------
// -- Generic NodeJS Application: MVC Design
// -- File: Page1Controller.js
// -- Description:
// -- Author:
// -- Date:
// -- Version: 
// -- Credit: Based on Web Development with Node and Express: 
// --         Leveraging the JavaScript Stack by Ethan Brown
// -----------------------------------------------------------------------------


var Page1 = require('../models/Page1');
var Validation = require('../utilities/Validation');

exports.Index = function(request, response){

    Page1.Page1Model.find(function(error, result){
        if (error) {
            console.log('Error');
            Validation.ErrorRedirect(response, '/', 'ER! finding page1 in database !!!');
        } else {
            response.pageInfo.title = 'Page1';
            response.pageInfo.page1 = result;
            response.render('page1/Index', response.pageInfo);
        }
    });

};

exports.Page1Add = function(request, response){
    response.pageInfo.title = 'Add a Target';
    response.render('page1/TargetAdd', response.pageInfo);
};

exports.Page1Create = function(request, response){ 

    var var1 = request.body.var1;
    var var2 = request.body.var2;
    var var3 = request.body.var3;
    var testxml = request.body.testxml;

    var isEnabled = false;
    if(request.body.enabled === 'enabled') {
        isEnabled = true;
    }

    var isBusy = false;
    if(request.body.busy === 'busy') {
        isBusy = true;
    }

    if(Validation.IsNullOrEmpty([var1, var2])) {
        Validation.ErrorRedirect(response, '/page1', 'Please fill out all fields');
    } else {

        var t = new Page1.Page1Model({ 
            VAR1: var1,
            VAR2: var2,
            VAR3: var3,
            TESTXML: testxml,
            ENABLE: isEnabled,
            BUSY: isBusy
        });


        t.save(function(error){
            if(error) {
                console.log('Error');
                Validation.ErrorRedirect(response, '/page1', 'ER! adding the target to the database !!!');
            } else {
                Validation.SuccessRedirect(response, '/page1', 'Target created successfully');
            }
        });
    }
};

exports.Page1Edit = function(request, response){
    var id = request.params.id;
    
    Page1.Page1Model.findOne({ _id: id }, function(error, result){
        if(error) {
            console.log('Error');
            Validation.ErrorRedirect(response, '/page1', 'ER! finding target in database with this id !!!');
        }
	else {
            if(result) {
                response.pageInfo.title = 'Edit Target';
                response.pageInfo.page1 = result
                response.render('page1/TargetEdit', response.pageInfo);
            } else {
                Validation.ErrorRedirect(response, '/page1', 'ER! finding a target in database with this id !!!');
            }
        }
	
    });
}


exports.Page1Update = function(request, response){ 
    var var1 = request.body.var1;
    var var2 = request.body.var2;
    var var3 = request.body.var3;

    var isEnabled = false;
    if(request.body.enabled === 'enabled') {
        isEnabled = true;
    }

    if(Validation.IsNullOrEmpty([var1, var2])) {
        Validation.ErrorRedirect(response, '/page1', 'Please fill out all fields');
    } else {
    
        Page1.Page1Model.update(
            { _id: request.body.id }, 
            {
                VAR1: var1,
                VAR2: var2,
                VAR3: var3,
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    console.log('Page1Update : Error!!!')
                    Validation.ErrorRedirect(response, '/page1', 'ER! finding a target in the database with this id !!!');
                } else {
                    console.log('Page1Update : Successfull !!!')
                    Validation.SuccessRedirect(response, '/page1', 'Target updated successfully');
                }        
            }
        );
    }
}

exports.Page1Delete = function(request, response){ 
    var id = request.params.id;
    Page1.Page1Model.remove({ _id: id }, function(error, result) {
        if(error) {
            console.log('Error');
            Validation.ErrorRedirect(response, '/page1', 'ER! deleting the target');
        } else {
            Validation.SuccessRedirect(response, '/page1', 'Target deleted successfully');
        }
    });
}

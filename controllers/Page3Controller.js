// -----------------------------------------------------------------------------
// -- Generic NodeJS Application: MVC Design
// -- File: Page3Controller.js
// -- Description:
// -- Author:
// -- Date:
// -- Version: 
// -- Credit: Based on Web Development with Node and Express: 
// --         Leveraging the JavaScript Stack by Ethan Brown
// -----------------------------------------------------------------------------


var Page3 = require('../models/Page3');
var Validation = require('../utilities/Validation');

exports.Index = function(request, response){

    Page3.Page3Model.find(function(error, result){
        if (error) {
            console.log('Error');
            Validation.ErrorRedirect(response, '/', 'ER! finding page3 in database !!!');
        } else {
            response.pageInfo.title = 'Page3';
            response.pageInfo.page3 = result;
            response.render('page3/Index', response.pageInfo);
        }
    });

};

exports.Page3Add = function(request, response){
    response.pageInfo.title = 'Add a Target';
    response.render('page3/TargetAdd', response.pageInfo);
};

exports.Page3Create = function(request, response){ 

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
        Validation.ErrorRedirect(response, '/page3', 'Please fill out all fields');
    } else {

        var t = new Page3.Page3Model({ 
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
                Validation.ErrorRedirect(response, '/page3', 'ER! adding the target to the database !!!');
            } else {
                Validation.SuccessRedirect(response, '/page3', 'Target created successfully');
            }
        });
    }
};

exports.Page3Edit = function(request, response){
    var id = request.params.id;
    
    Page3.Page3Model.findOne({ _id: id }, function(error, result){
        if(error) {
            console.log('Error');
            Validation.ErrorRedirect(response, '/page3', 'ER! finding target in database with this id !!!');
        }
	else {
            if(result) {
                response.pageInfo.title = 'Edit Target';
                response.pageInfo.page3 = result
                response.render('page3/TargetEdit', response.pageInfo);
            } else {
                Validation.ErrorRedirect(response, '/page3', 'ER! finding a target in database with this id !!!');
            }
        }
	
    });
}


exports.Page3Update = function(request, response){ 
    var var1 = request.body.var1;
    var var2 = request.body.var2;
    var var3 = request.body.var3;

    var isEnabled = false;
    if(request.body.enabled === 'enabled') {
        isEnabled = true;
    }

    if(Validation.IsNullOrEmpty([var1, var2])) {
        Validation.ErrorRedirect(response, '/page3', 'Please fill out all fields');
    } else {
    
        Page3.Page3Model.update(
            { _id: request.body.id }, 
            {
                VAR1: var1,
                VAR2: var2,
                VAR3: var3,
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    console.log('Page3Update : Error!!!')
                    Validation.ErrorRedirect(response, '/page3', 'ER! finding a target in the database with this id !!!');
                } else {
                    console.log('Page3Update : Successfull !!!')
                    Validation.SuccessRedirect(response, '/page3', 'Target updated successfully');
                }        
            }
        );
    }
}

exports.Page3Delete = function(request, response){ 
    var id = request.params.id;
    Page3.Page3Model.remove({ _id: id }, function(error, result) {
        if(error) {
            console.log('Error');
            Validation.ErrorRedirect(response, '/page3', 'ER! deleting the target');
        } else {
            Validation.SuccessRedirect(response, '/page3', 'Target deleted successfully');
        }
    });
}

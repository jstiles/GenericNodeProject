// -----------------------------------------------------------------------------
// -- Generic NodeJS Application: MVC Design
// -- File: Page2Controller.js
// -- Description:
// -- Author:
// -- Date:
// -- Version: 
// -----------------------------------------------------------------------------


var Page2 = require('../models/Page2');
var Validation = require('../utilities/Validation');

exports.Index = function(request, response){

    Page2.Page2Model.find(function(error, result){
        if (error) {
            console.log('Error');
            Validation.ErrorRedirect(response, '/', 'ER! finding page2 in database !!!');
        } else {
            response.pageInfo.title = 'Page2';
            response.pageInfo.page2 = result;
            response.render('page2/Index', response.pageInfo);
        }
    });

};

exports.Page2Add = function(request, response){
    response.pageInfo.title = 'Add a Target';
    response.render('page2/TargetAdd', response.pageInfo);
};

exports.Page2Create = function(request, response){ 

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
        Validation.ErrorRedirect(response, '/page2', 'Please fill out all fields');
    } else {

        var t = new Page2.Page2Model({ 
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
                Validation.ErrorRedirect(response, '/page2', 'ER! adding the target to the database !!!');
            } else {
                Validation.SuccessRedirect(response, '/page2', 'Target created successfully');
            }
        });
    }
};

exports.Page2Edit = function(request, response){
    var id = request.params.id;
    
    Page2.Page2Model.findOne({ _id: id }, function(error, result){
        if(error) {
            console.log('Error');
            Validation.ErrorRedirect(response, '/page2', 'ER! finding target in database with this id !!!');
        }
	else {
            if(result) {
                response.pageInfo.title = 'Edit Target';
                response.pageInfo.page2 = result
                response.render('page2/TargetEdit', response.pageInfo);
            } else {
                Validation.ErrorRedirect(response, '/page2', 'ER! finding a target in database with this id !!!');
            }
        }
	
    });
}


exports.Page2Update = function(request, response){ 
    var var1 = request.body.var1;
    var var2 = request.body.var2;
    var var3 = request.body.var3;

    var isEnabled = false;
    if(request.body.enabled === 'enabled') {
        isEnabled = true;
    }

    if(Validation.IsNullOrEmpty([var1, var2])) {
        Validation.ErrorRedirect(response, '/page2', 'Please fill out all fields');
    } else {
    
        Page2.Page2Model.update(
            { _id: request.body.id }, 
            {
                VAR1: var1,
                VAR2: var2,
                VAR3: var3,
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    console.log('Page2Update : Error!!!')
                    Validation.ErrorRedirect(response, '/page2', 'ER! finding a target in the database with this id !!!');
                } else {
                    console.log('Page2Update : Successfull !!!')
                    Validation.SuccessRedirect(response, '/page2', 'Target updated successfully');
                }        
            }
        );
    }
}

exports.Page2Delete = function(request, response){ 
    var id = request.params.id;
    Page2.Page2Model.remove({ _id: id }, function(error, result) {
        if(error) {
            console.log('Error');
            Validation.ErrorRedirect(response, '/page2', 'ER! deleting the target');
        } else {
            Validation.SuccessRedirect(response, '/page2', 'Target deleted successfully');
        }
    });
}

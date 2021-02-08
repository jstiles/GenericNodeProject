// -----------------------------------------------------------------------------
// -- Generic NodeJS Application: MVC Design
// -- File: TableController.js
// -- Description:
// -- Author:
// -- Date:
// -- Version: 
// -----------------------------------------------------------------------------



var Table = require('../models/Table');
var Validation = require('../utilities/Validation');

exports.Index = function(request, response){
    Table.TableModel.find(function(error, result){
        if (error) {
            console.log('Error');
            Validation.ErrorRedirect(response, '/', 'There was an error finding table in the database');
        } else {
            response.pageInfo.title = 'Table';
            response.pageInfo.table = result;
            response.render('table/Index', response.pageInfo);
        }
    });
};

exports.TableUpdate = function(request, response){ 

    // ------------------------------------------------------------
    // -- start parameters
    var runid = request.body.GENERICID;
    var runid = request.body.RUNID;
    var date = request.body.DATE;
    var product = request.body.PRODUCT;
    var suitename = request.body.SUITENAME;
    var results = request.body.RESULTS;
    var et = request.body.ET;
    var codeversion = request.body.CODEVERSION;
    var printer = request.body.PRINTER;
    var testcode = request.body.TESTCODE;
    var report = request.body.REPORT;
    var log = request.body.LOG;
  
    // -- end parameters
    // ------------------------------------------------------------


    if(Validation.IsNullOrEmpty([testmanager])) {
        Validation.ErrorRedirect(response, '/table', 'Please verify all fields');
    } else {
    
        Table.TableModel.update(
            { _id: request.body.id }, 
            {
                GENERICid : GENERICID,
                runid : RUNID,
                date : DATE,
                product : PRODUCT,
                suitename : SUITENAME,
                results : RESULTS,
                et : ET,
                codeversion : CODEVERSION,
                printer : PRINTER,
                testcode : TESTCODE,
                report : REPORT,
                log : LOG

            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    console.log('ConfigUpdate : Error !!! ')
                    Validation.ErrorRedirect(response, '/table', 'There was an error finding a table in the database with this id');
                } else {
                    console.log('ConfigUpdate : Update Successful !!! ')
                    Validation.SuccessRedirect(response, '/table', 'Table updated successfully');
                }        
            }
        );
    }
}


exports.TableEdit = function(request, response){
    var id = request.params.id;
    
    Table.TableModel.findOne({ _id: id }, function(error, result){
        if(error) {
            console.log('Error');
            Validation.ErrorRedirect(response, '/table', 'There was an error finding table in the database with this id');
        }
        else {
            if(result) {
                response.pageInfo.title = 'Table';
                response.pageInfo.config = result
                response.render('table/TableEdit', response.pageInfo);
            } else {
                console.log('TableEdit : Update Successful !!! ')
                Validation.ErrorRedirect(response, '/table', 'There was an error finding table in the database with this id');
            }
        }
  
    });
}


exports.TableDelete = function(request, response){ 
    var id = request.params.id;
    Table.TableModel.remove({ _id: id }, function(error, result) {
        if(error) {
            console.log('Error');
            Validation.ErrorRedirect(response, '/table', 'ER! deleting the table row');
        } else {
            Validation.SuccessRedirect(response, '/table', 'Table row deleted successfully');
        }
    });
}
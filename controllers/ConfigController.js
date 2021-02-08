// -----------------------------------------------------------------------------
// -- Generic NodeJS Application: MVC Design
// -- File: ConfigController.js
// -- Description:
// -- Author:
// -- Date:
// -- Version: 
// -----------------------------------------------------------------------------



var Config = require('../models/Config');
var Validation = require('../utilities/Validation');

exports.Index = function(request, response){
    Config.ConfigModel.find(function(error, result){
        if (error) {
            console.log('Error');
            Validation.ErrorRedirect(response, '/', 'There was an error finding config in the database');
        } else {
            response.pageInfo.title = 'Configuration';
            response.pageInfo.config = result;
            response.render('config/Index', response.pageInfo);
        }
    });
};

exports.ConfigUpdate = function(request, response){ 

    // ------------------------------------------------------------
    // -- start parameters
    var testmanager = request.body.testmanager;

    var testmgrenable = false;
    if(request.body.testmgrenable === 'testmgrenable') {
        testmgrenable = true;
    }

    var testmgrshutdown = false;
    if(request.body.testmgrshutdown === 'testmgrshutdown') {
        testmgrshutdown = true;
    }

    var testmgrmode = request.body.testmgrmode;
    var testmgrversion = request.body.testmgrversion; 
    var builddirectory = request.body.builddirectory;

    var integrationtest = false;
    if(request.body.integrationtest === 'integrationtest') {
        integrationtest = true;
    }

    var developmenttest = false;
    if(request.body.developmenttest === 'developmenttest') {
        developmenttest = true;
    }
    
    var testdirectory = request.body.testdirectory;
    var testframeworkjar = request.body.testframeworkjar;
    var testtemplatexml = request.body.testtemplatexml;
    var platformtemplatexml = request.body.platformtemplatexml;
    var codeloadtemplatexml = request.body.codeloadtemplatexml;
    var codeloadxml = request.body.codeloadxml;

    var disablecodeload = false;
    if(request.body.disablecodeload === 'disablecodeload') {
        disablecodeload = true;
    }

    var uselatestbuild = false;
    if(request.body.uselatestbuild === 'uselatestbuild') {
        uselatestbuild = true;
    }

    var buildrange = request.body.buildrange;
    var testruntime = request.body.testruntime;
    var tmgrloopdelay = request.body.tmgrloopdelay;

    var disabletest = false;
    if(request.body.disabletest === 'disabletest') {
        disabletest = true;
    }

    var disabletestframeworkDB = false;
    if(request.body.disabletestframeworkDB === 'disabletestframeworkDB') {
        disabletestframeworkDB = true;
    }

    var exeserver1 = request.body.exeserver1;
    var exeserver2 = request.body.exeserver2;
    var exeserver3 = request.body.exeserver3;
    var exeserver4 = request.body.exeserver4;

    var server1enable = false;
    if(request.body.server1enable === 'server1enable') {
        server1enable = true;
    }

    var server2enable = false;
    if(request.body.server2enable === 'server2enable') {
        server2enable = true;
    }
    var server3enable = false;
    if(request.body.server3enable === 'server3enable') {
        server3enable = true;
    }
    var server4enable = false;
    if(request.body.server4enable === 'server4enable') {
        server4enable = true;
    }
  
    // -- end parameters
    // ------------------------------------------------------------


    if(Validation.IsNullOrEmpty([testmanager])) {
        Validation.ErrorRedirect(response, '/config', 'Please fill out all fields');
    } else {
    
        Config.ConfigModel.update(
            { _id: request.body.id }, 
            {
                testmanager: testmanager,
                testmgrenable: testmgrenable,
                testmgrshutdown: testmgrshutdown, 
                testmgrmode: testmgrmode,
                testmgrversion: testmgrversion,
                builddirectory: builddirectory,
                integrationtest: integrationtest,
                developmenttest: developmenttest,
                testdirectory: testdirectory,
                testframeworkjar: testframeworkjar, 
                testtemplatexml: testtemplatexml,
                platformtemplatexml: platformtemplatexml,
                codeloadtemplatexml: codeloadtemplatexml,
                codeloadxml: codeloadxml,
                disablecodeload: disablecodeload,
                uselatestbuild: uselatestbuild,
                buildrange: buildrange,
                testruntime: testruntime,
                tmgrloopdelay: tmgrloopdelay,
                disabletest: disabletest,
                disabletestframeworkDB: disabletestframeworkDB,
                exeserver1: exeserver1,
                exeserver2: exeserver2,
                exeserver3: exeserver3,
                exeserver4: exeserver4,
                server1enable: server1enable,
                server2enable: server2enable,
                server3enable: server3enable,
                server4enable: server4enable
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    console.log('ConfigUpdate : Error !!! ')
                    Validation.ErrorRedirect(response, '/config', 'There was an error finding a configuration in the database with this id');
                } else {
                    console.log('ConfigUpdate : Update Successful !!! ')
                    Validation.SuccessRedirect(response, '/config', 'Configuration updated successfully');
                }        
            }
        );
    }
}


exports.ConfigEdit = function(request, response){
    var id = request.params.id;
    
    Config.ConfigModel.findOne({ _id: id }, function(error, result){
        if(error) {
            console.log('Error');
            Validation.ErrorRedirect(response, '/config', 'There was an error finding the configuration in the database with this id');
        }
        else {
            if(result) {
                response.pageInfo.title = 'Edit Config';
                response.pageInfo.config = result
                response.render('config/ConfigEdit', response.pageInfo);
            } else {
                console.log('ConfigEdit : Update Successful !!! ')
                Validation.ErrorRedirect(response, '/config', 'There was an error finding a configuration in the database with this id');
            }
        }
  
    });
}



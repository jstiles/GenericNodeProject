// -----------------------------------------------------------------------------
// -- Generic NodeJS Application: MVC Design
// -- File: HomeController.js
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


            // Get data from DB & massage to inject into graph on home page.
            var pfresult = [];
            var codeversion = [];
            var et = [];
            var resultColor = "Red";

            // loop through query results
            for (item in result)
            {    
              // convert p/f data to red green colors
              if (result[item]["RESULTS"] == "pass")
              {
                resultColor = "Green";
              }
              // put quotes around parameters for Chart.js
              var pfquoted = '"' + resultColor + '"';
              pfresult.push(pfquoted);
              var cvquoted = '"' + result[item]["CODEVERSION"] + '"';
              codeversion.push(cvquoted);

              // convert et to numeric value for graph
              // "ET" : "06:01:40", 
              var etString = result[item]["ET"];
              var etStringVector = [];
              etStringVector = etString.split(":");

              var hours = 0.0;
              var min = 0.0;
              if (etStringVector.length > 0)
              {
                hours = parseFloat(etStringVector[0]);
                min = parseFloat(etStringVector[1]);
              }          
              var totalET = (hours*60.0 + min)/60.0;
              et.push(totalET.toFixed(2));


            }
            
            // pass data to view
            response.pageInfo.title = 'Home';
            response.pageInfo.table = result;
            response.pageInfo.pfresult = pfresult;
            response.pageInfo.codeversion = codeversion;
            response.pageInfo.et = et;
            response.render('home/Index', response.pageInfo);
        }
    });
};

// exports.Index = function(request, response){
//     response.pageInfo.title = 'Home';
//     response.render('home/Index', response.pageInfo);
// };


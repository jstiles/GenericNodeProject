// -----------------------------------------------------------------------------
// -- Generic NodeJS Application: MVC Design
// -- File: ReportController.js
// -- Description:
// -- Author:
// -- Date:
// -- Version: 
// -----------------------------------------------------------------------------


TableData = require('../utilities/TableData.js');
exports.Index = function(request, response){

    // TODO Add query to generate report from DB
    // Report.ReportModel.find(function(error, result){
    //     if (error) {
    //         console.log('Error');
    //         Validation.ErrorRedirect(response, '/', 'ER! finding targets in database !!!');
    //     } else {
    //         response.pageInfo.title = 'Report';
    //         response.pageInfo.targets = result;
    //         response.render('report/Index', response.pageInfo);
    //     }
    // });

    // Temporary page render
    response.pageInfo.title = 'Report';
    response.pageInfo.table = TableData.processCsvFile();
    response.render('report/Index', response.pageInfo);
};


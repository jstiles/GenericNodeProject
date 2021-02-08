// -----------------------------------------------------------------------------
// -- Generic NodeJS Application: MVC Design
// -- File: HelpController.js
// -- Description:
// -- Author:
// -- Date:
// -- Version: 
// -----------------------------------------------------------------------------



exports.Index = function(request, response){
    response.pageInfo.title = 'Help';
    response.render('help/Index', response.pageInfo);
};


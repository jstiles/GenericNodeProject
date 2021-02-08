// -----------------------------------------------------------------------------
// -- Generic NodeJS Application: MVC Design
// -- File: HomeController.js
// -- Description:
// -- Author:
// -- Date:
// -- Version: 
// -- Credit: Based on Web Development with Node and Express: 
// --         Leveraging the JavaScript Stack by Ethan Brown
// -----------------------------------------------------------------------------

//var Validation = require('../utilities/Validation');

// exports.Index = function(request, response){
//     Page1.Page1Model.find(function(error, result){
//         if (error) {
//             console.log('Error');
//             Validation.ErrorRedirect(response, '/', 'There was an error finding table in the database');
//         } else {
//             response.render('home/Index', response.pageInfo);
//         }
//     });
// };

exports.Index = function(request, response){
    response.pageInfo.title = 'Home';
    response.render('home/Index', response.pageInfo);
};


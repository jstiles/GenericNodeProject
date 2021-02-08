// -----------------------------------------------------------------------------
// -- Generic NodeJS Application: MVC Design
// -- File: TableData.js
// -- Description:
// -- Author:
// -- Date:
// -- Version: 
// -----------------------------------------------------------------------------


var TableDataLocation = "../Reports/TableData.csv";
var Q = require('q');

// -----------------------------------------------------------------------------
// -- processCsvFile using promise
exports.processCsvFile = function() {
    var deferred = Q.defer();
    var fs = require('fs'),
        readline = require('readline'),
        instream = fs.createReadStream(TableDataLocation),
        outstream = new (require('stream'))(),
        rl = readline.createInterface(instream, outstream);
      
        tableRow = {};    // intermediate object
        rowVector = [];   // vector to hold line split by commas
        NumColumns = 10;  // expected number of comumns in table
        tableVector = []; // vector for holding tableRow objects
     
    rl.on('line', function (line) {
      rowVector = line.split(",");

      if (rowVector.length >= NumColumns)
        {
            tableRow = { date : rowVector[0],
                         product : rowVector[1],
                         ttype: rowVector[2],
                         status : rowVector[3],
                         version : rowVector[4],
                         printer : rowVector[5],
                         testcode : rowVector[6],
                         run : rowVector[7],
                         report : rowVector[8],
                         log1 : rowVector[9],
                         dummy : "dummy1"
                        };

            tableVector.push(tableRow);
         }
   
    });
    
    rl.on('close', function (line) 
    {
      deferred.resolve(tableVector);
    });

    return tableVector;
};
	

// -----------------------------------------------------------------------------
// -- processCsvFile
exports.processCsvFileORG = function() {
    var fs = require('fs'),
        readline = require('readline'),
        instream = fs.createReadStream(TableDataLocation),
        outstream = new (require('stream'))(),
        rl = readline.createInterface(instream, outstream);
      
        tableRow = {};    // intermediate object
        rowVector = [];   // vector to hold line split by commas
        NumColumns = 10;  // expected number of comumns in table
        tableVector = []; // vector for holding tableRow objects
     
    rl.on('line', function (line) {
      rowVector = line.split(",");

      if (rowVector.length >= NumColumns)
        {
            tableRow = { date : rowVector[0],
                         product : rowVector[1],
                         ttype: rowVector[2],
                         status : rowVector[3],
                         version : rowVector[4],
                         printer : rowVector[5],
                         testcode : rowVector[6],
                         run : rowVector[7],
                         report : rowVector[8],
                         log1 : rowVector[9],
                         dummy : "dummy1"
                        };

            //console.log("tableRow[date] = " + tableRow.date);
            tableVector.push(tableRow);
            //console.log("tableVector[0]['log1'] = " + tableVector[0]['log1']);
        }
   
    });
    
    rl.on('close', function (line) {
    });

    return tableVector;
};

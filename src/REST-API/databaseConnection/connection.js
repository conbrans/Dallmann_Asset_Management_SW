/**
 * Version 1.0
 * 06.10.2020
 *
 * @module /connection
 */


/**
 * Import of modules
 */

const mysql = require('mysql');
const confiq = require('../../configs/config');

//creating a pool for connections
var pool = mysql.createPool(confiq.dbconfigSEP);

//export of this module
module.exports = {
    query: function(){
        var sqlArgs = [];
        var args = [];
        for(var i=0; i<arguments.length; i++){
            args.push(arguments[i]);
        }
        //last arg is callback
        var callback = args[args.length-1];
        pool.getConnection((err, connection) => {
            if(err) {
                console.log(err);
                return callback(err);
            }

            if(args.length > 2){
                sqlArgs = args[1];
            }

            connection.query(args[0], sqlArgs, (err, results) => {
                // always put connection back in pool after last query
                connection.release();
                if(err){
                    console.log(err);
                    return callback(err);
                }

                callback(null, results);
            });
        });
    }
};




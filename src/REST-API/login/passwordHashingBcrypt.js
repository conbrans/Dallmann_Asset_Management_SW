/**
* Version 1.0
* 06.10.2020
*
* @module /passwwordashing
*/


/**
 * Import of modules
 */

const bcrypt = require('bcrypt');
const md5 = require('md5');

//creating a md5 hash
function firstHashe(password) {

    return md5(password);

}

//creating a bcrypt hash
function secondHashe(password) {

    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));

}

//compare md5 hash from client with bycrypt hash out of database
function compare (givenPassword, dbResult) {

     return bcrypt.compareSync(givenPassword, dbResult);

}

  module.exports = {

        firstHashe,
        secondHashe,
        compare

  };





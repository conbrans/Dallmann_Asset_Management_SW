//const connection = require('../../../src/REST-API/databaseConnection/connection');
//const app = require('../../../src/app');
//const logger = require('../middelwareFunctions/logger');
//const { body, validationResult } = require('express-validator');
//const constraint = require('../middelwareFunctions/validation');
//const express = require('express');
//const router = express();

const bcrypt = require('bcrypt');
const md5 = require('md5');

function firstHashe(password) {

    return md5(password);

}

function secondHashe(password) {

    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));

}

function compare (givenPassword, dbResult) {

     return bcrypt.compareSync(givenPassword, dbResult);

}

  module.exports = {

        firstHashe,
        secondHashe,
        compare

  };





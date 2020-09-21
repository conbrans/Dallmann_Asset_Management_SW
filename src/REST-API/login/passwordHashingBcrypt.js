const connection = require('../../../src/REST-API/databaseConnection/connection');
const app = require('../../../src/app');
const logger = require('../middelwareFunctions/logger');
const { body, validationResult } = require('express-validator');
const constraint = require('../middelwareFunctions/validation');
const express = require('express');
const router = express();
const bcrypt = require('bcrypt');


//1234 -> abcd
async function run() {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('1234', salt);
    console.log(salt);
    console.log(hashed);
}

run();
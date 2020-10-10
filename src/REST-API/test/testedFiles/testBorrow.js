const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../Website/routes/index');
const connection = require('../../../REST-API/databaseConnection/connection');
const expect = require('chai').expect
const expectedObjectArray = require('../../../REST-API/test/helpFiles/objectArrays')
/**
 * Import of node packages
 */
const app = require('../../app');
const fs = require('fs');
const https =require('https');
const path = require('path');

/**
 * Require of the get Methods
 * @type {Router}
 */
const routerGet = require('./helproutes/routerGet');
const ajax = require('./helproutes/ajaxCalls');


/**
 * Require of standard routes
 * @type {Router}
 */
const booking = require('./routesBooking');
const history = require('./routesHistory');
const device = require('./routerDevice');
const login = require('./routesLogin');
const usermanagement = require('./routesUserManagement');
const search = require('./routesSearch');

app.use(ajax);
app.use(booking);
app.use(history);
app.use(login);
app.use(device);
app.use(routerGet);
app.use(usermanagement);
app.use(search);


/**
 * Require of Rest routes
 */

const restBorrow = require('../../REST-API/ressources/borrow');
const restDevice = require('../../REST-API/ressources/device');
const restHistory = require('../../REST-API/ressources/history');
const restWorker = require('../../REST-API/ressources/worker');
const restLogin= require('../../REST-API/login/loginApp');
const restLogger = require('../../REST-API/middelwareFunctions/logger');
const restNotification = require('../../REST-API/ressources/notifcations');

app.use(restLogger.assignId);
app.use(restLogger.logRequest);
app.use(restBorrow);
app.use(restDevice);
app.use(restHistory);
app.use(restWorker);
app.use(restLogin);
app.use(restNotification);


/*https.createServer(
    {
    cert : fs.readFileSync('C:\\Users\\co99b\\IdeaProjects\\Dallmann_Asset_Management_SW\\src\\Website\\sslfiles\\server.crt'),
        key : fs.readFileSync('C:\\Users\\co99b\\IdeaProjects\\Dallmann_Asset_Management_SW\\src\\Website\\sslfiles\\server.key')
    },app).listen(3000, () => console.log(
    "listening on: " +
    `https://localhost:3000`
));*/

app.listen(3000, () => console.log(
    "listening on: " +
    `http://localhost:3000`
));
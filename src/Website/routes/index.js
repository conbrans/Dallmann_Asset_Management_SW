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


/**
 * Require of standard routes
 * @type {Router}
 */
const booking = require('./routesBooking');
const history = require('./routesHistory');
const device = require('./routerDevice');
const login = require('./routesLogin');
const usermanagement = require('./routesUserManagement');

app.use(booking);
app.use(history);
app.use(login);
app.use(device);
app.use(routerGet);
app.use(usermanagement);


/**
 * Require of Rest routes
 */

const restBorrow = require('../../REST-API/ressources/borrow');
const restDevice = require('../../REST-API/ressources/device');
const restHistory = require('../../REST-API/ressources/history');
const restWorker = require('../../REST-API/ressources/worker');
const restLogin= require('../../REST-API/login/loginApp');

app.use(restBorrow);
app.use(restDevice);
app.use(restHistory);
app.use(restWorker);
app.use(restLogin);

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
/**
 * Import of node packages
 */
const app = require('../../app');

/**
 * Require of helproutes
 * @type {Router}
 */
const routerGet = require('./helproutes/routerGet');


/**
 * Require of standard routes
 * @type {Router}
 */
const booking = require('../routes/reservierung');
const history = require('../routes/historie');
const login = require('../routes/login');
const usermanagement = require('../routes/Usermanagement');

app.use(booking);
app.use(history);
app.use(login);
app.use(routerGet);
app.use(usermanagement);


/**
 * Require of Rest routes
 */

const restBorrow = require('../../REST-API/ressources/borrow');
const restDevice = require('../../REST-API/ressources/device');
const restHistory = require('../../REST-API/ressources/history');
const restWorker = require('../../REST-API/ressources/worker');

app.use(restBorrow);
app.use(restDevice);
app.use(restHistory);
app.use(restWorker);

app.listen(3000, () => console.log(
    "listening on: " +
    `http://localhost:3000`
));

module.exports = app;

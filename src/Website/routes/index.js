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


app.listen(3000, () => console.log(
    "listening on: " +
    `http://localhost:3000`
));

module.exports = app;

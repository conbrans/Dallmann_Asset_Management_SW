/**
 * Import of node packages
 */
const app = require('../../app');
const session = require('express-session');


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


/**
 * Values for Cookies
 * @type {number}
 */
const {
    PORT = 3000,
    sessionLifetime = 1000 * 60 * 60 * 24,
    sessionName = "Session",
    secretSession = "SecretSession"
} = process.env;


app.use(session({
    name: sessionName,
    resave: false,
    saveUninitialized: true,
    secret: secretSession,
    cookie: {
        maxAge: sessionLifetime,
        sameSite: true,
        secure: false    //in development in production :true
    }
}));

app.use(booking);
app.use(history);
app.use(login);
app.use(routerGet);
app.use(usermanagement);


app.listen(PORT, () => console.log(
    "listening on: " +
    `http://localhost:${PORT}`
));

/**
 * Import of node packages
 */
const app = require('../../app');
const session = require('express-session');


/**
 * Import of own modules, one module for every task
 * @type {Router}
 */

const addUser = require('../routes/addUser');
const booking = require('../routes/reservierung');
const history = require('../routes/historie');
const homepage = require('../routes/homepage');
const login = require('../routes/login');
const redirect = require('../routes/redirect');
const routerGet = require('../routes/routerGet');
const updateUser = require('../routes/updateUser');


/**
 * Lifetime of Cookies
 * @type {number}
 */
var lifetime = 1000 * 60 * 60 * 24;
var longLifetime = 1000 * 60 * 60 * 24 * 365;


/**
 * Values for Cookies
 * @type {number}
 */
var {
    PORT = 3000,
    sessionLifetime = lifetime,
    sessionName = "sid",
    secretSession = "test"
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

app.use(addUser);
app.use(booking);
app.use(history);
app.use(homepage);
app.use(login);
app.use(routerGet);
app.use(updateUser);


// Get Methods for the login and logout
app.get('/', redirect.redirectHome, function (request, response) {
    response.render("login.ejs");

})

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect("/home");
        }
        res.clearCookie(sessionName);
        //console.log("Cookie wurde zerstört");
        res.redirect("/");
    })
})

app.listen(PORT, () => console.log(
    "listening on: " +
    `http://localhost:${PORT}`
));

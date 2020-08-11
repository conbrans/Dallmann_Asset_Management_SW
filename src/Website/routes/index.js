/**
 * Import of node packages
 */
const app = require('../../app');
const session = require('express-session');


/**
 * Import of own modules, one module for every task
 * @type {Router}
 */
const routerGet = require('../routes/routerGet');
const homepage = require('../routes/homepage');
const historie = require('../routes/historie');
const login = require('../routes/login');
const addUser = require('../routes/addUser');
const updateUser = require('../routes/updateUser');
const redirect = require('../routes/redirect');


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


app.use(routerGet);
app.use(homepage);
app.use(historie);
app.use(login);
app.use(addUser);
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
        console.log("Cookie wurde zerstört");
        res.redirect("/");
    })
})

app.listen(PORT, () => console.log(
    "listening on: " +
    `http://localhost:${PORT}`
));

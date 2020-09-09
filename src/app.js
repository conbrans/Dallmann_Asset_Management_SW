const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const toastr = require('express-toastr');
const app = express();

app.use(session({
    name: "Session",
    resave: false,
    saveUninitialized: true,
    secret: "SecretSession",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: true,
        secure: false    //in development in production :true
    }
}));


// view engine setup
app.set('views', path.join(__dirname, 'Website/Views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(cors());
app.use(flash());
app.use(toastr());
app.use(cookieParser('secret'));
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/Website/public')));
app.use(express.static(path.join(__dirname, '/Website/private')));



module.exports = app;
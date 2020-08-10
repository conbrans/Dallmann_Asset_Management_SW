const express = require('express');
const app = require('../../app');
const fetch = require('node-fetch');
const session = require('express-session');
const router = express.Router();


app.use(session({
    name : "Session",
    resave : false,
    saveUninitialized : false,
    secret : "test",
    cookie:
        {
            path : '/',
            httpOnly : false,
            secure : false,
            maxAge : null,
            sameSite : true,
        }
}));

router.get("/", function (request,result)
{
    result.render("login.ejs");
});

router.post("/login", function (request, response) {
    var result;

    fetch('https://gist.githubusercontent.com/conbrans/57fa107ff7dc3faa2e94f766ebbcf3c1/raw/c67d1f63ecebbd53769a0e9022b840d0e5dbb8f2/test.json')
        .then(response => response.json())
        .then(json => result = json);

    setTimeout(()=>
    {
        if (result.length===0)
        {
            console.log("Es gibt keinen NUtzer mit dieser Email oder das Passwort ist falsch");
        } else
            {
                console.log("Login war erfolgreich");

            }

        },100);
});






module.exports = router;
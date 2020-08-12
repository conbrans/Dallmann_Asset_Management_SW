const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

var lifetime = 1000 * 60 * 60 * 24; //
var longLifetime = 1000 * 60 * 60 * 24 * 365;


var {
    PORT = 3000,
    sessionLifetime = lifetime,
    sessionName = "sid",
    secretSession = "test"
} = process.env;


router.post("/login", function (request, response) {
    var result;
    console.log(request.body);


    //TODO fetch auf den Call von Rest-API umändern, im Moment nur ein Benutzerkonto in Gist
    fetch('https://gist.githubusercontent.com/conbrans/57fa107ff7dc3faa2e94f766ebbcf3c1/raw/d709e14d9b810292240d69507a1b24af5507576a/test.json')
        .then(response => response.json())
        .then(json => result = json);


    setTimeout(() => {
        //Zum Testen ob Zugriff verweigert wird
        //result.access= false;

        if (!result[0].access) {
            console.log("Zugang wurde verweigert");
            response.redirect("/");

        } else {
            request.session.userID = result[0].worker_id;
            request.session.userName = result[0].name + " " + result[0].surname;
            request.session.email = result[0].e_mail;
            response.redirect("/home");
        }
    }, 500);
});


module.exports = router;
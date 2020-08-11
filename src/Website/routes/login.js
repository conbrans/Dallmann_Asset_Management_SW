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


    //TODO fetch auf den Call von Rest-API umändern, im Moment nur ein Benutzerkonto in Gist
    fetch('https://gist.githubusercontent.com/conbrans/57fa107ff7dc3faa2e94f766ebbcf3c1/raw/b374f57620af43a1569620c35daa87b8582f082a/test.json')
        .then(response => response.json())
        .then(json => result = json);


    setTimeout(() => {
        //result.access= false;
        if (!result.access) {
            console.log("Zugang wurde verweigert");
            response.redirect("/");

        } else {
            request.session.userID = result.worker_id;
            request.session.userName = result.name + " " + result.surname;
            request.session.email = result.e_mail;
            request.session.userRole = result.role;
            response.redirect("/home");
        }
    }, 500);
});


module.exports = router;
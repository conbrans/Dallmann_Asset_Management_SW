const express = require('express');
const router = express.Router();
const redirect = require('../routes/redirect');


router.get("/add", redirect.redirectLogin, function (request, result) {
    result.render("adminCreateUser.ejs",
        {
            benutzername: request.session.userName,
            role : request.session.role,
        })

});


router.get("/update", redirect.redirectLogin, function (request, result) {
    result.render("adminUpdateUser.ejs",
        {
            benutzername: request.session.userName,
            role : request.session.role,
        })

});


module.exports = router;
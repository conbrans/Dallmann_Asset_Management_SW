const express = require('express');
const router = express.Router();
const redirect = require('../routes/redirect');


router.get("/add", redirect.redirectLogin, redirect.redirectHomeAdmin, function (request, result) {
    result.render("adminCreateUser.ejs",
        {
            benutzername: request.session.userName,
            role : request.session.role,
        })

});


router.get("/update", redirect.redirectLogin, redirect.redirectHomeAdmin, function (request, result) {
    result.render("adminUpdateUser.ejs",
        {
            benutzername: request.session.userName,
            role : request.session.role,
        })

});

router.get("/devices", function (request,response){
    response.render("DeviceMngt.ejs",
        {
            benutzername: request.session.userName,
            role : request.session.role,

        })
});


module.exports = router;
const express = require('express');
const router = express.Router();
const app = require('../../app');


router.post("/updateUser", function (request,result)
{
    result.render("adminCreateUser.ejs",
        {
            benutzername: request.session.userName,
            role : request.session.role,
        })
});

module.exports = router;
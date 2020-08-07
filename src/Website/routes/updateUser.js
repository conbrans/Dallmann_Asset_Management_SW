const express = require('express');
const router = express.Router();
const app = require('../../app');

router.get("/update", function (request,result)
{
    result.render("adminUpdateUser.ejs",
        {
            benutzername : "Testname",
        })

});

router.post("/updateUser", function (request,result)
{
    result.render("adminCreateUser.ejs",
        {
            benutzername : "Testname",
        })

    console.log(request.body);

});

module.exports = router;
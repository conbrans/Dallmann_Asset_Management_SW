const express = require('express');
const router = express.Router();
const app = require('../../app');

router.get("/add", function (request,result)
{
    result.render("adminCreateUser.ejs",
        {
            benutzername : "Testname",
        })

});

router.post("/addUser", function (request,result)
{
    result.render("adminCreateUser.ejs",
        {
            benutzername : "Testname",
        })

    console.log(request.body);

});

module.exports = router;
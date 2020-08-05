const express = require('express');
const router = express.Router();

router.get("/add", function (request,result)
{
    result.render("adminUserMngt.ejs",
        {
            benutzername : "Testname",
        })

});

//router.post("/addUser", function (request,result))

module.exports = router;
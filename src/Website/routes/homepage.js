const express = require('express');
const router = express.Router();

router.get("/", function (request,result)
{
    result.render('index.ejs',
        {
            benutzername: "Testname",
            geraetenummer: "320-400.673"

        });
});

module.exports = router;


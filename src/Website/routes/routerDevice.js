const express = require('express');
const router = express.Router();
const fetch = require('./helproutes/fetch');
const authentication = require('./helproutes/rightAuthentication');
const redirect = require('./helproutes/redirect');


router.post("/addDevice", redirect.redirectLogin,
    authentication.authRight("add_Device"), (req,res) => {

    fetch.postFetch("/api/device/createDevice",req)
        .catch((error) => {
            console.error('Error:', error);
        });
   res.redirect("/devices");
    });

router.post("/updateDevice",redirect.redirectLogin,
    authentication.authRight("edit_Device"), (req, res) =>
    {
        fetch

    });



module.exports = router;



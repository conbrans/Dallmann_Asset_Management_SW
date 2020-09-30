/**
 * Import of helproutes and declaration of Router Method
 */
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
    authentication.authRight("edit_Device"), (req, res) => {
        fetch.putFetch("/api/device/updateDevice/"+req.body.inventoryNumber,req)
            .then(() => res.redirect("back"))
            .catch((error) => {
                console.error('Error:', error);
            });
    });

router.post("/deleteDevice",redirect.redirectLogin,authentication.authRight("delete_Device"),(req, res) => {
    console.log(req.session.inventoryNumber);
    fetch.deleteFetch("/api/device/deleteDevice/"+
     req.session.inventoryNumber,req)

        .then(() => res.redirect("/devices"))
        .catch((error) => {
            console.error('Error:', error);
        });
});


module.exports = router;
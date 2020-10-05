/**
 * Import of helproutes and declaration of Router Method
 */
const express = require('express');
const router = express.Router();
const fetch = require('./helproutes/fetch');
const authentication = require('./helproutes/rightAuthentication');
const redirect = require('./helproutes/redirect');
const reformatDate = require('./helproutes/reformatDate');

router.post("/addDevice", redirect.redirectLogin,
    authentication.authRight("add_Device"), (req, res) => {

        fetch.postFetch("/api/device/createDevice", req)
            .catch((error) => {
                console.error('Error:', error);
            });
    });

router.post("/updateDevice", redirect.redirectLogin,
    authentication.authRight("edit_Device"), (req, res) => {
        fetch.putFetch("/api/device/updateDevice/" + req.body.inventoryNumber, req)
            .then(() => res.redirect("back"))
            .catch((error) => {
                console.error('Error:', error);
            });
    });

router.post("/deleteDevice", redirect.redirectLogin, authentication.authRight("delete_Device"), (req, res) => {
    console.log(req.session.inventoryNumber);
    fetch.deleteFetch("/api/device/deleteDevice/" +
        req.session.inventoryNumber, req)

        .then(() => res.redirect("/devices"))
        .catch((error) => {
            console.error('Error:', error);
        });
});

router.post("/devices", (req, res) => {
    console.log(req.body.amount);
    fetch.getFetch("/api/device/getAllDevices")
        .then(data => {
            reformatDate.removeTimeStampForDevice(data)
                .then(data => {
                    console.log(data);
                    res.status(200).render("newDeviceManagement.ejs", {
                        username: req.session.username,
                        role: req.session.role,
                        rights: req.session.rights,
                        data: data,
                        amount: req.body.amount,
                    });
                })
        });
});


module.exports = router;
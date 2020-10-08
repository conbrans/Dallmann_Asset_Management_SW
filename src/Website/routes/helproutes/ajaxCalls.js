const express = require('express');
const fetch = require('./fetch');
const redirect = require('./redirect');
const reformatDate = require('./reformatDate');
const authentication = require('./rightAuthentication');
const router = express.Router();

/**
 * gets a specific inventorynumber from an ajax call on the device
 * management side
 */
router.post("/sendInventoryNumber", (req, res) => {
    req.session.inventoryNumber = req.body.inventoryNumber;
    res.json({
        message: "Erfolg",
    });
});
/**
 * get the workerid and mail for a specific user, which is transported with
 * an ajax call
 */
router.post("/sendWorkerInfos", (req, res) => {
    req.session.userMgntID = req.body.workerid;
    req.session.userMgntMail = req.body.mail;
    res.json({
        message: "Erfolg",
    });
});

router.get("/showUsers", redirect.redirectLogin,
    authentication.authRight("add_user"),
    authentication.authRight("delete_User"), (req, res) => {
        fetch.getFetch("/api/user/getAllUsers")
            .then(data => res.json(data));
    });


router.get("/showBooking", redirect.redirectLogin,
    authentication.authRight("booking_device"), (req, res) => {
        fetch.getFetch("/api/borrow/getReservations")
            .then(data =>
                reformatDate.removeTimeStampForBooking(data).then(data => res.json(data)))
    });

router.get("/showOneBooking",redirect.redirectLogin, authentication.authRight("booking_device"), (req, res) => {
    console.log(req.session.inventoryNumber);
    fetch.getFetch("/api/borrow/getReservation/"+req.session.inventoryNumber)
        .then(data =>
        reformatDate.removeTimeStampForBooking(data).then(data=>{
         for (let i=0;i<data.length;i++){
             var test = Object.values(data[i]);
         }
            return res.json(test);
        })
        );
});

router.get("/showDevices", redirect.redirectLogin,
    authentication.authRight("view_device"), (req, res) => {
        fetch.getFetch("/api/device/getAllDevices")
            .then(data => {
                reformatDate.removeTimeStampForDevice(data)
                    .then(data => res.json(data));
            });
    });


router.get("/showUser", redirect.redirectLogin,
    authentication.authRight("add_user"),
    authentication.authRight("delete_User"), (req, res) => {
        console.log(req.session.userMgntID);
        fetch.getFetch("/api/user/getSpecificUser/" + req.session.userMgntID)
            .then(data => res.json(data))
    });


router.get("/showDevice",redirect.redirectLogin,
    authentication.authRight("view_device"), (req, res) =>
    {
        req.body.inventoryNumber = req.session.inventoryNumber;
        fetch.postFetch("/api/device/getSpecificDevice/byInventoryNumber", req)
            .then(data =>{
                reformatDate.removeTimeStampForDevice(data)
                    .then(data => res.json(data))
            });
    });


module.exports = router;
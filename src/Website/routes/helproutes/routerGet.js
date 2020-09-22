const express = require('express');
const router = express.Router();
const fetch = require('./fetch');
const redirect = require('./redirect');
const authentication = require('./rightAuthentication');
const notification = require('./notifications');


router.get('/', redirect.redirectHome,
    (req, res) => {
        res.status(201).render("login.ejs",
            {
                req : req,
            });
    });

router.get('/failedLogin',redirect.redirectHome,notification.sendMessage("failedLogin"),(req, res) =>
{
    res.status(403).render("login.ejs",
        {
           req:req,
        });

});


router.get("/logout",
    (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.redirect("/home");
            }
            res.clearCookie("Session");
            res.status(302).redirect("/");
        });
    });


router.get("/add", redirect.redirectLogin, authentication.authRight("add_User"),
    (req, res) => {
        res.status(200).render("adminCreateUser.ejs",
            {
                username: req.session.username,
                role: req.session.role,
                rights: req.session.rights,
            })

    });

router.get("/addDevice", redirect.redirectLogin,
    authentication.authRight("add_Device"), (req,res) => {
        res.render("addDevice.ejs");
    });


router.get("/booking", redirect.redirectLogin,
    authentication.authRight("booking_device"),
    (req, res) => {
        console.log("TEST");
        res.render("booking.ejs",
            {
                username: req.session.username,
                role: req.session.role,
                rights: req.session.rights,
                inventoryNumber : "23221320",
            })

    });
router.get("/bookinglist", redirect.redirectLogin,
    authentication.authRight("booking_device"),
    (req, res) => {
        fetch.getFetch("/api/borrow/getReservations")
            .then(data =>
                res.render("bookinglist.ejs",
                    {
                        username: req.session.username,
                        role: req.session.role,
                        rights: req.session.rights,
                        data :data,
                    })
            )
    });

router.get("/devices", redirect.redirectLogin,
    authentication.authRight("view_device"),
    (req, res) => {
        fetch.getFetch("/api/device/getAllDevices")
            .then(data =>
                res.render("newDeviceManagement.ejs",
                    {
                        username: req.session.username,
                        role: req.session.role,
                        rights: req.session.rights,
                        data: data,

                    })
            );
    });

router.get("/faQ",
    (req, res) => {
        res.render("FAQ.ejs",
            {
                username: req.session.username,
                role: req.session.role,
                rights: req.session.rights,
            });

    });


router.get("/picking",
    (req, res) => {
        res.render("picking.ejs",
            {
                username: req.session.username,
                role: req.session.role,
                rights: req.session.rights,
            });

    });

router.get("/home", redirect.redirectLogin, notification.sendMessage("login"),
    /*notification.sendMessage("booking"),
    notification.sendMessage("tuvUvv"),
    notification.sendMessage("maintenance"),*/
    (req, res) => {

        res.render('index.ejs',
            {
                username: req.session.username,
                role: req.session.role,
                rights: req.session.rights,
                req: req,
            });
    });

router.get("/profil", redirect.redirectLogin, (req, res) => {
    res.render("profil.ejs",
        {
            username: req.session.username,
            role: req.session.role,
            rights: req.session.rights,
            firstname: req.session.firstname,
            surname: req.session.surname,
            email : req.session.email,
        });

});


router.get("/update", redirect.redirectLogin,
    authentication.authRight("add_user"),
    (req, res) => {
        res.render("adminUpdateUser.ejs",
            {
                username: req.session.username,
                role: req.session.role,
                rights: req.session.rights,
            })

    });

router.get("/userManagement", redirect.redirectLogin,
    authentication.authRight("add_user"),
    authentication.authRight("delete_User"),
    (req, res) => {
        fetch.getFetch("/api/user/getAllUsers")
            .then(data =>

                res.status(200).render("userManagement.ejs",
                    {
                        username: req.session.username,
                        role: req.session.role,
                        rights: req.session.rights,
                        data: data,
                    })
            );
    });


module.exports = router;
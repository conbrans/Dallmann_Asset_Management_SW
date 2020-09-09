const express = require('express');
const router = express.Router();
const fetch = require('./fetch');
const redirect = require('./redirect');
const notification = require('./notifications');
const {
    sessionName = "Session",
} = process.env;

router.get('/', redirect.redirectHome,
    (req, res) =>
    {
        res.status(201).render("login.ejs");
    });

router.get("/logout",
    (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.redirect("/home");
            }
            res.clearCookie(sessionName);
            res.status(302).redirect("/");
        });
    });


router.get("/add", redirect.redirectLogin, redirect.authRight("add_User"),
    (req, res) => {
        res.status(200).render("adminCreateUser.ejs",
            {
                benutzername: req.session.userName,
                role: req.session.role,
                rights: req.session.rights,
            })

    });

router.get("/addDevice", redirect.redirectLogin,
    redirect.authRight("add_Device"), (res) => {
        res.sendFile("C:\\Users\\c.brans\\IdeaProjects\\" +
            "Dallmann_Asset_Management_SW\\src\\Website\\private\\" +
            "html\\addDevice.html");

    });


router.get("/booking", redirect.redirectLogin,
    redirect.authRight("booking_device"),
    (req, res) => {
        res.render("booking.ejs",
            {
                benutzername: req.session.userName,
                role: req.session.role,
                rights: req.session.rights,
                geraetenummer: "",
                minDate: "",
                maxDate: "",
            })

    });
router.get("/bookinglist", redirect.redirectLogin,
    redirect.authRight("booking_device"),
    (req, res) => {
        res.render("bookinglist.ejs",
            {
                benutzername: req.session.userName,
                role: req.session.role,
                rights: req.session.rights,

            });
    });

router.get("/devices", redirect.redirectLogin,
    redirect.authRight("view_device"),
    (req, res) => {
        fetch.getFetch("devices")
            .then(data =>
                res.render("newDeviceManagement.ejs",
                    {
                        benutzername: req.session.userName,
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
                benutzername: req.session.userName,
                role: req.session.role,
                rights: req.session.rights,
            });

    });

router.get("/home", redirect.redirectLogin,notification.sendMessage("login"),
    notification.sendMessage("booking"),
    notification.sendMessage("tuvUvv"),
    notification.sendMessage("maintenance"),
    (req, res) => {

        res.render('index.ejs',
            {
                benutzername: req.session.userName,
                role: req.session.role,
                rights: req.session.rights,
                req : req,
            });
    });

router.get("/profil", (req, res) => {
    res.render("profil.ejs",
        {
            benutzername: req.session.userName,
            role: req.session.role,
            rights: req.session.rights,
        });

});


router.get("/update", redirect.redirectLogin,
    redirect.authRight("add_user"),
    (req, res) => {
        res.render("adminUpdateUser.ejs",
            {
                benutzername: req.session.userName,
                role: req.session.role,
                rights: req.session.rights,
            })

    });

router.get("/userManagement", redirect.redirectLogin,
    redirect.authRight("add_user"),
    redirect.authRight("delete_User"),
    (req, res) => {
        fetch.getFetch("users")
            .then(data =>
                res.render("userManagement.ejs",
                    {
                        benutzername: req.session.userName,
                        role: req.session.role,
                        rights: req.session.rights,
                        data: data,
                    }));
    });


module.exports = router;
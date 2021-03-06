/**
 * Require of all helproutes which are used and declaration of router
 */
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
				req: req,
			});
	});

router.get('/failedLogin', redirect.redirectHome,
	notification.sendMessage("failedLogin"), (req, res) => {
		res.status(403).render("login.ejs", {
			req: req,
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

router.get("/addUser", redirect.redirectLogin, authentication.authRight("add_User"),
	(req, res) => {
		res.status(200).render("adminCreateUser.ejs");
	});

router.get("/addDevice", redirect.redirectLogin,
	authentication.authRight("add_Device"), (req, res) => {
		res.status(200).render("addDevice.ejs");
	});

router.get("/booking", redirect.redirectLogin,
	authentication.authRight("booking_device"),
	(req, res) => {

		res.status(200).render("booking.ejs", {
			username: req.session.username,
			role: req.session.role,
			rights: req.session.rights,
			inventoryNumber: "",
		});
	});

router.get("/bookinglist", redirect.redirectLogin,
	authentication.authRight("booking_request"),
	(req, res) => {
		res.status(200).render("bookinglist.ejs", {
			username: req.session.username,
			role: req.session.role,
			rights: req.session.rights,
			searchValue : "",
		});
	});


router.get("/devices", redirect.redirectLogin,
	authentication.authRight("view_device"),
	(req, res) => {
		res.status(200).render("newDeviceManagement.ejs", {
			username: req.session.username,
			role: req.session.role,
			rights: req.session.rights,
			searchValue : "",
		});
	});


router.get("/searchDevice", (req, res) => {
	fetch.getFetch("/api/device/getSpecificDevice/byInventoryNumber")
		.then(data =>
			res.status(200).render("newDeviceManagement.ejs", {
				username: req.session.username,
				role: req.session.role,
				rights: req.session.rights,
				data: data,
			}));
});

router.get("/FAQ",
	(req, res) => {
		res.status(200).render("FAQ_MAIN.ejs", {
			username: req.session.username,
			role: req.session.role,
			rights: req.session.rights,
		});
	});

router.get("/Website-FAQ",
	(req, res) => {
		res.status(200).render("FAQWebsite.ejs", {
			username: req.session.username,
			role: req.session.role,
			rights: req.session.rights,
		});
	});

router.get("/App-FAQ",
	(req, res) => {
		res.status(200).render("FAQAndroid.ejs", {
			username: req.session.username,
			role: req.session.role,
			rights: req.session.rights,
		});
	});
router.get("/Traccar-FAQ",
	(req, res) => {
		res.status(200).render("FAQTraccar.ejs", {
			username: req.session.username,
			role: req.session.role,
			rights: req.session.rights,
		});
	});

router.get("/commission",
	(req, res) => {
		res.render("commission.ejs", {
			username: req.session.username,
			role: req.session.role,
			rights: req.session.rights,
			req: req,
		});
	});

router.get("/commissionDone", notification.sendMessage("commission"), (req, res) => {
	res.render("commission.ejs", {
		username: req.session.username,
		role: req.session.role,
		rights: req.session.rights,
		req: req,
	});
});

router.get("/home", redirect.redirectLogin, notification.sendMessage("login"),
	notification.sendMessage("booking"),
	notification.sendMessage("tuv"),
	notification.sendMessage("uvv"),
	(req, res) => {
		res.render('index.ejs', {
			username: req.session.username,
			role: req.session.role,
			rights: req.session.rights,
			req: req,
		});
	});

router.get("/profil", redirect.redirectLogin, (req, res) => {
	res.render("profil.ejs", {
		username: req.session.username,
		role: req.session.role,
		rights: req.session.rights,
		firstname: req.session.firstname,
		surname: req.session.surname,
		email: req.session.email,
		req: req,
	});
});

router.get("/editProfil", notification.sendMessage("editProfil"), (req, res) => {
	res.render("profil.ejs", {
		username: req.session.username,
		role: req.session.role,
		rights: req.session.rights,
		firstname: req.session.firstname,
		surname: req.session.surname,
		email: req.session.email,
		req: req,
	});
});

router.get("/userManagement", redirect.redirectLogin,
	authentication.authRight("add_user"),
	authentication.authRight("delete_User"),
	(req, res) => {
		res.status(200).render("userManagement.ejs", {
			username: req.session.username,
			role: req.session.role,
			rights: req.session.rights,
			data: [{
				firstname: "Vorname",
				surname: "Nachname",
				eMail: "E-Mail",
				role: "Rolle",
			}]
		});
	});

router.get("/acceptBorrowRequests", redirect.redirectLogin,authentication.authRight("booking_request"), ((req, res) => {
	res.status(200).render("acceptBooking.ejs",{
		username: req.session.username,
		role: req.session.role,
		rights: req.session.rights,
	})
}))

module.exports = router;
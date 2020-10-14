/**
 * Import of node packages and Modules
 */
const express = require('express');
const router = express.Router();
const fetch = require('./helproutes/fetch');
const authentication = require('./helproutes/rightAuthentication');
const redirect = require('./helproutes/redirect');

/**
 * post request to render the booking page with a specific inventoryNumber
 */

router.post("/booking",
	authentication.authRight("booking_device"), (req, res) => {
		res.render("booking.ejs", {
			username: req.session.username,
			role: req.session.role,
			rights: req.session.rights,
			inventoryNumber: req.session.inventoryNumber,
		});
	});

/**
 * post request for booking a device on the user which wants to book a device
 */
router.post("/book", redirect.redirectLogin, authentication.authRight("booking_device"), (req, res) => {
	req.body.workerId = req.session.userID;
	fetch.postFetch("/api/borrow/createReservation", req).then(() => {
		console.log("TEST");
	});
});


router.post("/bookinglist", redirect.redirectLogin, authentication.authRight("booking_request"), (req, res) => {

	fetch.getFetch("/api/borrow/getReservation/" + req.session.inventoryNumber)
		.then(() =>
			res.status(200).render("bookinglist.ejs", {
				username: req.session.username,
				role: req.session.role,
				rights: req.session.rights,
				searchValue: req.session.inventoryNumber,
			})
		);
});

router.post("/acceptBooking", redirect.redirectLogin, authentication.authRight("booking_device"), (req, res) => {
	fetch.postFetch("/api/borrow/changeRequestStatus", req)
		.then((data,res) => {
			console.log(data);
			res.redirect("back");
		})
		.catch(err => {
			console.error(err);
		});

});


module.exports = router;
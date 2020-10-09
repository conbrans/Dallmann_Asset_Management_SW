/**
 * Import of node packages and Modules
 */
const express = require('express');
const router = express.Router();
const fetch = require('./helproutes/fetch');
const authentication = require('./helproutes/rightAuthentication');
const redirect = require('./helproutes/redirect');

router.post("/booking",
	authentication.authRight("booking_device"), (req, res) => {
		res.render("booking.ejs", {
			username: req.session.username,
			role: req.session.role,
			rights: req.session.rights,
			inventoryNumber: req.session.inventoryNumber,
			maxDate: '2020-08-31',
		});
	});

router.post("/book", redirect.redirectLogin,  authentication.authRight("booking_device"), (req, res) => {
	req.body.workerId = req.session.userID;
	fetch.postFetch("/api/borrow/createReservation", req).then(()=>{
		console.log("TEST");
	});
});

module.exports = router;
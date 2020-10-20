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
	console.log(req.body);
});

/**
 * get the user information
 */
router.get("/showUsers", redirect.redirectLogin,
	authentication.authRight("add_user"),
	authentication.authRight("delete_User"), (req, res) => {
		fetch.getFetch("/api/user/getAllUsers")
			.then(data => res.json(data));
	});

/**
 * get booking information and reformat the timestamp
 */
router.get("/showBooking", redirect.redirectLogin,
	authentication.authRight("booking_request"), (req, res) => {
		fetch.getFetch("/api/borrow/getReservations")
			.then(data =>
				reformatDate.removeTimeStampForBooking(data).then(data => res.json(data)));
	});


/**
 * function to get only one booking, is needed for the borrow function
 */
router.get("/showOneBooking", redirect.redirectLogin, authentication.authRight("booking_device"), (req, res) => {
	fetch.getFetch("/api/borrow/getReservation/" + req.session.inventoryNumber)
		.then(data => {
			reformatDate.removeTimeStampForBooking(data)
				.then(data => {
					res.json(data);
				});

		});
});

router.post("/showOneBookingWithBody", redirect.redirectLogin, authentication.authRight("booking_device"), (req, res) => {
	console.log("OHNE");
	console.log(req.body);
	fetch.getFetch("/api/borrow/getReservation/" + req.body.inventoryNumber)
		.then(data => {
			reformatDate.removeTimeStampForBooking(data)
				.then(data => {
					res.json(data);
				});
		});
});


/**
 * get the device information for every device in the database
 */
router.get("/showDevices", redirect.redirectLogin,
	authentication.authRight("view_device"), (req, res) => {
		fetch.getFetch("/api/device/getAllDevices")
			.then(data => {
				reformatDate.removeTimeStampForDevice(data)
					.then(data => res.json(data));
			});
	});

/**
 * get one user, needed for update of the user over userManagement
 */

router.get("/showUser", redirect.redirectLogin,
	authentication.authRight("add_user"),
	authentication.authRight("delete_User"), (req, res) => {
		console.log(req.session.userMgntID);
		fetch.getFetch("/api/user/getSpecificUser/" + req.session.userMgntID)
			.then(data => res.json(data));
	});

/**
 * get one device, needed for the update of device in deviceManagement
 */
router.get("/showDevice", redirect.redirectLogin,
	authentication.authRight("view_device"), (req, res) => {
		req.body.inventoryNumber = req.session.inventoryNumber;
		fetch.postFetch("/api/device/getSpecificDevice/byInventoryNumber", req)
			.then(data => {
				reformatDate.removeTimeStampForDevice(data)
					.then(data => res.json(data));
			});
	});


router.get("/showBookingRequest", redirect.redirectLogin, authentication.authRight("booking_request"), (req, res) => {
	fetch.getFetch("/api/borrow/checkBookingRequest")
		.then(data =>
			reformatDate.removeTimeStampForBooking(data)
				.then(data => res.json(data)));
});


module.exports = router;
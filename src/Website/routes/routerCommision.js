/**
 * Import of helproutes and declaration of Router Method
 */

const express = require('express');
const router = express.Router();
const fetch = require('./helproutes/fetch');
const authentication = require('./helproutes/rightAuthentication');
const redirect = require('./helproutes/redirect');

/**
 * post request for booking a device on construction side
 */
router.post("/setDeviceConstruction", redirect.redirectLogin, authentication.authRight(""), (req, res) => {
	console.log(req.body);
	fetch.postFetch("/api/commission/booking", req)
		.then(() => {
			res.redirect("/commissionDone");
		});
});

/**
 * post request for booking a device into the status repair
 */
router.post("/setDeviceRepair", redirect.redirectLogin, authentication.authRight(""), (req, res) => {
	console.log(req.body);
	fetch.postFetch("/api/commission/maintenance", req)
		.then(() => {
			res.redirect("/commissionDone");
		});

});

/**
 * post request for booking a device into warehouse
 */
router.post("/setDeviceWarehouse", redirect.redirectLogin, authentication.authRight(""), (req, res) => {
	console.log(req.body);
	fetch.postFetch("/api/commission/release", req)
		.then(() => {
			res.redirect("/commissionDone");
		});

});

module.exports = router;
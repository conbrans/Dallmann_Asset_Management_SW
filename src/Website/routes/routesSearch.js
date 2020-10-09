/**
 * Import of helproutes and declaration of Router Method
 */
const express = require('express');
const router = express.Router();
const authentication = require('./helproutes/rightAuthentication');
const fetch = require('./helproutes/fetch');

/**
 * post request which redirects the user to device management if he enters
 * something in head search
 */

router.post("/search",authentication.authRight("view_device"), (req, res) => {
	res.status(200).render("newDeviceManagement.ejs", {
		username: req.session.username,
		role: req.session.role,
		rights: req.session.rights,
		searchValue : req.body.inventoryNumber,
	});
});

module.exports = router;
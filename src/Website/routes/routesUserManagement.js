/**
 * Import of node packages and Modules
 */
const express = require('express');
const router = express.Router();
const authentication = require('./helproutes/rightAuthentication');
const fetch = require('./helproutes/fetch');
const crypto = require('./helproutes/crypto');

router.post("/addUser", authentication.authRight("add_user"), (req, res) => {
	fetch.postFetch("/api/user/createUser", req)
		.catch((error) => {
			console.error('Error:', error);
		});
});

router.post("/deleteUser", authentication.authRight("delete_user"), (req, res) => {
	fetch.deleteFetch("/api/user/deleteUser/" + req.session.userMgntID, req)
		.then(() => res.redirect("/userManagement"))
		.catch((error) => {
			console.error('Error:', error);
		});
});


router.post("/editUser", authentication.authRight("edit_User"), (req, res) => {

	const passwordEncrypt = crypto.encrypt(req.body.password);
	const passwordCorrectEncrypt = crypto.encrypt(req.body.passwordCorrect);
	delete req.body.password;
	delete req.body.passwordCorrect;

	console.log(req.body);

	if (crypto.decrypt(passwordEncrypt)===
	 crypto.decrypt(passwordCorrectEncrypt)) {

		req.body.encryptedData = passwordEncrypt.encryptedData;
		req.body.initializationVector = passwordEncrypt.initializationVector;

		console.log(req.body);

		fetch.postFetch("/api/user/editProfile/" + req.session.userID, req)
			.then(res.redirect("/editProfil"))
			.catch((error) => {
				console.error('Error:', error);
			});
	}
});

router.post("/updateUser", authentication.authRight("edit_user"), (req, res) => {
	console.log(req.session.userMgntID);
	fetch.putFetch("/api/user/updateUser/" + req.session.userMgntID, req)
		.then(() => res.redirect("back"))
		.catch((error) => {
			console.error('Error:', error);
		});
});


module.exports = router;
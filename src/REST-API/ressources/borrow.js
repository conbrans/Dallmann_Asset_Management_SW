/**
 * Version 1.0
 * 06.10.2020
 *
 * @module /borrow
 */


/**
 * Import of modules
 *
 * @type {{query: function(): void}} database connector
 */

const connection = require('../../../src/REST-API/databaseConnection/connection');
const {body, validationResult} = require('express-validator');
const constraint = require('../middelwareFunctions/validation');
const express = require('express');
const router = express();

/**
 * route for getting all borrows out of database
 *
 * GET
 *
 * @param req - send information from client within a JSON file
 * @param res - sending the result within a JSON file to client
 */

let selectReservation = "SELECT DISTINCT" +
	" DATE_FORMAT(loan_day, '%Y-%m-%dT%TZ') AS loanDay,\n" +
	" DATE_FORMAT(loan_end, '%Y-%m-%dT%TZ') AS loanEnd,\n" +
	" WORKER.firstname, WORKER.surname,\n" +
	" PROJECT.project_id AS projectId, PROJECT.name AS buildingSite,\n" +
	" inventory_number AS inventoryNumber\n" +
	" FROM BORROWS\n" +
	" INNER JOIN PROJECT\n" +
	" ON BORROWS.project_id = PROJECT.project_id\n" +
	" LEFT JOIN WORKER\n" +
	" ON BORROWS.worker_id = WORKER.worker_id\n" +
	" WHERE PROJECT.project_id = BORROWS.project_id";

router.get("/api/borrow/getReservations", (req, res) => {

	connection.query(selectReservation + " and accepted = 'angenommen';", function (err, result) {

		if (err) {
			res.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
			console.log('Error connecting to Db');
			return;
		}

		res.json(result);
	});
});

/**
 * route for getting specific borrow depending
 * on the given integer inventoryNumber
 *
 * GET
 *
 * @param req - send information from client within a JSON file
 * @param res - sending the result within a JSON file to client
 * @param inventoryNumber - given inventoryNumber from a specific device
 */


router.get("/api/borrow/getReservation/:inventoryNumber", (req, res) => {

	sql = "SELECT DISTINCT DATE_FORMAT(loan_day, '%Y-%m-%dT%TZ')  AS loanDay,\n" +
		" DATE_FORMAT(loan_end, '%Y-%m-%dT%TZ')  AS loanEnd,\n" +
		" WORKER.firstname, WORKER.surname, PROJECT.project_id AS projectId,\n" +
		" PROJECT.name AS buildingSite, inventory_number AS inventoryNumber\n" +
		" FROM BORROWS\n" +
		" INNER JOIN PROJECT\n" +
		" ON BORROWS.project_id = PROJECT.project_id" +
		" LEFT JOIN WORKER\n" +
		" ON BORROWS.worker_id = WORKER.worker_id\n" +
		" WHERE inventory_number =" + req.params.inventoryNumber + ";";


	connection.query(sql, (err, result) => {
		if (err) {
			res.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
			console.log('Error connecting to Db');
			return;
		}

		res.json(result);
	});
});

/**
 * route for creating a reservation for a specific device depending on
 * inventoryNumber
 *
 * POST {loanDay, loanEnd, workerId, inventoryNumber, projectId}
 *
 * @param req - send information from client within a JSON file
 * @param res - sending the result within a JSON file to client
 */

router.post("/api/borrow/createReservation",
	constraint.createReservationConstraints, (req, res) => {

		//check if the given information are valid
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json(errors.array());
		}

		//boolean check if there is a matching projectId in database
		let checkProjectId = "SELECT EXISTS(SELECT project_id" +
			" FROM PROJECT WHERE project_id  = " + req.body.projectId + ");";

		connection.query(checkProjectId, function (err, result) {
			//str = 0(there is not) or 1(there is)
			let str1 = Object.values(result[0])[0];

			if (err) {
				res.json({"Message": "Verbindung zur Datenbank fehlgeschlagen."});
				console.log('Error connecting to Db');
				return;

			} else if (str1 == "1") {

				//converting given dates into needed form
				let sentLoanDay = new Date(new Date(req.body.loanDay).setHours(+2));
				let newLoanDay = sentLoanDay.toISOString();

				let sentLoanEnd = new Date(new Date(req.body.loanEnd).setHours(+2));
				let newLoanEnd = sentLoanEnd.toISOString();

				let today = new Date();
				let newDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

				let loanDate = new Date(req.body.loanDay);
				let newLoanDate = loanDate.getFullYear() + '-' + (loanDate.getMonth() + 1) + '-' + loanDate.getDate();

				//boolean check if there is already a reservation which matches
				// the given dates
				let selectExistReservation = "SELECT EXISTS(SELECT * FROM BORROWS WHERE inventory_number = " + req.body.inventoryNumber + "" +
					" AND ((CAST('" + newLoanDay + "' AS DATE ) BETWEEN CAST(loan_day AS DATE) AND CAST(loan_end AS DATE))" +
					" OR (CAST('" + newLoanEnd + "' AS DATE ) BETWEEN CAST(loan_day AS DATE) AND CAST(loan_end AS DATE))));";

				connection.query(selectExistReservation, function (err, result) {
					//str2 = 0(there is not) or 1(there is)
					let str2 = Object.values(result[0])[0];
					console.log(str2);

					if (err) {
						res.json({"Message": "Verbindung zur Datenbank fehlgeschlagen."});
						console.log('Error connecting to Db');
						return;

					} else if (str2 == "0") {

						let insertBorrows = "INSERT INTO BORROWS(loan_day,loan_end,worker_id,inventory_number,project_id) VALUES " +
							"('" + newLoanDay + "','" + newLoanEnd + "','" + req.body.workerId + "','"
							+ req.body.inventoryNumber + "','" + req.body.projectId + "');";

						connection.query(insertBorrows, function (err) {
							if (err) {
								res.json({"Message": "Verbindung zur Datenbank fehlgeschlagen."});
								console.log('Error connecting to Db');
								return;
								//check if the loan start is at current day
							} else if (newDate === newLoanDate) {

								let updateDevice = "UPDATE DEVICE SET device_status = 2 WHERE inventory_number = " + req.body.inventoryNumber + ";";

								connection.query(updateDevice, function (err) {
									if (err) {
										res.json({"Message": "Verbindung zur Datenbank fehlgeschlagen."});
										console.log('Error connecting to Db');
										return;
										//if the reservation is successful this
										//  message will be sent to client
									} else {
										return res.json({
											"Message": "Das Gerät mit der ID: " + req.body.inventoryNumber + " ist refolgreich" +
												" reserviert worden"
										});
									}
								});
								//if the reservation is successful this
								// message will be sent to client
							} else {
								return res.json({
									"Message": "Das Gerät mit der ID: " + req.body.inventoryNumber + " ist refolgreich" +
										" reserviert worden"
								});
							}

						});
						//if the dates matches with other reservations  this
						// message will be send to client
					} else {
						return res.json({
							"Message": "Im gewählten Zeitraum ist das Gerät bereits reserviert. Bitte einen " +
								"anderen Zeitraum wählen!"
						});
					}

				});
				//if there is no project with the given id this specified
				// message will be send to client
			} else {
				return res.json({"Message": "Ein Projekt mit der ID: " + req.body.projectId + " existiert nicht!"});
			}

		});

	});


/**
 * route for canceling a reservation
 *
 * DELETE
 *
 * @param req - send information from client within a JSON file
 * @param res - sending the result within a JSON file to client
 */

router.delete('/api/borrow/cancelReservation',
	constraint.deleteReservationConstraints, (req, res) => {
		//converting given dates into needed form
		let sentLoanDay = new Date(new Date(req.body.loanDay).setHours(+2));
		let newLoanDay = sentLoanDay.toISOString();

		let sentLoanEnd = new Date(new Date(req.body.loanEnd).setHours(+2));
		let newLoanEnd = sentLoanEnd.toISOString();

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json(errors.array());
		}
		//BOOLEAN check if there is a reservation with the given ID
		let sql = "SELECT EXISTS(SELECT * FROM BORROWS WHERE inventory_number = " + req.body.inventoryNumber + ");";

		connection.query(sql, function (err, result) {
			//str = 0(there is not) or 1(there is)
			let str = Object.values(result[0])[0];

			if (err) {
				res.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
				console.log('Error connecting to Db');
			} else if (str === "1") {

				let sql2 = "DELETE FROM BORROWS WHERE inventory_number = " + req.body.inventoryNumber + "" +
					" AND CAST(loan_day AS DATE) = CAST('" + newLoanDay + "' AS DATE) AND CAST(loan_end AS DATE) = CAST('" + newLoanEnd + "' AS DATE);";

				connection.query(sql2, function (err) {
					if (err) {
						res.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
						console.log('Error connecting.sql2 to Db');
						return;
					}
					//Boolean check if the the reservation matches the status
					// conditions
					let sql3 = "SELECT EXISTS(SELECT * FROM BORROWS " +
						"WHERE inventory_number = " + req.body.inventoryNumber
						+ "" +
						" AND ((CURDATE() BETWEEN CAST('"
						+ newLoanDay + "' AS DATE)" +
						" AND CAST('" + newLoanEnd + "' AS DATE ))" +
						" OR (CURDATE() >= CAST('" +
						newLoanEnd + "' AS DATE))));";

					connection.query(sql3, function (err, result) {
						//str = 0(does not match) or 1(it matches)
						let str = Object.values(result[0])[0];

						if (err) {
							res.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
							console.log('Error connecting.sql3 to Db');
							return;

						} else if (str == "1") {
							//updating the device status to "Verfügbar"
							let sql4 = "UPDATE DEVICE SET device_status = 1" +
								" WHERE inventory_number = "
								+ req.body.inventoryNumber + ";";

							connection.query(sql4, function (err) {
								if (err) {
									res.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
									console.log('Error connecting.sql4 to Db');
									return;
								}
							});
							//If delete was successful this message will be
							// sent to client (with status change)
							return res.json({
								"Message": "Reservierung des Gerätes mit der ID:" +
									" " + req.body.inventoryNumber + "" +
									" wurde erfolgreich gelöscht"

							});
							//If delete was successful this message will be
							// sent to client (without status change)
						} else {
							return res.json({
								"Message": "Die Reservierung des Gerätes " +
									"mit der ID: " + req.body.inventoryNumber + "" +
									"wurde erfolgreich gelöscht!"
							});
						}

					});
				});
				//If delete was unsuccessful this message will be sent to client
			} else {
				return res.json({
					"Message": "Eine Reservation des Gerätes" +
						" mit der ID: " + req.body.inventoryNumber + " ist nicht vorhanden."
				});
			}
		});
	});


router.get("/api/borrow/checkBookingRequest", (req, res) => {
	let statement = selectReservation + " AND accepted LIKE 'ausstehend' ";
	connection.query(statement, (err, result) => {
		if (err) {
			console.log(err);
		}
		res.json(result);
	});
});
//{ inventoryNumber: '759219', button: 'accept' }
router.put("/api/borrow/changeRequestStatus", (req, res) => {
	let statement = "UPDATE BORROWS SET accepted= '";
	switch (req.body.button) {
		case "accept":
			statement += "angenommen'";
			break;
		case "deny":
			statement += "abgelehnt'";
			break;
		default:
			statement += "ausstehend";
			break;
	}
	statement += " WHERE inventory_number = " + req.body.inventoryNumber +
		" and loan_day LIKE '" +req.body.loanDay
		+"' and loan_end LIKE '" +req.body.loanEnd + "';";
	connection.query(statement, function (err,result){
		if (err){
			console.error(err);
		}
		res.json(result);
	});

});


//export of this module
module.exports = router
/**
 * Version 1.0
 * 06.10.2020
 *
 * @module /device
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
 * sql statement for selecting devices in database
 * @type {string}
 */
//TODO remove timestamp
let selectSpecificDevice = "SELECT DEVICE.inventory_number AS" +
	" inventoryNumber,model,manufacturer,serial_number AS serialNumber," +
	"        gurantee AS guarantee,DEVICE.note, DEVICE.category AS deviceCategory, CATEGORY.category AS categoryDescription," +
	"        device_status AS deviceStatus,DEVICE_STATUS.description AS statusDescription," +
	"        DEVICE.beacon_major AS beaconMajor, DEVICE.beacon_minor AS beaconMinor," +
	"        LOCATION.longitude,latitude," +
	" DATE_FORMAT((Max(LOCATION.timestamp)),'%Y-%m-%dT%TZ') AS lastLocationUpdate," +
	"        DATE_FORMAT((Max(TUEV.timestamp)), '%Y-%m-%dT%TZ') AS lastTuev," +
	"        DATE_FORMAT((Max(UVV.timestamp)), '%Y-%m-%dT%TZ') AS lastUvv," +
	"        DATE_FORMAT((Max(REPAIR.timestamp)), '%Y-%m-%dT%TZ') AS" +
	" lastRepair," +
	"        REPAIR.note AS repairNote, PROJECT.project_id AS projectId," +
	"        name AS buildingSite, street, postcode, city," +
	" DATE_FORMAT((DEVICE.date_of_change), '%Y-%m-%dT%TZ')  AS lastChange," +
	" DEVICE.qrcode_id AS qrcodeId, qr_value as qrcodeValue " +
	"FROM DEVICE" +
	"        LEFT JOIN BORROWS" +
	"                    ON DEVICE.inventory_number = BORROWS.inventory_number" +
	"        LEFT JOIN PROJECT" +
	"                    ON BORROWS.project_id = PROJECT.project_id" +
	"        INNER JOIN DEVICE_STATUS" +
	"                    ON DEVICE.device_status = DEVICE_STATUS.device_status_id" +
	"        LEFT JOIN BEACON" +
	"                    ON DEVICE.beacon_major = BEACON.major and DEVICE.beacon_minor = BEACON.minor" +
	"        LEFT JOIN BEACON_POSITION" +
	"                    ON BEACON.major = BEACON_POSITION.major and BEACON.minor = BEACON_POSITION.minor" +
	"        LEFT JOIN LOCATION" +
	"                    ON BEACON_POSITION.location_id = LOCATION.location_id" +
	"        LEFT JOIN TUEV" +
	"                   ON DEVICE.inventory_number = TUEV.inventory_number" +
	"        LEFT JOIN UVV" +
	"                   ON DEVICE.inventory_number = UVV.inventory_number" +
	"        LEFT JOIN REPAIR" +
	"                   ON DEVICE.inventory_number = REPAIR.inventory_number" +
	"        LEFT JOIN CATEGORY" +
	"                   ON DEVICE.category = CATEGORY.category_id" +
	"        LEFT JOIN QRCODE" +
	"                   ON DEVICE.qrcode_id = QRCODE.qrcode_id";

/**
 * route for getting all devices out of database
 *
 * GET
 *
 * @param response - sending the result within a JSON file to client
 */

router.get("/api/device/getAllDevices", (request, response) => {
	sql = selectSpecificDevice + " GROUP BY inventoryNumber;";

	connection.query(sql, (err, result) => {
		if (err) {
			console.log(err);
			response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
			console.log('Error connecting to Db');
			return;
		}

		response.json(result);
	});
});


/**
 * route for getting specific device depending
 * on the given integer inventoryNumber
 *
 * POST {int: inventoryNumber}
 *
 * @param request - send information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 */

router.post("/api/device/getSpecificDevice/byInventoryNumber", (request, response) => {
	sql = "SELECT * FROM (" + selectSpecificDevice + " GROUP BY DEVICE.inventory_number) t" +
		" WHERE CAST(inventoryNumber AS CHAR) LIKE '%" + request.body.inventoryNumber + "%';";

	connection.query(sql, (err, result) => {
		if (err) {
			response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
			console.log('Error connecting to Db');
			return;
		}

		response.json(result);
	});
});

/**
 * route for getting specific device depending on the given String status
 *
 * POST {String: status}
 *
 * @param request - send information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 */

router.post("/api/device/getSpecificDevice/byStatus", (request, response) => {
	sql = "SELECT * FROM (" + selectSpecificDevice + " GROUP BY DEVICE.inventory_number) AS StatusSelect" +
		" WHERE statusDescription LIKE '%" + request.body.status + "%';";

	connection.query(sql, (err, result) => {
		if (err) {
			response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
			console.log('Error connecting to Db');
			return;
		}

		response.json(result);
	});
});

/**
 * route for getting specific device depending on the given String category
 *
 * POST {String: category}
 *
 * @param request - send information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 */

router.post("/api/device/getSpecificDevice/byCategory", (request, response) => {
	sql = "SELECT * FROM (" + selectSpecificDevice + " GROUP BY" +
		" DEVICE.inventory_number) AS CategorySelect" +
		" WHERE CategorySelect.categoryDescription LIKE '%" + request.body.category + "%';";

	connection.query(sql, (err, result) => {
		if (err) {
			response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
			console.log('Error connecting to Db');
			return;
		}

		response.json(result);
	});

});

/**
 * route for getting specific device depending on the given String model
 *
 * POST {String: model}
 *
 * @param request - send information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 */

router.post("/api/device/getSpecificDevice/byModel", (request, response) => {
	sql = "SELECT * FROM (" + selectSpecificDevice + " GROUP BY" +
		" DEVICE.inventory_number) AS ModelSelect" +
		" WHERE model LIKE '%" + request.body.model + "%';";

	connection.query(sql, (err, result) => {
		if (err) {
			response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
			console.log('Error connecting to Db');
			return;
		}

		response.json(result);
	});

});

/**
 * route for getting specific device depending on the given date tuev
 *
 * POST {date: tuev}
 *
 * @param request - send information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 */

router.post("/api/device/getSpecificDevice/byTuev", (request, response) => {
	sql = "SELECT * FROM (" + selectSpecificDevice + " GROUP BY" +
		" DEVICE.inventory_number) AS TuevSelect" +
		" WHERE lastTuev LIKE '%" + request.body.tuev + "%';";

	connection.query(sql, (err, result) => {
		if (err) {
			response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
			console.log('Error connecting to Db');
			return;
		}

		response.json(result);
	});

});

/**
 * route for getting specific device depending on the given date uvv
 *
 * POST {date: uvv}
 *
 * @param request - send information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 */

router.post("/api/device/getSpecificDevice/byUvv", (request, response) => {
	sql = "SELECT * FROM (" + selectSpecificDevice + " GROUP BY" +
		" DEVICE.inventory_number) AS UVVSelect" +
		" WHERE lastUvv LIKE '%" + request.body.uvv + "%';";

	connection.query(sql, (err, result) => {
		if (err) {
			response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
			console.log('Error connecting to Db');
			return;
		}

		response.json(result);
	});

});

/**
 * route for getting specific device depending on the given date repair
 *
 * POST {date: repair}
 *
 * @param request - send information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 */

router.post("/api/device/getSpecificDevice/byRepair", (request, response) => {
	sql = "SELECT * FROM (" + selectSpecificDevice + " GROUP BY" +
		" DEVICE.inventory_number) AS RepairSelect" +
		" WHERE lastRepair LIKE '%" + request.body.repair + "%';";

	connection.query(sql, (err, result) => {
		if (err) {
			response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
			console.log('Error connecting to Db');
			return;
		}

		response.json(result);
	});

});

/**
 * route for creating a new device in database
 *
 * POST {beaconMinor, beaconMajor, category, deviceStatus, guarantee,
 * lastRepair, lastTuev, lastUvv, manufacturer, model, note, serialNumber}
 *
 * request validation, createDevice without dates, check if dates are given,
 * insertInto the dates tables, update the date columns in table device
 *
 * @param request - send information from client within a JSON file
 * @param response - sending a message  within a JSON file to client
 */

router.post('/api/device/createDevice', constraint.deviceConstraints, (request, response) => {

	//Validating the sent data
	const errors = validationResult(request);
	if (!errors.isEmpty()) {
		return response.json(errors.array());
	}

	//sql statement for creating a new device without dates
	sql = "INSERT INTO DEVICE (model, serial_number, note, device_status, manufacturer, category) VALUES " +
		"('" + request.body.model + "','" + request.body.serialNumber + "','"
		+ request.body.note + "','" + request.body.deviceStatus + "'," +
		"'" + request.body.manufacturer + "', '" + request.body.deviceCategory + "');";

	//first query: createDevice without dates
	connection.query(sql, (err) => {
		//if connection to database failed a message will be sent to client
		if (err) {
			response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
			console.log('Error connecting.sqlPostDevice to Db');
			return;
		}

		sqlSelect = "SELECT Max(inventory_number) FROM DEVICE WHERE serial_number = " + request.body.serialNumber + "" +
			"  AND note = '" + request.body.note + "'" +
			"  AND device_status = " + request.body.deviceStatus + " AND model = '" + request.body.model + "'" +
			"  AND manufacturer = '" + request.body.manufacturer + "' GROUP BY serial_number";

		//query: select inventoryNumber of device
		connection.query(sqlSelect, (err, result) => {
			if (err) {
				response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
				console.log('Error connecting.sqlUvv to Db');
				return;
				//method for getting the inventoryNumber in the needed form
				// from result of query
			}
			let str = Object.values(result[0])[0];
			//Check if there is a value for guarantee
			if (request.body.guarantee !== "") {
				// try catch block for the case that there is no guarantee in
				// the sent JSON file
				try {
					//method for parsing the given date into needed form
					let sentGuarantee = new Date(new Date(request.body.guarantee).setHours(+2));
					let newGuarantee = sentGuarantee.toISOString();

					sqlGuarantee = "UPDATE DEVICE" +
						"SET DEVICE.gurantee = '" + newGuarantee + "'" +
						"WHERE DEVICE.inventory_number = " + str + ";";
					//updating the created device with the given guarantee
					connection.query(sqlGuarantee, (err) => {
						if (err) {
							response.json({
								"Message": "Verbindung zur" +
									" Datenbank fehlgeschlagen"
							});
							console.log('Error connecting.sqlUpdateUvv to Db');
							return;
						}
					});

				} catch (error) {

				}
				//check if there is a given uvv date
			}
			if (request.body.lastUvv !== "") {

				try {
					//converting given date into right form
					let sentUvv = new Date(new Date(request.body.lastUvv).setHours(+2));
					let newUvv = sentUvv.toISOString();

					//inserting given data into uvv
					sqlUvv = "INSERT INTO UVV (inventory_number, timestamp, status) VALUES (" +
						"(" + str + ")," +
						"('" + newUvv + "')," +
						"('1'));";

					connection.query(sqlUvv, (err) => {
						if (err) {
							response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
							console.log('Error connecting.sqlUvv to Db');
							return;
						}
						//setting the right uvv id for the created device
						sqlUpdateUvv = "UPDATE DEVICE" +

							"INNER JOIN UVV ON DEVICE.inventory_number = UVV.inventory_number" +

							"SET DEVICE.latest_uvv = UVV.uvv_id" +

							"WHERE DEVICE.inventory_number = " + str + " AND UVV.timestamp = " +
							"  (SELECT MAX(UVV.timestamp) FROM UVV WHERE inventory_number = " +
							"  " + str + ") ;";

						connection.query(sqlUpdateUvv, (err) => {
							if (err) {
								response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
								console.log('Error connecting.sqlUpdateUvv to Db');
								return;
							}
						});
					});

				} catch (error) {

				}

				//same as uvv
			}
			if (request.body.lastTuev !== "") {

				try {

					let sentTuev = new Date(new Date(request.body.lastTuev).setHours(+2));
					let newTuev = sentTuev.toISOString();

					sqlTuev = "INSERT INTO TUEV (inventory_number, status, timestamp) VALUES (" +
						"(" + str + ")," +
						"('1')," +
						"('" + newTuev + "'));";

					connection.query(sqlTuev, (err) => {
						if (err) {
							response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
							console.log('Error connecting.sqlTuev to Db');
							return;
						}

						sqlUpdateTuev = "UPDATE DEVICE" +

							"INNER JOIN TUEV ON DEVICE.inventory_number = TUEV.inventory_number" +

							"SET DEVICE.latest_tuev = TUEV.tuev_id" +

							"WHERE DEVICE.inventory_number = " + str + " AND TUEV.timestamp = " +
							"  (SELECT MAX(TUEV.timestamp) FROM TUEV WHERE inventory_number = " +
							"  " + str + ") ;";

						connection.query(sqlUpdateTuev, (err) => {
							if (err) {
								response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
								console.log('Error connecting.sqlUpdateTuev to Db');
								return;
							}
						});
					});

				} catch (error) {

				}

				//same as uvv
			}
			if (request.body.lastRepair !== "") {

				try {

					let sentRepair = new Date(new Date(request.body.lastRepair).setHours(+2));
					let newRepair = sentRepair.toISOString();

					sqlRepair = "INSERT INTO REPAIR (inventory_number, timestamp, status) VALUES (" +
						"(" + str + ")," +
						"('" + newRepair + "')," +
						"('1'));";

					connection.query(sqlRepair, (err) => {
						if (err) {
							response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
							console.log('Error connecting.sqlRepair to Db');
							return;
						}
						sqlUpdateRepair = "UPDATE DEVIC" +

							"INNER JOIN REPAIR ON DEVICE.inventory_number = REPAIR.inventory_number" +

							"SET DEVICE.latest_repair = REPAIR.repair_id" +

							"WHERE DEVICE.inventory_number = " + str + " AND REPAIR.timestamp = " +
							"  (SELECT MAX(REPAIR.timestamp) FROM REPAIR WHERE inventory_number = " +
							"  " + str + ") ;";

						connection.query(sqlUpdateRepair, (err) => {
							if (err) {
								response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
								console.log('Error connecting.sqlUpdateRepair to Db');
								return;
							}
						});
					});

				} catch (error) {

				}
			}

			return response.json({"Message": "Gerät wurde erfolgreich hinzugefügt."});
		});
	});
});


/**
 * route for updating a specific device depending on the given inventoryNumber
 *
 * PUT {serialNumber, note, deviceStatus, model, manufacturer, lastUvv,
 * lastTuev, lastRepair, guarantee, beaconMinor, beaconMajor, category}
 *
 * request validation, updateDevice without dates, check if dates are given,
 * insertInto the dates tables, update the date columns in table device
 *
 * @param request - send information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 * @param inventoryNumber - given inventoryNumber from client for device
 */

router.put("/api/device/updateDevice/:inventoryNumber", constraint.deviceConstraints, (request, response) => {
	//check if there is a device with the given inventoryNumber
	sql = "SELECT EXISTS(SELECT * FROM DEVICE WHERE inventory_number = " + request.params.inventoryNumber + ");";

	connection.query(sql, (err, result) => {
		//str = 0 (there is no device) or 1 (there is a device)
		let str = Object.values(result[0])[0];

		if (err) {
			console.log('Error connecting to Db');
			return;

		} else if (str == "1") {

			//validating the information which are sent by client
			const errors = validationResult(request);
			console.log(errors);
			if (!errors.isEmpty()) {
				return response.json(errors.array());
			}

			updateDevice = "UPDATE DEVICE SET model ='" + request.body.model + "', manufacturer ='" + request.body.manufacturer + "'," +
				"serial_number ='" + request.body.serialNumber + "'," +
				"note ='" + request.body.note + "'," +
				"device_status ='" + request.body.deviceStatus + "', category = '" + request.body.category + "' WHERE inventory_number = " + request.params.inventoryNumber + ";";

			connection.query(updateDevice, (err) => {
				if (err) {
					response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
					console.log('Error connecting to Db');
					return;
					//check if there is a given uvv date
				}
				if (request.body.lastUvv !== "") {

					try {
						//converting the given uvv date into needed form
						let sentUvv = new Date(new Date(request.body.lastUvv).setHours(+2));
						let newUvv = sentUvv.toISOString();

						//insert the given uvv information in table uvv
						updateUvv = "INSERT INTO UVV (inventory_number, timestamp, status) VALUES (" +
							"(" + request.params.inventoryNumber + ")," +
							"('" + newUvv + "')," +
							"('1'));";

						connection.query(updateUvv, (err) => {
							if (err) {
								response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
								console.log('Error connecting to Db');
								return;
							}
							//setting the right uvv_id from the inserted uvv
							// data
							sqlUpdateUvv = "UPDATE DEVICE" +

								"INNER JOIN UVV ON DEVICE.inventory_number = UVV.inventory_number" +

								"SET DEVICE.latest_uvv = UVV.uvv_id" +

								"WHERE DEVICE.inventory_number = " + request.params.inventoryNumber + " AND UVV.timestamp = " +
								"  (SELECT MAX(UVV.timestamp) FROM UVV WHERE inventory_number = " +
								"  " + request.params.inventoryNumber + ") ;";

							connection.query(sqlUpdateUvv, (err) => {
								if (err) {
									response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
									console.log('Error connecting.sqlUpdateUvv to Db');
									return;
								}
							});
						});

					} catch (error) {

					}
					//same as uvv
				}
				if (request.body.lastTuev !== "") {

					try {

						let sentTuev = new Date(new Date(request.body.lastTuev).setHours(+2));
						let newTuev = sentTuev.toISOString();

						updateTuev = "INSERT INTO TUEV (inventory_number, timestamp, status) VALUES (" +
							"(" + request.params.inventoryNumber + ")," +
							"('" + newTuev + "')," +
							"('1'));";

						connection.query(updateTuev, (err) => {
							if (err) {
								response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
								console.log('Error connecting to Db');
								return;
							}

							sqlUpdateTuev = "UPDATE DEVICE" +

								"INNER JOIN TUEV ON DEVICE.inventory_number = TUEV.inventory_number" +

								"SET DEVICE.latest_tuev = TUEV.tuev_id" +

								"WHERE DEVICE.inventory_number = " + request.params.inventoryNumber + " AND TUEV.timestamp = " +
								"  (SELECT MAX(TUEV.timestamp) FROM TUEV WHERE inventory_number = " +
								"  " + request.params.inventoryNumber + ") ;";

							connection.query(sqlUpdateTuev, (err) => {
								if (err) {
									response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
									console.log('Error connecting.sqlUpdateUvv to Db');
									return;
								}
							});
						});

					} catch (error) {

					}
					//same as uvv
				}
				if (request.body.lastRepair !== "") {

					try {

						let sentRepair = new Date(new Date(request.body.lastRepair).setHours(+2));
						let newRepair = sentRepair.toISOString();

						updateRepair = "INSERT INTO REPAIR (inventory_number, timestamp, status) VALUES (" +
							"(" + request.params.inventoryNumber + ")," +
							"('" + newRepair + "')," +
							"('1'));";

						connection.query(updateRepair, (err) => {
							if (err) {
								response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
								console.log('Error connecting to Db');
								return;
							}

							sqlUpdateRepair = "UPDATE DEVICE" +

								"INNER JOIN REPAIR ON DEVICE.inventory_number = REPAIR.inventory_number" +

								"SET DEVICE.latest_repair = REPAIR.repair_id" +

								"WHERE DEVICE.inventory_number = " + request.params.inventoryNumber + " AND REPAIR.timestamp = " +
								"  (SELECT MAX(REPAIR.timestamp) FROM REPAIR WHERE inventory_number = " +
								"  " + request.params.inventoryNumber + ") ;";

							connection.query(sqlUpdateRepair, (err) => {
								if (err) {
									response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
									console.log('Error connecting.sqlUpdateUvv to Db');
									return;
								}
							});
						});

					} catch (error) {

					}
					//same as uvv
				}
				if (request.body.guarantee !== "") {

					try {

						let sentGuarantee = new Date(new Date(request.body.guarantee).setHours(+2));
						let newGuarantee = sentGuarantee.toISOString();

						updateGuarantee = "UPDATE DEVICE" +
							"SET DEVICE.gurantee = '" + newGuarantee + "'" +
							"WHERE DEVICE.inventory_number = " + request.params.inventoryNumber + ";";

						connection.query(updateGuarantee, (err) => {
							if (err) {
								response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
								console.log('Error connecting to Db');
								return;
							}
						});

					} catch (error) {

					}
					//if the specific device is updated a message will be sent
					// to client
				}
				response.json({"Message": "Gerät mit der ID: " + request.params.inventoryNumber + " wurde erfolgreich geupdatet"});
			});
		}
			//if there is no device with the given inventoyNumber a message
		    // will be
		// sent to client
		else {
			return response.json({"Message": "Ein Gerät mit der ID: " + request.params.inventoryNumber + " ist nicht vorhanden."});
		}
	});
});

/**
 * route for deleting a specific device depending on the given inventoryNumber
 *
 * DELETE
 *
 * @param request - send information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 * @param inventoryNumber - given inventoryNumber from client for device
 */

router.delete('/api/device/deleteDevice/:inventoryNumber', (request, response) => {

	//boolean check if there is a device with the given inventoryNumber
	sql = "SELECT EXISTS(SELECT * FROM DEVICE WHERE inventory_number = " + request.params.inventoryNumber + ");";

	connection.query(sql, (err, result) => {

		//str = 0 or 1
		let str = Object.values(result[0])[0];

		if (err) {
			response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
			console.log('Error connecting.sql to Db');
			return;
		} else if (str == "1") {

			updateDevice = "UPDATE DEVICE SET latest_tuev = NULL, latest_position = NULL, latest_repair = NULL, latest_uvv = NULL " +
				"WHERE inventory_number = " + request.params.inventoryNumber + ";";
			/*sets the id of latest_tuev, latest_position, latest_repair and latest_uvv
			 equals NULL (because of foreign key constraints) to delete a device */
			connection.query(updateDevice, (err) => {
				if (err) {
					response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
					console.log('Error connecting.updateDevice to Db');
					return;
				}

				deleteBorrows = "DELETE FROM BORROWS WHERE inventory_number = " + request.params.inventoryNumber + ";";
				/* deleting the reservations which are matched to the specific device */
				connection.query(deleteBorrows, (err) => {
					if (err) {
						response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
						console.log('Error connecting.deleteBorrows to Db');
						return;
					}

				});

				deleteTuev = "DELETE FROM TUEV WHERE inventory_number = " + request.params.inventoryNumber + ";";
				/* deleting the tuev dates which are matched to the specific device */
				connection.query(deleteTuev, (err) => {
					if (err) {
						response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
						console.log('Error connecting.deleteTuev to Db');
						return;
					}

				});

				deleteUvv = "DELETE FROM UVV WHERE inventory_number = " + request.params.inventoryNumber + ";";
				/* deleting the uvv dates  which are matched to the specific device */
				connection.query(deleteUvv, (err) => {
					if (err) {
						response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
						console.log('Error connecting.deleteUvv to Db');
						return;
					}

				});

				deleteRepair = "DELETE FROM REPAIR WHERE inventory_number = " + request.params.inventoryNumber + ";";
				/* deleting the repair dates which are matched to the specific device */
				connection.query(deleteRepair, (err) => {
					if (err) {
						response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
						console.log('Error connecting.deleteRepair to Db');
						return;
					}

				});

				deleteDevice = "DELETE FROM DEVICE WHERE inventory_number = " + request.params.inventoryNumber + ";";
				/* deleting the specific device */
				connection.query(deleteDevice, (err) => {
					if (err) {
						response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
						console.log('Error connecting.deleteDeviceHistory to Db');
						return;
					}

					deleteDeviceHistory = "DELETE FROM DEVICE_HISTORY WHERE inventory_number = " + request.params.inventoryNumber + ";";
					/* deleting the history of the specific device */
					connection.query(deleteDeviceHistory, (err) => {
						if (err) {
							response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
							console.log('Error connecting.deleteRepair to Db');
							return;
						}
					});
					//If the specific device is deleted a message will be
					// returned
					response.json({"Message": "Gerät mit der ID: " + request.params.inventoryNumber + " wurde erfolgreich gelöscht"});
				});
			});
		}
			//If there is no device with the given inventoryNumber a message
		    // will
		// be returned
		else {
			return response.json({"Message": "Ein Gerät mit der ID: " + request.params.inventoryNumber + " ist nicht vorhanden."});
		}
	});
});

router.post('/api/device/setQrCode', (request, response) => {
	console.log(request.body);
	let message = "";

	let exists = "SELECT EXISTS( SELECT qr_value FROM QRCODE WHERE qr_value" +
		" LIKE '" + request.body.qr_value + "') AS valueExists;";
	

	connection.query(exists, (err, result) => {
		if (result[0].valueExists === 1) {
			let sql = "UPDATE DEVICE SET qrcode_id = (SELECT qrcode_id FROM" +
				" QRCODE WHERE qr_value = '" + request.body.qr_value + "')" +
				" WHERE inventory_number =" + request.body.inventorynumber + ";"

			connection.query(sql,(err)=> {
				if (err) {
					message += "QR-Code konnte nicht gesetzt werden.";
				} else {
					message += "QR-Code wurde gesetzt."
				}
				response.status(201).json(message);
			});

		} else {
			message += "DER QR-Code ist nicht hinterlegt.";
			response.json(message);
		}
	});

});

//export of this module
module.exports = router;

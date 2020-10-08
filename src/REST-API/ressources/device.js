/**
 * Version 1.0
 * 06.10.2020
 *
 * @module /device
 */


/**
 * Import of modules
 *
 * @type {Connection} database connector
 */

const connection = require('../../../src/REST-API/databaseConnection/connection');
const { body, validationResult } = require('express-validator');
const constraint = require('../middelwareFunctions/validation');
const express = require('express');
const router = express();

/**
 * sql statement for selecting devices in database
 * @type {string}
 */

let selectSpecificDevice = "SELECT DEVICE.inventory_number AS inventoryNumber,model,manufacturer,serial_number AS serialNumber,\n" +
    "        gurantee AS guarantee,DEVICE.note, DEVICE.category AS deviceCategory, CATEGORY.category AS categoryDescription,\n" +
    "        device_status AS deviceStatus,DEVICE_STATUS.description AS statusDescription,\n" +
    "        DEVICE.beacon_major AS beaconMajor, DEVICE.beacon_minor AS beaconMinor,\n" +
    "        LOCATION.longitude,latitude,Max(timesstamp) AS lastLocationUpdate,\n" +
    "        Max(TUEV.timestamp) AS lastTuev, Max(UVV.timestamp) AS lastUvv, Max(REPAIR.timestamp) AS lastRepair,\n" +
    "        REPAIR.note AS repairNote, PROJECT.project_id AS projectId,\n" +
    "        name AS buildingSite, street, postcode, city, DEVICE.date_of_change AS lastChange \n" +
    "FROM DEVICE\n" +
    "        LEFT JOIN BORROWS\n" +
    "                    ON DEVICE.inventory_number = BORROWS.inventory_number\n" +
    "        LEFT JOIN PROJECT\n" +
    "                    ON BORROWS.project_id = PROJECT.project_id\n" +
    "        INNER JOIN DEVICE_STATUS\n" +
    "                    ON DEVICE.device_status = DEVICE_STATUS.device_status_id\n" +
    "        LEFT JOIN BEACON\n" +
    "                    ON DEVICE.beacon_major = BEACON.major and DEVICE.beacon_minor = BEACON.minor\n" +
    "        LEFT JOIN BEACON_POSITION\n" +
    "                    ON BEACON.major = BEACON_POSITION.major and BEACON.minor = BEACON_POSITION.minor\n" +
    "        LEFT JOIN LOCATION\n" +
    "                    ON BEACON_POSITION.location_id = LOCATION.location_id\n" +
    "        LEFT JOIN TUEV\n" +
    "                   ON DEVICE.inventory_number = TUEV.inventory_number\n" +
    "        LEFT JOIN UVV\n" +
    "                   ON DEVICE.inventory_number = UVV.inventory_number\n" +
    "        LEFT JOIN REPAIR\n" +
    "                   ON DEVICE.inventory_number = REPAIR.inventory_number\n" +
    "        LEFT JOIN CATEGORY\n" +
    "                   ON DEVICE.category = CATEGORY.category_id";

/**
 * route for getting all devices out of database
 *
 * GET
 *
 * @param response - sending the result within a JSON file to client
 */

router.get("/api/device/getAllDevices", (request, response) => {
    sql = selectSpecificDevice + " GROUP BY inventoryNumber;"


    connection.query(sql, function (err, result) {
        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        console.log('GetAllDevices.Connection established');
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
    sql = "SELECT * FROM ("+selectSpecificDevice+" GROUP BY DEVICE.inventory_number) t" +
        " WHERE CAST(inventoryNumber AS CHAR) LIKE '%" + request.body.inventoryNumber + "%';";

    connection.query(sql, function (err, result) {
        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        console.log('GetAllDevices.Connection established');
        response.json(result);
    })

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
    sql = "SELECT * FROM ("+selectSpecificDevice+" GROUP BY DEVICE.inventory_number) AS StatusSelect" +
        " WHERE statusDescription LIKE '%"+request.body.status+"%';";

    connection.query(sql, function (err, result) {
        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        console.log('GetAllDevices.Connection established');
        response.json(result);
    })

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
    sql = "SELECT * FROM ("+selectSpecificDevice+" GROUP BY" +
        " DEVICE.inventory_number) AS CategorySelect" +
        " WHERE CategorySelect.categoryDescription LIKE '%"+request.body.category+"%';";

    connection.query(sql, function (err, result) {
        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        console.log('GetAllDevices.Connection established');
        response.json(result);
    })

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
    sql = "SELECT * FROM ("+selectSpecificDevice+" GROUP BY" +
        " DEVICE.inventory_number) AS ModelSelect" +
        " WHERE model LIKE '%"+request.body.model+"%';";

    connection.query(sql, function (err, result) {
        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        console.log('GetAllDevices.Connection established');
        response.json(result);
    })

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
    sql = "SELECT * FROM ("+selectSpecificDevice+" GROUP BY" +
        " DEVICE.inventory_number) AS TuevSelect" +
        " WHERE lastTuev LIKE '%"+request.body.tuev+"%';";

    connection.query(sql, function (err, result) {
        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        console.log('GetAllDevices.Connection established');
        response.json(result);
    })

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
    sql = "SELECT * FROM ("+selectSpecificDevice+" GROUP BY" +
        " DEVICE.inventory_number) AS UVVSelect" +
        " WHERE lastUvv LIKE '%"+request.body.uvv+"%';";

    connection.query(sql, function (err, result) {
        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        console.log('GetAllDevices.Connection established');
        response.json(result);
    })

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
    sql = "SELECT * FROM ("+selectSpecificDevice+" GROUP BY" +
        " DEVICE.inventory_number) AS RepairSelect" +
        " WHERE lastRepair LIKE '%"+request.body.repair+"%';";

    connection.query(sql, function (err, result) {
        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        console.log('GetAllDevices.Connection established');
        response.json(result);
    })

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

router.post('/api/device/createDevice',constraint.deviceConstraints, (request, response) => {

    /*
      validates if send information from client are in the needed form
      @link (../middlewareFunction/validation)
      @type {Result}
      @thrown specified message if validation fails
      @param request - send information from client within a JSON file
     */
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.json(errors.array());
    }

    //sql statement for creating a new device without dates
    sql = "INSERT INTO DEVICE (model, serial_number, note, device_status, manufacturer, category) VALUES " +
        "('" + request.body.model + "','" + request.body.serialNumber + "','"
        + request.body.note + "','" + request.body.deviceStatus + "'," +
        "'" + request.body.manufacturer + "', '" + request.body.category + "');";

    //first query: createDevice without dates
    connection.query(sql, function (err) {
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
        connection.query(sqlSelect, function (err, result) {
            if (err) {
                response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                console.log('Error connecting.sqlUvv to Db');
                return;
                //method for getting the inventoryNumber in the needed form from result of query
            } let str = Object.values(result[0])[0];
            //Check if there is a value for guarantee
            if (request.body.guarantee !== "") {
                // try catch block for the case that there is no guarantee in the sent JSON file
                try {
                    //method for parsing the given date into needed form
                    let sentGuarantee = new Date(new Date(request.body.guarantee).setHours(+2));
                    let newGuarantee = sentGuarantee.toISOString();

                    sqlGuarantee = "UPDATE DEVICE\n" +
                        "SET DEVICE.gurantee = '" + newGuarantee + "'\n" +
                        "WHERE DEVICE.inventory_number = " + str + ";";
                    //updating the created device with the given guarantee
                    connection.query(sqlGuarantee, function (err) {
                        if (err) {
                            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                            console.log('Error connecting.sqlUpdateUvv to Db');
                            return;
                        }
                    })

                } catch (error) {

                }
            //check if there is a given uvv date
            } if (request.body.lastUvv !== "") {

                try {
                    //converting given date into right form
                    let sentUvv = new Date(new Date(request.body.lastUvv).setHours(+2));
                    let newUvv = sentUvv.toISOString();

                    //inserting given data into uvv
                    sqlUvv = "INSERT INTO UVV (inventory_number, timestamp, status) VALUES (" +
                        "(" + str + ")," +
                        "('" + newUvv + "')," +
                        "('1'));";

                    connection.query(sqlUvv, function (err) {
                        if (err) {
                            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                            console.log('Error connecting.sqlUvv to Db');
                            return;
                        }
                        //setting the right uvv id for the created device
                        sqlUpdateUvv = "UPDATE DEVICE\n" +

                            "INNER JOIN UVV ON DEVICE.inventory_number = UVV.inventory_number\n" +

                            "SET DEVICE.latest_uvv = UVV.uvv_id\n" +

                            "WHERE DEVICE.inventory_number = " + str + " AND UVV.timestamp = " +
                            "  (SELECT MAX(UVV.timestamp) FROM UVV WHERE inventory_number = " +
                            "  " + str + ") ;";

                        connection.query(sqlUpdateUvv, function (err) {
                            if (err) {
                                response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                                console.log('Error connecting.sqlUpdateUvv to Db');
                                return;
                            }
                        })
                    })

                } catch (error) {

                }

            //same as uvv
            } if (request.body.lastTuev !== "") {

                try {

                    let sentTuev = new Date(new Date(request.body.lastTuev).setHours(+2));
                    let newTuev = sentTuev.toISOString();

                    sqlTuev = "INSERT INTO TUEV (inventory_number, status, timestamp) VALUES (" +
                        "(" + str + ")," +
                        "('1')," +
                        "('" + newTuev + "'));";

                    connection.query(sqlTuev, function (err) {
                        if (err) {
                            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                            console.log('Error connecting.sqlTuev to Db');
                            return;
                        }

                        sqlUpdateTuev = "UPDATE DEVICE\n" +

                            "INNER JOIN TUEV ON DEVICE.inventory_number = TUEV.inventory_number\n" +

                            "SET DEVICE.latest_tuev = TUEV.tuev_id\n" +

                            "WHERE DEVICE.inventory_number = " + str + " AND TUEV.timestamp = " +
                            "  (SELECT MAX(TUEV.timestamp) FROM TUEV WHERE inventory_number = " +
                            "  " + str + ") ;";

                        connection.query(sqlUpdateTuev, function (err) {
                            if (err) {
                                response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                                console.log('Error connecting.sqlUpdateTuev to Db');
                                return;
                            }
                        })
                    })

                } catch (error) {

                }

            //same as uvv
            } if (request.body.lastRepair !== "") {

                try {

                    let sentRepair = new Date(new Date(request.body.lastRepair).setHours(+2));
                    let newRepair = sentRepair.toISOString();

                    sqlRepair = "INSERT INTO REPAIR (inventory_number, timestamp, status) VALUES (" +
                        "(" + str + ")," +
                        "('" + newRepair + "')," +
                        "('1'));";

                    connection.query(sqlRepair, function (err) {
                        if (err) {
                            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                            console.log('Error connecting.sqlRepair to Db');
                            return;
                        }
                        sqlUpdateRepair = "UPDATE DEVICE\n" +

                            "INNER JOIN REPAIR ON DEVICE.inventory_number = REPAIR.inventory_number\n" +

                            "SET DEVICE.latest_repair = REPAIR.repair_id\n" +

                            "WHERE DEVICE.inventory_number = " + str + " AND REPAIR.timestamp = " +
                            "  (SELECT MAX(REPAIR.timestamp) FROM REPAIR WHERE inventory_number = " +
                            "  " + str + ") ;";

                        connection.query(sqlUpdateRepair, function (err) {
                            if (err) {
                                response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                                console.log('Error connecting.sqlUpdateRepair to Db');
                                return;
                            }
                        })
                    })

                } catch (error) {

                }
            } return response.json({"Message": "Gerät wurde erfolgreich hinzugefügt."})
        })
    })
});


/**
 * route for updating a specific device depending on the given inventoryNumber
 *
 * PUT {serialNumber, note, deviceStatus, model, manufacturer, lastUvv, lastTuev,
 * lastRepair, guarantee, beaconMinor, beaconMajor, category}
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

    connection.query(sql, function (err, result) {
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
                "device_status ='" + request.body.deviceStatus + "', category = '"+request.body.category+"' WHERE inventory_number = " + request.params.inventoryNumber + ";";

            connection.query(updateDevice, function (err) {
                if (err) {
                    response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                    console.log('Error connecting to Db');
                    return;
                //check if there is a given uvv date
                } if (request.body.lastUvv !== "") {

                    try {
                        //converting the given uvv date into needed form
                        let sentUvv = new Date(new Date(request.body.lastUvv).setHours(+2));
                        let newUvv = sentUvv.toISOString();

                        //insert the given uvv information in table uvv
                        updateUvv = "INSERT INTO UVV (inventory_number, timestamp, status) VALUES (" +
                            "(" + request.params.inventoryNumber + ")," +
                            "('" + newUvv + "')," +
                            "('1'));"

                        connection.query(updateUvv, function (err) {
                            if (err) {
                                response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                                console.log('Error connecting to Db');
                                return;
                            }
                            //setting the right uvv_id from the inserted uvv data
                            sqlUpdateUvv = "UPDATE DEVICE\n" +

                                "INNER JOIN UVV ON DEVICE.inventory_number = UVV.inventory_number\n" +

                                "SET DEVICE.latest_uvv = UVV.uvv_id\n" +

                                "WHERE DEVICE.inventory_number = " + request.params.inventoryNumber + " AND UVV.timestamp = " +
                                "  (SELECT MAX(UVV.timestamp) FROM UVV WHERE inventory_number = " +
                                "  " + request.params.inventoryNumber + ") ;";

                            connection.query(sqlUpdateUvv, function (err) {
                                if (err) {
                                    response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                                    console.log('Error connecting.sqlUpdateUvv to Db');
                                    return;
                                }

                                console.log('DeleteDevice.Connection established');

                            })
                        })

                    } catch (error) {

                    }
                //same as uvv
                } if (request.body.lastTuev !== "") {

                    try {

                        let sentTuev = new Date(new Date(request.body.lastTuev).setHours(+2));
                        let newTuev = sentTuev.toISOString();

                        updateTuev = "INSERT INTO TUEV (inventory_number, timestamp, status) VALUES (" +
                            "(" + request.params.inventoryNumber + ")," +
                            "('" + newTuev + "')," +
                            "('1'));";

                        connection.query(updateTuev, function (err) {
                            if (err) {
                                response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                                console.log('Error connecting to Db');
                                return;
                            }

                            sqlUpdateTuev = "UPDATE DEVICE\n" +

                                "INNER JOIN TUEV ON DEVICE.inventory_number = TUEV.inventory_number\n" +

                                "SET DEVICE.latest_tuev = TUEV.tuev_id\n" +

                                "WHERE DEVICE.inventory_number = " + request.params.inventoryNumber + " AND TUEV.timestamp = " +
                                "  (SELECT MAX(TUEV.timestamp) FROM TUEV WHERE inventory_number = " +
                                "  " + request.params.inventoryNumber + ") ;";

                            connection.query(sqlUpdateTuev, function (err) {
                                if (err) {
                                    response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                                    console.log('Error connecting.sqlUpdateUvv to Db');
                                    return;
                                }

                                console.log('DeleteDevice.Connection established');

                            })
                        })

                    } catch (error) {

                    }
                //same as uvv
                } if (request.body.lastRepair !== "") {

                    try {

                        let sentRepair = new Date(new Date(request.body.lastRepair).setHours(+2));
                        let newRepair = sentRepair.toISOString();

                        updateRepair = "INSERT INTO REPAIR (inventory_number, timestamp, status) VALUES (" +
                            "(" + request.params.inventoryNumber + ")," +
                            "('" + newRepair + "')," +
                            "('1'));"

                        connection.query(updateRepair, function (err) {
                            if (err) {
                                response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                                console.log('Error connecting to Db');
                                return;
                            }

                            sqlUpdateRepair = "UPDATE DEVICE\n" +

                                "INNER JOIN REPAIR ON DEVICE.inventory_number = REPAIR.inventory_number\n" +

                                "SET DEVICE.latest_repair = REPAIR.repair_id\n" +

                                "WHERE DEVICE.inventory_number = " + request.params.inventoryNumber + " AND REPAIR.timestamp = " +
                                "  (SELECT MAX(REPAIR.timestamp) FROM REPAIR WHERE inventory_number = " +
                                "  " + request.params.inventoryNumber + ") ;";

                            connection.query(sqlUpdateRepair, function (err) {
                                if (err) {
                                    response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                                    console.log('Error connecting.sqlUpdateUvv to Db');
                                    return;
                                }

                                console.log('DeleteDevice.Connection established');

                            })
                        })

                    } catch (error) {

                    }
                //same as uvv
                } if (request.body.guarantee !== "") {

                    try {

                        let sentGuarantee = new Date(new Date(request.body.guarantee).setHours(+2));
                        let newGuarantee = sentGuarantee.toISOString();

                        updateGuarantee = "UPDATE DEVICE\n" +
                            "SET DEVICE.gurantee = '" + newGuarantee + "'\n" +
                            "WHERE DEVICE.inventory_number = " + request.params.inventoryNumber + ";";

                        connection.query(updateGuarantee, function (err) {
                            if (err) {
                                response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                                console.log('Error connecting to Db');
                                return;
                            }

                        })

                    } catch (error) {

                    }
                //if the specific device is updated a message will be sent to client
                } response.json({"Message": "Gerät mit der ID: " + request.params.inventoryNumber + " wurde erfolgreich geupdatet"});
            })

        }
        //if there is no device with the given inventoyNumber a message will be sent to client
        else return response.json({"Message": "Ein Gerät mit der ID: " + request.params.inventoryNumber + " ist nicht vorhanden."})

    })

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

router.delete('/api/device/deleteDevice/:inventoryNumber', function (request, response) {

    //boolean check if there is a device with the given inventoryNumber
    sql = "SELECT EXISTS(SELECT * FROM DEVICE WHERE inventory_number = "+ request.params.inventoryNumber +");";

    connection.query(sql, function (err, result) {

        //str = 0 or 1
        let str = Object.values(result[0])[0];

        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting.sql to Db');
            return;
        } else if (str == "1") {

            deleteBorrows = "DELETE FROM BORROWS WHERE inventory_number = " + request.params.inventoryNumber + ";";

            deleteTuev = "DELETE FROM TUEV WHERE inventory_number = " + request.params.inventoryNumber + ";";

            deleteUvv = "DELETE FROM UVV WHERE inventory_number = " + request.params.inventoryNumber + ";";

            deleteRepair = "DELETE FROM REPAIR WHERE inventory_number = " + request.params.inventoryNumber + ";";

            deleteDeviceHistory = "DELETE FROM DEVICE_HISTORY WHERE inventory_number = " + request.params.inventoryNumber + ";";

            updateDevice = "UPDATE DEVICE SET latest_tuev = NULL, latest_position = NULL, latest_repair = NULL, latest_uvv = NULL " +
                "WHERE inventory_number = " + request.params.inventoryNumber + ";";

            deleteDevice = "DELETE FROM DEVICE WHERE inventory_number = " + request.params.inventoryNumber + ";";

            /*sets the id of latest_tuev, latest_position, latest_repair and latest_uvv
             equals NULL (because of foreign key constraints) to delete a device */
            connection.query(updateDevice, function (err) {
                if (err) {
                    response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                    console.log('Error connecting.updateDevice to Db');
                    return;
                }
                console.log('DeleteDevice.Connection established');

                /* deleting the reservations which are matched to the specific device */
                connection.query(deleteBorrows, function (err) {
                    if (err) {
                        response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                        console.log('Error connecting.deleteBorrows to Db');
                        return;
                    }

                })

                /* deleting the tuev dates which are matched to the specific device */
                connection.query(deleteTuev, function (err) {
                    if (err) {
                        response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                        console.log('Error connecting.deleteTuev to Db');
                        return;
                    }

                })
                /* deleting the uvv dates  which are matched to the specific device */
                connection.query(deleteUvv, function (err) {
                    if (err) {
                        response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                        console.log('Error connecting.deleteUvv to Db');
                        return;
                    }

                })
                /* deleting the repair dates which are matched to the specific device */
                connection.query(deleteRepair, function (err) {
                    if (err) {
                        response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                        console.log('Error connecting.deleteRepair to Db');
                        return;
                    }

                })
                /* deleting the specific device */
                connection.query(deleteDevice, function (err) {
                    if (err) {
                        response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                        console.log('Error connecting.deleteDeviceHistory to Db');
                        return;
                    }
                    /* deleting the history of the specific device */
                    connection.query(deleteDeviceHistory, function (err) {
                        if (err) {
                            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                            console.log('Error connecting.deleteRepair to Db');
                            return;
                        }
                    })

                    //If the specific device is deleted a message will be returned
                    response.json({"Message": "Gerät mit der ID: " + request.params.inventoryNumber + " wurde erfolgreich gelöscht"});

                })
            })
        }

        //If there is no device with the given inventoryNumber a message will be returned
        else return response.json({"Message": "Ein Gerät mit der ID: " + request.params.inventoryNumber + " ist nicht vorhanden."})

    })
});

//export of this module
module.exports = router;

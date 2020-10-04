/**
 * Import of modules
 * @type {Connection} database connector
 */


const connection = require('../../../src/REST-API/databaseConnection/connection');
//const log = require('../middelwareFunctions/logger');
const { body, validationResult } = require('express-validator');
const constraint = require('../middelwareFunctions/validation');
const express = require('express');
const router = express();


/**
 * route for getting all users out of database
 */

let selectSpecificDevice = "SELECT DEVICE.inventory_number AS inventoryNumber,model,manufacturer,serial_number AS serialNumber,\n" +
    "        gurantee AS guarantee,DEVICE.note,\n" +
    "        device_status AS deviceStatus,DEVICE_STATUS.description AS statusDescription,CATEGORY.category,\n" +
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
    "        INNER JOIN CATEGORY\n" +
    "                   ON BEACON.major = CATEGORY.major";

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
 * route for getting all users out of database
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

router.post("/api/device/getSpecificDevice/byStatus", (request, response) => {
    sql = "SELECT * FROM ("+selectSpecificDevice+" GROUP BY DEVICE.inventory_number) t" +
        " WHERE deviceStatus LIKE '%"+request.body.status+"%';";

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

router.post("/api/device/getSpecificDevice/byCategory", (request, response) => {
    sql = "SELECT * FROM ("+selectSpecificDevice+" GROUP BY DEVICE.inventory_number) " +
        " WHERE category LIKE '%"+request.body.category+"%';";

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

router.post("/api/device/getSpecificDevice/byModel", (request, response) => {
    sql = "SELECT * FROM ("+selectSpecificDevice+" GROUP BY DEVICE.inventory_number) t" +
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

router.post("/api/device/getSpecificDevice/byTuev", (request, response) => {
    sql = "SELECT * FROM ("+selectSpecificDevice+" GROUP BY DEVICE.inventory_number) t" +
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

router.post("/api/device/getSpecificDevice/byUvv", (request, response) => {
    sql = "SELECT * FROM ("+selectSpecificDevice+" GROUP BY DEVICE.inventory_number) t" +
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

router.post("/api/device/getSpecificDevice/byRepair", (request, response) => {
    sql = "SELECT * FROM ("+selectSpecificDevice+" GROUP BY DEVICE.inventory_number) t" +
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
 * route for getting all users out of database
 */
// in Website enthalten
    router.post('/api/device/createDevice',constraint.deviceConstraints, (request, response) => {

        sqlSelect = "SELECT inventory_number FROM DEVICE WHERE serial_number = " + request.body.serialNumber + "" +
            "  AND note = '" + request.body.note + "'" +
            "  AND device_status = " + request.body.deviceStatus + " AND model = '" + request.body.model + "'" +
            "  AND manufacturer = '" + request.body.manufacturer + "' GROUP BY serial_number";

        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(request);
        console.log(errors);
        if (!errors.isEmpty()) {
            return response.json(errors.array());
        }

        sql = "INSERT INTO DEVICE (model, serial_number, note, device_status, manufacturer) VALUES " +
            "('" + request.body.model + "','" + request.body.serialNumber + "','"
            + request.body.note + "','" + request.body.deviceStatus + "','" + request.body.manufacturer + "');";

        connection.query(sql, function (err) {
            if (err) {
                response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                console.log('Error connecting.sqlPostDevice to Db');
                return;

            } if (request.body.guarantee !== "" ) {  //|| request.body.uvv || request.body.repair

                connection.query(sqlSelect, function (err, result) {
                    if (err) {
                        response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                        console.log('Error connecting.sqlUvv to Db');
                        return;
                    }

                    let str = Object.values(result[0])[0];

                    let guarantee = new Date(request.body.guarantee).toISOString();

                    sqlGuarantee = "UPDATE DEVICE\n" +
                                    "SET DEVICE.gurantee = '" +guarantee+ "'\n" +
                                    "WHERE DEVICE.inventory_number = " + str + ";";

                    connection.query(sqlGuarantee, function (err) {
                        if (err) {
                            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                            console.log('Error connecting.sqlUpdateUvv to Db');
                            return;
                        }

                    })

                })

            } if (request.body.uvv !== "" ) {  //|| request.body.uvv || request.body.repair

                let uvv = new Date(request.body.uvv).toISOString();

                sqlUvv = "INSERT INTO UVV (inventory_number, timestamp, status) VALUES (" +
                    "("+sqlSelect+")," +
                    "('" + uvv + "')," +
                    "('1'));";

                    connection.query(sqlUvv, function (err) {
                        if (err) {
                            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                            console.log('Error connecting.sqlUvv to Db');
                            return;
                        }

                        connection.query(sqlSelect, function (err, result) {
                            if (err) {
                                response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                                console.log('Error connecting.sqlSelectUvv to Db');
                                return;
                            }

                            let str = Object.values(result[0])[0];

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

                    })


            } if (request.body.tuev !== "" ) {

                let tuev = new Date(request.body.tuev).toISOString();

                sqlTuev = "INSERT INTO TUEV (inventory_number, timestamp, status) VALUES (" +
                    "("+sqlSelect+")," +
                    "('" + tuev + "')," +
                    "('1'));";

                connection.query(sqlTuev, function (err) {
                    if (err) {
                        response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                        console.log('Error connecting.sqlTuev to Db');
                        return;
                    }

                    connection.query(sqlSelect, function (err, result) {
                        if (err) {
                            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                            console.log('Error connecting.sqlSelectTuev to Db');
                            return;
                        }

                        let str = Object.values(result[0])[0];

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

                })

            } if (request.body.repair !== "" ) {

                let repair = new Date(request.body.repair).toISOString();

                sqlRepair = "INSERT INTO REPAIR (inventory_number, timestamp, status) VALUES (" +
                    "("+sqlSelect+")," +
                    "('" + repair + "')," +
                    "('1'));";

                connection.query(sqlRepair, function (err) {
                    if (err) {
                        response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                        console.log('Error connecting.sqlRepair to Db');
                        return;
                    }

                    connection.query(sqlSelect, function (err, result) {
                        if (err) {
                            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                            console.log('Error connecting.sqlSelectRepair to Db');
                            return;
                        }

                        let str = Object.values(result[0])[0];

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

                })

            } return response.json({"Message": "Gerät wurde erfolgreich hinzugefügt."})

        })
    });


/**
 * route for getting all users out of database
 */
//in Website enthalten
router.put("/api/device/updateDevice/:inventoryNumber", constraint.deviceConstraints, (request, response) => {

    sql = "SELECT EXISTS(SELECT * FROM DEVICE WHERE inventory_number = " + request.params.inventoryNumber + ");";

    connection.query(sql, function (err, result) {

        let str = Object.values(result[0])[0];

        if (err) {
            response.json({"Message": "Test"});
            console.log('Error connecting to Db');
            return;
        } else if (str == "1") {

            const errors = validationResult(request);
            console.log(errors);
            if (!errors.isEmpty()) {
                return response.json(errors.array());
            }

            updateDevice = "UPDATE DEVICE SET model ='" + request.body.model + "', manufacturer ='" + request.body.manufacturer + "'," +
                "beacon_major ='" + request.body.beaconMajor + "', serial_number ='" + request.body.serialNumber + "'," +
                "note ='" + request.body.note + "'," +
                "device_status ='" + request.body.deviceStatus + "' WHERE inventory_number = " + request.params.inventoryNumber + ";";

            connection.query(updateDevice, function (err) {
                if (err) {
                    response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                    console.log('Error connecting to Db');
                    return;

                } if (request.body.uvv !== "") {

                    let uvv = new Date(request.body.uvv).toISOString();

                    updateUvv = "INSERT INTO UVV (inventory_number, timestamp, status) VALUES (" +
                        "(" + request.params.inventoryNumber + ")," +
                        "('" + uvv + "')," +
                        "('1'));"

                    connection.query(updateUvv, function (err) {
                        if (err) {
                            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                            console.log('Error connecting to Db');
                            return;
                        }

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

                } if (request.body.tuev !== "") {

                    let tuev = new Date(request.body.tuev).toISOString();

                    updateTuev = "INSERT INTO TUEV (inventory_number, timestamp, status) VALUES (" +
                        "(" + request.params.inventoryNumber + ")," +
                        "('" + tuev + "')," +
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

                } if (request.body.repair !== "") {

                    let repair = new Date(request.body.repair).toISOString();

                    updateRepair = "INSERT INTO REPAIR (inventory_number, timestamp, status) VALUES (" +
                        "(" + request.params.inventoryNumber + ")," +
                        "('" + repair + "')," +
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

                } if (request.body.guarantee !== "") {

                    let guarantee = new Date(request.body.guarantee).toISOString();

                    updateGuarantee = "UPDATE DEVICE\n" +
                        "SET DEVICE.gurantee = '" +guarantee+ "'\n" +
                        "WHERE DEVICE.inventory_number = " + request.params.inventoryNumber + ";";

                    connection.query(updateGuarantee, function (err) {
                        if (err) {
                            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                            console.log('Error connecting to Db');
                            return;
                        }

                    })

                } response.json({"Message": "Gerät mit der ID: " + request.params.inventoryNumber + " wurde erfolgreich geupdatet"});
            })

        }

        else return response.json({"Message": "Ein Gerät mit der ID: " + request.params.inventoryNumber + " ist nicht vorhanden."})

    })

});

/**
 * route for getting all users out of database
 */

router.delete('/api/device/deleteDevice/:inventoryNumber', function (request, response) {

    sql = "SELECT EXISTS(SELECT * FROM DEVICE WHERE inventory_number = "+ request.params.inventoryNumber +");";

    connection.query(sql, function (err, result) {

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

            connection.query(updateDevice, function (err) {
                if (err) {
                    response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                    console.log('Error connecting.updateDevice to Db');
                    return;
                }
                console.log('DeleteDevice.Connection established');

                connection.query(deleteBorrows, function (err) {
                    if (err) {
                        response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                        console.log('Error connecting.deleteBorrows to Db');
                        return;
                    }

                })

                connection.query(deleteTuev, function (err) {
                    if (err) {
                        response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                        console.log('Error connecting.deleteTuev to Db');
                        return;
                    }

                })

                connection.query(deleteUvv, function (err) {
                    if (err) {
                        response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                        console.log('Error connecting.deleteUvv to Db');
                        return;
                    }

                })

                connection.query(deleteRepair, function (err) {
                    if (err) {
                        response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                        console.log('Error connecting.deleteRepair to Db');
                        return;
                    }

                })

                connection.query(deleteDevice, function (err) {
                    if (err) {
                        response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                        console.log('Error connecting.deleteDeviceHistory to Db');
                        return;
                    }

                    connection.query(deleteDeviceHistory, function (err) {
                        if (err) {
                            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                            console.log('Error connecting.deleteRepair to Db');
                            return;
                        }

                    })


                    response.json({"Message": "Gerät mit der ID: " + request.params.inventoryNumber + " wurde erfolgreich gelöscht"});
                })

            })

        }

        else return response.json({"Message": "Ein Gerät mit der ID: " + request.params.inventoryNumber + " ist nicht vorhanden."})

    })
});

module.exports = router;
/**
 * Port listener
 */


/**
 * Version 1.0
 * 06.10.2020
 *
 * @module /commission
 */


/**
 * Import of modules
 *
 * @type {Connection} database connector
 */

const connection = require('../../../src/REST-API/databaseConnection/connection');
const express = require('express');
const router = express();

/**
 * route for commission booking a device
 *
 * POST {inventoryNumber, projectId, }
 *
 * @param response - sending the result within a JSON file to client
 */

router.post("/api/commission/booking", function (request,response) {

    var today = new Date().toISOString();
    var date = new Date();
    var newDate = new Date(date.setMonth(date.getMonth()+6)).toISOString();

    let selectExist = "SELECT EXISTS(SELECT * FROM BORROWS WHERE inventory_number = "+request.body.inventoryNumber+"" +
        " AND ((CAST('"+today+"' AS DATE ) BETWEEN CAST(loan_day AS DATE) AND CAST(loan_end AS DATE))" +
        " OR (CAST('"+newDate+"' AS DATE ) BETWEEN CAST(loan_day AS DATE) AND CAST(loan_end AS DATE))));";
    //check if the device is already booked
    connection.query(selectExist, function (err, result) {

        let str = Object.values(result[0])[0];

        if (err) {
            console.log(err);
            return;

        } else if (str == "0") {
            //setting new deviceStatus
            let updateStatus = "UPDATE DEVICE SET device_status = 2 WHERE inventory_number = " + request.body.inventoryNumber + ";";

            connection.query(updateStatus, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }

            })
            //insert the new borrow for the device with the given inventoryNumber
            let insertBorrow = "INSERT INTO BORROWS(loan_day,loan_end,worker_id,inventory_number,project_id) VALUES " +
                "('"+today+"','"+newDate+"',NULL,'"+request.body.inventoryNumber+ "','" +request.body.projectId+ "');";

            connection.query(insertBorrow, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }

            })
            //if commissioning was successful there will be a message sent to the client
            response.json({"Message": "Die Kommissionierung war erfolgreich."});
            //if the device is already loan, a message will be sent to the client
        } else response.json({"Message": "Das Gerät ist im angegebenen Zeitraum bereits ausgeliehen oder reserviert."})

    })

});

/**
 * route for commission booking a device
 *
 * POST {inventoryNumber, projectId, }
 *
 * @param response - sending the result within a JSON file to client
 */
router.post("/api/commission/maintenance", function (request,response) {

    let selectDevice = "SELECT device_status FROM DEVICE WHERE inventory_number = " +request.body.inventoryNumber+ ";";

    connection.query(selectDevice, function (err, result) {

        let str = Object.values(result[0])[0];

        if (err) {
            console.log(err);
            return;

        } else if (str !== 3) {

            let updateStatus = "UPDATE DEVICE SET device_status = 3 WHERE inventory_number = " +request.body.inventoryNumber+ ";";

            connection.query(updateStatus, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }

            })

            let insertRepair = "INSERT INTO REPAIR(inventory_number,timestamp,status,note) VALUES " +
                "('"+request.body.inventoryNumber+ "', curDate(), 0 ,NULL);";

            connection.query(insertRepair, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }

            })

            response.json({"Message": "Die Kommissionierung war erfolgreich."});

        } else response.json({"Message": "Das Gerät befindet sich bereits in einer Reperatur."})

    })

});

router.post("/api/commission/release", function (request,response) {

    let selectStatus = "SELECT device_status FROM DEVICE WHERE inventory_number = "+request.body.inventoryNumber+";";
    let updateStatus = "UPDATE DEVICE SET device_status = 1 WHERE inventory_number = " +request.body.inventoryNumber+ ";";

    connection.query(selectStatus, function (err, result) {

        let str = Object.values(result[0])[0];

        if (err) {
            console.log(err);
            return;

        } else if (str == "2") {

            try {

            let deleteOldBorrows = "DELETE FROM BORROWS WHERE inventory_number = "+request.body.inventoryNumber+"" +
                    " AND CAST(loan_end AS DATE) <= CURDATE();";

            connection.query(deleteOldBorrows, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }

            })

            connection.query(updateStatus, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }

                return response.json({"Message": "Der Status des Gerätes wurde erfolgreich auf Verfügbar gesetzt."})

            })

            } catch (error) {

                return response.json({"Message": "Bei der Kommissionierung ist ein Fehler aufgetreten."})

            }

        } else if (str !== "2") {

            connection.query(updateStatus, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }

                return response.json({"Message": "Der Status des Gerätes wurde erfolgreich auf Verfügbar gesetzt."})

            })
        }
    })
});

//export of this module
module.exports = router;



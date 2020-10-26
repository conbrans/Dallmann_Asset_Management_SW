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
 * @param request - send information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 */

router.post("/api/commission/booking", (req, res) => {

    var today = new Date().toISOString();
    var date = new Date();
    var newDate = new Date(date.setMonth(date.getMonth() + 6)).toISOString();

    let selectExist = "SELECT EXISTS(SELECT * FROM BORROWS WHERE inventory_number = " + req.body.inventoryNumber + "" +
        " AND ((CAST('" + today + "' AS DATE ) BETWEEN CAST(loan_day AS DATE) AND CAST(loan_end AS DATE))" +
        " OR (CAST('" + newDate + "' AS DATE ) BETWEEN CAST(loan_day AS DATE) AND CAST(loan_end AS DATE))));";
    //check if the device is already booked
    connection.query(selectExist, (err, result) => {

        let str = Object.values(result[0])[0];

        if (err) {
            console.log(err);
            return;

        } else if (str == "0") {
            //setting new deviceStatus
            let updateStatus = "UPDATE DEVICE SET device_status = 2 WHERE inventory_number = " + req.body.inventoryNumber + ";";

            connection.query(updateStatus, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }

            })
            //insert the new borrow for the device with the given inventoryNumber
            let insertBorrow = "INSERT INTO BORROWS(loan_day,loan_end,worker_id,inventory_number,project_id) VALUES " +
                "('" + today + "','" + newDate + "',NULL,'" + req.body.inventoryNumber + "','" + req.body.projectId + "');";

            connection.query(insertBorrow, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }

            })
            //if commissioning was successful there will be a message sent to the client
            res.json({
                "Message": "Die Kommissionierung" +
                    " war erfolgreich."
            });
            //if the device is already loan, a message will be sent to the client
        } else res.json({
            "Message": "Das Gerät ist im angegebenen" +
                " Zeitraum bereits ausgeliehen oder reserviert."
        })

    })

});

/**
 * route for setting a new repair to device
 *
 * POST {inventoryNumber}
 *
 * @param request - send information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 */

router.post("/api/commission/maintenance", (req, res) => {
    //select the status of a device
    let selectDevice = "SELECT device_status FROM DEVICE WHERE inventory_number = " + req.body.inventoryNumber + ";";

    connection.query(selectDevice, (err, result) => {

        let str = Object.values(result[0])[0];

        if (err) {
            console.log(err);
            return;
            //check if the status is unequal to 3
        } else if (str !== 3) {
            //If status is unequal to 3 the status of the device will be changed to 3
            let updateStatus = "UPDATE DEVICE SET device_status = 3 WHERE inventory_number = " + req.body.inventoryNumber + ";";

            connection.query(updateStatus, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }

            })
            //Creating a new Repair in tabele REPAIR
            let insertRepair = "INSERT INTO REPAIR(inventory_number,timestamp,status,note) VALUES " +
                "('" + req.body.inventoryNumber + "', curDate(), 0 ,NULL);";

            connection.query(insertRepair, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
            })
            //This message will be sent to client if change of status was successful
            res.json({
                "Message": "Die Kommissionierung" +
                    " war erfolgreich."
            });
            //This message will be sent to client if the device is already in repair
        } else res.json({
            "Message": "Das Gerät befindet sich" +
                " bereits in einer Reperatur."
        })

    })

});

/**
 * route for commission booking a device
 *
 * POST {inventoryNumber}
 *
 * @param request - send information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 */

router.post("/api/commission/release", (req, res) => {

    let selectStatus = "SELECT device_status FROM DEVICE WHERE inventory_number = " + req.body.inventoryNumber + ";";
    let updateStatus = "UPDATE DEVICE SET device_status = 1 WHERE inventory_number = " + req.body.inventoryNumber + ";";
    //selecting the status of the device
    connection.query(selectStatus, (err, result) => {

        let str = Object.values(result[0])[0];

        if (err) {
            console.log(err);
            return;
            //check if the status equals 2 ("Ausgeliehen")
        } else if (str == "2") {

            try {

                let deleteOldBorrows = "DELETE FROM BORROWS WHERE inventory_number = " + req.body.inventoryNumber + "" +
                    " AND CAST(loan_end AS DATE) <= CURDATE();";
                //deleting every borrow which is in the past or equals current date
                connection.query(deleteOldBorrows, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                })
                //updating the status to 1 ("Verfügbar")
                connection.query(updateStatus, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    //If status change is successful this message will be sent to client
                    return res.json({
                        "Message": "Der Status des" +
                            " Gerätes wurde erfolgreich auf Verfügbar gesetzt."
                    })

                })

            } catch (error) {
                //If there is a error this message will be sent to client
                return res.json({
                    "Message": "Bei der Kommissionierung" +
                        " ist ein Fehler aufgetreten."
                })

            }
            //check if the status is unequal to 2 ("Ausgeliehen")
        } else if (str !== "2") {
            //Updating the device status to 1 ("Verfügbar")
            connection.query(updateStatus, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                //If the update is successful this message will be sent to the client
                return res.json({
                    "Message": "Der Status des Gerätes wurde" +
                        " erfolgreich auf Verfügbar gesetzt."
                })

            })
        }
    })
});

//export of this module
module.exports = router;



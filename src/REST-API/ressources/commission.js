const connection = require('../../../src/REST-API/databaseConnection/connection');
const express = require('express');
const router = express();

router.post("/api/commission/booking", function (request,response) {

    let selectDevice = "SELECT device_status FROM DEVICE WHERE inventory_number = " + request.body.inventoryNumber + ";";

    connection.query(selectDevice, function (err, result) {

        let str = Object.values(result[0])[0];

        if (err) {
            console.log(err);
            return;

        } else if (str !== 2) {

            let updateStatus = "UPDATE DEVICE SET device_status = 2 WHERE inventory_number = " + request.body.inventoryNumber + ";";

            connection.query(updateStatus, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }

            })

            let insertBorrow = "INSERT INTO BORROWS(loan_day,loan_end,worker_id,inventory_number,project_id) VALUES " +
                "(curDate(),NULL,NULL,'"+request.body.inventoryNumber+ "','" +request.body.projectId+ "');";

            connection.query(insertBorrow, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }

            })

            response.json({"Message": "Die Kommissionierung war erfolgreich."});

        } else response.json({"Message": "Das Gerät ist bereits ausgeliehen."})

    })

});


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

    let updateStatus = "UPDATE DEVICE SET device_status = 1 WHERE inventory_number = " +request.body.inventoryNumber+ ";";

    connection.query(updateStatus, function (err, result) {
        if (err) {
            console.log(err);
            return;
        } else response.json(result);

    })

});


module.exports = router;

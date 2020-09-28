/**
 * Import of modules
 * @type {Connection} database connector
 */
const connection = require('../../../src/REST-API/databaseConnection/connection');
const express = require('express');
const router = express();


router.get("/api/notification/booking/:userId", function (request,response){
    var statement = 'SELECT worker_id, inventory_number, CONVERT(loan_end' +
        ' USING utf8) AS loan_end FROM BORROWS WHERE' +
        ' DATEDIFF(loan_end,CURRENT_DATE)<=14 AND worker_id=' + request.params.userId;

    connection.query(statement,function (err,result){
       if (err) {
           console.log(err);
           response.json({
               "Message": "Keine Rückgabe innerhalb der nächsten" +
                   " 14 Tage"
           });
       }else{
           response.json(result);
       }

    });
});

router.get("/api/notification/tuv", function (request,response){
    var statement = "SELECT DEVICE.inventory_number, category," +
        " CONVERT(TUEV.timestamp USING utf8) AS timestamp FROM" +
        " TUEV,CATEGORY,DEVICE WHERE DATEDIFF(TUEV.timestamp,CURRENT_DATE)" +
    " BETWEEN 0 and 30 AND CATEGORY.major= DEVICE.beacon_major AND " +
        "DEVICE.inventory_number=TUEV.inventory_number GROUP BY" +
        " DEVICE.inventory_number;"

    connection.query(statement,function (err,result){
        if (err) {
            console.log(err);
            response.json({
                "Message": "Error"
            });
        }else{
            response.json(result);
        }
    });
});

router.get("/api/notification/uvv", function (request,response){
    var statement = "SELECT DEVICE.inventory_number, category," +
        " CONVERT(UVV.timestamp USING utf8) AS timestamp FROM" +
        " UVV,CATEGORY,DEVICE WHERE DATEDIFF(UVV.timestamp,CURRENT_DATE)" +
        " BETWEEN 0 and 30 AND CATEGORY.major= DEVICE.beacon_major AND" +
        " DEVICE.inventory_number=UVV.inventory_number GROUP BY" +
        " DEVICE.inventory_number";

    connection.query(statement,function (err,result){
        if (err) {
            console.log(err);
            response.json({
                "Message": "Error"
            });
        }else{
            response.json(result);
        }
    });
});


router.get("/api/notification/maintenance", function (request,response){
    var statement = "SELECT DEVICE.inventory_number, REPAIR.note,category," +
        " CONVERT(REPAIR.timestamp USING utf8) AS timestamp FROM" +
        " DEVICE,REPAIR, CATEGORY WHERE" +
        " DATEDIFF(REPAIR.timestamp,CURRENT_DATE) BETWEEN 0 and 14 AND " +
        "CATEGORY.major=DEVICE.beacon_major AND DEVICE.inventory_number = " +
        "REPAIR.inventory_number";

    connection.query(statement,function (err,result){
        if (err) {
            console.log(err);
            response.json({
                "Message": "Error"
            });
        }else{
            response.json(result);
        }
    });

});

module.exports = router;


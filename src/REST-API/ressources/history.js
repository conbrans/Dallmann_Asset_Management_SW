/**
 * Import of modules
 * @type {Connection} database connector
 */

const connection = require('../../../src/REST-API/databaseConnection/connection')
const log = require('../middelwareFunctions/logger');
const express = require('express');
const router = express();


/**
 * route for getting history for a specific device
 */

router.get("/api/history/getHistoryForSpecificDevice/:inventoryNumber",function (request,response)
{
    sql = "SELECT  DEVICE_HISTORY.inventory_number AS inventoryNumber, model, manufacturer,\n" +
                  "serial_number AS serialNumber,gurantee AS guarantee,\n" +
                  "DEVICE_HISTORY.note,device_status AS deviceStatus,\n" +
                  "DEVICE_STATUS.description AS statusDescription,CATEGORY.category ,\n" +
                  "beacon_major AS beaconMajor,beacon_minor AS beaconMinor,\n" +
                  "LOCATION.longitude,latitude,timesstamp AS lastLocationUpdate, TUEV.timestamp AS lastTuev,\n" +
                  " UVV.timestamp AS lastUvv, REPAIR.timestamp AS lastRepair, REPAIR.note AS repairNote,\n" +
                  " PROJECT.project_id AS projectId, name AS buildingSite, postcode, city,\n" +
                  " date_of_change AS lastChange\n" +
          "FROM DEVICE_HISTORY\n" +
                 " LEFT JOIN BORROWS\n" +
                            "ON DEVICE_HISTORY.inventory_number = BORROWS.inventory_number\n" +
                  "LEFT JOIN PROJECT\n" +
                            "ON BORROWS.project_id = PROJECT.project_id\n" +
                  "INNER JOIN DEVICE_STATUS\n" +
                            "ON DEVICE_HISTORY.device_status = DEVICE_STATUS.device_status_id\n" +
                  "LEFT JOIN BEACON\n" +
                            "ON DEVICE_HISTORY.beacon_major = BEACON.major and DEVICE_HISTORY.beacon_minor = BEACON.minor\n" +
                  "LEFT JOIN BEACON_POSITION\n" +
                            "ON BEACON.major = BEACON_POSITION.major and BEACON.minor = BEACON_POSITION.minor\n" +
                  "LEFT JOIN LOCATION\n" +
                            "ON BEACON_POSITION.location_id = LOCATION.location_id\n" +
                  "LEFT JOIN TUEV\n" +
                            "ON DEVICE_HISTORY.inventory_number = TUEV.inventory_number\n" +
                  "LEFT JOIN UVV\n" +
                            "ON DEVICE_HISTORY.inventory_number = UVV.inventory_number\n" +
                  "LEFT JOIN REPAIR\n" +
                            "ON DEVICE_HISTORY.inventory_number = REPAIR.inventory_number\n" +
                  "INNER JOIN CATEGORY\n" +
                            "ON BEACON.major = CATEGORY.major\n" +
          "WHERE DEVICE_HISTORY.inventory_number ='" + request.params.inventoryNumber + "'\n" +
          "GROUP BY device_history_id DESC;";

    connection.query(sql,function (err,result)
    {
        if(err){
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        console.log('GetAllDevices.Connection established');
        response.json(result);
    });

});

/**
 * route for getting all history data
 */

router.get("/api/history/getHistory",function (request,response)
{
    sql = "SELECT  DEVICE_HISTORY.inventory_number AS inventoryNumber, model, manufacturer,\n" +
                "serial_number AS serialNumber,gurantee AS guarantee,\n" +
                "DEVICE_HISTORY.note,device_status AS deviceStatus,\n" +
                "DEVICE_STATUS.description AS statusDescription,CATEGORY.category ,\n" +
                "beacon_major AS beaconMajor,beacon_minor AS beaconMinor,\n" +
                "LOCATION.longitude,latitude,timesstamp AS lastLocationUpdate, TUEV.timestamp AS lastTuev,\n" +
                "UVV.timestamp AS lastUvv, REPAIR.timestamp AS lastRepair, REPAIR.note AS repairNote,\n" +
                "PROJECT.project_id AS projectId, name AS buildingSite, postcode, city,\n" +
                "date_of_change AS lastChange\n" +
         "FROM DEVICE_HISTORY\n" +
                "LEFT JOIN BORROWS\n" +
                        "ON DEVICE_HISTORY.inventory_number = BORROWS.inventory_number\n" +
                "LEFT JOIN PROJECT\n" +
                        "ON BORROWS.project_id = PROJECT.project_id\n" +
                "INNER JOIN DEVICE_STATUS\n" +
                        "ON DEVICE_HISTORY.device_status = DEVICE_STATUS.device_status_id\n" +
                "LEFT JOIN BEACON\n" +
                        "ON DEVICE_HISTORY.beacon_major = BEACON.major and DEVICE_HISTORY.beacon_minor = BEACON.minor\n" +
                "LEFT JOIN BEACON_POSITION\n" +
                        "ON BEACON.major = BEACON_POSITION.major and BEACON.minor = BEACON_POSITION.minor\n" +
                "LEFT JOIN LOCATION\n" +
                        "ON BEACON_POSITION.location_id = LOCATION.location_id\n" +
                "LEFT JOIN TUEV\n" +
                        "ON DEVICE_HISTORY.inventory_number = TUEV.inventory_number\n" +
                "LEFT JOIN UVV\n" +
                        "ON DEVICE_HISTORY.inventory_number = UVV.inventory_number\n" +
                "LEFT JOIN REPAIR\n" +
                        "ON DEVICE_HISTORY.inventory_number = REPAIR.inventory_number\n" +
                "INNER JOIN CATEGORY\n" +
                        "ON BEACON.major = CATEGORY.major\n" +
        "GROUP BY device_history_id DESC;";

    connection.query(sql,function (err,result)
    {
        if(err){
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        console.log('GetAllDevices.Connection established');
        response.json(result);
    });

});

module.exports = router;
/**
 * Port listener
 */

/*router.listen(3001, () => {
    console.log('Listening on port 3001...');
});*/
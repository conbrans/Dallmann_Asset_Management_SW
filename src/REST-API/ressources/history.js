/**
 * Version 1.0
 * 06.10.2020
 *
 * @module /history
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
 *sql statement for selecting devices
 *
 * @type {string}
 */

let selectHistory = "SELECT  DEVICE_HISTORY.inventory_number AS inventoryNumber, model, manufacturer,\n" +
    "       serial_number AS serialNumber,gurantee AS guarantee,\n" +
    "       DEVICE_HISTORY.note,DEVICE_HISTORY.category AS deviceCategory,\n" +
    "       CATEGORY.category AS categoryDescription, device_status AS deviceStatus,\n" +
    "       DEVICE_STATUS.description AS statusDescription,\n" +
    "       beacon_major AS beaconMajor,beacon_minor AS beaconMinor,\n" +
    "       LOCATION.longitude,latitude,DATE_FORMAT((timesstamp), '%Y-%m-%dT%TZ') AS lastLocationUpdate,\n" +
    "       DATE_FORMAT((TUEV.timestamp), '%Y-%m-%dT%TZ') AS lastTuev,\n" +
    "       DATE_FORMAT((UVV.timestamp), '%Y-%m-%dT%TZ') AS lastUvv,\n" +
    "       DATE_FORMAT((REPAIR.timestamp),'%Y-%m-%dT%TZ') AS  lastRepair, \n" +
    "       REPAIR.note AS repairNote,\n" +
    "       PROJECT.project_id AS projectId, name AS buildingSite, postcode, city,\n" +
    "       DATE_FORMAT((date_of_change), '%Y-%m-%dT%TZ') AS lastChange\n" +
    "FROM DEVICE_HISTORY\n" +
    "       LEFT JOIN BORROWS\n" +
    "               ON DEVICE_HISTORY.inventory_number = BORROWS.inventory_number\n" +
    "       LEFT JOIN PROJECT\n" +
    "               ON BORROWS.project_id = PROJECT.project_id\n" +
    "       INNER JOIN DEVICE_STATUS\n" +
    "               ON DEVICE_HISTORY.device_status = DEVICE_STATUS.device_status_id\n" +
    "       LEFT JOIN BEACON\n" +
    "               ON DEVICE_HISTORY.beacon_major = BEACON.major and DEVICE_HISTORY.beacon_minor = BEACON.minor\n" +
    "       LEFT JOIN BEACON_POSITION\n" +
    "               ON BEACON.major = BEACON_POSITION.major and BEACON.minor = BEACON_POSITION.minor\n" +
    "       LEFT JOIN LOCATION\n" +
    "               ON BEACON_POSITION.location_id = LOCATION.location_id\n" +
    "       LEFT JOIN TUEV\n" +
    "               ON DEVICE_HISTORY.inventory_number = TUEV.inventory_number\n" +
    "       LEFT JOIN UVV\n" +
    "               ON DEVICE_HISTORY.inventory_number = UVV.inventory_number\n" +
    "       LEFT JOIN REPAIR\n" +
    "               ON DEVICE_HISTORY.inventory_number = REPAIR.inventory_number\n" +
    "       LEFT JOIN CATEGORY\n" +
    "               ON DEVICE_HISTORY.category = CATEGORY.category_id";


/**
 * route for getting history of an specific device depending on the inventoryNumber
 *
 * GET {inventoryNumber}
 *
 * @param request - sent information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 * @param inventoryNumber - given inventoryNumber from client for device
 */

router.get("/api/history/getHistoryForSpecificDevice/:inventoryNumber", (request, response) => {

    sql = selectHistory + " WHERE DEVICE_HISTORY.inventory_number ='" + request.params.inventoryNumber + "'\n" +
        "GROUP BY DEVICE_HISTORY.device_history_id DESC;";

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
 * route for getting history of all devices
 *
 * GET
 *
 * @param request - sent information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 */

router.get("/api/history/getHistory", (request, response) => {
    sql = selectHistory + " GROUP BY device_history_id DESC;";

    connection.query(sql, (err, result) => {
        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }

        response.json(result);
    });
});

//export of this module
module.exports = router;


/**
 * Import of modules
 * @type {Connection} database connector
 */

const connection = require('../../../src/REST-API/databaseConnection/connection')
const app = require('../../../src/app');

/**
 * route for getting history for a specific device
 */

app.get("/api/history/getHistoryForSpecificDevice/:inventoryNumber",function (request,response)
{
    sql = "SELECT DEVICE.inventory_number AS inventoryNumber,serial_number AS serialNumber,gurantee AS guarantee,\n" +
        " note,device_status AS deviceStatus,beacon_minor AS beaconMinor,beacon_major AS beaconMajor,model,\n" +
        " manufacturer,LOCATION.longitude,latitude,timesstamp AS lastLocationUpdate\n" +
        "FROM DEVICE\n" +
        "   INNER JOIN BEACON\n" +
        "       ON DEVICE.beacon_major = BEACON.major AND DEVICE.beacon_minor = BEACON.minor\n" +
        "   INNER JOIN BEACON_POSITION\n" +
        "       ON BEACON.major = BEACON_POSITION.major AND BEACON.minor = BEACON_POSITION.minor\n" +
        "   INNER JOIN LOCATION\n" +
        "       ON BEACON_POSITION.location_id = LOCATION.location_id\n" +
        "WHERE DEVICE.inventory_number = " +request.params.inventoryNumber+"\n" +
        "ORDER BY lastLocationUpdate DESC;\n";

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

app.get("/api/history/getHistory",function (request,response)
{
    sql = "SELECT DEVICE.inventory_number AS inventoryNumber,serial_number AS serialNumber,gurantee AS guarantee,\n" +
        " note,device_status AS deviceStatus,beacon_minor AS beaconMinor,beacon_major AS beaconMajor,model,\n" +
        " manufacturer,LOCATION.longitude,latitude,timesstamp AS lastLocationUpdate\n" +
        "FROM DEVICE\n" +
        "   INNER JOIN BEACON\n" +
        "       ON DEVICE.beacon_major = BEACON.major AND DEVICE.beacon_minor = BEACON.minor\n" +
        "   INNER JOIN BEACON_POSITION\n" +
        "       ON BEACON.major = BEACON_POSITION.major AND BEACON.minor = BEACON_POSITION.minor\n" +
        "   INNER JOIN LOCATION\n" +
        "       ON BEACON_POSITION.location_id = LOCATION.location_id\n" +
        "ORDER BY DEVICE.inventory_number, timesstamp DESC;\n";

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
 * Port listener
 */

app.listen(3002, () => {
    console.log('Listening on port 3002...');
});

/**
 * Import of modules
 * @type {Connection} database connector
 */


const connection = require('../../../src/REST-API/databaseConnection/connection');
const app = require('../../../src/app');
const logger = require('../middelwareFunctions/logger');
const { body, validationResult } = require('express-validator');
const constraint = require('../middelwareFunctions/validation')



/**
 * route for getting all users out of database
 */

app.get("/api/device/getAllDevices", (request, response) => {
    sql = "SELECT DEVICE.inventory_number AS inventoryNumber,model,manufacturer,serial_number AS serialNumber,\n" +
        "gurantee AS guarantee,note,\n" +
        "device_status AS deviceStatus,DEVICE_STATUS.description,CATEGORY.category,\n" +
        "LOCATION.longitude,latitude,Max(timesstamp) AS lastLocationUpdate,\n" +
        "TUEV.timestamp AS lastTuev, UVV.timestamp AS lastUvv,\n" +
        "PROJECT.project_id AS projectId, name, street, postcode, city\n" +
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
        "        INNER JOIN CATEGORY\n" +
        "                   ON BEACON.major = CATEGORY.major\n" +
        "\n" +
        "GROUP BY inventoryNumber;";

    connection.query(sql, function (err, result) {
        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        var json = JSON.stringify(result)
        console.log('GetAllDevices.Connection established');
        console.log(result)
        response.json(result);
    });

});

/**
 * route for getting all users out of database
 */

app.get("/api/device/getSpecificDevice/:inventoryNumber", (request, response) => {
    sql = "SELECT DEVICE.inventory_number AS inventoryNumber,model,manufacturer,serial_number AS serialNumber,\n" +
        "       gurantee AS guarantee,note,\n" +
        "       device_status, DEVICE_STATUS.description,CATEGORY.category,LOCATION.longitude,latitude," +
        "       Max(timesstamp) AS lastLocationUpdate, TUEV.timestamp AS lastTuev, UVV.timestamp AS lastUvv\n" +
        "FROM DEVICE\n" +
        "        INNER JOIN DEVICE_STATUS\n" +
        "                    ON DEVICE.device_status = DEVICE_STATUS.device_status_id\n" +
        "        INNER JOIN BEACON\n" +
        "                    ON DEVICE.beacon_major = BEACON.major and DEVICE.beacon_minor = BEACON.minor\n" +
        "        INNER JOIN BEACON_POSITION\n" +
        "                    ON BEACON.major = BEACON_POSITION.major and BEACON.minor = BEACON_POSITION.minor\n" +
        "        INNER JOIN LOCATION\n" +
        "                    ON BEACON_POSITION.location_id = LOCATION.location_id\n" +
        "        INNER JOIN TUEV\n" +
        "                   ON DEVICE.inventory_number = TUEV.inventory_number\n" +
        "        INNER JOIN UVV\n" +
        "                   ON DEVICE.inventory_number = UVV.inventory_number\n" +
        "        INNER JOIN CATEGORY\n" +
        "                   ON BEACON.major = CATEGORY.major\n" +
        "\n" +
        "WHERE DEVICE.inventory_number ='" + request.params.inventoryNumber + "' GROUP BY inventoryNumber;";

    connection.query(sql, function (err, result) {
        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        var json = JSON.stringify(result)
        console.log('GetAllDevices.Connection established');
        console.log(json)
        response.json(result);
    })

});

/**
 * route for getting all users out of database
 */

    app.post('/api/device/createDevice',constraint.deviceConstraints, (request, response) => {

        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        sql = "INSERT INTO DEVICE (model, serial_number, gurantee, note, device_status, beacon_minor, beacon_major, manufacturer) VALUES " +
            "('" + request.body.model + "','" + request.body.serialNumber + "','" + request.body.guarantee + "','"
            + request.body.note + "','" + request.body.deviceStatus + "','" + request.body.beaconMinor + "','"
            + request.body.beaconMajor + "','" + request.body.manufacturer + "');";

        connection.query(sql, function (err) {
            if (err) {
                response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                console.log('Error connecting to Db');
                return;
            }
            console.log('CreateDevice.Connection established');

            response.json({"Message": "Gerät wurde hinzugefügt"});
        })


});

/**
 * route for getting all users out of database
 */

app.put("/api/device/updateDevice/:inventoryNumber", constraint.deviceConstraints, (request, response) => {

    sql = "SELECT EXISTS(SELECT * FROM DEVICE WHERE inventory_number = "+ request.params.inventoryNumber +");";

    connection.query(sql, function (err, result) {
        var string = JSON.stringify(result);

        var str = string.substring(string.length -3, string.length - 2);


        if (err) {
            response.json({"Message": "Test"});
            console.log('Error connecting to Db');
            return;
        }

         else if (str == "1") {

            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).json({ errors: errors.array() });
            }

            update = "UPDATE DEVICE SET model ='" + request.body.model + "', manufacturer ='" + request.body.manufacturer + "'," +
                "beacon_major ='" + request.body.beaconMajor + "', serial_number ='" + request.body.serialNumber + "'," +
                "gurantee ='" + request.body.guarantee + "',note ='" + request.body.note + "'," +
                "device_status ='" + request.body.deviceStatus + "' WHERE inventory_number = " + request.params.inventoryNumber + ";";

            connection.query(update, function (err) {
                if (err) {
                    response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                    console.log('Error connecting to Db');
                    return;
                }
                console.log('DeleteDevice.Connection established');
                response.json({"Message": "Gerät mit der ID: " + request.params.inventoryNumber + " wurde erfolgreich geupdatet"});
            })
        }

        else return response.json({"Message": "Ein Gerät mit der ID: " + request.params.inventoryNumber + " ist nicht vorhanden."})

    })

});

/**
 * route for getting all users out of database
 */

app.delete('/api/device/deleteDevice/:inventoryNumber', function (request, response) {

    sql = "SELECT EXISTS(SELECT * FROM DEVICE WHERE inventory_number = "+ request.params.inventoryNumber +");";

    connection.query(sql, function (err, result) {
        var json = JSON.stringify(result);

        var str = json.substring(json.length - 3, json.length - 2);


        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        } else if (str == "1") {

            sql = "DELETE FROM DEVICE WHERE inventory_number = " + request.params.inventoryNumber + ";";
            connection.query(sql, function (err) {
                if (err) {
                    response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                    console.log('Error connecting to Db');
                    return;
                }
                console.log('DeleteDevice.Connection established');
                response.json({"Message": "Gerät mit der ID: " + request.params.inventoryNumber + " wurde erfolgreich gelöscht"});
            })
        }

        else return response.json({"Message": "Ein Gerät mit der ID: " + request.params.inventoryNumber + " ist nicht vorhanden."})

    })
});

/**
 * Port listener
 */

app.listen(3001, () => {
    console.log('Listening on port 3001...');
});

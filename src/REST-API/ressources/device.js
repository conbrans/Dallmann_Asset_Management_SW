/**
 * Import of modules
 * @type {Connection} database connector
 */

const connection = require('../../../src/REST-API/databaseConnection/connection')
const app = require('../../../src/app');

/**
 * route for getting all users out of database
 */

app.get("/api/device/getAllDevices",function (request,response)
{
    sql = "SELECT DEVICE.inventory_number,model,manufacturer,serial_number,gurantee,note,\n" +
        "device_status,DEVICE_STATUS.description,CATEGORY.category,\n" +
        "LOCATION.longitude,latitude,Max(timesstamp),\n" +
        "TUEV.timestamp AS LAST_TUEV, UVV.timestamp AS LAST_UVV,\n" +
        "PROJECT.project_id, name, street, postcode, city\n" +
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
        "GROUP BY inventory_number;";
        connection.query(sql,function (err,result)
        {
            if(err){
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

app.get("/api/device/getSpecificDevice/:inventoryNumber",function (request,response)
{
    sql = "SELECT DEVICE.inventory_number,model,manufacturer,serial_number,gurantee,note,\n" +
        "       device_status, DEVICE_STATUS.description,CATEGORY.category,LOCATION.longitude,latitude,Max(timesstamp),\n" +
        "       TUEV.timestamp AS LAST_TUEV, UVV.timestamp AS LAST_UVV\n" +
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
        "WHERE DEVICE.inventory_number ='" + request.params.inventoryNumber + "' GROUP BY inventory_number;";
    connection.query(sql,function (err,result)
    {
        if(err){
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        var json = JSON.stringify(result)
        console.log('GetAllDevices.Connection established');
        console.log(json)
        response.json(result);
    });

});

/**
 * route for getting all users out of database
 */

app.post("/api/device/createDevice",function (request,response)
{
    sql = "INSERT INTO DEVICE (model, serial_number, gurantee, note, device_status, beacon_minor, beacon_major, manufacturer) VALUES " +
        "('"+request.body.model+"','"+request.body.serial_number+"','"+request.body.gurantee+"','"
        + request.body.note+"','"+request.body.device_status+"','"+request.body.beacon_minor+"','"
        + request.body.beacon_major+"','"+ request.body.manufacturer+"');";
    connection.query(sql,function (err)
    {
        if(err){
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

app.put("/api/device/updateDevice/:inventoryNumber",function (request,response)
{
    update = "UPDATE DEVICE SET model ='"+request.body.model +"', manufacturer ='"+request.body.manufacturer+ "'," +
        "beacon_major ='"+request.body.beacon_major+"', serial_number ='"+ request.body.serial_number+ "'," +
        "gurantee ='"+request.body.gurantee+ "',note ='"+ request.body.note +"'," +
        "device_status ='"+request.body.device_status + "' WHERE inventory_number = " + request.params.inventoryNumber +";";
    connection.query(update,function (err)
    {
        if(err){
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        console.log('DeleteDevice.Connection established');
        response.json({"Message": "Gerät mit der ID: "+ request.params.inventoryNumber +" wurde erfolgreich geupdatet"});
    })
});

/**
 * route for getting all users out of database
 */

app.delete('/api/device/deleteDevice/:inventoryNumber',function (request,response)
{
    sql = "DELETE FROM DEVICE WHERE inventory_number = " + request.params.inventoryNumber +";";
    connection.query(sql,function (err)
    {
        if(err){
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        console.log('DeleteDevice.Connection established');
        response.json({"Message": "Gerät mit der ID: "+ request.params.inventoryNumber +" wurde erfolgreich gelöscht"});
    })
});

/**
 * Port listener
 */

app.listen(3001, () => {
    console.log('Listening on port 3001...');
});
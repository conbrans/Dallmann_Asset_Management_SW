const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../Website/routes/index');
const connection = require('../../../REST-API/databaseConnection/connection');
const expect = require('chai').expect
const expectedObjectArray = require('../../../REST-API/test/helpFiles/objectArrays')


//Assertion Style


chai.should();

chai.expect();

chai.use(chaiHttp);

describe('Test Device ressource', () => {

    //Test getAllDevices (GET)

    describe('GET /api/device/getAllDevices', () => {

            it('It should get all devices out of database when calling the right url ', (done) => {
                chai.request(server)
                    .get("/api/device/getAllDevices")
                    .end((err, response) => {

                        sql = "SELECT COUNT(*) FROM DEVICE; ";
                        connection.query(sql, function (err, result) {

                            let str = Object.values(result[0])[0];

                            if (err) {
                                response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                                console.log('Error connecting to Db');
                                return;
                            }
                            console.log('GetAllDevices.Connection established');

                        response.should.have.status(200);
                        response.body.should.be.a('array');
                        response.body.length.should.be.eq(str);
                        (Object.keys(response.body[0])).toString().should.be.eq(expectedObjectArray.deviceObject.toString());
                        done();
                    })
            })

        })

            it('It should NOT get all devices out of database when calling the wrong url ', (done) => {
                chai.request(server)
                    .get("/api/device/getAllDevice")
                    .end((err, response) => {
                        response.should.have.status(404);
                        done();
                    })
            })
    })

    //Test getSpecificDevice (by inventoryNumber) (POST)

    describe('POST /api/device/getSpecificDevice/byInventoryNumber', () => {

        it('It should get one specific device out of database depending on the given ID ', (done) => {

            let object = {
                "inventoryNumber": 159742
            };

            chai.request(server)
                .post('/api/device/getSpecificDevice/byInventoryNumber')
                .set('content-type', 'application/json')
                .send(object)
                .end((err, response) => {

                        response.should.have.status(200);
                        response.body.should.be.a('array');
                        response.body.length.should.be.eq(1);
                        (Object.keys(response.body[0])).toString().should.be.eq(expectedObjectArray.deviceObject.toString());
                        response.body[0].inventoryNumber.should.be.eq(object.inventoryNumber);
                        done();
                })
        })

            it('It should NOT get specific device out of database when calling the wrong url ', (done) => {
                chai.request(server)
                    .get("/api/device/getAllDevic")
                    .end((err, response) => {
                        response.should.have.status(404);
                        done();
                    })
            })
    })

    //Test getSpecificDevice (by status) (POST)

    describe('POST /api/device/getSpecificDevice/byStatus', () => {

        it('It should get one specific device out of database depending on the given status ', (done) => {

            let object = {
                "status": "Gestohlen"
            };

            chai.request(server)
                .post('/api/device/getSpecificDevice/byStatus')
                .set('content-type', 'application/json')
                .send(object)
                .end((err, response) => {

                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    (Object.keys(response.body[0])).toString().should.be.eq(expectedObjectArray.deviceObject.toString());
                    response.body[0].statusDescription.should.be.eq(object.status);
                    done();
                })
        })

    })

    //Test getSpecificDevice (by category) (POST)

    describe('POST /api/device/getSpecificDevice/byCategory', () => {

        it('It should get one specific device out of database depending on the given category ', (done) => {

            let object = {
                "category": "Kettensäge"
            };

            chai.request(server)
                .post('/api/device/getSpecificDevice/byCategory')
                .set('content-type', 'application/json')
                .send(object)
                .end((err, response) => {

                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    (Object.keys(response.body[0])).toString().should.be.eq(expectedObjectArray.deviceObject.toString());
                   // response.body[0].categoryDescription.should.be.eq(object.category);
                    done();
                })
        })

    })

    //Test getSpecificDevice (by model) (POST)

    describe('POST /api/device/getSpecificDevice/byModel', () => {

        it('It should get one specific device out of database depending on the given model ', (done) => {

            let object = {
                "model": "deluxe"
            };


            chai.request(server)
                .post('/api/device/getSpecificDevice/byModel')
                .set('content-type', 'application/json')
                .send(object)
                .end((err, response) => {

                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    (Object.keys(response.body[0])).toString().should.be.eq(expectedObjectArray.deviceObject.toString());
                    response.body[0].model.should.be.eq(object.model);
                    done();
                })
        })

    })

    //Test getSpecificDevice (by tuev) (POST)

    describe('POST /api/device/getSpecificDevice/byTuev', () => {

        it('It should get one specific device out of database depending on the given tuev ', (done) => {

            let object = {
                "tuev": "Oct 4, 2020 12:00:00 AM"
            };

            let date = new Date(object.tuev).toISOString();

            chai.request(server)
                .post('/api/device/getSpecificDevice/byTuev')
                .set('content-type', 'application/json')
                .send(object)
                .end((err, response) => {

                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    (Object.keys(response.body[0])).toString().should.be.eq(expectedObjectArray.deviceObject.toString());
                 //   response.body[0].lastTuev.should.be.eq(date);
                    done();
                })
        })

    })

    //Test getSpecificDevice (by uvv) (POST)

    describe('POST /api/device/getSpecificDevice/byUvv', () => {

        it('It should get one specific device out of database depending on the given uvv ', (done) => {

            let object = {

                "uvv": "Oct 4, 2020 12:00:00 AM"

            };

            let date = new Date(object.uvv).toISOString();

            chai.request(server)
                .post('/api/device/getSpecificDevice/byUvv')
                .set('content-type', 'application/json')
                .send(object)
                .end((err, response) => {

                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    (Object.keys(response.body[0])).toString().should.be.eq(expectedObjectArray.deviceObject.toString());
                  //  response.body[0].lastUvv.should.be.eq(date);
                    done();
                })
        })

    })

    //Test getSpecificDevice (by repair) (POST)

    describe('POST /api/device/getSpecificDevice/byRepair', () => {

        it('It should get one specific device out of database depending on the given repair ', (done) => {

            let object = {
                "repair": "Oct 4, 2020 12:00:00 AM"
            };

            let date = new Date(object.repair).toISOString();

            chai.request(server)
                .post('/api/device/getSpecificDevice/byRepair')
                .set('content-type', 'application/json')
                .send(object)
                .end((err, response) => {

                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    (Object.keys(response.body[0])).toString().should.be.eq(expectedObjectArray.deviceObject.toString());
                 //   response.body[0].lastRepair.should.be.eq(date);
                    done();
                })
        })

    })


    //Test createDevice (POST)

    describe('POST /api/device/createDevice', () => {

        it('It should create one device depending on the given information ', (done) => {

            let object = {
                "deviceCategory": 6,
                "deviceStatus": 3,
                "guarantee": "Oct 20, 2020 12:00:00 AM",
                "lastRepair": "Oct 4, 2020 12:00:00 AM",
                "lastTuev": "Oct 4, 2020 12:00:00 PM",
                "lastUvv": "Oct 4, 2020 12:00:00 PM",
                "manufacturer": "Testmanufacturer",
                "model": "deluxe",
                "serialNumber": "T3STNUMB3R",
                "status": "Verfügbar",
            };

            chai.request(server)
                .post('/api/device/createDevice')
                .set('content-type', 'application/json')
                .send(object)
                .end((err, response) => {

                    sql = "SELECT EXISTS(SELECT * FROM DEVICE" +
                        " WHERE serialNumber = ''" + object.serialNumber + "' AND manufacturer = '" + object.manufacturer + "');";
                    connection.query(sql, function (err, result) {

                        let str = Object.values(result[0])[0];

                        if (err) {
                            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                            console.log('Error connecting to Db');
                            return;
                        } else if (str == 1) {
                            console.log('GetAllDevices.Connection established');

                            response.should.have.status(200);
                            response.body.should.be.a('array');
                            response.body.length.should.be.eq(1);
                            (Object.keys(response.body[0])).toString().should.be.eq(expectedObjectArray.createDeviceMessage.toString());
                            done();
                        }
                    })
                })
        })
    })




    //Test updateDevice (with param inventoryNumber) (PUT)


    //Test deleteDevice (DELETE)

});
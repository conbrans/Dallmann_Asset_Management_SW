const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../Website/routes/index');
const connection = require('../../../REST-API/databaseConnection/connection');
const expect = require('chai').expect
const expectedObjectArray = require('../../../REST-API/test/helpFiles/objectArrays')

chai.should();

chai.expect();

chai.use(chaiHttp);

describe('Test Device ressource', () => {

    //Test getAllUsers (GET)

    describe('GET /api/device/getAllDevices', () => {

        it('It should get all users out of database when calling the right url ', (done) => {
            chai.request(server)
                .get("/api/worker/getAllUsers")
                .end((err, response) => {

                    sql = "SELECT COUNT(*) FROM WORKER; ";
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
                        (Object.keys(response.body[0])).toString().should.be.eq(expectedObjectArray.workerObject.toString());
                        done();
                    })
                })
        })

        it('It should NOT get all workers out of database when calling the wrong url ', (done) => {
            chai.request(server)
                .get("/api/worker/getAllUser")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })
    })

    //Test get specificUser (GET)

    describe('GET /api/device/getSpecificDevice/byInventoryNumber', () => {

        it('It should get one specific device out of database depending on the given ID ', (done) => {
                const userId = 2;
            chai.request(server)
                .get('/api/user/getSpecificUser/' + userId)
                .set('content-type', 'application/json')
                .send(object)
                .end((err, response) => {

                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(1);
                    (Object.keys(response.body[0])).toString().should.be.eq(expectedObjectArray.workerObject.toString());
                    response.body[0].inventoryNumber.should.be.eq(userId);
                    done();
                })
        })

        it('It should NOT get specific device out of database when calling the wrong url ', (done) => {
            chai.request(server)
                .get("/api/user/getAllUse")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })
    })

});
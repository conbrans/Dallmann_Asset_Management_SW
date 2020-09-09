/*var Request = require("request");

describe("Test of history",()=>
{
    var server;
    beforeAll(() => {
        server = require("../testfiles/historyTest");
    });

    afterAll(() => {
        server.close();
    });

    describe("POST /historie",()=>
    {
        var data = {};
        beforeEach((done) =>
        {
            Request.post("http://localhost:3001/historie", (error,response,body)=>
            {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
    });

});*/
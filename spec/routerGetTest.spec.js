var Request = require("request");


describe("Website", () => {
    var server;
    beforeAll(() => {
        server = require("../src/Website/testing/routerGetTest");
    });
    afterAll(() => {
        server.close();
    });

    describe("GET /", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);

        });
        it("Body not empty", () => {
            expect(data.body).not.toBe('');

        });
        it("Body contains html", () => {
            expect(data.body).toContain("<!DOCTYPE html>");
        });
    });
    describe("GET /add", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/add", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body.userName;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);

        });
    })
});


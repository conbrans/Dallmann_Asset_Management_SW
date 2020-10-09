var Request = require("request");


describe("Test of router.get Methods", () => {
    var server;
    beforeAll(() => {
        server = require("../testfiles/routerGetTest");
    });

    afterAll(() => {
        server.close();
    });

    describe("GET /", () => {
        var data = {};
        beforeEach((done) => {
            Request.get("http://localhost:3000/", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("Status 500, because of Toastr", () => {
            expect(data.status).toBe(500);

        });
        it("Body not empty", () => {
            expect(data.body).not.toBe('');

        });
        it("Body contains html", () => {
            expect(data.body).toContain("<!DOCTYPE html>");
        });
    });

    describe("GET /logout", () => {
        var data = {};
        beforeEach((done) => {
            Request.get("http://localhost:3000/logout", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("Status 500 because of Toastr", () => {
            expect(data.status).toBe(500);

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
        beforeEach((done) => {
            Request.get("http://localhost:3000/add",
                (error, response, body) => {
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
        it('Rights contains given values', () => {
            expect(data.body).toContain("<h3 style=\"text-align: center\">Benutzer hinzufügen</h3>");
        });
    });

    describe("GET /booking", () => {
        var data = {};
        beforeEach((done) => {
            Request.get("http://localhost:3000/booking",
                (error, response, body) => {
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
        it('Rights contains given values, no access for userManagement', () => {
            expect(data.body).not.toContain("<a href=\"/userManagement\">");
        });

    });

    describe("GET /bookinglist", () => {
        var data = {};
        beforeEach((done) => {
            Request.get("http://localhost:3000/bookinglist",
                (error, response, body) => {
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
        it('Rights contains given values, no access for picking', () => {
            expect(data.body).not.toContain("<a href=\"/picking\">");
        });

    });

    describe("GET /devices", () => {
        var data = {};
        beforeEach((done) => {
            Request.get("http://localhost:3000/devices",
                (error, response, body) => {
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
        it('Body contains Teo Tester', () => {
            expect(data.body).toContain("Teo Tester");
        });
        it('Rights contains given values', () => {
            expect(data.body).toContain("<a href=\"/userManagement\">");
        });
        it('Rights contains given values, no access for viewing Devices', () => {
            expect(data.body).not.toContain("<a href=\"/devices\">");
        });
    });

    describe("GET /faQ", () => {
        var data = {};
        beforeEach((done) => {
            Request.get("http://localhost:3000/faQ",
                (error, response, body) => {
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
        it('Body contains Teo Tester', () => {
            expect(data.body).toContain("Teo Tester");
        });
        it('Rights contains given values', () => {
            expect(data.body).toContain("<a href=\"/userManagement\">");
        });
    });

    describe("GET /home expect to fail because of toastr", () => {
        var data = {};
        beforeEach((done) => {
            Request.get("http://localhost:3000/home",
                (error, response, body) => {
                    data.status = response.statusCode;
                    data.body = body;
                    done();
                })
        });
        it("Status 500", () => {
            expect(data.status).toBe(500);
        });
    });

    describe("GET /profil", () => {
        var data = {};
        beforeEach((done) => {
            Request.get("http://localhost:3000/profil",
                (error, response, body) => {
                    data.status = response.statusCode;
                    data.body = body;
                    done();
                });
        });
        it("Status 500 because of toastr", () => {
            expect(data.status).toBe(500);
        });
    });

    describe("GET /userManagement", () => {
        var data = {};
        beforeEach((done) => {
            Request.get("http://localhost:3000/userManagement",
                (error, response, body) => {
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
        it('Body contains Teo Tester', () => {
            expect(data.body).toContain("Teo Tester");
        });
        it('Rights contains given values', () => {
            expect(data.body).toContain("<a href=\"/userManagement\">");
        });
    });

});


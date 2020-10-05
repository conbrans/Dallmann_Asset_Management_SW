var Express = require("express");
var app = Express();
app.set('views', 'C:\\Users\\co99b\\IdeaProjects\\Dallmann_Asset_Management_SW\\src\\Website\\Views')
app.set('view engine', 'ejs');

app.post("/historie", function (request, response) {


    response.status(201).render("historie.ejs",
        {
            username: "History Test",
            role: "Tester",
            rights: {
                booking_device: 1,
                edit_device: 1,
                add_device: 1,
                view_device: 1,
                delete_device: 1,
                add_user: 1,
                delete_user: 1,
                edit_user: 1,
                delete_booking: 1,
                edit_booking: 1,
                picking: 1
            },
            inventoryNumber: "Placeholder",
            data: {
                lastChance : "2020-10-20",
                longitude : 52.30,
                latitude :8.210,
                model : "TEST",
                manufacturer : "TEST",
                serialNumber : "12345",
                guarantee : "2020-10-12",
                note : "TEST",
                statusDescription :" Verfügbar",
                category : "Leiter",
                lastTuev :"2020-10-12",
                lastUvv:"2020-10-12",
                lastRepair :"2020-10-12",
                repairNote : "TEST",
                projectId: 1,
                buildingSite : "BAustelle",
            },

        });

});






var server = app.listen(3001, () => {
});

module.exports = server;
/**
 * initalization of the datatable for the bookinglist, where the german
 * values are set, and the data which is displayed on the site is loaded
 */
$(document).ready(function () {
    var table = $("#booking");
    var users = $.ajax({
        url: "/showBooking",
    }).done(data => {
        table.DataTable({
            data: data,
            columns: [
                {"data": "inventoryNumber"},
                {"data": "loanDay"},
                {"data": "loanEnd"},
                {"data": "firstname"},
                {"data": "surname"},
                {"data": "projectId"},
                {"data": "buildingSite"},
            ],
            search: {
                search: document.getElementById("searchValue").value,
            },
            colReorder: true,
            language: {
                search: "Suche nach:",
                info: "Zeige Nr. _START_ bis _END_ von _TOTAL_ Reservierungen",
                lengthMenu: "Zeige _MENU_ Reservierungen.",
                zeroRecords: "Keine Einträge verfügbar",
                paginate: {
                    first: "Erste Seite",
                    last: "Letzte Seite",
                    next: "Nächste",
                    previous: "Vorherige"
                },
                infoFiltered: "(von _MAX_ Reservierungen insgesamt)",
            }
        });
    });
});
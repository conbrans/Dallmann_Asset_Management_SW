$(document).ready(function () {
    var table = $("#history");
    var history = $.ajax({
        url: "/showHistory",
    }).done(data => {
        table.DataTable({
            data: data,
            columns: [
                {"data": "lastChange"},
                {"data": "statusDescription"},
                {"data": "longitude"},
                {"data": "latitude"},
            ],
            processing : true,
            language: {
                search: "Suche nach:",
                info: "Zeige Nr. _START_ bis _END_ von _TOTAL_ Einträge",
                lengthMenu: "Zeige _MENU_ Einträge",
                zeroRecords: "Keine Einträge verfügbar",
                paginate: {
                    first: "Erste Seite",
                    last: "Letzte Seite",
                    next: "Nächste",
                    previous: "Vorherige"
                },
                infoFiltered: "(von _MAX_ Einträgen insgesamt)",
            }
        });


        $('#history tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $('#history tbody .selected').removeClass('selected');
                $(this).addClass('selected');
                setMarker(data[this.rowIndex-1].longitude, data[this.rowIndex-1].latitude);
            }
        });
    });
});


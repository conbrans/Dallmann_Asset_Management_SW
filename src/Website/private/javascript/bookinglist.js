$(document).ready(function () {
	var table = $("#history");
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
			pageLength : 15,
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

		$('#history tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
			} else {
				$('#history tbody .selected').removeClass('selected');
				$(this).addClass('selected');
				var data = {
					workerid: this.cells.item(0).innerText,
					mail: this.cells.item(3).innerText,
				};
				console.log(data);
				$.ajax({
					type: 'post',
					url: '/sendWorkerInfos',
					data: data,
					data_type: 'json'
				}).done(() => {
					console.log("Workerid is transported");
				});
			}
		});
	});
});
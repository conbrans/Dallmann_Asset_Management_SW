$(document).ready(function () {
	createTableRequest();
	createTableBooking();

});

const createTableRequest = ()=>{
	var table = $("#acceptbooking");
	var notacceptedbookings = $.ajax({
		url: "/showBookingRequest",
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
				{"data": ""},
			],
			colReorder: {
				fixedColumnsLeft: 3,
			},
			language: {
				search: "Suche nach:",
				info: "Zeige Nr. _START_ bis _END_ von _TOTAL_ zu überprüfenden Reservierungen",
				lengthMenu: "Zeige _MENU_ zu überprüfende Reservierungen.",
				zeroRecords: "Keine Einträge verfügbar",
				paginate: {
					first: "Erste Seite",
					last: "Letzte Seite",
					next: "Nächste",
					previous: "Vorherige"
				},
				infoFiltered: "(von _MAX_  zu überprüfenden Reservierungen insgesamt)",
			},
			columnDefs: [{
				"targets": -1,
				"data": null,
				"defaultContent": "<button value='accept' class='btn" +
					" btn-success'>Annehmen</button> <button" +
					"  value='deny' class='btn" +
					" btn-danger'>Ablehnen</button>"
			}]
		});
		$('#acceptbooking tbody').on( 'click', 'button', function () {
			data = {
				inventoryNumber: this.closest('tr').cells.item(0).innerText,
				loanDay : this.closest('tr').cells.item(1).innerText,
				loanEnd : this.closest('tr').cells.item(2).innerText,
				button: this.value,
			};
			$.ajax({
				url: "/acceptBooking",
				method : "POST",
				data : data,
			}).done(()=> window.location.reload());
		} );
	});
}

const createTableBooking = ()=>{
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
}
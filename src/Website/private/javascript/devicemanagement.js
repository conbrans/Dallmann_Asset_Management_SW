/**
 * initalization of the datatable for the device management, where the german
 * values are set, and the data which is displayed on the site is loaded
 */
$(document).ready(function () {
	var table = $("#table");
	var devices = $.ajax({
		url: "/showDevices",
	}).done(data => {
		table.DataTable({
			data: data,
			columns: [
				{"data": "inventoryNumber"},
				{"data": "categoryDescription"},
				{"data": "model"},
				{"data": "statusDescription"},
			],
			search: {
			search : document.getElementById("searchValue").value,
			},
			colReorder: {
				fixedColumnsLeft: 1,
			},
			language: {
				search: "Suche nach:",
				info: "Zeige Nr. _START_ bis _END_ von _TOTAL_ Geräten",
				lengthMenu: "Zeige _MENU_ Geräte",
				zeroRecords: "Keine Einträge verfügbar",
				paginate: {
					first: "Erste Seite",
					last: "Letzte Seite",
					next: "Nächste",
					previous: "Vorherige"
				},
				infoFiltered: "(von _MAX_ Geräten insgesamt)",
			}
		});

		$('#table tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
			} else {
				$('#table tbody .selected').removeClass('selected');
				$(this).addClass('selected');
				var data = {
					inventoryNumber: this.cells.item(0).innerText,
				};
				$.ajax({
					type: 'post',
					url: '/sendInventoryNumber',
					data: data,
					data_type: 'text'
				}).done(() => {
					$.ajax({
						type: 'get',
						url: '/showDevice',
					}).done(data => {
						document.getElementById("invnumber").value = data[0].inventoryNumber;
						document.getElementById("manufacturer").value = data[0].manufacturer;
						document.getElementById("category").value = data[0].deviceCategory;
						document.getElementById("model").value = data[0].model;
						document.getElementById("status").value = data[0].deviceStatus;
						document.getElementById("serialNumber").value = data[0].serialNumber;
						document.getElementById("guarantee").value = data[0].guarantee;
						document.getElementById("technicalInspection").value = data[0].lastTuev;
						document.getElementById("accidentPrevention").value = data[0].lastUvv;
						document.getElementById("longitude").value = data[0].longitude;
						document.getElementById("latitude").value = data[0].latitude;
						document.getElementById("note").value = data[0].note;
						document.getElementById("minor").value = data[0].beaconMinor;

						setMarker(data[0].longitude, data[0].latitude);
					});
				});
			}
		});
	});
});

function deleteDeviceMessage() {
	confirm("ACHTUNG!\nSie sind dabei das gewählte Gerät undwideruflich zu" +
		" löschen.");
}

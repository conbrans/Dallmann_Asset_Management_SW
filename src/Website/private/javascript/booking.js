let disableDates;
let bookingCalendar;
let start;
let end;

let oneRange;

let json;
let test;
let tt;
var ts;
$(document).ready(function () {

	var bookings = $.ajax({
		url: "/showOneBooking",
	}).done(data => {

		bookingCalendar = flatpickr("#booking_start", {
			disableTime: true,
			mode: "range",
			dateFormat: "Y-m-d",
			disable: [{
				from: '2020-10-01',
				to: '2020-10-03'
			}, {
				from: '2020-10-04',
				to: '2020-10-04'
			},],
			onChange: [function (selectedDates) {
				startDate = selectedDates[0].getFullYear() + "-" + numberCharacters(selectedDates[0].getMonth() + 1) + "-" + numberCharacters(selectedDates[0].getDate());
				endDate = selectedDates[1].getFullYear() + "-" + numberCharacters(selectedDates[1].getMonth() + 1) + "-" + numberCharacters(selectedDates[1].getDate());

			}]

		});
	});
});


function numberCharacters(date) {
	if (date > 9) {
		return "" + date;
	} else {
		return "0" + date;
	}
}


function getSelectedDates() {
	loanDay = startDate;
	loanEnd = endDate;

	var selectedDates = $.ajax({
		url: '/book',
		method: 'POST',
		data:{
			inventoryNumber : document.getElementById("inventoryNumber").value,
			loanDay : loanDay,
			loanEnd : loanEnd,
			projectId : document.getElementById("projectId").value,
		},
	});
}

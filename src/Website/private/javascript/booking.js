$(document).ready(function () {

	var bookings = $.ajax({
		url: "/showOneBooking",
	}).done(data => {
		setBookingCalendar(data);
	});
});

const setBookingCalendar = (data) => {
	bookingCalendar = flatpickr("#booking_start", {
		disableTime: true,
		weekNumbers: true,
		mode: "range",
		minDate: "today",
		locale: {
			firstDayOfWeek: 1,
		},
		dateFormat: "Y-m-d",
		disable: getDates(data),
		onChange: [function (selectedDates) {
			loanDay = selectedDates[0].getFullYear() + "-"
				+ numberCharacters(selectedDates[0].getMonth() + 1)
				+ "-" + numberCharacters(selectedDates[0].getDate());
			loanEnd = selectedDates[1].getFullYear()
				+ "-" + numberCharacters(selectedDates[1].getMonth() + 1)
				+ "-" + numberCharacters(selectedDates[1].getDate());
		}]
	});
};

const numberCharacters = (date) => {
	if (date > 9) {
		return "" + date;
	} else {
		return "0" + date;
	}
};


function getSelectedDates() {

	var selectedDates = $.ajax({
		url: '/book',
		method: 'POST',
		data: {
			inventoryNumber: document.getElementById("inventoryNumber").value,
			loanDay: loanDay,
			loanEnd: loanEnd,
			projectId: document.getElementById("projectId").value,
		},
	});
}

const getDates = (data) => {
	let splitStart = [];
	let splitEnd = [];

	for (let i = 0; i < data.length; i++) {
		splitStart[i] = data[i].loanDay.split("-");
		splitEnd[i] = data[i].loanEnd.split("-");
	}
	let dates = [];
	for (let i = 0; i < splitStart.length; i++) {
		for (let dt = new Date(splitStart[i][0], splitStart[i][1] - 1, splitStart[i][2]);
		     dt < new Date(splitEnd[i][0], splitEnd[i][1] - 1, splitEnd[i][2]);
		     dt.setDate(dt.getDate() + 1)) {
			dates.push(new Date(dt).toISOString());
		}
	}
	return dates;
};

const BookingWithBody = () => {

	var bookings = $.ajax({
		url: "/showOneBookingWithBody",
		method: "POST",
		data: {
			inventoryNumber: document.getElementById("inventoryNumber").value,
		}
	}).done(data => {
		setBookingCalendar(data);
	});
};

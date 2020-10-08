let disableDates;
let bookingCalendar;
let start;
let end;

let oneRange;

let json
let test= [];
let tt;
var ts;
$(document).ready(function () {

    var bookings = $.ajax({
        url: "/showOneBooking",
    }).done(data => {

        console.log(JSON.stringify(data))
        console.log(data)
        test= data;
        bookingCalendar = flatpickr("#booking_start", {
            disableTime: true,
            mode: "range",
            dateFormat: "Y-m-d",
            disable:test,
            onChange: [function (selectedDates) {
                //dateArr = selectedDates.map(date => this.formatDate(date, "d-m-Y"));

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




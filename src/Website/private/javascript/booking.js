let startDate;
let endDate;

flatpickr("#booking_start", {
    disableTime: true,
    mode: "range",
    dateFormat: "d-m-Y",
    disable: [
        function(date) {
            // disable every multiple of 8
            return !(date.getDate() % 8);
        }
    ],
    onChange: [function(selectedDates){
        //dateArr = selectedDates.map(date => this.formatDate(date, "d-m-Y"));

        startDate = selectedDates[0].getFullYear() + "-" + numberCharacters(selectedDates[0].getMonth() + 1) + "-" + numberCharacters(selectedDates[0].getDate())  ;

        endDate = selectedDates[1].getFullYear() + "-" + numberCharacters(selectedDates[1].getMonth() + 1) + "-" + numberCharacters(selectedDates[1].getDate())  ;


    }]
});

function numberCharacters( date ) {
    if (date > 9){
        return ""+date;
    }else{
        return "0"+date;
    }
}




function testValue() {

    console.log(start);
    console.log(end);
}

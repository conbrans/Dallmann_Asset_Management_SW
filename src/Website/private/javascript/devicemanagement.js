window.onload = function () {
    loadData(0);
}

$(document).ready(function() {
    $.noConflict();
    var data = $.ajax({
        url : "/showDevices",
        method : "GET",
    }).done(()=>{
        console.log(data.responseJSON);
        $("#table").DataTable({

            data : data.responseJSON,
            columns : [
                { "data": "inventoryNumber" },
                { "data": "category" },
                { "data": "model" },
                { "data": "statusDescription" }],
            language:{
                search: "Suche nach:",
                info : "Zeige Nr. _START_ bis _END_ von _TOTAL_ Geräten",
                lengthMenu : "Zeige _MENU_ Geräte",
                zeroRecords : "Keine Einträge verfügbar",
                paginate : {
                        first: "Erste Seite",
                        last: "Letzte Seite",
                        next: "Nächste",
                        previous: "Vorherige"
                },
                infoFiltered : "(von _MAX_ Geräten insgesamt)",
            }
        })
    });
});

$('#table tbody').find('tr').click( function(){
    alert($(this).index());
});




let acc = document.getElementsByClassName("toggle-title");
let panel = document.getElementsByClassName('toggle-inner');


/**
 *
 * @param i
 */
function loadData(i) {

    document.getElementById("invnumber").value =
        document.getElementById("tr" + i.toString() +
            "td1").innerHTML;

    document.getElementById("serialNumber").value =
        document.getElementById("tr" + i.toString() +
            "serialNumber").innerHTML;

    document.getElementById("manufacturer").value =
        document.getElementById("tr" + i.toString() +
            "manufacturer").innerHTML;


    switch (document.getElementById("tr" + i.toString() +
        "td2").innerHTML) {
        case "Rüttelplatten":
            document.getElementById("category").value = "0001";
            break;
        case "Stampfer":
            document.getElementById("category").value = "0002";
            break;
        case "Motorflex":
            document.getElementById("category").value = "0003";
            break;
        case "Rohrgreifer":
            document.getElementById("category").value = "0004";
            break;
        case "Kettensägen":
            document.getElementById("category").value = "0005";
            break;
        case "Motorhammer":
            document.getElementById("category").value = "0006";
            break;
        case "Leiter":
            document.getElementById("category").value = "0007";
            break;
        case "Exoten":
            document.getElementById("category").value = "0008";
            break;
    }

    document.getElementById("model").value =
        document.getElementById("tr" + i.toString() +
            "td3").innerHTML;

    switch (document.getElementById("tr" + i.toString() +
        "td4").innerHTML) {
        case "Verfügbar":
            document.getElementById("status").value = "1";
            break;
        case "Ausgeliehen":
            document.getElementById("status").value = "2";
            break;
        case "In Wartung":
            document.getElementById("status").value = "3";
            break;
        case "Außer Betrieb":
            document.getElementById("status").value = "4";
            break;
        case "Defekt":
            document.getElementById("status").value = "5";
            break;
        case "Verschollen/Verschwunden":
            document.getElementById("status").value = "6";
            break;
        case "Gestohlen":
            document.getElementById("status").value = "7";
            break;

    }

    document.getElementById("note").value =
        document.getElementById("tr" + i.toString() +
            "note").innerHTML;

    document.getElementById("longitude").value =
        document.getElementById("tr" + i.toString() +
            "longitude").innerHTML;

    document.getElementById("latitude").value =
        document.getElementById("tr" + i.toString() +
            "latitude").innerHTML;

    document.getElementById("guarantee").value =
        document.getElementById("tr" + i.toString() +
            "guarantee").innerHTML;

    document.getElementById("technicalInspection").value =
        document.getElementById("tr" + i.toString() +
            "technicalInspection").innerHTML;

    document.getElementById("accidentPrevention").value =
        document.getElementById("tr" + i.toString() +
            "accidentPrevention").innerHTML;

    var data = {
        inventoryNumber: $('#invnumber').val(),
    };
    $.ajax({
        type: 'post',
        url: '/sendInventoryNumber',
        data: data,
        data_type: 'text'
    }).done(() => {
        console.log("Inventorynumber is transported")
    });

    getPositionData(i);
}

function deleteDeviceMessage() {
    confirm("ACHTUNG!\nSie sind dabei das gewählte Gerät undwideruflich zu" +
        " löschen.");
}


/**
 * for-loop for the button "Filter" to show or hide the <div>
 */
for (var i = 0; i < acc.length; i++) {
    acc[i].onclick = function () {
        var setClasses = !this.classList.contains('active');
        setClass(acc, 'active', 'remove');
        setClass(panel, 'show', 'remove');

        if (setClasses) {
            this.classList.toggle("active");
            this.nextElementSibling.classList.toggle("show");
        }
    }
}

/**
 *
 * @param els
 * @param className
 * @param fnName
 */
function setClass(els, className, fnName) {
    for (var i = 0; i < els.length; i++) {
        els[i].classList[fnName](className);
    }
}


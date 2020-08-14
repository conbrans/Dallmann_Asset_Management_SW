var long ="";
var lat="";


  /*  var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://gist.githubusercontent.com/lkottman/8618f80366e571d39402edf13776f4e0/raw/d5e5b0fc29b7f117a9fc0bda414ce62fd4d1576e/Dataset_example.json', true);
    ourRequest.onload = function () {
        if (ourRequest.status >= 200 && ourRequest.status < 400){
            var ourData = JSON.parse(ourRequest.responseText);
            renderHTML(ourData);
        } else{
            console.log("We connected to the server, but it returned an error. \nError "+ourRequest.status)
        }
    };
    ourRequest.onerror=function(){
        console.log("Connection")
    }
    ourRequest.send();*/




var map = L.map('map').setView([45.2,-5.23],1);
L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
}).addTo(map);


function renderHTML(data) {
    var rowCounter = 0;
    console.log("TEts");

    for(i=0; i< data.device.length; i++){
        createTableContent("deviceContent");

    }


    function createTableContent(id) {
        var x = document.getElementById(id).insertRow(rowCounter);

        var column1 = x.insertCell(0);
        var column2 = x.insertCell(1);
        var column3 = x.insertCell(2);
        var column4 = x.insertCell(3);

        column1.innerHTML = "<p>"+data.device[i].inventoryNumber+'</p>';
        column2.innerHTML = "<p>"+data.device[i].deviceCategorie+"</p>";
        column3.innerHTML= "<p>"+data.device[i].model+"</p>";
        column4.innerHTML = "<p>"+data.device[i].status +"</p>";


        var x = document.getElementById(id).rows[0].cells;
        lat= data.device[0].latitude;
        long= data.device[0].longtitude;
        setMapView(lat,long);
                rowCounter++;
    }


    function setMapView(lat,long) {
        console.log("long" +long);
        console.log("lat"+lat);
        map.setView([lat, long],10);
        var markerElement = L.marker([lat,long]).addTo(map);
    }

    function search(serachByValue,name){
        var results = [];
        var index;
        var entry;

        name = name.toUpperCase();
        for (index = 0; index < source.length; ++index) {
            entry = source[index];
            if (entry && entry.name && entry.name.toUpperCase().indexOf(name) !== -1) {
                results.push(entry);
            }
        }

        return results;
    }



}




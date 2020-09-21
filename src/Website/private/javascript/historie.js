/**
 * author = Constantin Brans
 */
let rows;
setTimeout(() => {
        setTimeout(() => {
            longitude = document.getElementById("longitude0").value;
            latitude = document.getElementById("latitude0").value;
            src = "https://www.openstreetmap.org/export/embed.html?bbox="
                +longitude +"%2C"+latitude+"%2C" +longitude+"%2C"+latitude+
                "&layer=mapnik&marker="+latitude+"%2C"+longitude;
            let table = document.getElementById("Table");
            document.getElementsByTagName("iframe")[0]
                .src= src
        }, 1);
        rows = table.rows;
        for (var i = 1; i < rows.length; i++) {
            let row = rows[i];
            let cells = row.cells;
            cells[cells.length-1].innerHTML =

            "<button name='button' class='btn btn-warning px-3' " +
                "style='background: #fbbb11' onclick='setSrc("+i+")'>" +
                "<i class='fas fa-map-marker'></i></button>";

        }
    }
    , 1);

function setSrc(element)
{
    let longitude =[];
    let latitude =[];
    let test= [];
    for(var i=1;i<rows.length;i++)
    {
        var j = i-1;
        let longitudeID = "longitude"+j.toString();
        let latitudeID = "latitude"+j.toString();
        //console.log(longitudeID);
        longitude[i] = document.getElementById(longitudeID).value;
        latitude[i] = document.getElementById(latitudeID).value;
        test[i] = "https://www.openstreetmap.org/export/embed.html?bbox="
            +longitude[i].toString() +"%2C"+latitude[i].toString()+"%2C"
            +longitude[i].toString()+"%2C"+latitude[i].toString()+
            "&layer=mapnik&marker="+latitude[i].toString()+"%2C"+longitude[i].toString();

    }
        console.log(longitude[0]);
        console.log(latitude[0]);
        console.log(test[0]);
        document.getElementsByTagName("iframe")[0].src= test[element];
}

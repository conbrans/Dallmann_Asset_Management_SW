let rows;
setTimeout(() => {
        setTimeout(() => {
            let table = document.getElementById("Table");
            document.getElementsByTagName("iframe")[0].src= "https://www.openstreetmap.org/export/embed.html?bbox=9.965848%2C53.562287%2C9.965848%2C53.562287&layer=mapnik&marker=53.562287%2C9.965848&marker1=52.404950%2C8.062129";
        }, 0);
        rows = table.rows;
        for (var i = 1; i < rows.length; i++) {
            let row = rows[i];
            let cells = row.cells;
            cells[5].innerHTML =

            "<button name='button' class='btn btn-warning px-3' style='background: #fbbb11' onclick='setSrc("+i+")'  ><i class='fas fa-map-marker'></i></button>";

        }
    }
    , 0);

function setSrc(element)
{
    let test= [];
    test.length = rows.length;
    test[1] = "https://www.openstreetmap.org/export/embed.html?bbox=8.062129%2C52.404950%2C8.062129%2C52.404950&layer=mapnik&marker=52.404950%2C8.062129";
    test[2] = "https://www.openstreetmap.org/export/embed.html?bbox=7.322685%2C52.519718%2C7.322685%2C52.519718&layer=mapnik&marker=52.519718%2C7.322685";
    test[3] = "https://www.openstreetmap.org/export/embed.html?bbox=7.634803%2C51.956928%2C7.634803%2C51.956928&layer=mapnik&marker=51.956928%2C7.634803";
    test[4] = "https://www.openstreetmap.org/export/embed.html?bbox=9.965848%2C53.562287%2C9.965848%2C53.562287&layer=mapnik&marker=53.562287%2C9.965848";


    document.getElementsByTagName("iframe")[0].src= test[element];








}
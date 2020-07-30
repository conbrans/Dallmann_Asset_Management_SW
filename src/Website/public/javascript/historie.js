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


function loadMap()
{

}

map = new OpenLayers.Map("historyMap");
map.addLayer(new OpenLayers.Layer.OSM());

epsg4326 = new OpenLayers.Projection("EPSG:4326"); //WGS 1984 projection
projectTo = map.getProjectionObject(); //The map projection (Spherical Mercator)

var lonLat = new OpenLayers.LonLat(8.062129, 52.404950).transform(epsg4326, projectTo);


var zoom = 14;
map.setCenter(lonLat, zoom);

var vectorLayer = new OpenLayers.Layer.Vector("Overlay");

// Define markers as "features" of the vector layer:
var feature = new OpenLayers.Feature.Vector(
    new OpenLayers.Geometry.Point(8.062129, 52.404950).transform(epsg4326, projectTo),
    {description: 'This is the value of<br>the description attribute'},
    {
        externalGraphic: '../public/picture/powerButton.png',
        graphicHeight: 25,
        graphicWidth: 21,
        graphicXOffset: -12,
        graphicYOffset: -25
    }
);
vectorLayer.addFeatures(feature);

var feature = new OpenLayers.Feature.Vector(
    new OpenLayers.Geometry.Point(7.322685, 52.519718).transform(epsg4326, projectTo),
    {description: 'Big Ben'},
    {
        externalGraphic: '../public/picture/powerButton.png',
        graphicHeight: 25,
        graphicWidth: 21,
        graphicXOffset: -12,
        graphicYOffset: -25
    }
);
vectorLayer.addFeatures(feature);

var feature = new OpenLayers.Feature.Vector(
    new OpenLayers.Geometry.Point(7.634803, 51.956928).transform(epsg4326, projectTo),
    {description: 'London Eye'},
    {
        externalGraphic: '../public/picture/powerButton.png',
        graphicHeight: 25,
        graphicWidth: 21,
        graphicXOffset: -12,
        graphicYOffset: -25
    }
);
vectorLayer.addFeatures(feature);

var feature = new OpenLayers.Feature.Vector(
    new OpenLayers.Geometry.Point(9.965848, 53.562287).transform(epsg4326, projectTo),
    {description: 'London Eye'},
    {
        externalGraphic: '../public/picture/powerButton.png',
        graphicHeight: 25,
        graphicWidth: 21,
        graphicXOffset: -12,
        graphicYOffset: -25
    }
);
vectorLayer.addFeatures(feature);


map.addLayer(vectorLayer);


//Add a selector control to the vectorLayer with popup functions
var controls = {
    selector: new OpenLayers.Control.SelectFeature(vectorLayer, {onSelect: createPopup, onUnselect: destroyPopup})
};

function createPopup(feature) {
    feature.popup = new OpenLayers.Popup.FramedCloud("pop",
        feature.geometry.getBounds().getCenterLonLat(),
        null,
        '<div class="markerContent">' + feature.attributes.description + '</div>',
        null,
        true,
        function () {
            controls['selector'].unselectAll();
        }
    );
    //feature.popup.closeOnMove = true;
    map.addPopup(feature.popup);
}

function destroyPopup(feature) {
    feature.popup.destroy();
    feature.popup = null;
}

map.addControl(controls['selector']);
controls['selector'].activate();
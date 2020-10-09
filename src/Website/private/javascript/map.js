let marker;
let markerLoopVariable = 0;
let geocodeService = L.esri.Geocoding.geocodeService();

window.onload = function () {
	getPositionData(0);
};

var map = L.map('map').setView([52.52, 7, 32], 5);
L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: ' &copy; <a href="https://www.openstreetmap.org/">' +
		'OpenStreetMap</a> contributors',

}).addTo(map);


/**
 *
 * @param newLong
 * @param newLat
 */
function setMarker(newLong, newLat) {

	if (markerLoopVariable === 1) {
		map.removeLayer(marker);
		markerLoopVariable = 0;
	}
	map.panTo(new L.LatLng(newLong, newLat));
	//marker = L.marker([long, lat]).addTo(map);
	geocodeService.reverse().latlng([newLong, newLat]).run
	(function (error, result) {
		marker = L.marker(result.latlng).addTo(map)
			.bindPopup(result.address.Match_addr).openPopup();
	});

	markerLoopVariable = 1;
}
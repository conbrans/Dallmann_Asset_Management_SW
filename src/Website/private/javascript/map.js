let marker;
let markerLoopVariable = 0;
let geocodeService = L.esri.Geocoding.geocodeService();


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
const setMarker = (newLong, newLat) => {

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
};

const setMultipleMarkers = (longitudes, latitudes) => {

	markerLoopVariable = 1;

	for (let i = 0; i < latitudes.length; i++) {
		map.panTo(new L.LatLng(longitudes[i], latitudes[i]));
		geocodeService.reverse().latlng([longitudes[i], latitudes[i]]).run
		(function (error, result) {
			marker = L.marker(result.latlng).addTo(map)
				.bindPopup(result.address.Match_addr).openPopup();
		});
	}

};
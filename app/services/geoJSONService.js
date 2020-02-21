angular.module('reef')

.factory('geoJSONService', function() {

	var geojson = {
		"type": "FeatureCollection",
		"name": "ReefDataBySite",
		"features": []
	};

	var feature = { 
		"type": "Feature", 
		"properties": {},
		"geometry": { 
			"type": "Point", 
			"coordinates": [] 
		}
	};

    var scrollTo = function(eID) {

    }
});
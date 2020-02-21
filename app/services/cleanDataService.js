angular.module('reef')

.factory('cleanDataService', function() {

	var mergeCSVsAsJSON = function(download, asGeoJSON) {
		Promise.all([
		    d3.csv('data/BenthicIndexBySite.csv'),
		    d3.csv('data/CoralCoverBySite.csv'),
		    d3.csv('data/FishBiomassBySite.csv'),
		    d3.csv('data/CoralMortalityPrevalenceBySite-10cm.csv'),
		    d3.csv('data/CoralMortalityPrevalenceBySite-4cm.csv'),
		    d3.csv('data/CoralRecruitsBySite.csv')
		]).then(function(files) {
		    files.forEach(function(f) {
		    	f.forEach(function(d) {
		    		d.Code = d.Code ? d.Code : d.Latitude.toString() + ':' + d.Longitude.toString();
		    		d.id = d.Code + '_' + d.Batch;
		    	});
		    });
		    var mergedData = joinArrays(files, asGeoJSON);
		    console.log(mergedData);
		    if(download) {
			    var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(mergedData));
				var downloadAnchorNode = document.createElement('a');
				downloadAnchorNode.setAttribute('href', dataStr);
				downloadAnchorNode.setAttribute('download', 'ReefMasterBySite.json');
				document.body.appendChild(downloadAnchorNode); // required for firefox
				downloadAnchorNode.click();
				downloadAnchorNode.remove();
			}
		}).catch(function(err) {
		    console.log(err);
		});
	};

	function joinArrays(arrs, asGeoJSON) {
	  	var idMap = {};
	  	var stringKeys = ['id', 'Batch', 'Code', 'Site', 'Date', 'Zone', 'Subregion', 'Shelf', 'Ecoregion']
	  	var floatKeys = [ 'Latitude', 'Longitude', 'Depth', 'SLCavg', 'CCA', 'MA', 'AINV', 'POSsum', 'NEGsum', 'PARRavg', 'GROUavg', 'Tavg', 'Havg', 'Iavg', 'Pavg', 'BI', 'PercSmallAM', 'PercLargeAM', 'T_ALL'];
	  	var targetKeys = stringKeys.concat(floatKeys);

	  	console.log(targetKeys.length);
	  	// Iterate over arrs
	  	for(var i = 0; i < arrs.length; i++) { 
		    // Iterate over individual argument arrays (aka json1, json2)
			for(var j = 0; j < arrs[i].length; j++) {
		       	var currentID = arrs[i][j]['id'];
				if(!idMap[currentID]) {
				    idMap[currentID] = {};
				}
				// Iterate over properties of objects in arrays (aka id, name, etc.)
				for(key in arrs[i][j]) {
					if(stringKeys.indexOf(key) > -1) {
						idMap[currentID][key] = arrs[i][j][key].toString();
					} else if(floatKeys.indexOf(key) > -1) {
						idMap[currentID][key] = parseFloat(arrs[i][j][key]);
					}
				}
			}
	  	}

		var geojson = {
			"type": "FeatureCollection",
			"name": "GeoReefMasterBySite",
			"features": []
		};

		var newArray = asGeoJSON ? geojson : [];

	  	if(asGeoJSON) {
	  		for(property in idMap) {
				if(Object.keys(idMap[property]).length == targetKeys.length) {
					newArray.features.push({ 
						"type": "Feature", 
						"properties": idMap[property],
						"geometry": {
							"type": "Point",
							"coordinates": [idMap[property].Longitude, idMap[property].Latitude]
						}
					});
				}
			}
	  	} else {
			for(property in idMap) {
				console.log(Object.keys(idMap[property]).length);
				if(Object.keys(idMap[property]).length == targetKeys.length) {
					newArray.push(idMap[property]);
				}
			}
	  	}

		return newArray;
	}

	return {
		mergeCSVsAsJSON: mergeCSVsAsJSON
	}
});
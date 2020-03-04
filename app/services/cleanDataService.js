angular.module('reef')

.factory('cleanDataService', ['$interval', function($interval) {

	var mergeCSVsAsJSON = function(download, asGeoJSON) {
		Promise.all([
		    d3.csv('data/BenthicIndexBySite.csv'),
		    d3.csv('data/CoralCoverBySite.csv'),
		    d3.csv('data/FishBiomassBySite.csv'),
		    d3.csv('data/CoralMortalityPrevalenceBySite-10cm.csv'),
		    d3.csv('data/CoralMortalityPrevalenceBySite-4cm.csv'),
		    d3.csv('data/CoralRecruitsBySite.csv'),
		    d3.csv('data/ReliefBySite.csv')
		]).then(function(data) {
		    data.forEach(function(r) {
		    	r.forEach(function(d) {
		    		d.Code = d.Code ? d.Code : d.Latitude.toString() + ':' + d.Longitude.toString();
		    		d.id = d.Code + '_' + d.Batch;
		    	});
		    });
		    var mergedData = joinArrays(data, asGeoJSON);
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
	  	var floatKeys = [ 'Latitude', 'Longitude', 'Depth', 'SLCavg', 'CCA', 'MA', 'AINV', 'POSsum', 'NEGsum', 'PARRavg', 'GROUavg', 'Tavg', 'Havg', 'Iavg', 'Pavg', 'BI', 'PercSmallAM', 'PercLargeAM', 'T_ALL', 'Rmax'];
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
				if(Object.keys(idMap[property]).length == targetKeys.length) {
					var newArrayItem = idMap[property];
					Object.keys(newArrayItem).forEach(function(origProp) {
						var lowercaseProp = origProp.toLowerCase();
						if (lowercaseProp != undefined && lowercaseProp !== origProp) {
							newArrayItem[lowercaseProp] = newArrayItem[origProp];
							delete newArrayItem[origProp];
						}
					});
					newArray.push(newArrayItem);
				}
			}
	  	}

		return newArray;
	}

	var bulkFetchCommunityData = function() {
		var page = 1;
		var cumulativeData = [];
		var interval = $interval(function() {
			d3.json("https://api.inaturalist.org/v1/observations?project_id=66630&order=desc&order_by=created_at&page=" + page).then(function(data) {
				console.log(data);
				console.log(page);
				cumulativeData = cumulativeData.concat(data.results);
				if(page === 214) {
					var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cumulativeData));
					var downloadAnchorNode = document.createElement('a');
					downloadAnchorNode.setAttribute('href', dataStr);
					downloadAnchorNode.setAttribute('download', 'inat-reefgauge-observations.json');
					document.body.appendChild(downloadAnchorNode); // required for firefox
					downloadAnchorNode.click();
					downloadAnchorNode.remove();

					$interval.cancel(interval);
				}
				page++;
			});
		}, 1000);
	};

	return {
		mergeCSVsAsJSON: mergeCSVsAsJSON,
		bulkFetchCommunityData: bulkFetchCommunityData
	}
}]);
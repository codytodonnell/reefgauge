angular.module('reef')

.factory('visService', function() {
	var config = {
		science: {
			data: null,
			orderBy: 'SLCavg',
			colorBy: 'SLCavg',
			sizeBy: 'SLCavg'
		},
		community: {
			data: null,
		},
		dataMode: 'science',
		dataView: 'map',
		keys: [
			{
				key: "CCA",
				display_name: "Crustose Coralline Algae",
				scale: 'linear',
				beneficial: true,
				group: "benthos",
				image: "",
				description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			},
			{
				key: "MA",
				display_name: "Macroalgae",
				scale: 'linear',
				beneficial: false,
				group: "benthos",
				image: "",
				description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			},
			{
				key: "AINV",
				display_name: "Aggressive Invertebrates",
				scale: 'linear',
				beneficial: false,
				group: "benthos",
				image: "",
				description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			},
			{
				key: "SLCavg",
				display_name: "Live Coral Cover",
				scale: 'linear',
				domain: [0, 5, 10, 20, 40],
				beneficial: true,
				group: "coral",
				image: "",
				description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			},
			{
				key: "Havg",
				display_name: "Herviorous Fish Biomass",
				scale: 'linear',
				beneficial: true,
				group: "fish",
				image: "",
				description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			},
			{
				key: "Pavg",
				display_name: "Piscivorous Fish Biomass",
				scale: 'linear',
				beneficial: true,
				group: "fish",
				image: "",
				description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			}
		]
	};

	var keyMap = {
		"Batch": {
			scale: false
		},
		"Code": {
			scale: false
		},
		"Site": {
			scale: false
		},
		"Date": {
			scale: false
		},
		"Latitude": {
			scale: false
		},
		"Longitude": {
			scale: false
		},
		"Zone": {
			scale: 'ordinal',
		},
		"Subregion": {
			scale: 'ordinal'
		},
		"Shelf": {
			scale: 'ordinal'
		},
		"Ecoregion": {
			scale: 'ordinal'
		},
		"Depth": {
			scale: 'linear',
			beneficial: null
		},
		"CCA": {
			scale: 'linear',
			beneficial: true
		},
		"MA": {
			scale: 'linear',
			beneficial: false
		},
		"AINV": {
			scale: 'linear',
			beneficial: false
		},
		"POSsum": {
			scale: 'linear',
			beneficial: true
		},
		"NEGsum": {
			scale: 'linear',
			beneficial: false
		},
		"id": {
			scale: false
		},
		"SLCavg": {
			scale: 'linear',
			beneficial: true
		},
		"Tavg": {
			scale: 'linear',
			beneficial: true
		},
		"Havg": {
			scale: 'linear',
			beneficial: true
		},
		"Iavg": {
			scale: 'linear',
			beneficial: true
		},
		"Pavg": {
			scale: 'linear',
			beneficial: true
		},
		"GROUavg": {
			scale: 'linear',
			beneficial: true
		},
		"PARRavg": {
			scale: 'linear',
			beneficial: true
		},
		"BI": {
			scale: 'linear',
			beneficial: true
		},
		"PercSmallAM": {
			scale: 'linear',
			beneficial: false
		},
		"PercLargeAM": {
			scale: 'linear',
			beneficial: false
		},
		"T_ALL": {
			scale: 'linear',
			beneficial: true
		}
	};

	var getKeyMap = function() {
		return keyMap;
	};

	var getConfig = function() {
		return config;
	};

	var setConfig = function(config) {
		config = config;
	};

	var setScienceData = function(data) {
		config.science.data = data;
	};

	var setCommunityData = function(data) {
		config.community.data = data;
	};

	var setKeys = function(keys) {
		config.keys = keys;
	};

	var setScienceOrder = function(prop) {
		config.science.orderBy = prop;
	};

	var setScienceColor = function(prop) {
		config.science.colorBy = prop;
	};

	var setScienceSize = function(prop) {
		config.science.sizeBy = prop;
	};

	var setDataView = function(view) {
		config.dataView = view;
	}

	var getKeyObj = function(key) {
		var obj = config.keys.find(function(d) { return d.key == key; });
		return obj;
	};

	return {
		getKeyMap: getKeyMap,
		getConfig: getConfig,
		setConfig: setConfig,
		setScienceData: setScienceData,
		setCommunityData: setCommunityData,
		setKeys: setKeys,
		setScienceOrder: setScienceOrder,
		setScienceColor: setScienceColor,
		setScienceSize: setScienceSize,
		setDataView: setDataView,
		getKeyObj: getKeyObj
	}
});

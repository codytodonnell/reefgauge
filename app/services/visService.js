angular.module('reef')

.factory('visService', ['keyService', function(keyService) {
	var config = {
		science: {
			data: null,
			orderBy: 'slcavg',
			colorBy: 'slcavg',
			sizeBy: 'slcavg',
			drillOpen: false,
			drillDatum: null
		},
		community: {
			data: null,
			filters: keyService.setInitialFiltersGroup('Benthic Promoters')
		},
		dataMode: 'community',
		dataView: 'map',
		keys: keyService.scienceKeys
	};

	var getKeyMeta = function(key) {
		var meta = config.keys.find(function(d) { return d.key === key; });
		return meta;
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

	var setDataMode = function(mode) {
		config.dataMode = mode;
	};

	var setDataView = function(view) {
		config.dataView = view;
	};

	var setScienceDrillOpen = function(val) {
		config.science.drillOpen = val;
	};

	var setScienceDrillDatum = function(d) {
		config.science.drillDatum = d;
	};

	var setCommunityFilters = function(group) {
		config.community.filters = keyService.getFiltersByGroup(group.name);
	};

	return {
		getKeyMeta: getKeyMeta,
		getConfig: getConfig,
		setConfig: setConfig,
		setScienceData: setScienceData,
		setCommunityData: setCommunityData,
		setKeys: setKeys,
		setScienceOrder: setScienceOrder,
		setScienceColor: setScienceColor,
		setScienceSize: setScienceSize,
		setDataMode: setDataMode,
		setDataView: setDataView,
		setScienceDrillOpen: setScienceDrillOpen,
		setScienceDrillDatum: setScienceDrillDatum,
		setCommunityFilters: setCommunityFilters
	}
}]);

angular.module('reef')

.factory('visService', ['keyService', function(keyService) {
	var config = {
		science: {
			data: null,
			show: true,
			orderBy: 'slcavg',
			colorBy: 'slcavg',
			sizeBy: 'slcavg'
		},
		community: {
			data: null,
			show: true,
			filterGroup: 'Coral',
			filters: keyService.setInitialFiltersByGroup('Coral')
		},
		dataMode: 'Coral',
		dataView: 'map',
		keys: keyService.keys,
		drillOpen: false,
		drillItem: null,
		home_open: true,
		popup_page: 'home',
		compare_open: false
	};

	var divergentColorsAsc = ["#ca562c", "#edbb8a", "#f6edbd", "#b4c8a8", "#008080"];

	var divergentColorsDesc = ["#008080", "#b4c8a8", "#f6edbd", "#edbb8a", "#ca562c"];

	var divergentColorsAlt = ["#ca562c", "#edbb8a", "#b4c8a8", "#008080"];

	var categoricalColors = ['#712684', '#2B59C3', '#CE2780'];

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

	var setDrillOpen = function(val) {
		config.drillOpen = val;
	};

	var setDrillItem = function(d) {
		config.drillItem = d;
	};

	var setCommunityFilters = function(keyGroup) {
		config.community.filters = keyService.getFiltersByGroupName(keyGroup.group);
		config.community.filterGroup = keyGroup.group;
	};

	return {
		divergentColorsAsc: divergentColorsAsc,
		divergentColorsDesc: divergentColorsDesc,
		divergentColorsAlt: divergentColorsAlt,
		categoricalColors: categoricalColors,
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
		setDrillOpen: setDrillOpen,
		setDrillItem: setDrillItem,
		setCommunityFilters: setCommunityFilters
	}
}]);

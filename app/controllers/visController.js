angular.module('reef')

.controller('visController', ['$scope', 'visService', 'cleanDataService', 'keyService',
 function($scope, visService, cleanDataService, keyService) {
	var vm = this;

	// cleanDataService.mergeCSVsAsJSON(false, false);
	// cleanDataService.bulkFetchCommunityData();

	vm.config = visService.getConfig();
	
	vm.xvar = "Ecoregion";
	vm.yvar = "MA";

	vm.xvar2 = "CCA";
	vm.yvar2 = "MA";

	vm.topLevelKeys = getTopLevelKeys();

	vm.setScienceOrder = visService.setScienceOrder;
	vm.setScienceColor = visService.setScienceColor;
	vm.setScienceSize = visService.setScienceSize;
	vm.getKeyMeta = visService.getKeyMeta;
	vm.setDataMode = visService.setDataMode;
	vm.communityFilterGroups = keyService.communityFilterGroups;
	vm.getFilterDisplayName = keyService.getFilterDisplayName;
	vm.setCommunityFilters = visService.setCommunityFilters;

	vm.toggleScienceKeyTile = function(tile) {
		var isOpen = tile.open;
		vm.topLevelKeys.forEach(function(k) {
			k.open = false;
			k.selected = false;
		});

		if(!isOpen) {
			tile.open = true;
			tile.selected = true;
			setScienceSizeAndColor(tile.key);
		} else {
			tile.selected = true;
		}
	};

	vm.toggleCommunityFilterGroup = function(tile) {
		var isOpen = tile.open;
		vm.communityFilterGroups.forEach(function(k) {
			k.open = false;
			k.selected = false;
		});

		if(!isOpen) {
			tile.open = true;
			tile.selected = true;
			visService.setCommunityFilters(tile);
		} else {
			tile.selected = true;
		}
	};

	vm.checkAllFiltersInGroup = function(group) {
		group.filters.forEach(function(f) {
			f.checked = true;
		});
		visService.setCommunityFilters(group);
	};

	vm.uncheckAllFiltersInGroup = function(group) {
		group.filters.forEach(function(f) {
			f.checked = false;
		});
		visService.setCommunityFilters(group);
	};

	vm.hasAnyCheckedFilters = function(group) {
		var hasChecked = false;
		group.filters.forEach(function(f) {
			if(f.checked) return hasChecked = true;
		});
		return hasChecked;
	};

	vm.openHomePopup = function() {
		vm.config.home_open = true;
	};

	function setScienceSizeAndColor(key) {
		visService.setScienceSize(key);
		visService.setScienceColor(key);
	}

	function getTopLevelKeys() {
		return vm.config.keys.filter(function(d) { return d.top_level === true; })
	}
}]);


angular.module('reef')

.controller('visController', ['$scope', 'visService', 'cleanDataService', 'keyService', '$timeout', '$state', '$stateParams',
 function($scope, visService, cleanDataService, keyService, $timeout, $state, $stateParams) {
	var vm = this;

	// cleanDataService.mergeCSVsAsJSON(false, false);
	// cleanDataService.bulkFetchCommunityData();

	vm.config = visService.getConfig();

	vm.setScienceOrder = visService.setScienceOrder;
	vm.setScienceColor = visService.setScienceColor;
	vm.setScienceSize = visService.setScienceSize;
	vm.getScienceKeyByName = keyService.getScienceKeyByName;
	vm.communityFilterGroups = keyService.communityFilterGroups;
	vm.getFilterDisplayName = keyService.getFilterDisplayName;
	vm.setCommunityFilters = visService.setCommunityFilters;
	vm.scienceKeys = getScienceKeys();
	vm.communityKeyInfo = null;

	vm.toggleScienceData = function() {
		vm.config.science.show = !vm.config.science.show;
		$state.go('explore', {
			group: $stateParams.group, 
			science: vm.config.science.show, 
			community: vm.config.community.show
		}, {notify: false});
	};

	vm.toggleCommunityData = function() {
		vm.config.community.show = !vm.config.community.show;
	};

	vm.showKeyGroup = function(keyGroup) {
		document.getElementsByClassName('tab-content')[0].scrollTop = 0;
		vm.config.compare_open = false;
		vm.infoOverlayItem = null;
		vm.config.keys.forEach(function(g) {
			if(g.group === keyGroup.group) {
				g.selected = true;
			} else {
				g.selected = false;
			}
		});
		var selectedKey = keyGroup.scienceKeys.find(function(k) { return k.selected == true; });
		vm.selectScienceKey(keyGroup, selectedKey);
		visService.setCommunityFilters(keyGroup);
		$state.go('explore', {
			group: keyGroup.group, 
			science: vm.config.science.show, 
			community: vm.config.community.show
		}, {notify: false});
	};

	vm.showCompareTab = function() {
		document.getElementsByClassName('tab-content')[0].scrollTop = 0;
		vm.config.keys.forEach(function(g) {
			g.selected = false;
		});
		vm.infoOverlayItem = null;
		vm.config.compare_open = true;
		$state.go('explore', {
			group: 'Compare', 
			science: vm.config.science.show, 
			community: vm.config.community.show
		}, {notify: false});
	};

	vm.selectScienceKey = function(keyGroup, key) {
		// var isOpen = tile.open;
		keyGroup.scienceKeys.forEach(function(k) {
			k.selected = false;
		});
		key.selected = true;
		setScienceSizeAndColor(key.key);

		// if(!isOpen || forceOpen) {
		// 	tile.open = true;
		// 	tile.selected = true;
		// 	setScienceSizeAndColor(tile.key);
		// } else {
		// 	tile.selected = true;
		// }
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

	vm.goToCommunityGroup = function(groupName) {
		vm.setDataMode('community');
		var tile = vm.communityFilterGroups.find(function(g) { return g.name === groupName });
		vm.toggleCommunityFilterGroup(tile);
	};

	vm.goToScienceKey = function(groupName) {
		vm.setDataMode('science');
		var tile = vm.topLevelKeys.find(function(k) { return k.group === groupName });
		$timeout(function() {
			vm.toggleScienceKeyTile(tile);
		}, 250);
	};

	vm.checkAllFiltersInGroup = function(keyGroup) {
		keyGroup.communityKeys.forEach(function(k) {
			k.checked = true;
		});
		visService.setCommunityFilters(keyGroup);
	};

	vm.uncheckAllFiltersInGroup = function(keyGroup) {
		keyGroup.communityKeys.forEach(function(k) {
			k.checked = false;
		});
		visService.setCommunityFilters(keyGroup);
	};

	vm.hasAnyCheckedFilters = function(keyGroup) {
		var hasChecked = false;
		keyGroup.communityKeys.forEach(function(k) {
			if(k.checked) return hasChecked = true;
		});
		return hasChecked;
	};

	vm.openHomePopup = function() {
		vm.config.home_open = true;
		vm.config.popup_page = 'home';
	};

	vm.openContribute = function() {
		vm.config.home_open = true;
		vm.config.popup_page = 'contribute';
	};

	vm.openInfoOverlay = function(item) {
		vm.infoOverlayItem = item;
	};

	initConfig();

	function setScienceSizeAndColor(key) {
		visService.setScienceSize(key);
		visService.setScienceColor(key);
	}

	function getScienceKeys() {
		var keys = [];
		vm.config.keys.forEach(function(g) {
			keys = keys.concat(g.scienceKeys);
		});
		return keys;
	}

	function initConfig() {
		if($stateParams.hasOwnProperty('science')) {
			if($stateParams.science === 'false') {
				vm.config.science.show = false;
			} else {
				vm.config.science.show = true;
			}
		} else {
			vm.config.science.show = true;
		}

		if($stateParams.hasOwnProperty('community')) {
			if($stateParams.community === 'false') {
				vm.config.community.show = false;
			} else {
				vm.config.community.show = true;
			}
		} else {
			vm.config.community.show = true;
		}

		if($stateParams.hasOwnProperty('group') && ($stateParams.group === 'Coral' || $stateParams.group === 'Fish' || $stateParams.group === 'Benthos')) {
			var keyGroup = keyService.getKeyGroupByName($stateParams.group);
			vm.showKeyGroup(keyGroup);
		} else if($stateParams.hasOwnProperty('group') && $stateParams.group === 'Compare') {
			vm.showCompareTab();
		} else {
			var keyGroup = vm.config.keys.find(function(g) { return g.selected == true; });
			if(keyGroup) {
				vm.showKeyGroup(keyGroup);
			} else if(vm.config.compare_open) {
				vm.showCompareTab();
			} else {
				var fallback = keyService.getKeyGroupByName('coral');
				vm.showKeyGroup(fallback);
			}
		}
	}
}]);


angular.module('reef')

.controller('homeController', ['$scope', '$state', '$stateParams', 'keyService', 'visService',
 function($scope, $state, $stateParams, keyService, visService) {
	var vm = this;

	vm.keyGroupName = 'coral';
	vm.keyGroupNames = ['coral', 'fish', 'benthos'];
	vm.communityType = 'scientific and diving';
	vm.communityTypes = ['scientific', 'diving', 'scientific and diving'];

	initSelections();

	vm.selectKeyGroup = function(name) {
		vm.keyGroupName = name;
	};

	vm.selectCommunityType = function(type) {
		vm.communityType = type;
	};

	vm.exploreWithParams = function() {
		var groupName = keyService.capitalize(vm.keyGroupName);
		var scienceValue = true;
		var communityValue = true;

		if(vm.communityType === 'scientific') {
			communityValue = false;
		} else if(vm.communityType === 'diving') {
			scienceValue = false;
		}

		$state.go('explore', {group: groupName, science: scienceValue, community: communityValue});
	};

	function initSelections() {
		var keyGroup = keyService.getActiveKeyGroup();
		var config = visService.getConfig();

		vm.keyGroupName = keyGroup.group.toLowerCase();

		if(config.science.show && config.community.show) {
			vm.communityType = 'scientific and diving';
		} else if(config.science.show && !config.community.show) {
			vm.communityType = 'scientific';
		} else if(!config.science.show && config.community.show) {
			vm.communityType = 'diving';
		}
	}
}]);
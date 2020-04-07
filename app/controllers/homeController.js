angular.module('reef')

.controller('homeController', ['$scope', '$state', '$stateParams', 'keyService',
 function($scope, $state, $stateParams, keyService) {
	var vm = this;

	vm.keyGroupName = 'coral';
	vm.keyGroupNames = ['coral', 'fish', 'benthos'];
	vm.communityType = 'scientific and diving';
	vm.communityTypes = ['scientific', 'diving', 'scientific and diving'];

	vm.selectKeyGroup = function(name) {
		vm.keyGroupName = name;
	};

	vm.selectCommunityType = function(type) {
		vm.communityType = type;
	};

	vm.exploreWithParams = function() {
		var groupName = keyService.capitalize(vm.keyGroupName);
		$state.go('explore', {group: groupName});
	};
}]);
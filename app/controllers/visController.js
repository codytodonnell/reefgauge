angular.module('reef')

.controller('visController', ['$scope', 'visService', 'cleanDataService',
 function($scope, visService, cleanDataService) {
	var vm = this;

	// cleanDataService.mergeCSVsAsJSON(false, false);

	vm.config = visService.getConfig();
	
	vm.xvar = "Ecoregion";
	vm.yvar = "MA";

	vm.xvar2 = "CCA";
	vm.yvar2 = "MA";

	vm.setOrder = visService.setOrder;
	vm.setColor = visService.setColor;
	vm.setSize = visService.setSize;

	vm.getSizeKey = function() {
		var obj = vm.config.keys.find(function(d) { return d.key == vm.config.sizeBy; });
		return obj;
	};

	vm.getColorKey = function() {
		var obj = vm.config.keys.find(function(d) { return d.key == vm.config.colorBy; });
		return obj;
	};
}]);


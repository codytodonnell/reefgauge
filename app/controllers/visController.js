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

	vm.setScienceOrder = visService.setScienceOrder;
	vm.setScienceColor = visService.setScienceColor;
	vm.setScienceSize = visService.setScienceSize;

	vm.getPropertyObject = function(prop) {
		var obj = vm.config.keys.find(function(d) { return d.key == prop; });
		return obj;
	};

	vm.setDataMode = function(view) {
		vm.config.dataMode = view;
	};
}]);


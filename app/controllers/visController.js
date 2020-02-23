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
	vm.getKeyMeta = visService.getKeyMeta;
	vm.setDataMode = visService.setDataMode;
	vm.changeDrill = function() {
		visService.setScienceDrillOpen(vm.config.science.drillOpen + 1);
	}
}]);


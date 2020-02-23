angular.module('reef')

.directive('scienceDrilldown', ['visService', '$rootScope', function(visService, $rootScope) {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'app/templates/science-drilldown.html',
		link: function($scope) {
			$scope.open = visService.getConfig().science.drillOpen;
			$scope.datum = visService.getConfig().science.drillDatum;

			$rootScope.$on('pointClicked', function(event, data) {
				$scope.open = visService.getConfig().science.drillOpen;
				$scope.datum = visService.getConfig().science.drillDatum;
				$scope.$apply();
			});
		}
	}
}]);
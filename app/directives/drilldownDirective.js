angular.module('reef')

.directive('drilldown', ['visService', '$rootScope', function(visService, $rootScope) {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'app/templates/drilldown.html',
		link: function($scope) {
			$scope.open = visService.getConfig().drillOpen;
			$scope.item = visService.getConfig().drillItem;
			
			$scope.nestedKeys = d3.nest()
				.key(function(d) { return d.group; })
				.entries(visService.getConfig().keys);

			$rootScope.$on('nodeClicked', function(event, data) {
				$scope.open = visService.getConfig().drillOpen;
				$scope.item = visService.getConfig().drillItem;
				$scope.isCommunity = $scope.item ? $scope.item.hasOwnProperty('taxon_id') : null;
				$scope.$apply();
			});
		}
	}
}]);
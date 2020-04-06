angular.module('reef')

.directive('drilldown', ['$rootScope', 'visService', 'keyService', '$timeout', function($rootScope, visService, keyService, $timeout) {
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

			$scope.coralKey = keyService.getScienceKeyByName('slcavg');
			$scope.benthosKey = keyService.getScienceKeyByName('bi');
			$scope.herbKey = keyService.getScienceKeyByName('havg');
			$scope.piscKey = keyService.getScienceKeyByName('pavg');

			$scope.nonPrimaryIndicatorKeys = getNonPrimaryIndicatorKeys();

			var colorScalePositive = d3.scaleThreshold()
				.range(["#ca562c", "#edbb8a", "#f6edbd", "#b4c8a8", "#008080"]);

			$scope.getScaledColor = function(key, value) {
				colorScalePositive.domain(key.domain);
				return colorScalePositive(value);
			};

			$scope.close = function() {
				$scope.open = false;
				$timeout(function() {
					$scope.item = null;
					$scope.isCommunity = null;
				}, 500);
				visService.setDrillOpen(false);
				visService.setDrillItem(null);
				$rootScope.$broadcast('drillClosed');
			};

			$rootScope.$on('nodeClicked', function(event, data) {
				$scope.open = visService.getConfig().drillOpen;
				$scope.item = visService.getConfig().drillItem;
				$scope.isCommunity = $scope.item ? $scope.item.hasOwnProperty('taxon_id') : null;
				$scope.$apply();
			});

			function getNonPrimaryIndicatorKeys() {
				var keys = [];
				visService.getConfig().keys.forEach(function(g) {
					g.scienceKeys.forEach(function(k) {
						if(!k.primary_indicator) keys.push(k);
					});
				});
				return keys;
			}
		}
	}
}]);
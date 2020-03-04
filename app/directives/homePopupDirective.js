angular.module('reef')

.directive('homePopup', ['$state', function($state) {
	return {
		restrict: 'E',
		scope: {
			config: '='
		},
		templateUrl: 'app/templates/home-popup.html',
		link: function($scope) {
			$scope.goToMode = function(mode) {
				$scope.config.dataMode = mode;
				$scope.config.home_open = false;
			};

			$scope.close = function() {
				$scope.config.home_open = false;
			};
		}
	}
}]);
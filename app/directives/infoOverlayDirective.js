angular.module('reef')

.directive('infoOverlay', ['$state', function($state) {
	return {
		restrict: 'E',
		scope: {
			item: '='
		},
		templateUrl: 'app/templates/info-overlay.html',
		controller: ['$scope', function($scope) {
			$scope.showImageCredit = false;
			$scope.showTextCredit = false;

			$scope.toggleImageCredit = function() {
				$scope.showImageCredit = !$scope.showImageCredit;
			};

			$scope.toggleTextCredit = function() {
				$scope.showTextCredit = !$scope.showTextCredit;
			};

			$scope.close = function() {
				$scope.item = null;
			};
		}]
	}
}]);
angular.module('reef')

.directive('pageFooter', ['$state', function($state) {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'app/templates/footer.html',
		link: function($scope) {
			$scope.state = $state;
			console.log($state);
		}
	}
}]);
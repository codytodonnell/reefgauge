angular.module('reef')

.directive('navBar', ['$state', function($state) {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'app/templates/navbar.html',
		link: function($scope) {
			$scope.state = $state;
			console.log($state);
		}
	}
}]);
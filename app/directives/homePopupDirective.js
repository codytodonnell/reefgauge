angular.module('reef')

.directive('homePopup', ['$state', function($state) {
	return {
		restrict: 'E',
		scope: {
			config: '='
		},
		templateUrl: 'app/templates/home-popup.html',
		link: function($scope) {
			$scope.pages = ['home', 'contribute', 'glossary'];

			$scope.goToMode = function(mode) {
				$scope.config.dataMode = mode;
				$scope.config.home_open = false;
			};

			$scope.goToPopupPage = function(page) {
				$scope.config.popup_page = page;
			};

			$scope.close = function() {
				$scope.config.home_open = false;
			};

			$scope.capitalize = function(s) {
				if (typeof s !== 'string') return '';
				return s.charAt(0).toUpperCase() + s.slice(1);
			}
		}
	}
}]);
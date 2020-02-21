angular.module('reef')

.directive('scrollDetect', ['$window', '$timeout', 'anchorSmoothScrollService', function($window, $timeout, anchorSmoothScrollService) {
	return {
		restrict: 'A',
		scope: {
			anchorId: '='
		},
		link: function($scope, element, attrs) {
			$scope.scrollTop = $window.scrollY;
			
			$timeout(function() {
				$scope.anchorScrollTop = anchorSmoothScrollService.elmYPosition($scope.anchorId);
				$scope.anchorScrollBottom = document.getElementById($scope.anchorId).getBoundingClientRect().height + $scope.anchorScrollTop;
				$scope.$apply();
			}, 500);
			
			angular.element($window).bind('scroll', function(e) {
			    $scope.$apply(function() {
			        $scope.scrollTop = $window.scrollY;
			        if($scope.scrollTop > $scope.anchorScrollTop && $scope.scrollTop < $scope.anchorScrollBottom) {
			        	console.log("scrolled");
			        }
			    });
			});
		}
	}
}]);
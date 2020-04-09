angular.module('reef')

.controller('glossaryController', ['$scope', '$state', '$stateParams', 'keyService', 'visService',
 function($scope, $state, $stateParams, keyService, visService) {
	var vm = this;

	vm.terms = [
		{
			name: '',
			id: '',
			descriptions: ''
		},
		{
			name: '',
			id: '',
			descriptions: ''
		},
		{
			name: '',
			id: '',
			descriptions: ''
		},
		{
			name: '',
			id: '',
			descriptions: ''
		},
		{
			name: '',
			id: '',
			descriptions: ''
		},
		{
			name: '',
			id: '',
			descriptions: ''
		},
		{
			name: '',
			id: '',
			descriptions: ''
		},
		{
			name: '',
			id: '',
			descriptions: ''
		},
		{
			name: '',
			id: '',
			descriptions: ''
		},
	]
}]);
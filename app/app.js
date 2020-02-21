var app = angular.module('reef', ['ui.router', 'ui.bootstrap', 'ngSanitize']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('map', {
            url: '/',
            templateUrl: 'app/templates/vis.html',
            controller: 'visController',
            controllerAs: 'vc'
        })
        .state('demo', {
            url: '/demo',
            templateUrl: 'app/templates/demo.html',
            controller: 'visController',
            controllerAs: 'vc'
        });
});
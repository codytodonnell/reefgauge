var app = angular.module('reef', ['ui.router', 'ui.bootstrap', 'ngSanitize']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/templates/home.html'
        })
        .state('explore', {
            url: '/explore?group',
            params: { 
            	group: { 
            		dynamic: true 
            	} 
            },
            templateUrl: 'app/templates/vis.html',
            controller: 'visController',
            controllerAs: 'vc'
        })
        .state('contribute', {
            url: '/contribute',
            templateUrl: 'app/templates/contribute.html'
        })
        .state('glossary', {
            url: '/glossary',
            templateUrl: 'app/templates/glossary.html'
        })
        .state('demo', {
            url: '/demo',
            templateUrl: 'app/templates/demo.html',
            controller: 'visController',
            controllerAs: 'vc'
        });
});
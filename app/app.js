var app = angular.module('reef', ['ui.router', 'ui.bootstrap', 'ngSanitize']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/templates/home.html',
            controller: 'homeController',
            controllerAs: 'hc'
        })
        .state('explore', {
            url: '/explore?group?science?community',
            params: { 
            	group: { 
            		dynamic: true 
            	},
            	science: { 
            		dynamic: true 
            	},
            	community: { 
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
        .state('about', {
            url: '/about',
            templateUrl: 'app/templates/about.html'
        });
});
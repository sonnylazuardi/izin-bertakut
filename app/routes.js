angular.module('BertakutApp.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    var wait = {
        "currentAuth": ["Auth", function(Auth) {
            return Auth.$waitForAuth();
        }]
    };
    var require = {
        "currentAuth": ["Auth", function(Auth) {
            return Auth.$requireAuth();
        }]
    };

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl',
            resolve: wait
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'partials/dashboard.html',
            controller: 'DashboardCtrl',
            resolve: require
        })
        .state('dashboardsearch', {
            url: '/dashboard/:search',
            templateUrl: 'partials/dashboard.html',
            controller: 'DashboardCtrl',
            resolve: require
        })
        .state('about', {
            url: '/about',
            templateUrl: 'partials/about.html',
            controller: 'AboutCtrl'
        })
        .state('honor', {
            url: '/honor',
            templateUrl: 'partials/honor.html',
            controller: 'HonorCtrl'
        })
        .state('takut', {
            url: '/takut/:id/:name',
            templateUrl: 'partials/takut.html',
            controller: 'TakutCtrl'
        })
        .state('share', {
            url: '/share/:id',
            templateUrl: 'partials/share.html',
            controller: 'ShareCtrl'
        });

});

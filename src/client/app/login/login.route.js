(function() {
    'use strict';

    angular.module('app.login').config(function($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/state1");
        //
        // Now set up the states
        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: "app/login/login.html"
            })
    });
})();

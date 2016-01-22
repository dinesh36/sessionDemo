(function() {
    'use strict';

    angular.module('app.login').config(function($stateProvider, $urlRouterProvider) {
        console.log('inside');
        //set the routes for the login
        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: "app/login/login.html",
                controller:'Login',
                controllerAs:'lg'
            })
            .state('signup', {
                url: "/signup",
                templateUrl: "app/login/signup.html",
                controller:'Signup',
                controllerAs:'su'
            })
                

        //For any unmatched urls, redirect to /login
        $urlRouterProvider.otherwise("/login");
    });
})();

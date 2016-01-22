(function() {
    'use strict';

    angular.module('app.books').config(function($stateProvider, $urlRouterProvider) {
        //set the routes for the book module
        $stateProvider
            .state('books', {
                url: "/books",
                templateUrl: "app/books/books.html",
                controller:'Books',
                controllerAs:'bk',
                // resolve: Here try to relove the local session and server session
            })
    });
})();

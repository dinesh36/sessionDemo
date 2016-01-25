(function() {
    'use strict';

    angular.module('app.books').config(function($stateProvider, $urlRouterProvider) {
        //set the routes for the book module
        //resolve: Here try to relove the local session and server session
        // auth = functipon
        $stateProvider
            //books home
            .state('booksHome',{
                url: "/booksHome",
                templateUrl: "app/books/booksHome.html",
                resolve:{
                    /* @ngInject */
                    auth:function(dataservice){
                        return dataservice.session();
                    }
                }
            })
            //list of books
            .state('books', {
                url: "/books",
                templateUrl: "app/books/books.html",
                controller:'BookList',
                controllerAs:'bk',
                 resolve:{
                    /* @ngInject */
                    auth:function(dataservice){
                        return dataservice.session();
                    },
                    /* @ngInject */
                    books:function(dataservice){
                        return dataservice.getBooks();
                    }
                }                
            })
            //book information
            .state('bookDetail', {
                url: "/books/:bookId",
                templateUrl: "app/books/bookInfo.html",
                controller:'BookCtrl',
                controllerAs:'bookCtrl',
                resolve:{
                    /* @ngInject */
                    book:function(dataservice,$stateParams){
                        return dataservice.getBook($stateParams.bookId);
                    },
                    /* @ngInject */
                    auth:function(dataservice){
                        return dataservice.session();
                    }
                }
            })
            //add new book view
            .state('addBook', {
                url: "/addBook",
                templateUrl: "app/books/bookInfo.html",
                controller:'BookCtrl',
                controllerAs:'bookCtrl',
                resolve:{
                    book:function(){},
                     /* @ngInject */
                    auth:function(dataservice){
                        return dataservice.session();
                    }
                }
            })
    });
})();

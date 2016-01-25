(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice($http, $location, $q, exception, logger) {
        var apiLink = '/api/';
        var isPrimed = false;
        var primePromise;

        var service = {
            login:login,
            signup:signup,
            signout:signout,
            session:session,
            getBooks:getBooks,
            getBook:getBook,
            createBook:createBook,
            deleteBook:deleteBook,
            updateBook:updateBook,
            getAvengersCast: getAvengersCast,
            getAvengerCount: getAvengerCount,
            getAvengers: getAvengers,
            ready: ready
        };

        return service;

        

        function createBook(book) {
            return $http.post(apiLink + 'books',book);   
        }

        function getBooks() {
            return $http.get(apiLink + 'books');
        }


        function getBook(bookId){
            return $http.get(apiLink + 'books/'+bookId);
        }

        function deleteBook(bookId) {
            return $http.delete(apiLink + 'books/'+bookId);
        }

        function updateBook(book) {
            return $http.put(apiLink + 'books/'+book._id,book);
        }

        function login(user) {
            return $http.post(apiLink + 'auth/signin', user);
        }

        function signup(user) {
            return $http.post(apiLink + 'auth/signup', user);
        }

        function signout() {
            return $http.get(apiLink + 'auth/signout');
        }

        function session() {
            return $http.get(apiLink + 'auth/session');   
        }

        function getAvengers() {
            //??? Does cors not applied for the ports ?
            // return $http.get('http://192.168.0.106:7208/api/maa')
            return $http.get('/api/maa')
                .then(getAvengersComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getAvengers')(message);
                    $location.url('/');
                });

            function getAvengersComplete(data, status, headers, config) {
                return data.data[0].data.results;
            }
        }

        function getAvengerCount() {
            debugger;
            var count = 0;
            return getAvengersCast()
                .then(getAvengersCastComplete)
                .catch(exception.catcher('XHR Failed for getAvengerCount'));

            function getAvengersCastComplete (data) {
                count = data.length;
                return $q.when(count);
            }
        }

        function getAvengersCast() {
            var cast = [
                {name: 'Robert Downey Jr.', character: 'Tony Stark / Iron Man'},
                {name: 'Chris Hemsworth', character: 'Thor'},
                {name: 'Chris Evans', character: 'Steve Rogers / Captain America'},
                {name: 'Mark Ruffalo', character: 'Bruce Banner / The Hulk'},
                {name: 'Scarlett Johansson', character: 'Natasha Romanoff / Black Widow'},
                {name: 'Jeremy Renner', character: 'Clint Barton / Hawkeye'},
                {name: 'Gwyneth Paltrow', character: 'Pepper Potts'},
                {name: 'Samuel L. Jackson', character: 'Nick Fury'},
                {name: 'Paul Bettany', character: 'Jarvis'},
                {name: 'Tom Hiddleston', character: 'Loki'},
                {name: 'Clark Gregg', character: 'Agent Phil Coulson'}
            ];
            return $q.when(cast);
        }

        //??? Not getting this thing
        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                console.warn('sucess is called');
                isPrimed = true;
                logger.info('Primed data');
            }
        }

        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(exception.catcher('"ready" function failed'));
        }

    }
})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .config(setConfig)
        .factory('myIntercepter', myIntercepter);

    setConfig.$inject = ['$httpProvider'];
    function setConfig($httpProvider){
        $httpProvider.interceptors.push('myIntercepter');
    }

    myIntercepter.$inject = ['logger','$q','$injector'];
    function myIntercepter (logger,$q,$injector) {
        var myIntercepter = {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },
            responseError: function(config) {
                console.log(config.config.url);
                if(config.config.url.indexOf('api')>-1){
                    if(config.status==401){
                        var $state = $injector.get('$state');
                        $state.go('login');
                    }
                }
                return config;
            }
        };
        return myIntercepter;
    }
})();

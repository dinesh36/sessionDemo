(function() {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ngSanitize','ui.router','ngCookies',
        /*
         * Our reusable cross app code modules
         */
        'blocks.exception', 'blocks.logger',
        /*
         * 3rd Party modules
         */
        'ngplus'
    ]);
})();

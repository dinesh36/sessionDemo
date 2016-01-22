(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('Signup', Signup);
    Signup.$inject = ['logger','dataservice','$state'];

    function Signup(logger,dataservice,$state) {
        var su = this;
        su.signup = function(){
            logger.log('Signning up here ... ');
            dataservice.signup(su.user)
            .success(function(){
                logger.info('this is inside the signup success');
                $state.go('books');
            })
            .catch(function(){
                logger.error('this is inside the signup error');  
            })
        }
    }
})();

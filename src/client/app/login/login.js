(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('Login', Login);

    Login.$inject = ['logger','dataservice','$state'];

    function Login(logger,dataservice,$state) {
        console.log('this is the login Controller');
        var lg = this;
        lg.login = function(){
            logger.info('loggin in ... ');
            dataservice.login(lg.user).success(function () {
                logger.info('logged in');
                $state.go('booksHome');
            }).catch(function(err){
                logger.error(err.data.message);
            })
        }
    }
})();

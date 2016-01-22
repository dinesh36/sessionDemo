(function() {
    'use strict';

    var core = angular.module('app.core');

    core.run(checkAuth);

    /* @ngInject */
    function checkAuth(logger,$state) {
        logger.info('getting the auth');
        debugger;
        //check the local auth
        if($cookies.get('TRESATASESSIONID')){
            $state.go('login');
        } else {    //check the server auth
            dataservice.session()
            .success(function(){
                $state.go('books');
            })
            .error(function(){
                $state.go('login');  
            })
        }
        
    }
})();

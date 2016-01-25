(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('BookList', BookList);
    BookList.$inject = ['logger','dataservice','$state','books'];

    function BookList(logger,dataservice,$state,books) {
    	var bk = this;
        bk.signout= signout; 
        bk.books = books.data;
        
        /**
         * @method signOut
         * @description function to sign out
         */
        function signout(){
            dataservice.signout()
            .success(function(){
                logger.info('gettting the success logout');
                $state.go('login');
            })
            .error(function(){
                logger.error('gettting the error in logout');
            })
        }
    }

})();

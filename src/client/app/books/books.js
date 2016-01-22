(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('Books', Books);
    Books.$inject = ['logger','dataservice','$state'];

    function Books(logger,dataservice,$state) {
    	var bk = this;
        bk.signout= signout; 
        bk.getBooks  = getBooks;
        bk.getBooks();

        logger.info('this is inside the books page')
        
        function getBooks(){
            dataservice.getBooks()
            .success(function(){
                logger.info('gettting the success in finding the books');
            })
            .catch(function(){
                logger.error('gettting the error in finding the books');
            })
        }

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

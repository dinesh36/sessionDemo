(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('BookCtrl', BookCtrl);
    BookCtrl.$inject = ['logger','dataservice','$state','book'];

    function BookCtrl(logger,dataservice,$state,book) {
    	var bookCtrl = this;       
        bookCtrl.update = update;
        bookCtrl.save = save;
        bookCtrl.remove = remove;
        bookCtrl.isUpdate = true;

        if(!book){
            bookCtrl.isUpdate = false; //if book is there then set it to the update mode
        } else {
            bookCtrl.book = book.data;    
        }

        function update(){
            dataservice.updateBook(bookCtrl.book)
            .success(function(){
                logger.info('got success in update book');
            })
            .error(function(){
                logger.error('got error in update book');
            })
        }

        function save(){
            dataservice.createBook(bookCtrl.book)
            .success(function(){
                logger.info('got success in save book');
                $state.go('books');
            })
            .error(function(){
                logger.error('got error in save book');
            })
        }

        function remove(){
            dataservice.deleteBook(bookCtrl.book._id)
            .success(function(){
                logger.info('got success in remove book');
                $state.go('books');
            })
            .error(function(){
                logger.error('got error in remove book');
            })
        }
    }

})();

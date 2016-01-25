'use strict';


module.exports = function (app) {
var books = require('./controller');

app.route('/api/books')
	.get(books.getBooks) //find all books 
	.post(books.addBook); //add new book


app.route('/api/books/:bookId')
	.get(books.getBook) //find book by id
	.put(books.updateBook) //update book
	.delete(books.deleteBook); //delete book

//Populate the book with the bookId
app.param('bookId', books.bookById);
}
'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Book = mongoose.model('Book');

/**
 * Get Books
 */
exports.getBooks = function (req, res,next) {
    Book.find().exec(function (err, books) {
        if (err) {
            return res.status(400).send(err);
        } else {
            res.json(books);
        }
    });
};


/**
 * Add Book
 */
exports.addBook = function (req, res,next) {
    var book = new Book(req.body);
    book.save(function (err) {
        if (err) {
            return res.status(400).send(err);
        } else {
            res.json(book);
        }
    }); 
};

/**
 * get Book
 */
exports.getBook = function(req,res,next){
    res.json(req.book);
}

/**
 * Delete Book
 */
exports.deleteBook = function (req, res,next) {
  var book = req.book;
  book.remove(function (err) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.json(book);
    }
  });  
};

/**
 * Update Book
 */
exports.updateBook = function(req,res,next){
  var book = req.book;
  book.title = req.body.title;
  book.auther = req.body.auther;
  book.description = req.body.description;
  book.save(function (err) {
      if (err) {
        return res.status(400).send(err);
      } else {
        res.json(book);
      }
  }); 
};

/** 
 * get the book from id
 */
exports.bookById = function(req,res,next,id){

    //check if the mongoose id is valid id 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
          message: 'Article is invalid'
        });
    }

    Book.findById(id).exec(function (err, book) {
        if (err) {
            return next(err);
        } else if (!book) {
            return res.status(404).send({
                message: 'No Book with that id has been found'
            });
        }
        //set the book inside the req object so we can use it further in the route
        req.book = book;
        next();
    }); 
}
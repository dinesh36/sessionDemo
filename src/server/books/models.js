'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  validator = require('validator');

/**
 * User Schema
 */
var BookSchema = new Schema({
  title: {
    type: String,
    trim: true,
    unique: true,
    required: 'Title is required'
  },
  auther: {
    type: String,
    trim: true,
    default: '',
    required: 'Auther is required'
  },
  description: {
    type: String,
    trim: true,
    default: '',
    required: 'description is required',
  }
});

mongoose.model('Book', BookSchema);
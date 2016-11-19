const mongoose = require('mongoose'); 
// NOTE: why not import mongoose from 'mongoose'????

/*
NOTE:
    Telling Mongoose to connect to Mongo.
    Must tell Mongoose exactly where to look.
    mongodb: look for a database.
    specify the port: in our case running locally
    if we have multiple dbs we must tell
    Mongoose specifically which db to look at.
*/
mongoose.connect('mongodb://localhost/users_test');
mongoose.connection
  /*
  NOTE:
      2 event handlers: .once() & .on()
      .once(): watch for mongoose to emit event called 'open'
      when it does run the function.
      .on(): watch for mongoose to emit event called 'error'
      when it does run the funciton.

      'open' & 'error' are specific to Mongoose.
  */
  .once('open', () => console.log('Good to go!'))
  .on('error', (error) => {
    console.warn('Warning', error);
  });

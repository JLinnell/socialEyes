const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const meetingPointRoutes = require('./meetingPoint/meetingPoint.routes.js')
const usersRoutes = require('./users/users.routes.js')

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json({urlencoded: true}));
app.use('/', express.static('public'));

mongoose.connect('mongodb://JLinnelldb:JLinnelldb1@ds141641.mlab.com:41641/hobbeet');
mongoose.Promise = global.Promise;
//3.- Get the connection
let db = mongoose.connection;
//4.- If it's an error I will console log 'Connection error' if not 'connected to a database'
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () { console.log('Connected to a database') });

app.use('/meetingPoint', meetingPointRoutes);
app.use('/users', usersRoutes);

/*app.listen(1212, function() {
    console.log("Magic is happening in port 1212")
})*/

// this function starts our server and returns a Promise.
// In our test code, we need a way of asynchrnously starting
// our server, since we'll be dealing with promises there.
function runServer() {
    const port = process.env.PORT || 1212;
    return new Promise((resolve, reject) => {
      app.listen(port, () => {
        console.log(`Magic is happening in port ${port}`);
        resolve();
      })
      .on('error', err => {
        reject(err);
      });
    });
  }
  
  // both runServer and closeServer need to access the same
  // server object, so we declare `server` here, and then when
  // runServer runs, it assigns a value.
  let server;
  
  function runServer() {
    const port = process.env.PORT || 1212;
    return new Promise((resolve, reject) => {
      server = app.listen(port, () => {
        console.log(`Magic is happening in port ${port}`);
        resolve(server);
      }).on('error', err => {
        reject(err)
      });
    });
  }
  
  // like `runServer`, this function also needs to return a promise.
  // `server.close` does not return a promise on its own, so we manually
  // create one.
  function closeServer() {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          reject(err);
          // so we don't also call `resolve()`
          return;
        }
        resolve();
      });
    });
  }
  
  // if server.js is called directly (aka, with `node server.js`), this block
  // runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
  if (require.main === module) {
    runServer().catch(err => console.error(err));
  };
  
  module.exports = {app, runServer, closeServer};


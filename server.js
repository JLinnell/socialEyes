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

app.listen(1212, function() {
    console.log("Magis is happening in port 1212")
})


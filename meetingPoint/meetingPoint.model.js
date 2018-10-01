const mongoose = require('mongoose');


const meetingPointSchema = new mongoose.Schema({
     category: String,
     description: String,
     title: String,
     userId: String,
});


module.exports = mongoose.model('meetingPoint', meetingPointSchema);
const mongoose = require('mongoose');

//create a schema that will hold the mold of the model
const meetingPointSchema = new mongoose.Schema({
     category: String,
     description: String,
     title: String,
     userId: String,
});

//create the model and export it
module.exports = mongoose.model('meetingPoint', meetingPointSchema);
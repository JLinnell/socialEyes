const mongoose = require('mongoose');

//create a schema that will hold the mold of the model
const userSchema = new mongoose.Schema({
     name: String,
     email: String,
     password: String
})

//create the model and export it
module.exports = mongoose.model('users', userSchema);
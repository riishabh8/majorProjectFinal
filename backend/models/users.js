const mongoose = require('mongoose');

const {Schema} = mongoose;


const users = new Schema({

    id : String,
    username : String,
    firstname : String,
    lastname : String,
    gmail : String
})


module.exports = mongoose.model('users',users);
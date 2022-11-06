const mongoose = require('mongoose');

const {Schema} = mongoose;


const userCredentials = new Schema({

    username : String,
    password : String
})


module.exports = mongoose.model('user-credentials',userCredentials);
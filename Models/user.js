const mongoose = require('mongoose');
const user = mongoose.Schema({
    username:{type:String,required:false},
    password:{type:String,required:false},
    })
module.exports = mongoose.model('user',user,'user');

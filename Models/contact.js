const mongoose = require('mongoose');
const contact = mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    message:String,
    
})
module.exports = mongoose.model('contact',contact,'contact');
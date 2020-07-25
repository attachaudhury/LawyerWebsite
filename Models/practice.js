const mongoose = require('mongoose');
const practice = mongoose.Schema({
   
    name:{type:String,required:false},
    email:{type:String,required:false},
    message:{type:String,required:false},
    phone:{type:String,required:false},

})
module.exports = mongoose.model('practice',practice,'practice');

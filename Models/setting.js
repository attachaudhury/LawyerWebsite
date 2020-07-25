const mongoose = require('mongoose');
const setting = mongoose.Schema({
    key:String,
    value:Object 
})
module.exports = mongoose.model('setting',setting,'setting');

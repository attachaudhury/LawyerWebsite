const mongoose = require('mongoose');
const blog = mongoose.Schema({
    author:String,
    createddate:{type:Date,default:Date.now()},
    description:String,
    image:String,
    title:String,
})
module.exports = mongoose.model('blog',blog,'blog');
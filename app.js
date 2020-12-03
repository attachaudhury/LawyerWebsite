// #region variables 
var express = require('express');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var engine = require('ejs-locals')
var mongoose = require("mongoose")
var user = require('./Models/user')
var contact = require('./Models/contact')
var homeRouter = require('./routes/homerouter');
var adminRouter = require('./routes/adminrouter');



var app = express();
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/law', {
  useNewUrlParser: true,useUnifiedTopology: true
});
app.use(bodyParser.json({
  limit: '100mb'
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({
  limit: '100mb',
  extended: true
}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, PATCH, OPTIONS,DELETE");
  next()
});
app.use(express.static("public"));


dbsetting();
async function dbsetting() {
  await user.remove({});
  await contact.remove({});
  
  var adminuser  = await user.findOne({username: 'admin',role: 'admin'});
  if(!adminuser){
    await user.create({
      username: "admin",
      password: "admin@123",
    })
  }
}

app.use('/admin', adminRouter);
app.use('/home', homeRouter);

app.get('/', async (req, res, next) => {
  res.redirect('/home/index')
});


// app.use(function(req, res, next){
//   res.redirect('/home/notfound');
// })
// app.use((error, req, res, next) => {
//   res.redirect("/home/notfound")
// })

module.exports = app;
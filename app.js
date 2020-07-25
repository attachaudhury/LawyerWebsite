// #region variables 
var fs = require('fs');
var staticdatafile =fs.readFileSync('./staticdata.json');
var staticdata = JSON.parse(staticdatafile)
var express = require('express');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var engine = require('ejs-locals')
var mongoose = require("mongoose")
var user = require('./Models/user')
var setting = require('./Models/setting')
var practice = require('./Models/practice')
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

// city.create({cityname:"Gwadar"}).then(()=>{
  
// })


//dbsetting();
async function dbsetting() {
  await user.remove({});
  await city.remove({});
  await location.remove({});
  await listing.remove({});
  await setting.remove({});
  await project.remove({});
  await map.remove({});
  await gallery.remove({});
  await news.remove({});



  var adminuser  = await user.findOne({username: 'admin',role: 'admin'});
  if(!adminuser){
    await user.create({
      activestatus: 'active',
      createdDate: Date.now(),
      designation: 'web admin',
      description:"I am web admin",
      email: "admin@admin.com",
      emailsecondary: "admin2@admin.com",
      fullname: 'web admin',
      facebook: 'facebook',
      lastlogindate: Date.now(),
      linkedin: "linkedin",
      phone: '03024759550',
      phonesecondary: 'phonesecondary',
      password: "admin@123",
      profileimage: "/uploads/defaultprofileimage.png",
      role: 'admin',
      skype: 'skype',
      twitter: 'twitter',
      username: 'admin',
      website: 'www.agencywebsite.com',
      whatsapp: '123456',
      youtube: 'youtube',
    })
  }

  await setting.create({key:'companyname',value:"Real Estate Agency"});
  await setting.create({key:'companyphone',value:"12345678"});
  await setting.create({key:'companyimage',value:"/uploads/defaultcompanyimage.png"});

  await city.create({cityname:"Lahore"});
  await city.create({cityname:"Islamabad"});
  await city.create({cityname:"Karachi"});
  await city.create({cityname:"Peshawar"});
  await city.create({cityname:"Multan"});
  await city.create({cityname:"Gujranwala"});
  await city.create({cityname:"Bahawalpur"});
  await city.create({cityname:"Gwadar"});

}

app.use('/admin', adminRouter);
app.use('/home', homeRouter);

app.get('/', async (req, res, next) => {
  res.redirect('/home/index')
  // var listings = await listing.find({}).limit(6).populate('userid');
  // var tmplistint = listings.map((el)=>{
  //   var tmpelement = JSON.stringify(el);
  //   var tmpel = JSON.parse(tmpelement)
  //   if(tmpel.images.length==0){
  //     tmpel.images = ['/home/images/property/property-14.jpg']
  //   }
  //   var price = tmpel.price.toLocaleString();
  //   tmpel.price = price;
  //   tmpel.title = (tmpel.title.length>20)?tmpel.title.substring(0,25) + "...":tmpel.title;
  //   tmpel.address = (tmpel.address.length>20)?tmpel.address.substring(0,25) + "...":tmpel.address;
  //   tmpel.size = '';
  //   if(tmpel.sizeUnit=="Sqft"){
  //     tmpel.size = tmpel.sizeSqft +" Sqft";
  //   }
  //   else if(tmpel.sizeUnit=="Marla"){
  //     tmpel.size = tmpel.sizeMarla +" Marla";
  //   }
  //   else if(tmpel.sizeUnit=="Kanal"){
  //     tmpel.size = tmpel.sizeKanal +" Kanal";
  //   }
  //   else if(tmpel.sizeUnit=="Acre"){
  //     tmpel.size = tmpel.sizeAcre +" Acre";
  //   }
  //   return tmpel;
  // })

  // var projects = await project.find({});

  // var cities = await city.find({}).sort({cityname:1});
  // var locations = (await location.find({}).populate('parentId')).map(el=>{
  //   if(el.parentId){
  //     el.name = el.parentId.name +" - "+el.name
  //   }
  //   return el;
  // });
  // var mappedCitiesNamesToId = {};
  // cities.map(el=>{
  //   mappedCitiesNamesToId[el.cityname]  = el._id
  // })
  // res.render('home/index', 
  // {
  //   staticdata:staticdata,
  //   listings:tmplistint,
  //   projects:projects,
  //   cities:cities,
  //   locations:locations,
  //   mappedCitiesNamesToId:mappedCitiesNamesToId

  // });
});
app.get('/api/locationGetByCityId', async (req, res, next) => {
  var model = (await location.find({city:req.query.cityId}).populate('parentId')).map(el=>{
    if(el.parentId){
      el.name = el.parentId.name+" - " + el.name
    }
     return el
  });
  res.json({ status: 'success', model: model })
});

// app.use(function(req, res, next){
//   res.redirect('/home/notfound');
// })
// app.use((error, req, res, next) => {
//   res.redirect("/home/notfound")
// })

module.exports = app;
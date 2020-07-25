var express = require('express');
var user = require('../Models/user');
var router = express.Router();
var user = require('../Models/user');
var setting = require('../Models/setting');
var contact = require('../Models/contact');
var practice = require('../Models/practice');
var Emailer = require('../utilities/Emailer');
var auth = require('../middlewares/auth');
var blog = require('../Models/blog');


var fs = require('fs');
var staticdatafile = fs.readFileSync('./staticdata.json');
var staticdata = JSON.parse(staticdatafile)


router.get("/", async (req, res, next) => {
  res.redirect('/home/index')
})
router.get("/notfound", async (req, res, next) => {
  res.render('./home/notfound')
})
router.all("/login", async (req, res, next) => {
  //req.body.username = "admin"
  //req.body.password = "admin@123"
  
  if (req.query.username != undefined) {
    var result = await user.findOne({ username: req.query.username, password: req.query.password });
    if (result) {
      res.cookie('AuthToken', result._id);
      return res.redirect('/admin/index');
    }
    else {
      res.render('./home/login', {});
    }
  }
  else {
    res.render('./home/login');
  }
})




router.get("/", async (req, res, next) => {
  var model = await user.findById(req.user);
  var result = await blog.find({});
  res.render('./home/index', { model: result });
})
router.get("/index", async (req, res, next) => {
  res.render('./home/index.ejs', {});
})


router.get("/about", async (req, res, next) => {
  res.render('./home/about.ejs', {});
})
router.get("/case-result", async (req, res, next) => {
  res.render('./home/case-result.ejs', {});
})
router.get("/contact", async (req, res, next) => {
  try {
    var model = new contact({});
    res.render('./home/contact', {  model: model,message:'undefined' });
  } catch (ex) {
    res.json({ status: 'failed', data: ex.message })
  }
})
router.post("/contact", async (req, res, next) => {
  
  try {
    var contactobj = { ...req.body };
    await contact.create(contactobj);
    var model = new contact({});
    res.render('./home/contact', {  model: model,message:"Your inquiry submitted" });
  } catch (ex) {
    res.json({ status: 'failed', data: ex.message })
  }
})

router.get("/practice-area", async (req, res, next) => {

  res.render('./home/practice-area.ejs', { staticdata });
})
router.post("/practice-area", async (req, res, next) => {
  try {
    var contact = { ...req.body };
    await practice.create(contact);
    res.redirect('/home/practice-area');
  } catch (ex) {
    res.json({ status: 'failed', data: ex.message })
  }
})

router.get("/blog", auth, async (req, res, next) => {
  var loggedinuser = await user.findById(req.user);
  var result = await blog.find({});
  res.render('./home/blog', { model: result , loggedinuser: loggedinuser });
})

module.exports = router;
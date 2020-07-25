var express = require('express');
var router = express.Router();

var multiparty = require("multiparty");
var fse = require("fs-extra");
var auth = require('../middlewares/auth');
var user = require('../Models/user')
var setting = require('../Models/setting')
var contact = require('../Models/contact');
const blog = require('../Models/blog');


var fs = require('fs');
var staticdatafile = fs.readFileSync('./staticdata.json');
var staticdata = JSON.parse(staticdatafile)

router.get("/", auth, async (req, res, next) => {
  res.redirect('/admin/index')
})
router.get("/index", auth, async (req, res, next) => {
  var loggedinuser = await user.findById(req.user);
  var blogs = await blog.find({}).count();
  var users = await user.find({}).count();

  res.render('./admin/index', { data: { blogs: blogs, users: users }, loggedinuser: loggedinuser });
})
router.get("/logout", async (req, res, next) => {
  res.clearCookie('AuthToken')
  res.redirect('/home/login');
})
router.get("/setting", auth,async (req, res, next) => {
  var loggedinuser = await user.findById(req.user);
  var companyname = await setting.findOne({ key: 'companyname' });
  var companyphone = await setting.findOne({ key: 'companyphone' });
  var result = {};
  result.companyname = companyname.value;
  result.companyphone = companyphone.value;
  res.render('./admin/setting', { data: result, loggedinuser: loggedinuser });
})
router.post("/saveSettingKeyValue", async (req, res, next) => {

  console.log(req.body);
  var result = await setting.findOneAndUpdate({ key: req.body.key }, { "$set": { value: req.body.value } });
  res.json({
    status: 'success'
  })
})

router.get("/blogadd", auth, async (req, res, next) => {
  try {
    var loggedinuser = await user.findById(req.user);
    var model = new blog({});
    res.render('./admin/blogadd', {  model: model , loggedinuser: loggedinuser });

  } catch (ex) {
    res.json({ status: 'failed', data: ex.message })
  }
})
router.post("/blogadd", auth, async (req, res, next) => {
  try {
    var blogobject = { ...req.body };
    await blog.create(blogobject);
    res.redirect('/admin/bloglist');
  } catch (ex) {
    res.json({ status: 'failed', data: ex.message })
  }
})
router.get("/bloglist", auth, async (req, res, next) => {
  var loggedinuser = await user.findById(req.user);
  var result = await blog.find({});
  res.render('./admin/bloglist', { model: result , loggedinuser: loggedinuser });
})


router.get("/contactlist", auth, async (req, res, next) => {
  var loggedinuser = await user.findById(req.user);
  var result = await contact.find({});
  res.render('./admin/contactlist', { data: { model: result }, loggedinuser: loggedinuser });
})
router.get("/contactdelete", auth, async (req, res, next) => {
  try {
    var result = await contact.findById(req.query.id);
    await contact.findByIdAndDelete(req.query.id);
    res.json({ status: 'success', data: 'Deleted' })


  } catch (ex) {
    res.json({ status: 'failed', data: ex.message })
  }
})
//
//#endregion contact

module.exports = router;

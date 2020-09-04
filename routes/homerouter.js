var express = require('express');
var router = express.Router();
var user = require('../Models/user');
var contact = require('../Models/contact');
var auth = require('../middlewares/auth');

router.get("/", async (req, res, next) => {
  res.redirect('/home/index')
})

router.get("/notfound", async (req, res, next) => {
  res.render('./home/notfound')
})

router.get("/login", async (req, res, next) => {
  res.render('./home/login', {});
})
router.post("/login", async (req, res, next) => {
  var username = req.body.username
  var password = req.body.password

  var result = await user.findOne({ username: username, password: password });
  if (result) {
    res.cookie('AuthToken', result._id);
    return res.redirect('/admin/index');
  }
  else {
    res.render('./home/login', {});
  }
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
    res.render('./home/contact', { model: model, message: 'undefined' });
  } catch (ex) {
    res.json({ status: 'failed', data: ex.message })
  }
})

router.post("/contact", async (req, res, next) => {

  try {
    var contactobj = { ...req.body };
    await contact.create(contactobj);
    var model = new contact({});
    res.render('./home/contact', { model: model, message: "Your inquiry submitted" });
  } catch (ex) {
    res.json({ status: 'failed', data: ex.message })
  }
})

router.get("/practice-area", async (req, res, next) => {

  res.render('./home/practice-area.ejs', { staticdata });
})


module.exports = router;
var express = require('express');
var router = express.Router();

var user = require('../Models/user')
var contact = require('../Models/contact');
var auth = require('../middlewares/auth');

router.get("/", auth, async (req, res, next) => {
  res.redirect('/admin/index')
})
router.get("/index", auth, async (req, res, next) => {
  var loggedinuser = await user.findById(req.user);
  var contacts = await contact.find({}).count();
  var users = await user.find({}).count();

  res.render('./admin/index', { data: { contacts: contacts, users: users }, loggedinuser: loggedinuser });
})
router.get("/logout", async (req, res, next) => {
  res.clearCookie('AuthToken')
  res.redirect('/home/login');
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

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Lily Keus", css:["index.css"], js:["Index.js"] });
});

router.get("/login", function(req,res){
  res.render('login', {css:["login.css"]})
});
router.get("/registration", function(req,res){
  res.render('registration',{css:["registration.css"], js:["registration.js"]})
});
router.get("/postimage", function(req,res){
  res.render('postimage',{css:["postimage.css"]})
});
router.get("/viewpost", function(req,res){
  res.render('viewpost',{css:["viewpost.css"]})
});

module.exports = router;

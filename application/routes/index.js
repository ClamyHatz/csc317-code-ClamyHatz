var express = require('express');
const {isLoggedIn} = require('../middleware/protectors')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Lily Keus", css:["white.css"]});
});

router.get("/login", function(req,res){
  res.render('login', {css:["blue.css"]})
});
router.get("/registration", function(req,res){
  res.render('registration',{css:["blue.css"]})
});

router.get("/postimage", isLoggedIn, function(req,res){
  res.render('postimage',{css:["pink.css"]})
});
router.get("/viewpost", function(req,res){
  res.render('viewpost',{css:["pink.css"]})
});

module.exports = router;

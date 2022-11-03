var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Lily Keus" });
});

router.get("/login", function(req,res){
  res.render('login')
});
router.get("/registration", function(req,res){
  res.render('registration')
});
router.get("/postimage", function(req,res){
  res.render('postimage')
});
router.get("/viewpost", function(req,res){
  res.render('viewpost')
});

module.exports = router;

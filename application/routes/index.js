var express = require('express');
const {isLoggedIn} = require('../middleware/protectors');
const {getRecentPosts, getPostById} = require('../middleware/posts');
var router = express.Router();

/* GET home page. */
router.get("/", getRecentPosts, function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Lily Keus"});
});

router.get("/login", function(req,res){
  res.render('login')
});
router.get("/registration", function(req,res){
  res.render('registration')
});

router.get("/postimage", isLoggedIn, function(req,res){
  res.render('postimage')
});
router.get("/viewpost", function(req,res){
  res.render('viewpost', {js:'viewpost.js'})
});

router.get("/posts/:id(\\d+)", getPostById, function(req,res){
  console.log(req.params);
  res.render('viewpost')
})

module.exports = router;

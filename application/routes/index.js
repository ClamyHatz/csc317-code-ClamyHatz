var express = require('express');
const {isLoggedIn} = require('../middleware/protectors');
const {getRecentPosts, getPostById, getCommentsForPostsById} = require('../middleware/posts');
var router = express.Router();

/* GET home page. */
router.get("/", getRecentPosts, function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Lily Keus"});
});

router.get("/login", function(req,res){
  res.render('login')
});
router.get("/registration", function(req,res){
  res.render('registration', {js:["registration.js"]})
});

router.get("/postimage", isLoggedIn, function(req,res){
  res.render('postimage')
});

router.get("/posts/:id(\\d+)", getPostById, getCommentsForPostsById, function(req,res){
  console.log(req.params);
  res.render('viewpost', {js:["viewpost.js"]})
});

module.exports = router;

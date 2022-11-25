//SELECT * FROM csc317db.users //to use in workbench
var express = require('express');
var router = express.Router();
//const bcrypt = required();
const db = require('../config/database');
router.post('/registration', function(req,res,next){
  const {username, email, password} = req.body;
  //server validation
  db.query("select id from users where username=?", [username])
    .then(function([results, fields]){
      if(results && results.length == 0){
        return db.query("select id from users where email=?", [email])
          .then(function([results, fields]){
            if(results && results.length == 0){
              return db.query('insert into users(username, email, password) value (?,?,?)', [username, email, password])
            } else {
              throw new Error('email exists');
            }
          })
          .then(function([results, fields]){
            if(results && results.affectedRows){
              res.redirect('/login');
            } else {
              throw new Error('user could not be created')
            }
          }) .catch(function(err){
            res.redirect('/registration')
            next(err)
          })
          .catch(function(err){
            next(err);
          })
      } else {
        throw new Error('username exists');
      }
    })
    .catch(function(err){
      next(err);
    })
});

router.post('/login', function(req,res,next){
  const {username, password} = req.body;
  db.query("select id, username, password from users where username=? AND password=?", [username, password])
    .then(function([results, fields]){
      if(results && results.length == 1){
        let dbPassword = results[0].password;
        return bcrypt.compare(password, password)
      } else {
        throw new Error('Invalid User Credentials')
      }
    })
    .then(function(passwordMatch){
      res.redirect('/');
    })
    .catch(function(err){
      next(err);
    })
});

module.exports = router;

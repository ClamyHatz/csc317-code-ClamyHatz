//SELECT * FROM csc317db.users //to use in workbench
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/database');
const UserError = require('../helpers/error/UserError')
router.post('/registration', function(req,res,next){
  const {username, email, password} = req.body;
  //server validation
  db.query("select id from users where username=?", [username])
    .then(function([results, fields]){
      if(results && results.length == 0){
        return db.query("select id from users where email=?", [email])
          .then(function([results, fields]){
            if(results && results.length == 0){
              return bcrypt.hash(password, 2);
            } else {
              throw new UserError('email exists', "/registration", 200);
            }
          }).then(function(hashedPassword){
            return db.query('insert into users(username, email, password) value (?,?,?)', [username, email, hashedPassword])
          })
          .then(function([results, fields]){
            if(results && results.affectedRows){
              req.flash("success", 'Registration Successful!')
              req.session.save(function(saveError){
                res.redirect('/login');
              })
            } else {
              throw new UserError('user could not be created', "/registration", 200);
            }
          }) 
          .catch(function(err){
            if(err instanceof UserError){
              req.flash("error", err.getMessage());
              req.session.save(function(saveError){
                res.redirect(err.getRedirectURL());
              })
            } else {
              next(err);
            } 
          })
      } else {
        throw new UserError('username exists', "/registration", 200);
      }
    })
    .catch(function(err){
      if(err instanceof UserError){
        req.flash("error", err.getMessage());
        req.session.save(function(saveError){
          res.redirect(err.getRedirectURL());
        })
      } else {
        next(err);
      } 
    })
});

router.post('/login', function(req,res,next){
  const {username, password} = req.body;

  let loggedUserId;
  let loggedUsername;

  db.query('select id, username, password from users where username=?', [username])
    .then(function([results, fields]){
      if(results && results.length == 1){
        loggedUserId = results[0].id;
        loggedUsername = results[0].username;
        let dbPassword = results[0].password;
        return bcrypt.compare(password, dbPassword)
      } else {
        throw new UserError('Failed Login: Invalid User Credentials', "/login", 200)
      }
    })
    .then(function(passwordsMatch){
      if(passwordsMatch){
        req.session.userId = loggedUserId;
        req.session.username = loggedUsername;
        req.flash("success", 'Log In Successful!')
        req.session.save(function(saveError){
          res.redirect('/');
        })
      } else {
        throw new UserError('Failed Login: Invalid User Credentials', "/login", 200)
      }
    })
    .catch(function(err){
      if(err instanceof UserError){
        req.flash("error", err.getMessage());
        req.session.save(function(saveError){
          res.redirect(err.getRedirectURL());
        })
      } else {
        next(err);
      } 
    })
});

router.post("/logout", function(req, res, next){
  req.flash("success", 'Log Out Successful!')
  req.session.save(function(saveError){
    req.session.destroy(function(destroyError){
      if(destroyError){
        next(err);
      } else {
        res.json({
          status: 200,
          message: "You have been logged out"
        });
      }
    })
  })
})

module.exports = router;

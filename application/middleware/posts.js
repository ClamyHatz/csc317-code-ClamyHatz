const db = require('../config/database');
module.exports={
    getRecentPosts: function(req, res, next){
        db.query('select id,title,description,thumbnail from posts ORDER BY createdAT DESC LIMIT 8')
        .then(function([results,feilds]){
            if(results && results.length){
                res.locals.results = results;
            }
            next();
        })
        .catch(err => next(err));
    },
    getPostById: function(req, res, next){
        
    }
}
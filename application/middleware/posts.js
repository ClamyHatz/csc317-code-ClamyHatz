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
        let postId = req.params.id;
        let baseSQL = `
        SELECT p.title, p.description, p.image, p.createdAt, u.username
        FROM posts p
        JOIN users u
        ON p.fk_authorId = u.id
        WHERE p.id = ?;
        `;
        db.query(baseSQL, [postId])
        .then(
            function([results, feilds]){
                if(results && results.length == 1){
                    res.locals.currentPost = results[0];
                    next();
                } else {
                    req.flash("error", `404 Post Not Found`);
                    req.session.save(function(saveErr){
                        res.render('404');
                    })
                }
        })
    },
}
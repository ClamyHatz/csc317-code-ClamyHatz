const express = require('express');
const router = express.Router();
const db = require('../config/database');
const multer = require('multer');
const sharp = require('sharp');
const { isLoggedIn } = require('../middleware/protectors');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/uploads')
    },
    filename: function (req, file, cb) {
      let fileExt = file.mimetype.split("/")[1];
      cb(null, `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}.${fileExt}`)
    }
  })
  
const upload = multer({ storage: storage })

router.post("/create", isLoggedIn, upload.single("image"), function(req, res, next){
    let uploadedFile = req.file.path;
    let thumbnailName = `thumbnail-${req.file.filename}`;
    let destinationOfThumbnail = `${req.file.destination}/${thumbnailName}`;
    const {title, description} = req.body;
    const userId = req.session.userId;

    sharp(uploadedFile)
        .resize(200)
        .toFile(destinationOfThumbnail)
        .then(function(){
            let baseSQL =`
            INSERT INTO posts (title, description, image, thumbnail, fk_authorId) VALUE (?,?,?,?,?)
            `
            return db.query(baseSQL, [title, description, uploadedFile, destinationOfThumbnail, userId])
        })
        .then(function([resutls, fields]){
            if(resutls && resutls.affectedRows){
                req.flash("success", "Post Uploaded!");
                req.session.save(function(saveErr){
                    res.redirect('/');
                })
            }
        })
        .catch(err => next(err));
})

module.exports = router;
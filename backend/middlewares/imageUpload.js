const multer = require("multer");
const path = require("path");

//destination to store image
const imageStorage = multer.diskStorage({
    destination: function(req,file,cb) {
        let folder = ""

        if(req.baseUrl.includes("users")) {
            folder = "users"
        } else if(req.baseUrl.includes("photos")) {
            folder = "photos"
        }

        cb(null, `uploads/${folder}/`)
    },
    filename: (req,file,cb) => {
        cb(null, Date.now() + path.extname(file.originalname)) //name.jpg
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            return cb(new Error("Aceitamos apenas imagens nos formatos .png, .jpg ou .jpeg!"))
        }
        cb(undefined, true)
    }
});

module.exports = {imageUpload};
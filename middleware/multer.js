const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "..", "public", "/avatar"));
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const fileUploads = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024, // 2mb.
    },
    fileFilter: (req, file, callback) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/jpg"
        ) {
            return callback(null, true);
        } else {
            callback(null, false);
            callback(new Error("Only PNG, JPEG and JPG images format are supported"));
        }
    },
    onError: function (err, next) {
        console.log(`Error: ${err}`)
        next(err);
    }
}).single('avatar');



module.exports = fileUploads;
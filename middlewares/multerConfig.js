const multer = require('multer');
const path = require('path');  

const storage = multer.diskStorage({
    destination : function (req, res, cb){

        cb(null, 'uploads/students/')
    },

    filename : function (req, file, cb) {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);

        cb(null, uniqueName)

    }
})

const fileFilter = (req, file, cb) => {
    
    const allowedTypes = /jpeg|jpg|png/;
    const isValidExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const isValidMime = allowedTypes.test(file.mimetype);

    if (isValidExt && isValidMime) cb(null, true);
    else cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'));

}

const upload = multer({
    storage,
    fileFilter,
})

module.exports = upload;

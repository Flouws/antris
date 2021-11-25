/* eslint-disable max-len */
const multer = require('multer');
const path = require('path');
const mkdirp = require('mkdirp');

const userProfileUploadSetting = {
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes('image')) {
      return cb(new Error(`Field [${file.fieldname}] must be an image.`), false);
    }
    return cb(null, true);
  },

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },

  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '../public/uploads/users/pictures');
      mkdirp.sync(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
      cb(null, uniqueSuffix);
    },
  }),
};

const userProfileUpload = multer({
  storage: userProfileUploadSetting.storage,
  fileFilter: userProfileUploadSetting.fileFilter,
  limits: userProfileUploadSetting.limits,
}).single('picture');

const upload = {
  userProfileUpload: userProfileUpload,
};

module.exports = upload;

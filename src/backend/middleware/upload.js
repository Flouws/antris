/* eslint-disable max-len */
const multer = require('multer');
const path = require('path');
const mkdirp = require('mkdirp');

const userProfileUploadSetting = {
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

  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes('image')) {
      return cb(new Error(`Field [${file.fieldname}] must be an image.`), false);
    }
    return cb(null, true);
  },

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
};

const polyPictureUploadSetting = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '../public/uploads/polys/pictures');
      mkdirp.sync(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
      cb(null, uniqueSuffix);
    },
  }),

  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes('image')) {
      return cb(new Error(`Field [${file.fieldname}] must be an image.`), false);
    }
    return cb(null, true);
  },

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
};

const queuePicturesUploadSetting = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '../public/uploads/queues/pictures');
      mkdirp.sync(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
      cb(null, uniqueSuffix);
    },
  }),

  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes('image')) {
      return cb(new Error(`Field [${file.fieldname}] must be an image.`), false);
    }
    return cb(null, true);
  },

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
};

const userProfileUpload = multer({
  storage: userProfileUploadSetting.storage,
  fileFilter: userProfileUploadSetting.fileFilter,
  limits: userProfileUploadSetting.limits,
}).single('picture');

const polyPictureUpload = multer({
  storage: polyPictureUploadSetting.storage,
  fileFilter: polyPictureUploadSetting.fileFilter,
  limits: polyPictureUploadSetting.limits,
}).single('picture');

const queuePicturesUpload = multer({
  storage: queuePicturesUploadSetting.storage,
  fileFilter: queuePicturesUploadSetting.fileFilter,
  limits: queuePicturesUploadSetting.limits,
}).fields([{
  name: 'picture1',
  maxCount: 1,
}, {
  name: 'picture2',
  maxCount: 1,
}, {
  name: 'picture3',
  maxCount: 1,
}, {
  name: 'picture4',
  maxCount: 1,
}, {
  name: 'picture5',
  maxCount: 1,
}]);

const upload = {
  userProfileUpload: userProfileUpload,
  polyPictureUpload: polyPictureUpload,
  queuePicturesUpload: queuePicturesUpload,
};

module.exports = upload;

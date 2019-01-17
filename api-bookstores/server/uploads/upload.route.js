const express = require('express');
const multer  = require('multer');
const uploadCtrl = require('./upload.controller');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
  },
  filename: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    cb(null, file.fieldname + '_' + Date.now() + ext);
  }
})

var upload = multer({ storage: storage, limits: { fileSize: 600*1000 } })

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** POST /api/uploads - Create new upload */
  .post(upload.single('image'), uploadCtrl.create);

router.route('/:uploadId')

  /** PUT /api/uploads/:uploadId - Update upload */
  .put(upload.single('image'), uploadCtrl.update)

  /** DELETE /api/uploads/:uploadId - Delete upload */
  .delete(uploadCtrl.remove);

module.exports = router;

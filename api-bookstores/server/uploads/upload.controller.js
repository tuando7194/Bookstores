const fs = require('fs');
function create(req, res) {
  return res.json({ url: 'http://' + req.headers.host + '/' +  req.file.filename });
}

/**
 * Update existing upload
 * @returns {Upload}
 */
function update(req, res, next) {
  const uploadId = req.params.uploadId;
  const unlink = 'uploads/' + uploadId;
  fs.exists(unlink, function(exists) {
    if (exists) {
      fs.unlink(unlink, (err) => {
        if (err) return console.log('err remove');
        console.log('uploads/' + uploadId + ' was deleted');
      });
    }
  });
  return create(req, res);
}

/**
 * Delete book.
 * @returns {Upload}
 */
function remove(req, res, next) {
  const uploadId = req.uploadId;
  const unlink = 'uploads/' + uploadId;
  fs.exists(unlink, function(exists) {
    if (exists) {
      fs.unlink(unlink, (err) => {
        if (err) next(err);
        return res.json({ deleted: uploadId });
      });
    }
  });
}

module.exports = { create, update, remove };

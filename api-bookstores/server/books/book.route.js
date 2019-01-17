const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const bookCtrl = require('./book.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/books - Get list of books */
  .get(bookCtrl.list)

  /** POST /api/books - Create new book */
  .post(validate(paramValidation.createBook), bookCtrl.create);

router.route('/:bookId')
  /** GET /api/books/:bookId - Get book */
  .get(bookCtrl.get)

  /** PUT /api/books/:bookId - Update book */
  .put(validate(paramValidation.updateBook), bookCtrl.update)

  /** DELETE /api/books/:bookId - Delete book */
  .delete(bookCtrl.remove);

/** Load book when API with bookId route parameter is hit */
router.param('bookId', bookCtrl.load);

module.exports = router;

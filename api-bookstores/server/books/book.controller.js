const Book = require('./book.model');

/**
 * Load book and append to req.
 */
function load(req, res, next, id) {
  Book.get(id)
    .then((book) => {
      req.book = book; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get book
 * @returns {Book}
 */
function get(req, res) {
  return res.json(req.book);
}

/**
 * Create new book
 * @property {string} req.body.bookname - The bookname of book.
 * @property {string} req.body.mobileNumber - The mobileNumber of book.
 * @returns {Book}
 */
function create(req, res, next) {
  const book = new Book({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
  });
  book.save()
    .then(savedBook => res.json(savedBook))
    .catch(e => next(e));
}

/**
 * Update existing book
 * @returns {Book}
 */
function update(req, res, next) {
  console.log('book', req.body)
  const book = req.book;
  book.title = req.body.title;
  book.description = req.body.description;
  book.price = req.body.price;
  book.image = req.body.image;
  console.log('bookbook', book)

  book.save()
    .then(savedBook => res.json(savedBook))
    .catch(e => next(e));
}

/**
 * Get book list.
 * @property {number} req.query.skip - Number of books to be skipped.
 * @property {number} req.query.limit - Limit number of books to be returned.
 * @returns {Book[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Book.list({ limit, skip })
    .then(books => res.json(books))
    .catch(e => next(e));
}

/**
 * Delete book.
 * @returns {Book}
 */
function remove(req, res, next) {
  const book = req.book;
  book.remove()
    .then(deletedBook => res.json(deletedBook))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };

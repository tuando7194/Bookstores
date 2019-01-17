const Joi = require('joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // POST /api/books
  createBook: {
    body: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.string().required(),
      image: Joi.string().required(),
    }
  },

  // UPDATE /api/books/:bookId
  updateBook: {
    body: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.string().required(),
      image: Joi.string().required(),
    },
    params: {
      bookId: Joi.string().hex().required()
    }
  }
};
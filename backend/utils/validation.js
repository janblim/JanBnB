// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};

    validationErrors
      .array()
      .forEach(error => errors[error.path] = error.msg);

    const err = {}
    err.message = "Bad Request";
    err.errors = errors;

    return res.status(400).json(err)
  }
  next();
};

module.exports = {
  handleValidationErrors
};

const { BAD_REQUEST } = require('http-status-codes');
const Joi = require('joi');
const { pick } = require('lodash');
const { BAD_REQUEST: KIND_BAD_REQUEST } = require('../core/constants');
const { Response } = require('../core/response');

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new Response()
      .kind(KIND_BAD_REQUEST)
      .status(BAD_REQUEST)
      .body({
        errors: {
          message: errorMessage
        },
      }));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;

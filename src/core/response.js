const {
  OK, CREATED, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR
} = require('http-status-codes');

class Response {
  constructor() {
    this._status = OK;
  }

  kind(kind) {
    this._kind = kind;
    return this;
  }

  status(status) {
    this._status = status || OK;
    return this;
  }

  statistics(data) {
    this._statistics = data || {};
    return this;
  }

  body(data = {}) {
    if (!this._kind) throw new Error('kind is required when creating new response');
    const resObj = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      statusCode: this._status,
      body: JSON.stringify({
        kind: this._kind,
        data
      })
    };
    if (this._statistics) {
      resObj.statistics = this._statistics || {};
    }
    return resObj;
  }

  created(data = {}) {
    this._status = CREATED;
    return this.body(data);
  }

  notFound() {
    this._status = NOT_FOUND;
    return this.body();
  }

  noContent() {
    this._status = NO_CONTENT;
    return this.body();
  }

  internalError(error) {
    this._status = INTERNAL_SERVER_ERROR;
    return this.body({
      errors: {
        message: error.message
      }
    });
  }
}
module.exports = { Response };

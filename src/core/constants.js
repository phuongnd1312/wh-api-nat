const PREFIX = 'ei';
const p = (k) => `${PREFIX}#${k}`;
const UNAUTHORIZED = p('UNAUTHORIZED');
const BAD_REQUEST = p('BAD_REQUEST');

module.exports = {
  PREFIX,
  p,
  UNAUTHORIZED,
  BAD_REQUEST,
};

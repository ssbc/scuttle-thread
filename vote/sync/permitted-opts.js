const pick = require('lodash.pick')
const PERMITTED_OPTS = 'expression value'
  .split(' ')

module.exports = function permittedOpts (opts) {
  return pick(opts, PERMITTED_OPTS)
}

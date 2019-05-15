const getContent = require('ssb-msg-content')
const { isFeed } = require('ssb-ref')
// const { isVote } = require('ssb-vote-schema')
// const permitted = require('../sync/permitted-opts')
const getBranch = require('../../lib/get-branch')

module.exports = function buildVote (server) {
  const _getBranch = server.tangle
    ? server.tangle.branch
    : getBranch(server)

  return function (msg, opts = {}, cb) {
    const vote = {
      type: 'vote',
      root: getRoot(msg),
      vote: {
        link: msg.key,
        value: getValue(opts),
        expression: getExpression(opts)
      }
    }

    if (getContent(msg).recps) vote.recps = getRecps(msg)

    _getBranch(vote.root, (err, branch) => {
      if (err) return cb(err)

      vote.branch = branch

      // TODO
      // if (isVote(vote)) cb(null, vote)
      // else cb(isVote.errors)
      cb(null, vote)
    })
  }
}

function getValue (opts) {
  if (opts.value === undefined) return 1

  return opts.value ? 1 : 0
}

function getExpression (opts) {
  if (typeof opts.expression === 'string') return opts.expression

  return getValue(opts) ? 'heart' : 'broken_heart'
}

function getRoot (msg) {
  return getContent(msg).root ? getContent(msg).root : msg.key
}

function getRecps (msg) {
  return getContent(msg).recps
    .map(recp => typeof recp === 'string' ? recp : recp.link)
    .filter(isFeed)
}

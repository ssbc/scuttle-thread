const buildVote = require('./build')

module.exports = function (server) {
  return function publishVote (msg, opts, cb) {
    buildVote(server)(msg, opts, (err, vote) => {
      if (err) return cb(err)

      server.publish(vote, (err, vote) => {
        if (err) return cb(err)

        cb(null, vote)
      })
    })
  }
}

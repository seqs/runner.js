var runner = require('../index')

runner([
  function (next) {
    next(new Error('An error from runner sequence'))
  }
], this, function (e) {
  console.log(e)
})

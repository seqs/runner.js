module.exports = runner

/**
 * Run through the sequence of functions
 *
 * @param  {Array} fns
 * @param  {Object} context
 * @param  {Function} errorHandler
 * @public
 */
function runner (fns, context, errorHandler) {
  var last = fns.length - 1
  var context = context || this
  var errorHandler = errorHandler || function (err) {
    throw err
  }

  var run = function (pos) {
    fns[pos].call(context, function (err) {
      if (err) return errorHandler(err)
      if (pos === last) return
      run(++pos)
    })
  }

  run(0)
}

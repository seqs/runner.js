var runner = require('../index')

runner([
  function (next) {
    setTimeout((function () {
      this.a = 1
      next()
    }).bind(this), 100)
  },

  function (next) {
    setTimeout((function () {
      this.b = 2
      next()
    }).bind(this), 100)
  },

  function (next) {
    this.c = this.a + this.b
    console.log(this.c)
  }
])

var runner = require('../index')

function Foo () {
  this.a = 1

  runner([
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
  ], this)
}

new Foo()

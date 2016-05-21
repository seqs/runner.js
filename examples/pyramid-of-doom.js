;(function () {
  setTimeout((function () {
    var a = 1
    ;(function () {
      setTimeout((function () {
        var b = 2
        ;(function (next) {
          var c = a + b
          console.log(c)
        })()
      }), 100)
    })()
  }), 100)
})()

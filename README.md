A lightweight async tool in JavaScript inspired by Express middleware

### Install

```
npm install runner.js --save
```


### Getting Started

On the first pass, runner can mitigate the “[Pyramid of
Doom](http://calculist.org/blog/2011/12/14/why-coroutines-wont-work-on-the-web/)”: the situation where code marches to the right faster
than it marches forward.

```js
(function () {
  setTimeout((function () {
    var a = 1
    (function () {
      setTimeout((function () {
        var b = 2
        (function () {
          var c = a + b
          console.log(c)
        })()
      }), 100)
    })()
  }), 100)
})()
```

With runner, you can flatten the pyramid.

```js
var runner = require('runner.js')

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
```


### Handling Errors

The default error handler caught the exception and throw an exception,
also you can define your own error handler.


```js
var runner = require('runner.js')

runner([
  function (next) {
    next(new Error('An error from runner sequence'))
  }
], this, function (e) {
  console.log(e)
})
```


### Context

This is about `bind`, not about `async`. If you are wondering how to make async
execute your iteratees in a given context, or are confused as to why a method
of another library isn't working as an iteratee, study this example:

```js
var runner = require('runner.js')

function Foo () {
  this.a = 1

  // With the help of bind second parameter we can attach a context to the
  // iteratee before
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
  ], this) // `this` is the second parameter
}

new Foo()
```

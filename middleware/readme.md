What is middleware
===

In short, **middlewares** are functions that you can define your requests can go through. An express server itself is a list of middlewares.

**Middlewares** are functions executed after the incoming request then produce an output which could be the final response or could be passed to the next middleware until we send the response back to users. 

**We can have more than one middlewares and they will execute in the order we declared**

Middleware functions can perform the following tasks:
- Execute any code
- Make changes to the request and the response objects
- End the request-response cycle
- Call the next middleware function in the stack

If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

An Express application can use the following types of middleware:

- Application-level middleware
  - logging, some business logic
- Router-level middleware
  - authorization, unify the API responses, some business logic
- Error-handling middleware
  - error handling
- Built-in middleware
  - json, urlencoded
- Third-party middleware
  - bodyparser, cookies parser, compression

Examples
---

**Application-level middleware 1**
```
// This function is executed every time the app receives a request

var app = express()

app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
```

**Application-level middleware 2**
```
var app = express()

app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

app.get('/user/:id', function (req, res, next) {
  res.send('USER')
})
```

**Application-level middleware 3**
```
var app = express()

app.get('/user/:id', function (req, res, next) {
  // go to user info
  next()
}, function (req, res, next) {
  res.send('User Info')
})

// this never gets called because send() has been used above
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id)
})
```

**Application-level middleware 4**
```
var app = express()

app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, go to special directly
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the regular
  else next()
}, function (req, res, next) {
  res.send('regular')
})

app.get('/user/:id', function (req, res, next) {
  res.send('special')
})
```

**Application-level middleware 5**
```
var app = express()

function logOriginalUrl (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
} 

function logMethod(req, res, next) {
  console.log('Request Type:', req.method)
  next()
}

var logStuff = [logOriginalUrl, logMethod]
app.get('/user/:id', logStuff, function (req, res, next) {
  res.send('User Info')
})
```

Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of `express.Router()`.

**Router-level middleware 1**
```
var app = express()
var router = express.Router()

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // render a regular page
  res.render('regular')
})

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id)
  res.render('special')
})

// mount the router on the app
app.use('/', router)
```

Keep in mind
---
Express will scan through all our functions, if it finds a middleware with 4 params and not 2 or 3. It denotes the middleware as an error middleware meaning it will give you access to any error thrown by any of the middleware before it

Reference
---
- https://expressjs.com/en/guide/using-middleware.html
- https://expressjs.com/en/guide/writing-middleware.html
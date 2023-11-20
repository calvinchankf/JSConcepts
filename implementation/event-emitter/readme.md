Event Emitter
===
Node.js core API is based on asynchronous event-driven architecture in which certain kind of objects called emitters periodically emit events that call listeners. There are many objects in Node emit events. e.g. a server emits an event when a peer connects to it.

- When the EventEmitter object emits an event, all of the functions attached to that specific event are called synchronously. Any values returned by the called listeners are ignored and will be discarded.
- unlike callbacks/promise/aync&await, events are synchronous

![](./event.jpg)

use cases:
- when there is a request coming in to a node.js server, your event listeners will get an event from the HTTP module of node.js, and you receive the request body from the callbacks
- when there is a click on a webpage, your event listiner will get an event of what you have just clicked

ref:
- https://www.youtube.com/watch?v=l20MBBFZAmA

Example: Logging
----
```js
const EventEmitter = require('events');

class WithLog extends EventEmitter {
  execute(taskFunc) {
    console.log('Before executing');
    this.emit('begin');
    taskFunc();
    this.emit('end');
    console.log('After executing');
  }
}

const withLog = new WithLog();

withLog.on('begin', () => console.log('About to execute'));
withLog.on('end', () => console.log('Done with execute'));

withLog.execute(() => console.log('*** Executing task ***'));
```

expect
```
Before executing
About to execute
*** Executing task ***
Done with execute
After executing
```

Example: Express Custom Event with args
---
```js
// app.js
app.on('testEvent', function (a, b) {
  return console.log('responded to testEvent: ', a, b);
  // responded to testEvent: abc def
});

// endpoint.js
app.get('/test', function (req, res) {
  app.emit('testEvent', 'abc', 'def');
  return res.status(200).end();
});
```

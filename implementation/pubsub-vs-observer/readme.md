Observer vs Pub-Sub pattern
===

Observer
---
The observer pattern is a software design pattern in which an object, called the subject, maintains a list of its dependents, called observers, and notifies them automatically of any state changes, usually by calling one of their methods.

![](./observer.png)

Pub-Sub
---
In ‘Publisher-Subscriber’ pattern, senders of messages, called publishers, do not program the messages to be sent directly to specific receivers, called subscribers.

![](./pubsub.gif)

Difference
---
- In the Observer pattern, the Observers are aware of the Subject, also the Subject maintains a record of the Observers. Whereas, in Publisher/Subscriber, publishers and subscribers don’t need to know each other. They simply communicate with the help of message queues or broker.
- In Publisher/Subscriber pattern, components are loosely coupled as opposed to Observer pattern.
- Observer pattern is mostly implemented in a synchronous way, i.e. the Subject calls the appropriate method of all its observers when some event occurs. The Publisher/Subscriber pattern is mostly implemented in an asynchronous way (using message queue).
- Observer pattern needs to be implemented in a single application address space. On the other hand, the Publisher/Subscriber pattern is more of a cross-application pattern.

![](./vs.jpeg)

Reference
---
https://hackernoon.com/observer-vs-pub-sub-pattern-50d3b27f838c
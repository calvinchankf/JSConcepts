const EventEmitter = require("events");

// extend the class
class MyEmitter extends EventEmitter {}

// init an emitter object
const myEmitter = new MyEmitter();

// event listener
myEmitter.on("event", () => {
	console.log("an event occurred!");
});

// emit an event
myEmitter.emit("event");

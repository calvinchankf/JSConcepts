const EventEmitter = require("events");

// init an emitter object
const myEmitter = new EventEmitter();

// event listener
myEmitter.on("event", () => {
	console.log("an event occurred!");
});

// emit an event
myEmitter.emit("event");

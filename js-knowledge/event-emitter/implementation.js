/*
Write an emitter class: 

1. Support subscribing to events. 

sub = emitter.subscribe('event_name', callback); 
sub2 = emitter.subscribe('event_name', callback2); 

2. Support emitting events.
emitter.emit('event_name', foo, bar); 

3. Support unsubscribing existing subscriptions by releasing them.

sub.unsubscribe(); 
sub2.unsubscribe(); 
*/

class EventManger {
	constructor() {
		this.ht = {};
	}
	subscribe(key, cb) {
		if (this.ht[key]) {
			this.ht[key].add(cb);
		} else {
			this.ht[key] = new Set();
			this.ht[key].add(cb);
		}

		const obj = {
			unsubscribe: () => {
				this.ht[key].delete(cb);
				if (this.ht[key].size === 0) {
					delete this.ht[key];
				}
			},
		};
		return obj;
	}
	emit(key, ...params) {
		if (this.ht[key] === undefined) {
			console.log(`No Subscriptions to ${key}`);
			return;
		}
		this.ht[key].forEach((cb) => {
			cb(...params);
		});
	}
}

const e = new EventManger();

sub1 = e.subscribe("event_name", (s) => {
	console.log(`${s} => 1`);
});
sub2 = e.subscribe("event_name", (s) => {
	console.log(`${s} => 2`);
});
sub3 = e.subscribe("event_name", (s) => {
	console.log(`${s} => 3`);
});

e.emit("event_name", "call all");

sub2.unsubscribe();

e.emit("event_name", "removed 2");

sub1.unsubscribe();
sub3.unsubscribe();

e.emit("event_name", "removed all");

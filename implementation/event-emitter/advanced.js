/*
Write an emitter class: 

1. subscribe
2. subscrible once
3. emit 
3. unsubscribe

sub.unsubscribe(); 
sub2.unsubscribe(); 
*/

class EventManger {
	constructor() {
		this.ht = {}; // {key: { callback: k } }
	}
	subscribe(key, cb, freq=-1) {
        this.ht[key] = this.ht[key] || new Map()
        this.ht[key].set(cb, freq)
		return this;
	}
    once(key, cb) {
        this.subscribe(key, cb, 1)
    }
    unsubscribe(key, cb) {
        this.ht[key].delete(cb);
        if (this.ht[key].size === 0) {
            delete this.ht[key];
        }
    }
	emit(key, ...args) {
		this.ht[key].forEach((freq, cb) => {
			cb(...args);
            freq -= 1

            if (freq == 0) {
                this.unsubscribe(key, cb)
            } else if (freq > 0) {
                this.ht[key].set(cb, freq)
            }
		});
	}
}

const e = new EventManger();

const cb1 = (s) => { console.log(`${s} => 1`); }
const cb2 = (s) => { console.log(`${s} => 2`); }
const cb3 = (s) => { console.log(`${s} => 3`); }
const cb4 = (s) => { console.log(`${s} => 4`); }

e.subscribe("event_name", cb1);
e.subscribe("event_name", cb2);
e.subscribe("event_name", cb3);
e.once("event_name", cb4);

e.emit("event_name", "call all");

e.unsubscribe('event_name', cb2);

e.emit("event_name", "removed 2 manually, removed 4 automatically");

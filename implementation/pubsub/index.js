/*
- Publisher/Subscriber, publishers and subscribers don’t need to know each other. 
  They simply communicate with the help of message queues or broker.

- In Publisher/Subscriber pattern, components are loosely coupled as opposed to Observer pattern
*/

const Events = (function () {
  var keys = {};

  return {
    subscribe: function (key, listener) {
      // Create the key's object if not yet created
      if (keys[key] == undefined) {
        keys[key] = [];
      }

      // Add the listener to queue
      keys[key].push(listener);
    },
    publish: function (key, message) {
      // If the key doesn't exist, or there's no listeners in queue, just leave
      if (keys[key] == undefined || keys[key].length == 0) {
        return
      }

      // Cycle through keys queue, fire!
      keys[key].forEach(function (item) {
        item(message != undefined ? message : {});
      });
    },
    remove: function (key) {
      if (keys[key] == undefined || keys[key].length == 0) {
        return
      }
      // Pop the first listener of key
      keys[key].shift()
    }
  };
})();

// create events, add define the action for each listener
for (let i = 0; i < 5; i++) {
  Events.subscribe(i, obj => {
    console.log(obj + 1)
  })
  Events.subscribe(i, obj => {
    console.log(obj + 2)
  })
}

// remove the first event listener of key=0
Events.remove(0)

// publish events, for each event, send the message to the listener
let i = 0
const t = setInterval(() => {
  Events.publish(i, i * 10)
  i++
  if (i == 5) {
    clearInterval(t)
  }
}, 500)

/*
it prints

2
11
12
21
22
31
32
41
42
*/
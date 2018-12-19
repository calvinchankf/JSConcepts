// e.g. 1 from https://gist.github.com/kepta/0ac2636f86c0f4cee80de12821e4ef34
// memory leak in a closure
// in the sayHi() closure, since 'allNames' persists, the engine will quickly run out of memory when we call the function periodically
function sayHi() {
  var allNames = [];
  return name => {
    allNames.push(allNames.join() + name);
    return allNames;
  }
}

// assign closure to a variable
var hello = sayHi();

// setInterval(() => {
// hello('Gandhi');
// }, 1);

// e.g. 2
// in this case, 'detachedNodes' is retained 
var detachedNodes;

function create() {
  var ul = document.createElement('ul');
  for (var i = 0; i < 1337; i++) {
    var li = document.createElement('li');
    ul.appendChild(li);
  }
  detachedNodes = ul;
}

setInterval(() => {
  create();
}, 100);
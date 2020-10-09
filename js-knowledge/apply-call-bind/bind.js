// bind is different with apply and call, it basically 'insert' argument as this and put 'this' in the target function

let customer1 = {
  name: 'Leo',
  email: 'leo@gmail.com'
};
let customer2 = {
  name: 'Nat',
  email: 'nat@hotmail.com'
};

function greeting(text) {
  console.log(`${text} ${this.name}`);
}
let helloLeo = greeting.bind(customer1);
let helloNat = greeting.bind(customer2);
helloLeo('Hello'); // Hello Leo
helloNat('Hello'); // Hello Nat

// below is a brief implementation of bind()
Function.prototype.bind = function (context) {
  var fn = this;
  return function () {
    fn.apply(context, arguments);
  };
};
// call: call the function with arguments

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

greeting.call(customer1, 'Hello'); // Hello Leo
greeting.call(customer2, 'Hello'); // Hello Nat

// greeting() just is just declared with one argument, only Hello will be printed 
greeting.call(customer1, 'Hello', 'How are you?'); // Hello Leo

greeting.call(customer1, ['Hello', 'How are you?']); // Hello,How are you? Leo

greeting.call(customer1, {
  a: 1,
  b: 2
}); // [object Object] Leo

/*
  Implement your own Function.prototype.call without calling the native call method. To avoid overwriting the actual Function.prototype.call, implement the function as Function.prototype.myCall
*/
/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {any}
 */
Function.prototype.myCall = function (thisArg, ...argArray) {
  return this.bind(thisArg)(...argArray);
};
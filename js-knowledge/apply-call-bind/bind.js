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

/**
 * Build out your own version of the .bind function using .call or .apply.
 * 
 * Unsure how .call works? Go to:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
 * 
 * Unsure how .bind works? Go to:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
 * 
 */
Function.prototype.myBind = function (context) {
    const fn = this; // need to capture the "this" here
    return function (...args) {
        // because "this" her is the context inside return function (...args) {}
        return fn.apply(context, args);
    };
};

// Example #1
function add(a, b) {
    return a + b + this.c;
}

const addBound = add.myBind({ c: 3 });
console.log(addBound(1, 2)); // 6

// Example #2
function greet() {
    return "Hello, I am " + this.name + ".";
}
const greetBound = greet.myBind({ name: "calvin" });
console.log(greetBound()); // "Hello, I am calvin."

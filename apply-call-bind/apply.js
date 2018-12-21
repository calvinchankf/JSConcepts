// apply: call the function with an array(u can put arguments into it)

let customer1 = {
  name: 'Leo',
  email: 'leo@gmail.com'
};
let customer2 = {
  name: 'Nat',
  email: 'nat@hotmail.com'
};

function greeting(text, text2) {
  console.log(`${text} ${this.name}, ${text2}`);
}
greeting.apply(customer1, ['Hello', 'How are you?']); // Hello Leo, How are you?
greeting.apply(customer2, ['Hello', 'How are you?']); // Hello Natm How are you?

greeting.apply(customer1, []); // undefined Leo, undefined
greeting.apply(customer1, 'Hello'); // this will crash because only an array is allowed to be passed as an argument
/*
  classic interivew question
  Implementation the Array Reduce
  Here is my least implementation to extend the Array class using protoype
  - I just assume that the accumalator only accepts a number or an array
  - the reducer function only takes in 2 common-used params, which are accumulator and currentValue
*/
if (!Array.prototype.myReduce) {
	Array.prototype.myReduce = function (callback, accumulator) {
		if (typeof callback !== "function") {
			throw new Error(callback + " is not a function");
		}
		let result = accumulator;
		if (accumulator === undefined) {
			if (typeof this[0] === "number") {
				result = 0;
			} else if (Array.isArray(this[0])) {
				result = [];
			} else {
				throw new Error("unknown type to accumulate");
			}
		}
		let i = 0;
		for (i; i < this.length; i++) {
			const temp = callback(result, this[i]);
			if (typeof result === "number") {
				result = temp;
			} else {
				result = temp;
			}
		}
		return result;
	};
}

const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.myReduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.myReduce(reducer, 5));
// expected output: 15

// flatten
const a = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];
const reducerA = (accumulator, currentValue) =>
	accumulator.concat(currentValue);
console.log(a.myReduce(reducerA));
console.log(a.myReduce(reducerA, [0]));

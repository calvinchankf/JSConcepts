/*
  classic interivew question:
  Implementation of flatten
*/
const flatten = (obj) => {
	let arr = [];
	if (Array.isArray(obj)) {
		for (let x of obj) {
			const temp = flatten(x);
			arr = arr.concat(temp);
		}
	} else {
		arr.push(obj);
	}
	return arr;
};

let a = [
	1,
	[2, 3, 4],
	[
		[5, 6],
		[7, 8],
	],
	9,
];

console.log(flatten(a));

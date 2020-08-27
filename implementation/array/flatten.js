/*
  Classic interivew question: implement `flatten`
*/

// 1st: recursion
const flatten1 = (obj) => {
	const arr = [];
	if (Array.isArray(obj)) {
		for (let x of obj) {
			const temp = flatten1(x);
			arr.push(...temp);
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
console.log(flatten1(a));
console.log("---");

// 2nd: iterative
const flatten2 = (obj) => {
	const res = [];
	let q = [obj];
	while (q.length > 0) {
		const head = q.shift();
		if (Array.isArray(head)) {
			q = [...head, ...q];
		} else {
			res.push(head);
		}
	}
	return res;
};
a = [
	1,
	[2, 3, 4],
	[
		[5, 6],
		[7, 8],
	],
	9,
];
console.log(flatten2(a));

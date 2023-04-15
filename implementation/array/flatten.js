/*
    Classic interivew question: implement `flatten`
*/

// 1st: recursion
Array.prototype.flatten1 = function() {
    const res = [];
    for (let x of this) {
        if (Array.isArray(x)) {
            res.push(...x.flatten1())
        } else {
            res.push(x)
        }
    }
    return res
}

let a = [
	1,
	[2, 3, 4],
	[
		[5, 6],
		[7, 8],
	],
	9,
];
console.log(a.flatten1());
console.log("---");

// 2nd: iterative
Array.prototype.flatten2 = function() {
    const res = [];
	let q = [this];
	while (q.length > 0) {
		const head = q.shift();
		if (Array.isArray(head)) {
			q = [...head, ...q];
		} else {
			res.push(head);
		}
	}
	return res;
}

a = [
	1,
	[2, 3, 4],
	[
		[5, 6],
		[7, 8],
	],
	9,
];
console.log(a.flatten2());

/*
    followup: object
*/

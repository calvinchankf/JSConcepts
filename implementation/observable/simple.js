/*
    ref:
    - https://netbasal.com/javascript-observables-under-the-hood-2423f760584
*/

class Observable {
	constructor(functionThatThrowsValues) {
		this._functionThatThrowsValues = functionThatThrowsValues;
	}

	subscribe(observer) {
		return this._functionThatThrowsValues(observer);
	}

	map(projectionFunction) {
		return new Observable((observer) => {
			return this.subscribe({
				next(val) {
					observer.next(projectionFunction(val));
				},
				error(e) {
					observer.error(e);
				},
				complete() {
					observer.complete();
				},
			});
		});
	}

	mergeMap(anotherFunctionThatThrowsValues) {
		return new Observable((observer) => {
			return this.subscribe({
				next(val) {
					anotherFunctionThatThrowsValues(val).subscribe({
						next(val) {
							observer.next(val);
						},
						error(e) {
							observer.error(e);
						},
						complete() {
							observer.complete();
						},
					});
				},
				error(e) {
					observer.error(e);
				},
				complete() {
					observer.complete();
				},
			});
		});
	}

	static fromArray(array) {
		return new Observable((observer) => {
			array.forEach((val) => observer.next(val));
			observer.complete();
		});
	}

	static fromEvent(element, event) {
		return new Observable((observer) => {
			const handler = (e) => observer.next(e);
			element.addEventListener(event, handler);
			return () => {
				element.removeEventListener(event, handler);
			};
		});
	}

	static fromPromise(promise) {
		return new Observable((observer) => {
			promise
				.then((val) => {
					observer.next(val);
					observer.complete();
				})
				.catch((e) => {
					observer.error(val);
					observer.complete();
				});
		});
	}
}

/*
    try our custome Observable
*/

// subscribe
let fakeAsyncData$ = new Observable((observer) => {
	setTimeout(() => {
		observer.next("New data is coming");
		observer.complete();
	}, 2000);
});

fakeAsyncData$.subscribe({
	next(val) {
		console.log(val);
	},
	error(e) {
		console.log(e);
	},
	complete() {
		console.log("subscribe ✅");
	},
});

// map
fakeAsyncData$
	.map((val) => `New value ${val}`)
	.subscribe({
		next(val) {
			console.log(val);
		},
		error(e) {
			console.log(e);
		},
		complete() {
			console.log("map ✅");
		},
	});

// // fromEvent
// var button = document.getElementById("button");
// let clicks$ = Observable.fromEvent(button, "click").map((e) => `${e.pageX}px`);
// let unsubscribe = clicks$.subscribe({
// 	next(val) {
// 		console.log(val);
// 	},
// 	error(e) {
// 		console.log(e);
// 	},
// 	complete() {
// 		console.log("complete");
// 	},
// });
// setTimeout(() => unsubscribe(), 1000);

// fromArray <- synchronous
let array$ = Observable.fromArray([1, 2, 3]);
array$.subscribe({
	next(val) {
		console.log(val);
	},
	error(e) {
		console.log(e);
	},
	complete() {
		console.log("fromArray ✅");
	},
});

// mergeMap
let promise = (val) => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(val), 1000);
	});
};
let data$ = Observable.fromArray([1, 2, 3]).mergeMap((val) =>
	Observable.fromPromise(promise(val))
);
data$.subscribe({
	next(val) {
		console.log(val);
	},
	error(e) {
		console.log(e);
	},
	complete() {
		console.log("mergeMap ✅");
	},
});

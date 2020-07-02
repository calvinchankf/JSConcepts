/*
    ref:
    - https://levelup.gitconnected.com/learn-javascript-promises-by-building-a-fully-working-promise-from-scratch-c9eabe73fa3
*/
class PromiseSimple {
	constructor(execute) {
		this.promiseChain = [];
		this.handleError = () => {};
		// this line is the (resolve, reject) => { ... } in new Promise((resolve, reject) => { ... })
		execute(this._userResolve, this._userReject);
	}

	then(onResolve) {
		// init the then()s when node executes the code
		this.promiseChain.push(onResolve);
		return this;
	}
	catch(handleError) {
		this.handleError = handleError;
		return this;
	}

	/*
        internal functions
        - resolve
        - reject
        so that we can init a promise e.g. new Promise((resolve, reject) => { ... })
    */
	_userResolve = (value) => {
		let storedValue = value;
		try {
			this.promiseChain.forEach((callback) => {
				storedValue = callback(storedValue);
			});
		} catch (error) {
			this.promiseChain = [];
			this._userReject(error);
		}
	};
	_userReject = (error) => {
		this.handleError(error);
	};
}

fetchFakeApi = () => {
	const user = {
		username: "calvinchankf",
		workAt: "ebay",
		profile: "https://leetcode.com/calvinchankf",
	};
	// 50% success
	if (Math.random() > 0.5) {
		return {
			statusCode: 200,
			data: user,
		};
	} else {
		return {
			statusCode: 404,
			message: "User Not Found",
		};
	}
};

// simulate an AJAX call
const makeApiCall = () => {
	return new PromiseSimple((resolve, reject) => {
		setTimeout(() => {
			const apiResponse = fetchFakeApi();
			if (apiResponse.statusCode === 200) {
				resolve(apiResponse.data);
			} else {
				reject(apiResponse);
			}
		}, 3000);
	});
};

// make the call, chian up callbacks
makeApiCall()
	.then((user) => {
		console.log("- Get the user in the first then()");
		return user;
	})
	.then((user) => {
		console.log(`- Name: ${user.username}`);
		return user;
	})
	.then((user) => {
		console.log(`- Work at: ${user.workAt}`);
		return user;
	})
	.then((user) => {
		console.log(`- Profile: ${user.profile}`);
		return user;
	})
	.then((user) => {
		console.log("- This is the last then()");
		return user;
	})
	.catch((error) => {
		console.error(error.message);
	});

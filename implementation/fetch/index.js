/*
    Navie Implementation of Browser Fetch
*/
const myFetch = (url) => {
	return new Promise((resolve, reject) => {
		function reqListener() {
			var data = JSON.parse(this.responseText);
			console.log("XMLHttpRequest Responsse:", data);
			resolve(data);
		}

		function reqError(err) {
			console.log("XMLHttpRequest Error:", err);
			reject(err);
		}

		const oReq = new XMLHttpRequest();
		oReq.onload = reqListener;
		oReq.onerror = reqError;
		oReq.open("get", url, true);
		oReq.send();
	});
};

const f = async (url) => {
	const res = await myFetch(url);
	return res;
};

const displayDiv = document.querySelector(".display");

const hackernewsButton = document.querySelector(".hackernews");
hackernewsButton.addEventListener("click", async () => {
	const data = await f("https://hn.algolia.com/api/v1/search?query=apple");
	displayDiv.innerHTML = JSON.stringify(data);
});

const invalidButton = document.querySelector(".invalid");
invalidButton.addEventListener("click", async () => {
	try {
		await f("http://calvinchakf.com/error");
	} catch (error) {
		displayDiv.innerHTML = error.type;
	}
});

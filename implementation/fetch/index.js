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

		const xhr = new XMLHttpRequest();
		xhr.onload = reqListener;
		xhr.onerror = reqError;
		xhr.open("get", url, true);
		xhr.send();
	});
};

const myFetchPost = (url, body) => {
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

        const xhr = new XMLHttpRequest();
        xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onload = reqListener;
		xhr.onerror = reqError;
		xhr.open("post", url, true);
		xhr.send(JSON.stringify(body));  // Make sure to stringify
	});
};

const f = async (url) => {

    // the native way
    // const raw = await fetch(url)
    // const res = await raw.json()

    // my custom way
    const res = await myFetch(url);

	return res;
};

const $rowsDiv = document.querySelector("#rows");

const hackernewsButton = document.querySelector(".hackernews");
hackernewsButton.addEventListener("click", async () => {
    const data = await f("https://hn.algolia.com/api/v1/search?query=apple");
    $rowsDiv.innerHTML = ''
    generateTableView(data.hits)
});

const invalidButton = document.querySelector(".invalid");
invalidButton.addEventListener("click", async () => {
	try {
		await f("http://calvinchakf.com/error");
	} catch (error) {
        $rowsDiv.innerHTML = ''
        generateErrorView(error)
	}
});

/*
    construct the UI
*/
const generateRow = (obj) => {
    const $row = document.createElement("div")
    const $text = document.createTextNode(obj.title)
    $row.appendChild($text)
    return $row
}

const generateTableView = (arr) => {
    arr.forEach(obj => {
        const $row = generateRow(obj)
        $rowsDiv.appendChild($row)
    });
}

const generateErrorView = (error) => {
    const $text = document.createTextNode(error.message || 'fail to load')
    $rowsDiv.appendChild($text)
}
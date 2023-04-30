/*
    Your task is to implement an autocomplete searchbar.

    Whenever the user types into the input, a list of results
    should appear below the input.

    Feel free to style your results as you see fit.

    Here's the search API for retrieving a list of companies:
    "https://autocomplete.clearbit.com/v1/companies/suggest?query="

    Copy and paste it into your URL browser (and include a query string).
    For example, you can try something like:
    "https://autocomplete.clearbit.com/v1/companies/suggest?query=abc"

    TODO: Your code below
*/

const SEARCH_URL = "https://autocomplete.clearbit.com/v1/companies/suggest?query=";

// data
const fetchData = async (url) => {
    const raw = await fetch(url);
    const res = await raw.json();
    return res;
};

const debouncePromise = (fn, delay) => {
    let ref = null;
    let lastResolve = null

    return (...args) => {

        if (ref !== null) {
            clearTimeout(ref);
        }

        ref = setTimeout(() => {
            const result = fn(...args)
            if (lastResolve != null) {
                lastResolve(result)
            }
        }, delay);

        return new Promise((resolve, _) => lastResolve = resolve)
    };
};

const fetchDebounce = debouncePromise(fetchData, 1000)

// UI
const $tableview = document.getElementById("list");
const generateRow = (obj) => {
    const $wrapper = document.createElement("li");
    const $text = document.createTextNode(obj.name);
    $wrapper.appendChild($text);
    return $wrapper;
};

const generateTableview = (arr) => {
    $tableview.innerHTML = "";
    arr.forEach((x) => {
        const $row = generateRow(x);
        $tableview.appendChild($row);
    });
};

const $input = document.getElementById("input");

$input.addEventListener("input", async (event) => {
    console.log(event.target.value);

    const userInput = event.target.value;

    try {
        const url = `${SEARCH_URL}${userInput}`;

        // const result = await fetchData(url) // simple
        // generateTableview(result);

        const result = await fetchDebounce(url) // debounced
        console.log(result) // <- it just called once
        generateTableview(result);

    } catch (error) {
        console.error(error);
    }
});
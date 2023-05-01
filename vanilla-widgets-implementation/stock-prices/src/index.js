const BASE_URL = 'https://comet-shimmer-stream.glitch.me/mock_crypto_prices'
let page = 0
let coins = []
let hasNext = false

// UI
const $tableview = document.getElementById("list");

// const tblHead = document.createElement("thead");
// const tblColumns = document.createElement("tr");
// const column_titles = ['Name', 'Price', 'MarketCap'];
// for (let i = 0; i < 3; i++) {
//     const cell = document.createElement("th");
//     const cellText = document.createTextNode(column_titles[i]);
//     cell.appendChild(cellText);
//     tblColumns.appendChild(cell);
// }
// tblHead.appendChild(tblColumns);
// $tableview.appendChild(tblHead);

const generateTableview = data => {
    // $tableview.innerHTML = "";
    const tblBody = document.createElement("tbody");
    // creating all cells
    for (let i = 0; i < data.length; i++) {
        const row_data = data[i]
        const columns = Object.keys(row_data)
        // creates a table row
        const row = document.createElement("tr");
        for (let j = 0; j < columns.length; j++) {
            const key = columns[j]
            const cell = document.createElement(j == 0 ? "th" : "td");
            const cellText = document.createTextNode(row_data[key]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    // put the <tbody> in the <table>
    $tableview.appendChild(tblBody);
};

// events
const $moreButton = document.getElementById("more");
$moreButton.addEventListener('click', async event => {
    console.log(event.target.value);
    if (hasNext === false) {
        $moreButton.disabled = true
        return alert('not any more');
    }

    try {
        page += 1
        fetch_data()
    } catch (error) {
        console.error(error);
    }
});

const fetch_data = async () => {

    const raw_result = await fetch(BASE_URL + '?page=' + page)
    const result = await raw_result.json()
    
    coins = result.coins;
    hasNext = result.hasNext;
    generateTableview(coins)
}
fetch_data()

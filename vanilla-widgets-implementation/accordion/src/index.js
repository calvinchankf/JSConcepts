// data
const data = [
	{
		title: "How do I know how much the car I want is worth?",
		desc:
			"Use our free car valuation calculator to get a guide on the value of your car and know its worth. Decide if you should add or subtract to the car price guide provided based on condition, service history, features and color. What can I do to improve the value of my car? Keeping your car in tip top condition and making sure you clean it and get it as close as possible to new can greatly change a buyer’s first impression. Thoroughly clean its interiors, polish its exteriors and gather all the documentation to prove a great service history.",
	},
	{
		title: "Can I get a valuation certificate for my car?",
		desc:
			"We do not issue certificates and our valuation is a price guide range only, but our instant car valuation tool is free and open to everyone and can also be used by any potential buyer.",
	},
	{
		title: "How can I get my car ready for sale?",
		desc:
			"First impressions matter so when a buyer comes to see your car, make sure that it looks its best, it is as clean as possible and it looks as good as new. Repair broken features but weigh the costs of fixing parts that might cost more than the value they will add.",
	},
];
const selectedIndices = new Set();

// UI
const $accordionDiv = document.querySelector(".accordion");

const createRowDiv = (row, idx) => {
	const $row = document.createElement("div");
	const $titleDiv = createTitleDiv(row);
	const $descDiv = createDescDiv(row);
    $row.setAttribute("class", "accordion-row");
    $row.setAttribute("data-index", idx);
	$row.appendChild($titleDiv);
	$row.appendChild($descDiv);
	return $row;
};

const createTitleDiv = (row) => {
	const $titleWrapper = document.createElement("div");
	const $titleDiv = document.createTextNode(row.title);
    $titleWrapper.setAttribute("class", "accordion-row-title");
    // $titleWrapper.setAttribute("data-index", idx);
	$titleWrapper.appendChild($titleDiv);
	return $titleWrapper;
};

const createDescDiv = (row) => {
	const $descWrapper = document.createElement("div");
	const $descDiv = document.createTextNode(row.desc);
	$descWrapper.setAttribute("class", "accordion-row-desc display-none");
	$descWrapper.appendChild($descDiv);
	return $descWrapper;
};

const findRow = (idx) => {
	return document.querySelectorAll(".accordion-row-desc")[idx];
};

// init
data.forEach((obj, i) => {
	$accordionDiv.appendChild(createRowDiv(obj, i));
});

// find dataset from ancestors
// if u dont want to do this(since it takes time), set data-index on the top most div (where a user clicks on directly)
const findDatasetFromAncestors = (node) => {
    while (node != null || node != undefined) {
        if (Object.keys(node.dataset).length > 0) {
            return node
        }
        node = node.parentNode
    }
    return undefined
}

// event listensers
$accordionDiv.addEventListener("click", (e) => {
    // const { index } = e.target.parentNode.dataset
    const targetNode = findDatasetFromAncestors(e.target)
    const index = parseInt(targetNode.dataset.index)

	if (selectedIndices.has(index)) {
		// remove
		selectedIndices.delete(index);
		const $targetDescDiv = findRow(index);
		$targetDescDiv.setAttribute("class", "accordion-row-desc display-none");
	} else {
		// add
		selectedIndices.add(index);
		const $targetDescDiv = findRow(index);
		$targetDescDiv.setAttribute("class", "accordion-row-desc");
	}
	console.log(selectedIndices);
});

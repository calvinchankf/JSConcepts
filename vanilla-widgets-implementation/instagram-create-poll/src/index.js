// data
// const options = ["apple", "banana", "orange", "pear"];
const options = [];
let selectedIdx = -1;
const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// UI
const $optionsDiv = document.querySelector(".options");
const $addOptionInputDiv = document.querySelector(".add-option-input");
$addOptionInputDiv.focus();

const createNthDiv = (idx) => {
	const $nthDiv = document.createTextNode(alphabets[idx]);
	const $wrapperDiv = document.createElement("div");
	$wrapperDiv.setAttribute("class", "option-nth-wrapper");
	$wrapperDiv.appendChild($nthDiv);
	return $wrapperDiv;
};

const createOptionDiv = (text, idx) => {
	const $nthDiv = createNthDiv(idx);
	const $textDiv = document.createTextNode(text);
	const $optionDiv = document.createElement("div");
	$optionDiv.setAttribute("class", "option");
	$optionDiv.setAttribute("data-index", idx);
	$optionDiv.appendChild($nthDiv);
	$optionDiv.appendChild($textDiv);
	return $optionDiv;
};

const findOptionDiv = (nth) => {
	return document.querySelector(`.option:nth-of-type(${parseInt(nth) + 1})`);
	// OR return document.querySelectorAll(".option")[nth];
};

const toggleOption = (nth, toSelcet) => {
	$targetOptionDiv = findOptionDiv(nth);
	let classname = "option";
	if (toSelcet) {
		classname += " selected";
	}
	$targetOptionDiv.setAttribute("class", classname);
};

// init
options.forEach((o, i) => {
	$optionsDiv.appendChild(createOptionDiv(o, i));
});

// event listensers
$optionsDiv.addEventListener("click", (e) => {
	const dataset = e.target.dataset;
	if (dataset.index === selectedIdx) {
		return;
	}

	// uncheck prev
	if (selectedIdx > -1) {
		toggleOption(selectedIdx, false);
	}
	// update data
	selectedIdx = dataset.index;
	// check cur
	toggleOption(selectedIdx, true);
});

$addOptionInputDiv.addEventListener("keyup", (e) => {
	// e.preventDefault(); ???
	if (e.keyCode !== 13) {
		return;
	}
	if (options.length == 26) {
		alert("There are too many options!");
		return;
	}
	const value = e.target.value.trim();
	// add data
	options.push(value);
	$optionsDiv.appendChild(createOptionDiv(value, options.length - 1));
	// clear text
	e.target.value = "";
});

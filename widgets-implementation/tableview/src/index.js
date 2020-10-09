/*
Your task is to add event handlers to a table.

1. Update this codepen so that when you click on a row, it becomes highlighted (i.e. its background color is changed).

2. If you click on a new row, it should remove the highlight from the old row and highlight the new one.

3. If you press cmd or ctrl while clicking, you should be able to highlight multiple rows.

Do not import any frameworks. Use native HTML, CSS and JS as much as possible.

You have 30 minutes.

Tip - Selecting elements:

const node = document.querySelector("#companies");

Tip - Using event listeners:

node.addEventListener("click", function (event) {
  console.log("A " + event.type + " event was fired.");
});

*/

let selectedIndices = new Set();
let canMultiSelect = false

// -- TODO: Your JavaScript code below this line --
const root = document.querySelector("#companies");

root.addEventListener("click", function (event) {
    const parent = event.target.parentNode;
    const index = parseInt(parent.dataset.index);

    const children = document.querySelectorAll("tr");
    if (canMultiSelect == false) {
        for (const key of selectedIndices) {
            const j = parseInt(key)
            const prevNode = children[j+1]
            prevNode.setAttribute('class', 'non-highlight')
        }
        selectedIndices = new Set()
    }

    if (selectedIndices.has(index)) {
        parent.setAttribute('class', 'non-highlight');
        selectedIndices.delete(index)
    } else {
        parent.setAttribute('class', 'highlight')
        selectedIndices.add(index)
    }
});

document.addEventListener('keyup', function (event) {
    if (event.code === 'MetaLeft') {
        canMultiSelect = false
    }
})
document.addEventListener('keydown', function (event) {
    if (event.code === 'MetaLeft') {
        canMultiSelect = true
    }
})
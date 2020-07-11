// this is a handy function for creating a node
const h = (tag, props, ...children) => {
	return { tag, props, children };
};

// render a Dom Element from a Virtual Dom Element, recursively
const render = (node) => {
	if (typeof node === "string") {
		return document.createTextNode(node);
	}
	const $el = document.createElement(node.tag);
	for (const [k, v] of Object.entries(node.props)) {
		$el.setAttribute(k, v);
	}
	for (const child of node.children) {
		const $child = render(child);
		$el.appendChild($child);
	}
	return $el;
};

// naive diff for tag change OR text change
function isTagChanged(node1, node2) {
	return (
		typeof node1 !== typeof node2 ||
		(typeof node1 === "string" && node1 !== node2) ||
		node1.tag !== node2.tag
	);
}

/*
    There are 2 ways to diff+update the real DOM tree
    1.  - diff 2 trees to get the pathes
        - applies the patches to the real DOM tree
    2. diff 2 trees and apply the change directly

    For simplicity, here we use the (2)
*/
function updateElement($parent, oldNode, newNode, index = 0) {
	if (!oldNode) {
		$parent.appendChild(render(newNode));
	} else if (!newNode) {
		$parent.removeChild($parent.childNodes[index]);
	} else if (isTagChanged(newNode, oldNode)) {
		$parent.replaceChild(render(newNode), $parent.childNodes[index]);
	} else if (newNode.tag) {
		const oldLength = oldNode.children.length;
		const newLength = newNode.children.length;
		for (let i = 0; i < Math.max(oldLength, newLength); i++) {
			updateElement(
				$parent.childNodes[index],
				newNode.children[i],
				oldNode.children[i],
				i
			);
		}
	}
}

// ---------------------------------------------------------------------

let current = h(
	"div",
	{ class: "list" },
	h("div", {}, "😉😉😉"),
	h("div", {}, "random"),
	h(
		"img",
		{ src: "https://media.giphy.com/media/C9x8gX02SnMIoAClXa/giphy.gif" },
		"image"
	)
);

// $ means a Real DOM element
const $root = document.getElementById("root");
updateElement($root, undefined, current);
// button to update
const $reload = document.getElementById("refresh");
$reload.addEventListener("click", () => {
	const b = h(
		"div",
		{ class: "list" },
		h("div", {}, "😉😉😉"),
		h("div", {}, `random => ${String(Math.random() * 10)}`),
		h(
			"img",
			{
				src:
					"https://media.giphy.com/media/C9x8gX02SnMIoAClXa/giphy.gif",
			},
			"image"
		)
	);
	updateElement($root, current, b);
	current = b;
});

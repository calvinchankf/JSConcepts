/*
    references:
    - https://github.com/dongyuanxin/pure-virtual-dom
    - https://github.com/heiskr/prezzy-vdom-example
    - https://dev.to/ycmjason/building-a-simple-virtual-dom-from-scratch-3d05#background-what-is-virtual-dom
    - https://github.com/livoras/simple-virtual-dom/
    - https://github.com/livoras/blog/issues/13

    This html&js lives on my site here:
    http://calvinchankf.com/JSConcepts/implementation/virtual-dom/prototype/main.html
*/

// this is a handy function for creating a node
const h = (tag, props = {}, children = []) => {
	return { tag, props, children };
};

// render a Dom Element from a Virtual Dom Element, recursively
const render = (node) => {
	if (typeof node === "string") {
		return document.createTextNode(node);
	}
	const $el = document.createElement(node.tag);
	// attributes
	for (const [k, v] of Object.entries(node.props)) {
		$el.setAttribute(k, v);
	}
	// children
	for (const child of node.children) {
		const $child = render(child);
		$el.appendChild($child);
	}
	return $el;
};

// naive diff functions
function isTagChanged(node1, node2) {
	return (
		typeof node1 !== typeof node2 ||
		(typeof node1 === "string" && node1 !== node2) ||
		node1.tag !== node2.tag
	);
}
function isPropsChanged(node1, node2) {
	for (let key in node1.props) {
		if (!(key in node2.props) || node1.props[key] !== node2.props[key]) {
			return true;
		}
	}
	for (let key in node2.props) {
		if (!(key in node1.props) || node1.props[key] !== node2.props[key]) {
			return true;
		}
	}
	return false;
}

/*
    There are 2 ways to diff+update the real DOM tree
    1.  - diff 2 trees to get the pathes
        - applies the patches to the real DOM tree
    2. diff 2 trees and apply the change directly

    For simplicity, here we use the (2)
*/
function updateElement($parent, oldNode, newNode, index = 0) {
	console.log;
	if (!oldNode) {
		$parent.appendChild(render(newNode));
	} else if (!newNode) {
		$parent.removeChild($parent.childNodes[index]);
	} else if (isTagChanged(oldNode, newNode)) {
		$parent.replaceChild(render(newNode), $parent.childNodes[index]);
	} else if (isPropsChanged(oldNode, newNode)) {
		$parent.replaceChild(render(newNode), $parent.childNodes[index]);
	} else if (newNode.children) {
		const oldLength = oldNode.children.length || 0;
		const newLength = newNode.children.length;
		for (let i = 0; i < Math.max(oldLength, newLength); i++) {
			updateElement(
				$parent.childNodes[index],
				oldNode.children[i],
				newNode.children[i],
				i
			);
		}
	}
}

// ---------------------------------------------------------------------

let current = h("div", { class: "list" }, [
	h("div", {}, ["😉😉😉"]),
	h("div", {}, ["random"]),
	h("div", {}, ["random props"]),
	h("img", {
		src: "https://media.giphy.com/media/C9x8gX02SnMIoAClXa/giphy.gif",
	}),
]);

// $ means a Real DOM element
const $root = document.getElementById("root");
updateElement($root, undefined, current);

// button to update
const $reload = document.getElementById("refresh");
$reload.addEventListener("click", () => {
	const b = h("div", { class: "list" }, [
		h("div", {}, ["😉😉😉"]),
		h("div", {}, [`random => ${String(Math.random() * 10)}`]),
		h(
			"div",
			{
				random: `${String(Math.random() * 10)}`,
			},
			["random props"]
		),
		h("img", {
			src: "https://media.giphy.com/media/C9x8gX02SnMIoAClXa/giphy.gif",
		}),
	]);
	updateElement($root, current, b);
	current = b;
});

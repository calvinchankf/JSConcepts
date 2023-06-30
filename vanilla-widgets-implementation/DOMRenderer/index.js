/*
    Question:

    Given the representation for the markup of a website, write a function DOMRenderer to generate a DOM on the given root

    e.g. Given
    
    const something = {
        type: "div",
        props: {
            id: "app",
            children: [{
                type: "h1",
                props: {
                    class: "header",
                    children: "Something!"
                }
            }],
        },
    };
    
    // execute below 
    const renderer = new DOMRenderer();
    renderer.render(document.body, something);

    // on document.body, there should be a children like this
    <div id="app">
    <h1 class="header">Hello, World!</h1>
    </div>
*/
class DOMRenderer {

    _generate(obj) {
        if (typeof obj === 'string') {
            return document.createTextNode(obj);
        }
        const { type, props } = obj

        // START follow-up solution
        if (typeof type === 'function') {
            const fn = type
            return this._generate(fn(props));
        }
        // END follow-up solution

        const $node = document.createElement(type);
        for (let p in props) {
            const v = props[p]
            if (p === 'children') {
                if (Array.isArray(v)) {
                    v.forEach(child => {
                        $node.appendChild(this._generate(child))
                    })
                } else {
                    $node.appendChild(this._generate(v))
                }
            } else {
                $node.setAttribute(p, v)
            }
        }
        return $node
    }

    render(container, obj) {
        const node = this._generate(obj)
        container.appendChild(node)
    }
}

const something = {
    type: "div",
    props: {
        id: "app",
        children: [{
            type: "h1",
            props: {
                class: "header",
                children: "Hello, World!"
            }
        }],
    },
};
const renderer = new DOMRenderer();
renderer.render(document.body, something);

/*
    followup:
    - we allow developers to define custom functions

    e.g.
    const something = {
        type: "div",
        props: {
            id: "app",
            children: [{
                type: "h1",
                props: {
                    class: "header",
                    children: "Hello, World!"
                }
            },
            {
                type: MyComponent,
                props: {
                    counter: 1
                },
            }],
        },
    };

    with

    function MyComponent(props) {
        return {
            type: "button",
            props: {
                children: "Counter is: " + props.counter,
            },
        };
    }
*/

function CustomComponent(props) {
    return {
        type: "button",
        props: {
            children: "Counter is: " + props.counter,
        },
    };
}

const otherthing = {
    type: "div",
    props: {
        id: "app",
        children: [{
            type: "h1",
            props: {
                class: "header",
                children: "Otherthing!"
            }
        },
        {
            type: CustomComponent,
            props: {
                counter: 1
            },
        }],
    },
};
renderer.render(document.body, otherthing);
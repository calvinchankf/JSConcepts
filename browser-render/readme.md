How Browsers Render a Website
===
Here's a quick overview of the steps:
1. Process HTML markup and build the DOM tree.
1. Process CSS markup and build the CSSOM tree.
1. Combine the DOM and CSSOM into a render tree.
1. Run layout on the render tree to compute geometry of each node.
1. Paint the individual nodes to the screen.
1. Composite all the layers together.

Detail
===
To begin with, let's take a look at the architecture of a modern browser.
1. **The User Interface:** includes the address bar, back/forward button, bookmarking menu, etc. Every part of the browser display except the window where you see the requested page.
1. **The Browser Engine:** actions between the UI and the rendering engine.
1. **The Rendering Engine:** responsible for displaying requested content. For example if the requested content is HTML, the rendering engine parses HTML and CSS, and displays the parsed content on the screen.
1. **Networking:** network calls such as HTTP requests
1. **UI Backend:** draws basic widgets like combo boxes and windows. This backend exposes a generic interface that is not platform specific. Underneath it uses operating system user interface methods.
1. **JavaScript Interpreter:** parses and executes JavaScript code.
1. **Data Storage:** local data store, such as cookies. Browsers also support storage mechanisms such as localStorage, IndexedDB, WebSQL and FileSystem.

![browser](./browser.png)

Let's focus on Rendering Engine Flow
===
Mostly, screens refresh 60 times per second(Frame rate). The browser needs to match the device’s refresh rate and put up 1 new picture/frame, for each of those screen refreshes the browser has limited time 16.66 ms.

Rendering Document Object Model (DOM)
---
![render-dom](./render-dom.png)

1. **Conversion:** A browser reads the bytes(of html) off the disk/network, and translates them to individual characters based on specified encoding of the file (for example, UTF-8).
1. **Tokenizing:** The browser converts strings of characters into distinct tokens—as specified by the W3C HTML5 standard
1. **Lexing:** The emitted tokens are converted into "objects" which define their properties and rules.
1. **DOM construction:** Finally, the HTML markup defines relationships between different tags (some tags are contained within other tags) the created objects are linked in a tree data structure.

![dom-timeline](./dom-timeline.png)
If we open up devtools, we can capture the actual time taken for DOM construction

Rendering CSS Object Model (CSSOM)
---
Similar to DOM construction, a browser convert the received CSS rules into something that the browser can understand and work with. Hence, we repeat the HTML process, but for CSS instead of HTML.

![render-cssom](./render-cssom.png)

![cssom-timeline](./cssom-timeline.png)
If we open up devtools, we can capture the actual time taken for DOM construction

Rendering Render Tree
---
The CSSOM and DOM trees are combined into a render tree, which is then used to compute the layout of each visible element and serves as an input to the paint process that renders the pixels to screen. Optimizing each of these steps is critical to achieving optimal rendering performance.

![render](./render.png)

1. Starting at the root of the DOM tree, traverse each **visible** node.

  - Some nodes are not visible, e.g. `<script>, <meta>` ...etc are omitted since they are not reflected in the rendered output.
  - Some nodes are hidden via CSS and are also omitted from the render tree; e.g, in the example above, `.body.p.span`is missing from the render tree because we set it `display: none`.
1. For each **visible** node, find the appropriate matching CSSOM rules and apply them.

1. Emit **visible** nodes with content and their computed styles.

P.S.
- `visibility: hidden` != `display: none`
  - `visibility: hidden` makes the element invisible, but the element still occupies space in the layout (rendered as an empty box), 
  - `display: none` removes the element entirely from the render tree such that the element is invisible and is not part of the layout.

![webkit](./webkit.png)
E.g. : flow of Safari's WebKit Rendering Engine

![gecko](./gecko.jpg)
E.g. : flow of Mozilla's Gecko Rendering Engine

Layout
---
It calculates the exact position of DOM elements and size within the viewport of the device.

To figure out the exact size and position of each object on the page, the browser begins at the root of the render tree and traverses it.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Critial Path: Hello world!</title>
  </head>
  <body>
    <div style="width: 50%">
      <div style="width: 50%">Hello world!</div>
    </div>
  </body>
</html>
```
The body of the above page contains two nested div's: the first (parent) div sets the display size of the node to 50% of the viewport width, and the second div---contained by the parent---sets its width to be 50% of its parent; that is, 25% of the viewport width.
![layout-viewport](./layout-viewport.png)

Paint
---
When layout is complete, the browser issues "Paint Setup" and "Paint" events, which convert the render tree to pixels on the screen


Composite
---
In this step, the browser combines all the layers together. It is a really important process, especially for the overlapping DOM elements.

There are 3 cases in which the browser will rework again:

1. **layout -> paint -> compose**
    
    e.g. if we change the width of an element, this will cause the browser to calculate the position of each element on the screen.

1. **paint -> compose**

    e.g. if we changed the `color` or `background-color` of the element, there are no changes in the layout just in the visual part so the browser will rework from the paint step

1. **compose**

    e.g. if we change the transform of an element, this will merely cause the composing step.

🎊🎊🎊 Finally, DONE 🎊🎊🎊
Common DOM Properties and Methods
===

Properties
---
- `children` get all the children nodes
- `innerHTML` view/change the inner HTML of an element
- `innerText` represents the "rendered" text content of a node and its descendants
- `textContent` gets the content of all elements, including `<script>` and `<style>` elements. In contrast, innerText only shows “human-readable” elements.


Methods
---

- `getElementById` 
```html
<div id="myDIV">
  <h2 class="example">Example A</h2>
  <p class="example">Example B</p> 
</div>

<script>
var x = document.getElementById("myDIV")
</script>
```

- `getElementsByClassName`
```html
<ul class="example">
  <li class="child">Coffee</li>
  <li class="child">Tea</li>
</ul>

<script>
function myFunction() {
  var list = document.getElementsByClassName("example")[0];
  list.getElementsByClassName("child")[0].innerHTML = "Milk";
}
</script>

<!-- it becomes -->
<ul class="example">
  <li class="child">Milk</li>
  <li class="child">Tea</li>
</ul>
```

- `getElementsByTagName`
```html
<ul>
  <li>Coffee</li>
  <li>Tea</li>
</ul>

<script>
function myFunction() {
  var list = document.getElementsByTagName("UL")[0];
  list.getElementsByTagName("LI")[0].innerHTML = "Milk";
}
</script>

<!-- it becomes -->
<ul>
  <li>Milk</li>
  <li>Tea</li>
</ul>
```

- `querySelector("target")` get the first child element with class="target"
```html
<div id="myDIV">
  <h2 class="example">Example A</h2>
  <p class="example">Example B</p> 
</div>

<script>
function myFunction() {
  var x = document.getElementById("myDIV")
  x.querySelector(".example").innerHTML = "Hello World"
}
</script>

<!-- it becomes -->
<div id="myDIV">
  <h2 class="example">Hello World</h2>
  <p class="example">Example B</p> 
</div>
```

- `querySelectorAll()` get all the children with class="target"
```html
<div id="myDIV">
  <h2 class="example">Example A</h2>
  <p class="example">Example B</p> 
</div>

<script>
function myFunction() {
  var arr = document.getElementById("myDIV").querySelector(".example")
  arr.forEach(x => x.innerHTML = "Hello World")
}
</script>

<!-- it becomes -->
<div id="myDIV">
  <h2 class="example">Hello World</h2>
  <p class="example">Hello World</p> 
```
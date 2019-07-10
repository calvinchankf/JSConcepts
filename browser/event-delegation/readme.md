What is Event Delegation?
===
Event Delegation is a technique involving attaching event listeners to the parent instead of attaching to a child. It leverages the power of event-bubble-up mechanism.

Tgere are some of the common JavaScript events:
- change:: An HTML element has been changed
- click:: The user clicks an HTML element
- mouseover:: The user moves the mouse over an HTML element
- mouseout:: The user moves the mouse away from an HTML element
- keydown:: The user pushes a keyboard key
- load:: The browser has finished loading the page

Event Bubbling/Event Propagation
---
Whenever a user makes a click it ripples up all the way up to the top of the DOM and triggers clicks events on all the parent elements of the element you clicked

![](./event-bubbling.gif)

And here is how the click event bubbling up
![](./bubble-up.png)


So how to add event listener(s) to the buttons?
---
```html
<table id="test">
    <tr><td>List item1</td><td><input type="button" value="edit" data-index="1" /></td></tr>
    <tr><td>List item2</td><td><input type="button" value="edit" data-index="2" /></td></tr>
    <tr><td>List item3</td><td><input type="button" value="edit" data-index="3" /></td></tr>
    <tr><td>List item4</td><td><input type="button" value="edit" data-index="4" /></td></tr>
    <tr><td>List item5</td><td><input type="button" value="edit" data-index="5" /></td></tr>
    <tr><td>List item6</td><td><input type="button" value="edit" data-index="6" /></td></tr>
    <tr><td>List item7</td><td><input type="button" value="edit" data-index="7" /></td></tr>
</table>
<script type='text/javascript' src='//code.jquery.com/jquery-1.9.1.js'></script>

<script>
 $("#test [type=button]").on("click",function(){
    alert("hi, edit is fired on row "+$(this).data("index"));
 });
</script>
```

Reference
---
https://medium.com/@bretdoucette/part-4-what-is-event-delegation-in-javascript-f5c8c0de2983
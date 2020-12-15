/*
    https://www.1point3acres.com/bbs/interview/goldmansachs-front-end-developer-464431.html
*/

// Q1
const pTagElements = document.querySelectorAll('p')
console.log(pTagElements)

// Q2
let allChildren = []
for (let ele of pTagElements) {
    allChildren = allChildren.concat(ele.children)
}
console.log(allChildren)

// Q3
const liElements = document.querySelectorAll('li')
for (let ele of liElements) {
    const spanElement = document.createElement("span");
    ele.appendChild(spanElement)
}